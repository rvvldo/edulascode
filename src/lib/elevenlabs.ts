
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
const BASE_URL = "https://api.elevenlabs.io/v1";

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

export const generateSpeech = async (text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<HTMLAudioElement | null> => {
  if (!ELEVENLABS_API_KEY) {
    console.warn("ElevenLabs API Key is missing. Please add VITE_ELEVENLABS_API_KEY to your .env file.");
    return null;
  }

  // Debug: Check which key is loaded
  console.log("ElevenLabs Init. Key ends with:", ELEVENLABS_API_KEY.slice(-6));

  try {
    // optimize_streaming_latency=3 cuts down latency significantly (approx 300-500ms)
    // Levels: 0 (default), 1, 2, 3, 4 (max speed, lowest quality)
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}?optimize_streaming_latency=3`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5", // Turbo v2.5 supports 32 languages including Indonesian and is much faster (~100ms latency)
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ElevenLabs API Error Details:", JSON.stringify(errorData, null, 2));
      throw new Error(`Failed to generate speech: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    return audio;

  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};

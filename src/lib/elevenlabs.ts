
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
const BASE_URL = "https://api.elevenlabs.io/v1";

// Default Voice ID (You can change this to any voice ID you prefer)
// "21m00Tcm4TlvDq8ikWAM" is Rachel (Standard US).
// For Indonesian, you might want to explore the Voice Lab or Library to specific ID.
// Using a generic one for now.
const DEFAULT_VOICE_ID = "hkfHEbBvdQFNX4uWHqRF";

export const generateSpeech = async (text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<HTMLAudioElement | null> => {
  if (!ELEVENLABS_API_KEY) {
    console.warn("ElevenLabs API Key is missing. Please add VITE_ELEVENLABS_API_KEY to your .env file.");
    return null;
  }

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
        model_id: "eleven_multilingual_v2", // Best for multiple languages including Indonesian
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ElevenLabs API Error:", errorData);
      throw new Error("Failed to generate speech");
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

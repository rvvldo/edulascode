import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Story data structure
interface DialogLine {
  character: string;
  text: string;
  isNarrator?: boolean;
}

interface Choice {
  text: string;
  isGood: boolean;
  nextScene: number;
}

interface Scene {
  background: string;
  dialogues: DialogLine[];
  choices?: Choice[];
  isEnding?: boolean;
  endingScore?: number;
  endingMessage?: string;
}

// Sample story data
const storyData: Record<number, { title: string; scenes: Scene[] }> = {
  1: {
    title: "Petualangan di Hutan Kalimantan",
    scenes: [
      {
        background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
        dialogues: [
          { character: "Narator", text: "Di kedalaman hutan Kalimantan yang lebat, hiduplah seorang pemuda bernama Raka...", isNarrator: true },
          { character: "Raka", text: "Wah, hutan ini sungguh indah! Aku harus menjaganya." },
          { character: "Narator", text: "Tiba-tiba, Raka mendengar suara mesin gergaji dari kejauhan...", isNarrator: true },
        ],
      },
      {
        background: "linear-gradient(180deg, #2d3a1f 0%, #3d4a2a 50%, #2a3520 100%)",
        dialogues: [
          { character: "Raka", text: "Suara apa itu? Sepertinya ada yang tidak beres..." },
          { character: "Pembalak", text: "Hahaha! Kayu-kayu ini akan laku mahal!" },
          { character: "Raka", text: "Tidak! Mereka menebang pohon secara ilegal!" },
        ],
        choices: [
          { text: "Laporkan ke pihak berwajib", isGood: true, nextScene: 2 },
          { text: "Diam saja dan pergi", isGood: false, nextScene: 3 },
        ],
      },
      {
        background: "linear-gradient(180deg, #1a5c3a 0%, #2d7a4d 50%, #1a4a3a 100%)",
        dialogues: [
          { character: "Narator", text: "Raka segera berlari ke pos kehutanan terdekat...", isNarrator: true },
          { character: "Petugas", text: "Terima kasih atas laporanmu, anak muda!" },
          { character: "Raka", text: "Kita semua harus menjaga hutan ini!" },
        ],
        isEnding: true,
        endingScore: 100,
        endingMessage: "Selamat! Kamu telah memilih jalan yang benar. Melaporkan pembalakan liar adalah langkah penting untuk menjaga kelestarian hutan.",
      },
      {
        background: "linear-gradient(180deg, #3a2a1a 0%, #4a3a2a 50%, #2a1a10 100%)",
        dialogues: [
          { character: "Narator", text: "Raka memilih untuk pergi tanpa melakukan apa-apa...", isNarrator: true },
          { character: "Raka", text: "Mungkin bukan urusanku..." },
          { character: "Narator", text: "Beberapa tahun kemudian, hutan itu telah gundul...", isNarrator: true },
        ],
        isEnding: true,
        endingScore: 25,
        endingMessage: "Sayang sekali. Dengan tidak bertindak, hutan kehilangan banyak pohon. Setiap tindakan kecil bisa membuat perbedaan besar!",
      },
    ],
  },
};

// Default story for other IDs
const defaultStory: { title: string; scenes: Scene[] } = {
  title: "Cerita Belum Tersedia",
  scenes: [
    {
      background: "linear-gradient(180deg, #1a472a 0%, #2d5a3d 50%, #1a3a2a 100%)",
      dialogues: [
        { character: "Narator", text: "Cerita ini sedang dalam pengembangan. Silakan kembali lagi nanti!", isNarrator: true },
      ],
      isEnding: true,
      endingScore: 0,
      endingMessage: "Terima kasih telah mengunjungi EDULAD. Cerita lengkap akan segera hadir!",
    },
  ],
};

const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storyId = parseInt(id || "1");
  const story = storyData[storyId] || defaultStory;

  const [currentScene, setCurrentScene] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);

  const scene = story.scenes[currentScene];
  const dialogue = scene.dialogues[currentDialogue];

  // Typing animation
  useEffect(() => {
    if (!dialogue) return;
    
    setDisplayedText("");
    setIsTyping(true);
    
    let index = 0;
    const text = dialogue.text;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        
        // Show choices if at end of dialogues and choices exist
        if (currentDialogue === scene.dialogues.length - 1 && scene.choices) {
          setTimeout(() => setShowChoices(true), 500);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentScene, currentDialogue, dialogue, scene.dialogues.length, scene.choices]);

  const handleContinue = useCallback(() => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(dialogue.text);
      setIsTyping(false);
      if (currentDialogue === scene.dialogues.length - 1 && scene.choices) {
        setTimeout(() => setShowChoices(true), 300);
      }
      return;
    }

    if (scene.isEnding) {
      // Show ending
      setScore(scene.endingScore || 0);
      toast({
        title: `Skor: ${scene.endingScore}/100`,
        description: scene.endingMessage,
      });
      setTimeout(() => navigate("/dashboard"), 3000);
      return;
    }

    if (currentDialogue < scene.dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
      setShowChoices(false);
    }
  }, [isTyping, dialogue, scene, currentDialogue, navigate]);

  const handleChoice = (choice: Choice) => {
    setShowChoices(false);
    setCurrentDialogue(0);
    setCurrentScene(choice.nextScene);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: scene.background }}
    >
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4">
        <Button 
          variant="glass" 
          size="icon"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-lg text-primary-foreground/90 truncate mx-4">
          {story.title}
        </h1>
        <Button 
          variant="glass" 
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </header>

      {/* Scene Area - Characters would go here */}
      <div className="flex-1 relative">
        {/* Character placeholder */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-48 h-64 flex items-end justify-center">
          <div className="text-8xl animate-float">
            {dialogue?.character === "Raka" && "👤"}
            {dialogue?.character === "Pembalak" && "👥"}
            {dialogue?.character === "Petugas" && "👮"}
            {dialogue?.isNarrator && "📖"}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Dialogue Box */}
      <div 
        className="relative z-10 bg-card/95 backdrop-blur-md border-t border-border/50 p-6 cursor-pointer"
        onClick={handleContinue}
      >
        <div className="max-w-3xl mx-auto">
          {/* Character Name */}
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              dialogue?.isNarrator 
                ? "bg-muted text-muted-foreground" 
                : "bg-primary text-primary-foreground"
            }`}>
              {dialogue?.character}
            </span>
          </div>

          {/* Dialogue Text */}
          <p className="text-lg text-foreground leading-relaxed min-h-[3rem]">
            {displayedText}
            {isTyping && <span className="typing-cursor" />}
          </p>

          {/* Tap to continue hint */}
          {!isTyping && !showChoices && !scene.isEnding && (
            <p className="text-sm text-muted-foreground mt-4 text-center animate-pulse">
              Ketuk untuk melanjutkan...
            </p>
          )}

          {/* Ending Display */}
          {scene.isEnding && !isTyping && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
                <span className="text-2xl font-display font-bold text-primary">
                  Skor: {scene.endingScore}/100
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Kembali ke dashboard...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Choices */}
      {showChoices && scene.choices && (
        <div className="relative z-20 bg-card/95 backdrop-blur-md border-t border-border/30 p-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Pilih tindakanmu:
            </p>
            <div className="grid gap-3">
              {scene.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  onClick={() => handleChoice(choice)}
                >
                  <span className="font-medium">{index + 1}. {choice.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;

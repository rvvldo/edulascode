import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Volume2, VolumeX, Play, CheckCircle, AlertCircle, Home } from "lucide-react";
import { toast } from "sonner";
import { storiesData } from "@/data/stories";
import { useAuth } from "@/contexts/AuthContext";
import { useFirebaseOperation } from "@/hooks/useFirebase";
import { updateData, readData } from "@/lib/firebase.service";

// Enum for game states
type GameState = "PREPARATION" | "PLAYING" | "RESULT";

const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const storyId = parseInt(id || "1");
  const story = storiesData[storyId];

  // Game State
  const [gameState, setGameState] = useState<GameState>("PREPARATION");
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  // UI State
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [prepAgreed, setPrepAgreed] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative">("positive");
  const [loading, setLoading] = useState(true);

  // Data checking
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const { executeOperation } = useFirebaseOperation();

  // Scroll ref for dialogue
  const dialogueRef = useRef<HTMLDivElement>(null);

  // Check if user already played this story
  useEffect(() => {
    const checkStatus = async () => {
      if (!currentUser) return;
      try {
        const userPath = `users/${currentUser.uid}`;
        const userData = await readData<any>(userPath);

        // Check if story ID exists in completedStories
        // Assuming completedStories is an object or array. Let's assume object { [storyId]: true }
        if (userData?.completedStories && userData.completedStories[storyId]) {
          setAlreadyPlayed(true);
          setGameState("RESULT");
          // Optionally load previous score if you want
          // setCurrentScore(userData.completedStories[storyId].score);
        }
      } catch (error) {
        console.error("Error checking story status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [currentUser, storyId]);


  const currentScene = story?.scenes[currentSceneIndex];

  // Typing Effect
  useEffect(() => {
    if (gameState !== "PLAYING" || !currentScene) return;

    // Only type for narratives or if we need to show the question text slowly (optional)
    // Here we type the dialogue text
    let textToType = "";

    if (currentScene.type === "NARRATIVE" && currentScene.dialogues) {
      textToType = currentScene.dialogues[currentDialogueIndex].text;
    } else if (currentScene.type === "CHOICE" && currentScene.question) {
      textToType = currentScene.question;
      // If it's a choice question, we might not want typing effect or maybe yes.
      // Let's use typing effect for consistency
    }

    setDisplayedText("");
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index < textToType.length) {
        setDisplayedText(textToType.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20); // Faster typing speed

    return () => clearInterval(interval);
  }, [gameState, currentSceneIndex, currentDialogueIndex, currentScene]);


  // Handler for Preparation Start
  const handleStartGame = () => {
    if (prepAgreed) {
      setGameState("PLAYING");
    }
  };

  // Handler for Narrative Continue
  const handleNextDialogue = () => {
    if (isTyping) {
      // Complete text immediately
      if (currentScene?.type === "NARRATIVE") {
        setDisplayedText(currentScene.dialogues![currentDialogueIndex].text);
      } else if (currentScene?.type === "CHOICE") {
        setDisplayedText(currentScene.question!);
      }
      setIsTyping(false);
      return;
    }

    if (!currentScene) return;

    if (currentScene.type === "NARRATIVE") {
      if (currentDialogueIndex < (currentScene.dialogues?.length || 0) - 1) {
        setCurrentDialogueIndex(prev => prev + 1);
      } else {
        // Next Scene
        goToNextScene();
      }
    }
  };

  const goToNextScene = () => {
    if (showFeedback) {
      setShowFeedback(null);
    }

    if (currentSceneIndex < story.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setCurrentDialogueIndex(0);
    } else {
      finishGame();
    }
  };

  // Handler for Choices
  const handleChoice = (choice: any) => { // Using explicit type would be better but keeping it simple for now
    // Show Feedback first
    const newScore = currentScore + choice.scoreChange;
    setCurrentScore(newScore);

    setFeedbackType(choice.isGood ? "positive" : "negative");
    setShowFeedback(choice.feedback);

    // Wait a bit or let user click to continue?
    // Let's force a delay for reading feedback then auto-advance or button
    // Design choice: Button "Lanjut" in feedback modal
  };

  const finishGame = async () => {
    setGameState("RESULT");
    if (currentUser && !alreadyPlayed) {
      try {
        // Update total score
        const userRef = `users/${currentUser.uid}`;
        const userData = await readData<any>(userRef);
        const currentTotalScore = userData?.totalScore || 0;
        const currentStoriesCompleted = userData?.storiesCompleted || 0;

        await updateData(userRef, {
          totalScore: currentTotalScore + currentScore,
          storiesCompleted: currentStoriesCompleted + 1,
          [`completedStories/${storyId}`]: {
            score: currentScore,
            completedAt: new Date().toISOString()
          }
        });

        toast.success("Progress tersimpan!");
        setAlreadyPlayed(true);
      } catch (error) {
        console.error("Failed to save progress", error);
        toast.error("Gagal menyimpan progress.");
      }
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Cerita Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/dashboard")}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }

  // PREPARATION VIEW
  if (gameState === "PREPARATION") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        {/* Background from Story */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background: story.scenes[0].background,
            filter: "blur(8px)"
          }}
        />

        <div className="relative z-10 bg-card/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-border/50 animate-fade-in">
          <div className="mb-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              {story.category}
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">{story.title}</h1>
            <p className="text-muted-foreground">{story.description}</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Persiapan Misi
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {story.preparationText}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Ikuti cerita dengan seksama</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Pilih tindakan yang paling bijak untuk lingkungan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Kumpulkan poin kebaikan sebanyak mungkin</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
              <Checkbox id="terms" checked={prepAgreed} onCheckedChange={(c) => setPrepAgreed(c as boolean)} />
              <Label htmlFor="terms" className="text-sm cursor-pointer font-medium">
                Saya siap menerima tantangan ini dan berjanji akan bersungguh-sungguh.
              </Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate("/dashboard")}>
              Batal
            </Button>
            <Button
              size="lg"
              className="flex-1 font-bold text-lg"
              disabled={!prepAgreed || (alreadyPlayed && !loading)}
              onClick={handleStartGame}
            >
              {alreadyPlayed ? "Sudah Dikerjakan" : "Mulai Petualangan"}
            </Button>
          </div>
          {alreadyPlayed && (
            <p className="text-center text-red-500 text-sm mt-4 font-medium bg-red-500/10 py-2 rounded-lg">
              Anda sudah menyelesaikan cerita ini.
            </p>
          )}
        </div>
      </div>
    );
  }

  // RESULT VIEW
  if (gameState === "RESULT") {
    const isGoodEnding = currentScore > 50; // Simple threshold

    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: isGoodEnding ? "linear-gradient(to bottom, #10b981, #059669)" : "linear-gradient(to bottom, #f59e0b, #d97706)",
          }}
        />

        <div className="relative z-10 bg-card/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-border/50 text-center animate-scale-in">
          <div className="mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg ${isGoodEnding ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
              {isGoodEnding ? <CheckCircle className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">Misi Selesai!</h2>
            <p className="text-muted-foreground">{story.title}</p>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 mb-8 border border-border/50">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Skor</div>
            <div className={`text-5xl font-bold mb-4 ${isGoodEnding ? "text-green-600" : "text-orange-600"}`}>
              {currentScore}
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${isGoodEnding ? "bg-green-500" : "bg-orange-500"} transition-all duration-1000`}
                style={{ width: `${Math.max(0, Math.min(100, (currentScore / story.scenes.length) * 10 * 1.5))}%` }} // Approximate visual
              />
            </div>
          </div>

          <div className="mb-8 text-left bg-primary/5 p-5 rounded-xl border border-primary/10">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-xl">💡</span> Saran {story.mascotName}
            </h4>
            <p className="text-sm leading-relaxed text-foreground/80">
              {isGoodEnding
                ? "Luar biasa! Kamu telah menunjukkan kepedulian yang besar terhadap lingkungan. Pertahankan semangat ini dan ajak teman-temanmu untuk lebih peduli juga!"
                : "Kamu telah menyelesaikan misi, namun masih ada ruang untuk perbaikan. Ingatlah bahwa setiap tindakan kecil berdampak besar bagi bumi. Coba lebih bijak lagi di kesempatan berikutnya!"
              }
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={() => navigate("/dashboard")}>
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/leaderboard")}>
              Lihat Leaderboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING VIEW
  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col transition-colors duration-1000"
      style={{ background: currentScene?.background || "#1a1a1a" }}
    >
      {/* Header UI */}
      <header className="relative z-10 flex items-center justify-between p-4 lg:p-6">
        <Button variant="glass" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="glass-effect px-4 py-1.5 rounded-full flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Skor</span>
          <span className="text-lg font-bold text-primary">{currentScore}</span>
        </div>

        <Button variant="glass" size="icon" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </header>

      {/* FEEDBACK MODAL OVERLAY */}
      {showFeedback && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
          <div className={`bg-card w-full max-w-md p-6 rounded-3xl shadow-2xl border-2 transform transition-all scale-100 ${feedbackType === 'positive' ? 'border-green-500' : 'border-orange-500'}`}>
            <div className="text-center mb-6">
              <div className={`text-4xl mb-3 animate-bounce`}>
                {feedbackType === 'positive' ? '🌟' : '⚠️'}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${feedbackType === 'positive' ? 'text-green-600' : 'text-orange-600'}`}>
                {feedbackType === 'positive' ? 'Pilihan Tepat!' : 'Kurang Tepat'}
              </h3>
              {/* Score Popup Animation could go here */}
              <div className={`font-bold text-lg ${feedbackType === 'positive' ? 'text-green-600' : 'text-red-500'}`}>
                {feedbackType === 'positive' ? '+' : ''}{
                  // Find the choice that was clicked? Or just diff?
                  // Simplified: show static or logic here.
                  // For now just showing feedback text.
                }
              </div>
              <p className="text-foreground/80">{showFeedback}</p>
            </div>
            <Button className="w-full" size="lg" onClick={goToNextScene}>
              Lanjut
            </Button>
          </div>
        </div>
      )}

      {/* MAIN GAME AREA */}
      <div className="flex-1 relative flex flex-col justify-end pb-0">

        {/* Mascot / Characters */}
        <div className="absolute bottom-24 lg:bottom-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between px-4 pointer-events-none">
          {/* Lesta Mascot (Left or Right) */}
          <div className="w-40 h-64 lg:w-56 lg:h-72 relative animate-float transition-all duration-500" style={{ order: 2 }}>
            {/* Placeholder for Lesta Image */}
            <div className="w-full h-full bg-contain bg-no-repeat bg-center drop-shadow-2xl"
              style={{ backgroundImage: "url('/lesta-mascot.png')" }}>
              {/* Fallback Emoji if no image */}
              <div className="flex items-center justify-center w-full h-full text-9xl">
                🦉
              </div>
            </div>
          </div>
        </div>

        {/* DIALOGUE & INTERACTION AREA */}
        <div className="relative z-20 bg-background/95 backdrop-blur-xl border-t border-border/50 min-h-[35vh] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.3)] rounded-t-[2rem]">

          {/* Progress Bar */}
          <div className="w-full bg-muted/30 h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${((currentSceneIndex + 1) / story.scenes.length) * 100}%` }}
            />
          </div>

          <div className="flex-1 p-6 lg:p-10 max-w-4xl mx-auto w-full flex flex-col">

            {/* NARRATIVE MODE */}
            {currentScene?.type === "NARRATIVE" && currentScene.dialogues && (
              <div className="flex-1 flex flex-col justify-between" onClick={handleNextDialogue}>
                <div>
                  <h3 className="text-primary font-bold text-lg mb-2 flex items-center gap-2">
                    {currentScene.dialogues[currentDialogueIndex].character}
                  </h3>
                  <p className="text-xl lg:text-2xl leading-relaxed text-foreground">
                    {displayedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>

                {!isTyping && (
                  <div className="mt-8 flex justify-end animate-pulse text-muted-foreground text-sm flex items-center gap-2">
                    Ketuk untuk lanjut <Play className="w-3 h-3 ml-1 fill-current" />
                  </div>
                )}
              </div>
            )}

            {/* CHOICE MODE */}
            {currentScene?.type === "CHOICE" && !showFeedback && (
              <div className="flex-1 flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold mb-3 border border-amber-500/20">
                    PELUANG POIN
                  </span>
                  <h3 className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed">
                    {currentScene.question}
                  </h3>
                </div>

                <div className="grid gap-4 mt-auto">
                  {currentScene.choices?.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left p-4 lg:p-5 rounded-xl border-2 border-border hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-200 group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center font-bold transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-lg font-medium">{choice.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;

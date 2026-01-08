import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set default volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 50% volume
    }
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, audioRef }}>
      {/* Global Audio Element */}
      <audio
        ref={audioRef}
        src="/limbo3.mp3"
        loop
        preload="metadata"
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

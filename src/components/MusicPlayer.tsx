import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusic } from '@/contexts/MusicContext';

export function MusicPlayer() {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Play/Pause Button */}
      <Button
        onClick={togglePlay}
        size="icon"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white fill-white" />
        ) : (
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        )}
      </Button>
    </div>
  );
}

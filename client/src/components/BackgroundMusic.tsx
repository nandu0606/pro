import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicProps {
  audioSrc: string;
  autoPlay?: boolean;
  loop?: boolean;
  initialVolume?: number;
  category?: string;
}

const BackgroundMusic = ({ 
  audioSrc, 
  autoPlay = false, 
  loop = true, 
  initialVolume = 0.3,
  category = "ambient"
}: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element on mount
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = loop;
    audio.volume = initialVolume;
    audioRef.current = audio;

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, loop, initialVolume]);

  // Control playback
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Control volume and mute
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      <button
        className="relative w-10 h-10 rounded-full bg-cosmic-blue shadow-glow border border-gold flex items-center justify-center group"
        onClick={() => setShowControls(prev => !prev)}
        title="Background Music Controls"
      >
        <Music className="w-5 h-5 text-gold" />
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse"></div>
        )}
      </button>

      {/* Controls panel */}
      {showControls && (
        <div className="absolute bottom-12 right-0 p-3 rounded-lg bg-cosmic-blue-deep border border-gold/30 w-48 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gold text-sm">{category} Music</span>
            <button
              onClick={toggleMute}
              className="text-gold hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
          
          <div className="flex items-center mb-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 rounded-full appearance-none bg-cosmic-black cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${volume * 100}%, #1E293B ${volume * 100}%, #1E293B 100%)`
              }}
            />
          </div>
          
          <button
            onClick={togglePlay}
            className={`w-full py-1 px-2 rounded-sm text-sm text-center transition-colors ${
              isPlaying 
                ? 'bg-cosmic-blue text-gold' 
                : 'bg-gold text-cosmic-blue-deep hover:bg-gold/80'
            }`}
          >
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
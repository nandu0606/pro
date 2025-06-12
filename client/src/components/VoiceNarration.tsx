import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume, VolumeX } from 'lucide-react';

interface VoiceNarrationProps {
  audioSrc: string;
  storyTitle: string;
  narrator?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

const VoiceNarration = ({
  audioSrc,
  storyTitle,
  narrator = "Divine Narrator",
  autoPlay = false,
  onComplete
}: VoiceNarrationProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    // Setup event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) onComplete();
    });
    
    // Set initial volume
    audio.volume = volume;
    
    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioSrc, onComplete]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleSkipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };
  
  const handleSkipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };
  
  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="bg-cosmic-blue rounded-lg shadow-md p-4 border border-gold/30">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-gold font-semibold">{storyTitle}</h3>
          <p className="text-white/60 text-sm">Narrated by: {narrator}</p>
        </div>
        
        <div className="relative">
          <button
            className="text-gold hover:text-white transition-colors p-1"
            onClick={() => setIsVolumeSliderVisible(!isVolumeSliderVisible)}
            onBlur={() => setTimeout(() => setIsVolumeSliderVisible(false), 200)}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume size={18} />}
          </button>
          
          {isVolumeSliderVisible && (
            <div className="absolute right-0 bottom-8 bg-cosmic-blue-deep p-2 rounded-md border border-gold/20 w-32">
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
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <div 
        ref={progressBarRef}
        className="h-2 bg-cosmic-black rounded-full overflow-hidden cursor-pointer mb-2"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-gradient-to-r from-gold/70 to-gold"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-white/60 text-xs mb-3">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          className="text-gold hover:text-white transition-colors"
          onClick={handleSkipBackward}
        >
          <SkipBack size={20} />
        </button>
        
        <button
          className="w-12 h-12 rounded-full bg-gold text-cosmic-blue-deep flex items-center justify-center hover:bg-gold/80 transition-colors"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        
        <button
          className="text-gold hover:text-white transition-colors"
          onClick={handleSkipForward}
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default VoiceNarration;
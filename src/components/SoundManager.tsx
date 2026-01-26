'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SoundManagerProps {
  isPlaying: boolean;
  isPaused?: boolean; // New prop to pause background music
}

const SoundManager: React.FC<SoundManagerProps> = ({ isPlaying, isPaused = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.src = 'https://cdn.pixabay.com/audio/2022/10/25/audio_946bc8d1d6.mp3'; // Indian wedding music
    audio.loop = true;
    audio.volume = 0.4;
    audio.crossOrigin = 'anonymous';
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.log('Audio load error, trying fallback:', e);
      // Try fallback audio
      audio.src = 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3';
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && !isMuted && isLoaded && !isPaused) {
      audioRef.current.play().catch((e) => {
        console.log('Audio play failed:', e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isMuted, isLoaded, isPaused]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 safe-area-bottom">
      {/* Desktop: just volume button centered */}
      <button
        onClick={toggleMute}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border-2 border-[#d4af37]/40 shadow-lg md:block hidden"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
      {/* Mobile: volume button positioned above navigation controls */}
      <button
        onClick={toggleMute}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center active:scale-95 transition-transform border-2 border-[#d4af37]/40 shadow-lg md:hidden absolute -top-14 left-1/2 -translate-x-1/2"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SoundManager;

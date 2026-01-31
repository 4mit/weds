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
    audio.src = '/mario.mp3'; // Background music
    audio.loop = true;
    audio.volume = 0.4;
    audio.crossOrigin = 'anonymous';
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.log('Audio load error, trying fallback:', e);
      // Try fallback audio
      audio.src = '/mario.mp3'; // Background music fallback
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

  // Volume button removed - no UI, just manages audio
  return null;
};

export default SoundManager;

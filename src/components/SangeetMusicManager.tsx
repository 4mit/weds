'use client';

import React, { useEffect, useRef } from 'react';

interface SangeetMusicManagerProps {
  progress: number; // Pass progress directly for more accurate detection
}

// Sangeet section boundaries
// Sangeet is at position 0.38 (38% of world width)
// Start slightly before (0.33) and end slightly after (0.43) for smooth transitions
const SANGEET_START = 0.33;
const SANGEET_END = 0.43;

const SangeetMusicManager: React.FC<SangeetMusicManagerProps> = ({ 
  progress
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const previousInSectionRef = useRef(false);
  const progressRef = useRef(progress);
  const audioLoadedRef = useRef(false);
  
  // Update progress ref whenever it changes
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  
  // Calculate if we're in sangeet section based on progress
  const isInSangeetSection = progress >= SANGEET_START && progress <= SANGEET_END;

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    // Create audio element for dance_floor.mp3
    const audio = new Audio();
    
    // Set properties before setting src
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = 'auto';
    
    // Handle successful load
    const handleCanPlay = () => {
      audioLoadedRef.current = true;
    };
    
    // Handle load errors - only log actual errors
    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      // Wait a bit to check if it's a real error or just initial loading
      setTimeout(() => {
        if (audioEl.error) {
          const errorCode = audioEl.error.code;
          // Only log if there's a real error code (1-4 are actual error codes)
          // Code 0 or undefined/null means no error
          const hasRealError = errorCode !== undefined && 
                              errorCode !== null && 
                              errorCode !== 0 &&
                              (errorCode >= 1 && errorCode <= 4);
          
          // Also check if networkState indicates a real problem
          const networkError = audioEl.networkState === 3; // NETWORK_NO_SOURCE
          
          if (hasRealError || (networkError && !audioLoadedRef.current)) {
            console.error('Failed to load dance_floor.mp3:', {
              code: errorCode,
              message: audioEl.error.message || 'Unknown error',
              networkState: audioEl.networkState,
            });
          }
        }
      }, 100); // Small delay to allow audio to start loading
    };
    
    // Handle when audio data is loaded
    const handleLoadedData = () => {
      audioLoadedRef.current = true;
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    
    // Set src and load - use absolute path from public folder
    audio.src = '/dance_floor.mp3';
    
    // Load the audio (this will trigger the load process)
    // Note: load() is synchronous and doesn't return a promise
    try {
      audio.load();
    } catch (err) {
      // Only log if it's a real error
      if (err instanceof Error) {
        console.error('Error calling audio.load():', err);
      }
    }

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
        audioRef.current.load();
        isPlayingRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    // Immediate check - if we're not in section, stop immediately
    if (!isInSangeetSection && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
      isPlayingRef.current = false;
    }

    // Only act if the state actually changed
    if (isInSangeetSection === previousInSectionRef.current) return;
    
    previousInSectionRef.current = isInSangeetSection;

    if (isInSangeetSection) {
      // Entering sangeet section - stop any other audio elements first
      // Stop all audio elements on the page (except this one)
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach((audioEl) => {
        if (audioEl !== audioRef.current) {
          audioEl.pause();
          audioEl.currentTime = 0;
        }
      });
      
      // Play dance floor music - only if audio is loaded
      if (!isPlayingRef.current && audioLoadedRef.current) {
        audioRef.current.currentTime = 0; // Start from beginning
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              isPlayingRef.current = true;
            })
            .catch((e) => {
              // Only log if it's not a user interaction error
              if (e.name !== 'NotAllowedError') {
                console.error('Failed to play dance_floor.mp3:', e);
              }
              isPlayingRef.current = false;
            });
        } else {
          isPlayingRef.current = true;
        }
      } else if (!audioLoadedRef.current) {
        // Wait for audio to load before playing
        const checkLoaded = setInterval(() => {
          if (audioLoadedRef.current && audioRef.current && !isPlayingRef.current) {
            clearInterval(checkLoaded);
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
              isPlayingRef.current = false;
            });
            isPlayingRef.current = true;
          }
        }, 100);
        
        // Cleanup interval after 5 seconds
        setTimeout(() => clearInterval(checkLoaded), 5000);
      }
    } else {
      // Leaving sangeet section - stop dance floor music immediately and aggressively
      const audio = audioRef.current;
      if (audio) {
        // Force stop the audio - multiple methods to ensure it stops
        try {
          // Method 1: Set volume to 0 FIRST to ensure immediate silence
          audio.volume = 0;
          
          // Method 2: Standard pause
          audio.pause();
          audio.currentTime = 0;
          
          // Method 3: Pause again to be absolutely sure
          audio.pause();
          
          // Keep volume at 0 - don't restore it
          // The monitoring loop will handle volume when we re-enter sangeet
          isPlayingRef.current = false;
        } catch (e) {
          console.error('Error stopping audio:', e);
          isPlayingRef.current = false;
          // Even on error, try to mute it
          try {
            if (audioRef.current) {
              audioRef.current.volume = 0;
              audioRef.current.pause();
            }
          } catch (e2) {
            console.error('Error in fallback stop:', e2);
          }
        }
      }
    }
  }, [isInSangeetSection]);

  // Continuous monitoring effect - ensures audio stops if we're not in sangeet section
  // This checks the progress directly, not relying on isActive prop
  useEffect(() => {
    if (!audioRef.current) return;

    const checkInterval = setInterval(() => {
      if (audioRef.current) {
        // Use the ref to get the latest progress value (not stale closure)
        const currentProgress = progressRef.current;
        // Recalculate if we're in sangeet section based on current progress
        const currentlyInSection = currentProgress >= SANGEET_START && currentProgress <= SANGEET_END;
        
        // If we're not in section but audio is playing, force stop it IMMEDIATELY
        if (!currentlyInSection) {
          // Always ensure it's stopped when not in section - be very aggressive
          const audio = audioRef.current;
          if (audio) {
            // Stop regardless of current state
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0; // Keep volume at 0 when not in section - NEVER restore until we're back in sangeet
            isPlayingRef.current = false;
            
            // Double-check: if somehow still playing, force stop again
            if (!audio.paused) {
              audio.pause();
            }
          }
        }
        // If we're in section but audio is not playing, start it
        else if (currentlyInSection) {
          if (audioRef.current.paused && !isPlayingRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch((e) => {
              console.error('Failed to play dance_floor.mp3:', e);
              isPlayingRef.current = false;
            });
            isPlayingRef.current = true;
          }
          // Also ensure volume is correct if playing
          if (!audioRef.current.paused && audioRef.current.volume !== 0.6) {
            audioRef.current.volume = 0.6;
          }
        }
      }
    }, 50); // Check every 50ms for very quick response

    return () => {
      clearInterval(checkInterval);
    };
  }, [progress]);

  return null; // This component doesn't render anything
};

export default SangeetMusicManager;

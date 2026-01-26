'use client';

import React, { useEffect, useRef } from 'react';

interface BaratMusicManagerProps {
  progress: number; // Pass progress directly for more accurate detection
}

// Barat section boundaries
// Barat is at position 0.58 (58% of world width)
// Start later when section is closer (0.56) and end slightly after (0.63) for smooth transitions
const BARAT_START = 0.56;
const BARAT_END = 0.63;

const BaratMusicManager: React.FC<BaratMusicManagerProps> = ({ 
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
  
  // Calculate if we're in barat section based on progress
  const isInBaratSection = progress >= BARAT_START && progress <= BARAT_END;

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    // Create audio element for bouncebillo.mp3
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
            console.error('Failed to load bouncebillo.mp3:', {
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
    audio.src = '/bouncebillo.mp3';
    
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
    if (!isInBaratSection && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
      isPlayingRef.current = false;
    }

    // Only act if the state actually changed
    if (isInBaratSection === previousInSectionRef.current) return;
    
    previousInSectionRef.current = isInBaratSection;

    if (isInBaratSection) {
      // Entering barat section - stop any other audio elements first
      // Stop ALL audio elements on the page aggressively (except this one)
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach((audioEl) => {
        if (audioEl !== audioRef.current) {
          // Aggressively stop all other audio
          audioEl.volume = 0;
          audioEl.pause();
          audioEl.currentTime = 0;
          // Try to stop it multiple times to ensure it stops
          setTimeout(() => {
            audioEl.pause();
            audioEl.volume = 0;
          }, 10);
        }
      });
      
      // Also stop any audio from SoundManager, SangeetMusicManager, or WeddingMusicManager
      const allSources = document.querySelectorAll('source');
      allSources.forEach((source) => {
        const parent = source.parentElement;
        if (parent instanceof HTMLAudioElement && parent !== audioRef.current) {
          parent.volume = 0;
          parent.pause();
          parent.currentTime = 0;
        }
      });
      
      // Play bouncebillo music - only if audio is loaded
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
                console.error('Failed to play bouncebillo.mp3:', e);
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
      // Leaving barat section - stop bouncebillo music immediately and aggressively
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
          // The monitoring loop will handle volume when we re-enter barat
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
  }, [isInBaratSection]);

  // Continuous monitoring effect - ensures audio stops if we're not in barat section
  // This checks the progress directly, not relying on isActive prop
  useEffect(() => {
    if (!audioRef.current) return;

    const checkInterval = setInterval(() => {
      if (audioRef.current) {
        // Use the ref to get the latest progress value (not stale closure)
        const currentProgress = progressRef.current;
        // Recalculate if we're in barat section based on current progress
        const currentlyInSection = currentProgress >= BARAT_START && currentProgress <= BARAT_END;
        
        // If we're not in section but audio is playing, force stop it IMMEDIATELY
        if (!currentlyInSection) {
          // Always ensure it's stopped when not in section - be very aggressive
          const audio = audioRef.current;
          if (audio) {
            // Stop regardless of current state
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0; // Keep volume at 0 when not in section - NEVER restore until we're back in barat
            isPlayingRef.current = false;
            
            // Double-check: if somehow still playing, force stop again
            if (!audio.paused) {
              audio.pause();
            }
          }
        }
        // If we're in section but audio is not playing, start it
        else if (currentlyInSection) {
          // First, stop all other audio before starting barat music
          const allAudioElements = document.querySelectorAll('audio');
          allAudioElements.forEach((audioEl) => {
            if (audioEl !== audioRef.current) {
              audioEl.volume = 0;
              audioEl.pause();
              audioEl.currentTime = 0;
            }
          });
          
          if (audioRef.current.paused && !isPlayingRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch((e) => {
              console.error('Failed to play bouncebillo.mp3:', e);
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

export default BaratMusicManager;

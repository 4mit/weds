'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ParallaxEngineProps {
  children: React.ReactNode;
  worldWidth: number;
  onProgress: (progress: number) => void;
  onPositionChange: (position: number) => void;
  onDirectionChange?: (direction: 'left' | 'right' | 'idle') => void;
}

const ParallaxEngine: React.FC<ParallaxEngineProps> = ({
  children,
  worldWidth,
  onProgress,
  onPositionChange,
  onDirectionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const targetPositionRef = useRef(0);
  const isMovingRef = useRef<'left' | 'right' | null>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number } | null>(null);

  const [isMobile, setIsMobile] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);

  // Speed configuration
  const SPEED = isMobile ? 16 : 45; // pixels per frame
  const EASE = 1; // smoothing factor (0-1, lower = smoother)

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const landscape = window.innerHeight < 500 && window.innerWidth > window.innerHeight;
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const getMaxScroll = useCallback(() => {
    return Math.max(0, worldWidth - window.innerWidth);
  }, [worldWidth]);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      const maxScroll = getMaxScroll();
      
      // Update target position based on movement direction
      if (isMovingRef.current === 'right') {
        targetPositionRef.current = Math.min(targetPositionRef.current + SPEED, maxScroll);
      } else if (isMovingRef.current === 'left') {
        targetPositionRef.current = Math.max(targetPositionRef.current - SPEED, 0);
      }

      // Smooth interpolation towards target
      const diff = targetPositionRef.current - scrollPositionRef.current;
      
      if (Math.abs(diff) > 0.5) {
        scrollPositionRef.current += diff * EASE;
        
        // Clamp position
        scrollPositionRef.current = Math.max(0, Math.min(scrollPositionRef.current, maxScroll));
        
        // Update DOM
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${-scrollPositionRef.current}px, 0, 0)`;
        }
        
        // Update progress
        const progress = maxScroll > 0 ? scrollPositionRef.current / maxScroll : 0;
        onProgress(progress);
        onPositionChange(scrollPositionRef.current);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [getMaxScroll, onProgress, onPositionChange, SPEED, EASE]);

  // Start/stop movement
  const startMoving = useCallback((direction: 'left' | 'right') => {
    isMovingRef.current = direction;
    onDirectionChange?.(direction);
  }, [onDirectionChange]);

  const stopMoving = useCallback(() => {
    isMovingRef.current = null;
    onDirectionChange?.('idle');
  }, [onDirectionChange]);

  // Keyboard controls
  useEffect(() => {
    const keysDown = new Set<string>();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        if (!keysDown.has('right')) {
          keysDown.add('right');
          startMoving('right');
        }
      } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        if (!keysDown.has('left')) {
          keysDown.add('left');
          startMoving('left');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'arrowright' || key === 'd') {
        keysDown.delete('right');
        if (keysDown.has('left')) {
          startMoving('left');
        } else {
          stopMoving();
        }
      } else if (key === 'arrowleft' || key === 'a') {
        keysDown.delete('left');
        if (keysDown.has('right')) {
          startMoving('right');
        } else {
          stopMoving();
        }
      }
    };

    const handleBlur = () => {
      keysDown.clear();
      stopMoving();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [startMoving, stopMoving]);

  // Touch/swipe controls
  useEffect(() => {
    let lastX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      touchStartRef.current = { x: e.touches[0].clientX };
      lastX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      if ((e.target as HTMLElement).closest('button')) return;
      e.preventDefault();

      const currentX = e.touches[0].clientX;
      const deltaX = lastX - currentX;
      lastX = currentX;

      // Direct position update for swipe
      targetPositionRef.current = Math.max(0, Math.min(
        targetPositionRef.current + deltaX,
        getMaxScroll()
      ));

      if (Math.abs(deltaX) > 1) {
        onDirectionChange?.(deltaX > 0 ? 'right' : 'left');
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      onDirectionChange?.('idle');
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [getMaxScroll, onDirectionChange]);

  // Mouse wheel
  useEffect(() => {
    let wheelTimeout: number | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = (e.deltaY || e.deltaX) * 0.5;
      
      targetPositionRef.current = Math.max(0, Math.min(
        targetPositionRef.current + delta,
        getMaxScroll()
      ));

      if (Math.abs(delta) > 2) {
        onDirectionChange?.(delta > 0 ? 'right' : 'left');
        
        // Clear existing timeout
        if (wheelTimeout) {
          clearTimeout(wheelTimeout);
        }
        
        // Set to idle only after scrolling stops (300ms of no wheel events)
        wheelTimeout = window.setTimeout(() => {
          onDirectionChange?.('idle');
          wheelTimeout = null;
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [getMaxScroll, onDirectionChange]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Parallax world container */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full"
        style={{ 
          width: worldWidth,
          willChange: 'transform',
        }}
      >
        {children}
      </div>

      {/* Mobile controls */}
      {isMobile && (
        <div className={`fixed left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-6 z-50 safe-area-bottom ${isLandscape ? 'bottom-2' : 'bottom-4 sm:bottom-6'}`}>
          <button
            className="!mr-[1rem] mobile-btn w-14 h-14 sm:w-16 sm:h-16 rounded-full glass flex items-center justify-center active:scale-90 active:bg-[#d4af37]/20 transition-all shadow-lg border-2 border-[#d4af37]/40"
            onTouchStart={(e) => { e.stopPropagation(); startMoving('left'); }}
            onTouchEnd={(e) => { e.stopPropagation(); stopMoving(); }}
            onTouchCancel={(e) => { e.stopPropagation(); stopMoving(); }}
            onMouseDown={() => startMoving('left')}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            aria-label="Move left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="!ml-[2rem] mobile-btn w-14 h-14 sm:w-16 sm:h-16 rounded-full glass flex items-center justify-center active:scale-90 active:bg-[#d4af37]/20 transition-all shadow-lg border-2 border-[#d4af37]/40"
            onTouchStart={(e) => { e.stopPropagation(); startMoving('right'); }}
            onTouchEnd={(e) => { e.stopPropagation(); stopMoving(); }}
            onTouchCancel={(e) => { e.stopPropagation(); stopMoving(); }}
            onMouseDown={() => startMoving('right')}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            aria-label="Move right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ParallaxEngine;

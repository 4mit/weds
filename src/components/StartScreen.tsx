'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvitationBook from './InvitationBook';

interface StartScreenProps {
  onStart: () => void;
}

// Generate deterministic random values using seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default mobile-first
  const [showInvitation, setShowInvitation] = useState(false);

  // Generate stars with deterministic values - fewer on mobile
  const stars = React.useMemo(() => 
    Array.from({ length: isMobile ? 30 : 50 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1.1) * 100,
      y: seededRandom(i * 2.2) * 60,
      size: seededRandom(i * 3.3) * 2 + 1,
      delay: seededRandom(i * 4.4) * 3,
    })), [isMobile]
  );

  // Generate hearts with deterministic values - fewer on mobile
  const hearts = React.useMemo(() =>
    Array.from({ length: isMobile ? 5 : 8 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 5.5 + 100) * 100,
      size: seededRandom(i * 6.6 + 100) * (isMobile ? 15 : 20) + (isMobile ? 10 : 15),
      delay: seededRandom(i * 7.7 + 100) * 5,
    })), [isMobile]
  );

  useEffect(() => {
    // Use requestAnimationFrame to defer state updates
    const frame = requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 768);
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Twinkling stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              '--delay': `${star.delay}s`,
              '--duration': `${2 + star.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400 opacity-20"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
            }}
            initial={{ y: '100vh', rotate: 0 }}
            animate={{ y: '-100vh', rotate: 360 }}
            transition={{
              duration: 15 + heart.delay,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            }}
          >
            ❤
          </motion.div>
        ))}

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37] opacity-30">
            <path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" fill="currentColor" />
            <circle cx="15" cy="15" r="8" fill="#ff6b35" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 transform scale-x-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37] opacity-30">
            <path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" fill="currentColor" />
            <circle cx="15" cy="15" r="8" fill="#ff6b35" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 transform scale-y-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37] opacity-30">
            <path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" fill="currentColor" />
            <circle cx="15" cy="15" r="8" fill="#ff6b35" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 transform scale-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37] opacity-30">
            <path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" fill="currentColor" />
            <circle cx="15" cy="15" r="8" fill="#ff6b35" opacity="0.5" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 safe-area-top safe-area-bottom">
          {/* Decorative mandala behind title - smaller on mobile */}
          <motion.div
            className="absolute opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <svg width={isMobile ? 250 : 400} height={isMobile ? 250 : 400} viewBox="0 0 400 400">
              {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * (isMobile ? 45 : 30)} 200 200)`}>
                  <ellipse cx="200" cy="80" rx="30" ry="60" fill="#d4af37" />
                  <ellipse cx="200" cy="100" rx="20" ry="40" fill="#ff6b35" />
                </g>
              ))}
              <circle cx="200" cy="200" r="60" fill="#800020" />
              <circle cx="200" cy="200" r="40" fill="#d4af37" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#ff6b35] mb-2 sm:mb-3 md:mb-4"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              Welcome to
            </h2>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2 sm:mb-3 md:mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Soni Family
            </h1>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#d4af37]"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              Wedding Journey
            </h2>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-12 sm:w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-xl sm:text-2xl md:text-3xl">💒</span>
            <div className="w-12 sm:w-16 md:w-24 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[#f4e4bc] text-center max-w-xs sm:max-w-sm md:max-w-md mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg px-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Join us on an interactive journey through our wedding celebrations.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Experience the joy of Mehendi, Sangeet, Haldi & the Wedding!
          </motion.p>

          {/* Start button - larger touch target on mobile */}
          <motion.button
            onClick={() => setShowInvitation(true)}
            className="relative group mobile-btn"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Button glow */}
            <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-40 group-hover:opacity-60 group-active:opacity-70 transition-opacity" />
            
            {/* Button */}
            <div className="relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#800020] via-[#a00030] to-[#800020] rounded-full border-2 border-[#d4af37] shadow-lg active:shadow-md transition-shadow">
              <div
                className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl text-[#d4af37] font-semibold p-[1rem]"
                style={{ fontFamily: 'Playfair Display, serif' , padding: '0.4rem'}}
              >
                <span>Begin Journey</span>
                {/* Animated arrow */}
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="arrow-bounce"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </div>
            </div>
          </motion.button>

          {/* Show Invitation Book */}
          <AnimatePresence>
            {showInvitation && (
              <InvitationBook onProceed={onStart} />
            )}
          </AnimatePresence>

          {/* Instructions */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-4 safe-area-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-[#f4e4bc] opacity-60 text-[10px] sm:text-xs md:text-sm">
              <span className="hidden md:inline">Use Arrow Keys or Scroll to navigate</span>
              <span className="md:hidden">Swipe or tap buttons to navigate</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StartScreen;


'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Garland } from './WeddingScenes';

interface ThankYouSectionProps {
  x: number;
  isMobile: boolean;
  isActive: boolean;
}

const ThankYouSection: React.FC<ThankYouSectionProps> = ({ x, isMobile, isActive }) => {
  return (
    <>
      {/* Decorative background elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ 
          left: x,
          width: isMobile ? 1200 : 2400,
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Thank You Banner */}
      <motion.div
        className="absolute top-[15%] sm:top-[20%] md:top-[25%] z-30"
        style={{ left: x + (isMobile ? 100 : 200) }}
        initial={false}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.3, scale: 0.9, y: 20 }}
        transition={{ duration: 0.8, delay: isActive ? 0.3 : 0 }}
      >
        <div className="relative">
          {/* Decorative frame */}
          <svg width={isMobile ? 400 : 800} height={isMobile ? 300 : 600} viewBox="0 0 800 600">
            <defs>
              <linearGradient id="thankYouGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B6914" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
              <radialGradient id="thankYouGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Glow effect */}
            <ellipse cx="400" cy="300" rx="350" ry="250" fill="url(#thankYouGlow)" />
            
            {/* Decorative border */}
            <rect x="50" y="50" width="700" height="500" fill="none" stroke="url(#thankYouGold)" strokeWidth="8" rx="20" />
            <rect x="70" y="70" width="660" height="460" fill="none" stroke="#d4af37" strokeWidth="3" rx="15" />
            
            {/* Corner decorations */}
            <circle cx="100" cy="100" r="15" fill="#d4af37" />
            <circle cx="700" cy="100" r="15" fill="#d4af37" />
            <circle cx="100" cy="500" r="15" fill="#d4af37" />
            <circle cx="700" cy="500" r="15" fill="#d4af37" />
            
            {/* Floral decorations */}
            {[150, 250, 350, 450, 550, 650].map((xPos, i) => (
              <g key={i} transform={`translate(${xPos}, ${i % 2 === 0 ? 80 : 520})`}>
                <circle r="8" fill="#ff6b35" />
                <circle r="5" fill="#ffd700" />
                <circle r="2" fill="#fff" />
              </g>
            ))}
          </svg>
          
          {/* Thank You Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#d4af37] text-center font-bold mb-4 sm:mb-6 md:mb-8"
              style={{ fontFamily: 'Dancing Script, cursive', textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Thank You
            </motion.h1>
            <motion.p
              className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#f4e4bc] text-center mb-3 sm:mb-4 md:mb-6"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              For Being Part of Our Special Day
            </motion.p>
            <motion.p
              className="text-xs sm:text-base md:text-xl lg:text-2xl text-[#ffd700] text-center"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              ❤️ Your presence made it perfect ❤️
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements around Thank You */}
      {/* Floating hearts */}
      {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl sm:text-3xl md:text-4xl"
          style={{
            left: x + (i % 5) * (isMobile ? 200 : 400),
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: isActive ? [0.6, 1, 0.6] : [0.2, 0.3, 0.2],
            scale: isActive ? [1, 1.2, 1] : [0.8, 0.9, 0.8],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: x + (i * 3) % (isMobile ? 1000 : 2000),
            top: `${10 + (i * 7) % 80}%`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            background: ['#d4af37', '#ff6b35', '#ffd700', '#fff'][i % 4],
            boxShadow: `0 0 ${4 + (i % 3) * 2}px ${['#d4af37', '#ff6b35', '#ffd700', '#fff'][i % 4]}`,
          }}
          animate={{
            opacity: isActive ? [0, 1, 0] : [0, 0.3, 0],
            scale: isActive ? [0, 1.5, 0] : [0, 0.8, 0],
          }}
          transition={{
            duration: 1.5 + (i % 3) * 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Garland decoration */}
      <Garland 
        x={x + (isMobile ? 50 : 100)} 
        y={isMobile ? 30 : 40} 
        width={isMobile ? 1000 : 2000} 
      />
    </>
  );
};

export default ThankYouSection;

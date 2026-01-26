'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownScreenProps {
  onComplete: () => void;
  weddingDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Couples data - defined outside component
const couples = [
  { groom: 'Amit', bride: 'Ranjana' },
  { groom: 'Laxminarayan', bride: 'Pratima' }
];

const CountdownScreen: React.FC<CountdownScreenProps> = ({ onComplete, weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [currentCoupleIndex, setCurrentCoupleIndex] = useState(0);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const target = weddingDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, [weddingDate]);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Auto-transition between couples
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentCoupleIndex((prev) => (prev + 1) % couples.length);
    }, 3000); // Change couple every 3 seconds

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Orange/Yellow gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 25%, #ffb347 50%, #ffa500 75%, #ff8c00 100%)'
        }}
      />
      
      {/* Sunburst rays */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-top-left"
            style={{
              width: '200%',
              height: '200%',
              transform: `rotate(${i * 15}deg)`,
              background: i % 2 === 0 
                ? 'linear-gradient(to top, rgba(255, 180, 0, 0.4) 0%, transparent 60%)'
                : 'linear-gradient(to top, rgba(255, 140, 0, 0.25) 0%, transparent 60%)'
            }}
          />
        ))}
      </div>

      {/* Halftone dots overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 200, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${10 + (i * 7) % 80}vw`, 
              y: '110vh',
              opacity: 0.8
            }}
            animate={{ 
              y: '-10vh',
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 12 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear'
            }}
            style={{ fontSize: `${1.5 + (i % 3) * 0.5}rem` }}
          >
            {['💕', '💖', '💗', '💝', '❤️'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">
        {/* Couple names with transition - Fancy Highlighted */}
        <div 
          className="mb-4 sm:mb-6 w-full flex justify-center" 
          style={{ 
            minHeight: 'clamp(60px, 10vw, 90px)',
            position: 'relative',
            padding: '0 1rem'
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentCoupleIndex}
              className="flex items-center justify-center flex-wrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              {/* Groom name - fancy highlighted */}
              <motion.span 
                style={{ 
                  whiteSpace: 'nowrap',
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(2.5rem, 1.5rem, 4.5rem)',
                  fontWeight: 800,
                  color: '#ff6b35',
                  textShadow: `
                    2px 2px 0px rgba(0, 0, 0, 0.8),
                    0 0 20px rgba(22, 12, 8, 0.9),
                    0 0 30px rgba(15, 13, 2, 0.7),
                    0 0 40px rgba(27, 26, 25, 0.5),
                    -1px -1px 0px rgba(255, 255, 255, 0.3)
                  `,
                  filter: 'drop-shadow(3px 3px 6px rgba(29, 4, 4, 0.5))',
                  position: 'relative',
                }}
                animate={{
                  textShadow: [
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 107, 53, 0.9), 0 0 30px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 140, 0, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 107, 53, 1), 0 0 40px rgba(255, 215, 0, 0.9), 0 0 50px rgba(255, 140, 0, 0.7), -1px -1px 0px rgba(255, 255, 255, 0.4)',
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 107, 53, 0.9), 0 0 30px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 140, 0, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {couples[currentCoupleIndex].groom}
              </motion.span>
              
              {/* Heart icon - enhanced */}
              <motion.span 
                animate={{ 
                  scale: [1, 1.3, 1], 
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.8)) drop-shadow(0 0 20px rgba(255, 105, 180, 0.6))',
                  fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                  display: 'inline-block',
                  flexShrink: 0,
                  textShadow: '0 0 15px rgba(255, 20, 147, 0.9)',
                }}
              >
                💕
              </motion.span>
              
              {/* Bride name - fancy highlighted */}
              <motion.span 
                style={{ 
                  whiteSpace: 'nowrap',
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#ff1493',
                  textShadow: `
                    2px 2px 0px rgba(0, 0, 0, 0.8),
                    0 0 20px rgba(255, 20, 147, 0.9),
                    0 0 30px rgba(255, 105, 180, 0.7),
                    0 0 40px rgba(255, 182, 193, 0.5),
                    -1px -1px 0px rgba(255, 255, 255, 0.3)
                  `,
                  filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.5))',
                  position: 'relative',
                }}
                animate={{
                  textShadow: [
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 20, 147, 0.9), 0 0 30px rgba(255, 105, 180, 0.7), 0 0 40px rgba(255, 182, 193, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 20, 147, 1), 0 0 40px rgba(255, 105, 180, 0.9), 0 0 50px rgba(255, 182, 193, 0.7), -1px -1px 0px rgba(255, 255, 255, 0.4)',
                    '2px 2px 0px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 20, 147, 0.9), 0 0 30px rgba(255, 105, 180, 0.7), 0 0 40px rgba(255, 182, 193, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                {couples[currentCoupleIndex].bride}
              </motion.span>
              
              {/* Decorative sparkles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: '#ffd700',
                    borderRadius: '50%',
                    left: `${15 + i * 15}%`,
                    top: i % 2 === 0 ? '10%' : '85%',
                    boxShadow: '0 0 8px #ffd700, 0 0 12px #ffd700',
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main countdown display */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          {/* Left chevrons */}
          <motion.div 
            className="hidden sm:flex text-white font-black text-3xl md:text-5xl"
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.2)', transform: 'scaleX(-1)' }}
          >
            <span>›</span><span style={{ marginLeft: '-8px' }}>›</span><span style={{ marginLeft: '-8px' }}>›</span>
          </motion.div>

          {/* Days box */}
          <div className="relative flex flex-col items-center">
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-3 -right-3 w-5 h-5 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute bottom-8 -left-3 w-5 h-5 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute bottom-8 -right-3 w-5 h-5 border-b-[3px] border-r-[3px] border-black z-10" />
            
            {/* Number box */}
            <motion.div 
              className="bg-white rounded-2xl px-6 py-2 sm:px-10 sm:py-4"
              style={{
                border: '4px solid #1a1a1a',
                boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.15)',
                minWidth: 'clamp(100px, 30vw, 200px)'
              }}
              key={timeLeft.days}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span 
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(4rem, 18vw, 9rem)',
                  fontWeight: 900,
                  color: '#1a1a1a',
                  lineHeight: 1,
                  display: 'block'
                }}
              >
                {timeLeft.days}
              </span>
            </motion.div>
            
            {/* DAYS banner */}
            <div 
              className="px-6 py-2 -mt-2 relative z-[5] rounded-lg"
              style={{
                background: '#1a1a1a',
                boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.3)'
              }}
            >
              <span 
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '4px'
                }}
              >
                DAYS
              </span>
            </div>
          </div>

          {/* Right chevrons */}
          <motion.div 
            className="hidden sm:flex text-white font-black text-3xl md:text-5xl"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.2)' }}
          >
            <span>›</span><span style={{ marginLeft: '-8px' }}>›</span><span style={{ marginLeft: '-8px' }}>›</span>
          </motion.div>
        </motion.div>

        {/* TO GO banner */}
        <motion.div
          className="mt-3 px-8 py-2 bg-white rounded-lg"
          style={{
            border: '4px solid #1a1a1a',
            boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15)'
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span 
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 900,
              color: '#1a1a1a',
              letterSpacing: '3px'
            }}
          >
            TO GO
          </span>
        </motion.div>

        {/* Wedding date pill */}
        <motion.div
          className="mt-4 px-6 py-2 bg-white/90 rounded-full"
          style={{ border: '3px solid #1a1a1a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span 
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 700,
              color: '#1a1a1a'
            }}
          >
            21st February 2026
          </span>
        </motion.div>

        {/* Detailed countdown at bottom */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-8 py-3 rounded-2xl"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '3px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HRS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' }
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && (
                <span 
                  className="animate-pulse"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#ff69b4'
                  }}
                >
                  :
                </span>
              )}
              <div className="flex flex-col items-center px-2 sm:px-3">
                <motion.span 
                  key={item.value}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                    fontWeight: 800,
                    color: '#ffd700',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                    lineHeight: 1
                  }}
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span 
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '1px',
                    marginTop: '2px'
                  }}
                >
                  {item.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          className="mt-6 flex items-center gap-3 px-8 py-3 rounded-full cursor-pointer"
          style={{
            background: '#ff1493',
            border: '4px solid #1a1a1a',
            boxShadow: '6px 6px 0 #1a1a1a'
          }}
          onClick={onComplete}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ 
            x: -2, 
            y: -2,
            boxShadow: '8px 8px 0 #1a1a1a'
          }}
          whileTap={{ 
            x: 2, 
            y: 2,
            boxShadow: '2px 2px 0 #1a1a1a'
          }}
        >
          <span 
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '1px'
            }}
          >
            Begin Our Journey
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            💝
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
};

export default CountdownScreen;

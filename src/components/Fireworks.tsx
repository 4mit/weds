'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FireworksProps {
  x: number;
  width: number;
  isActive: boolean;
}

interface Firework {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const COLORS = ['#ff6b35', '#ffd700', '#ff1493', '#00ff00', '#ff0000', '#87ceeb', '#ff69b4', '#ffa500'];

const Fireworks: React.FC<FireworksProps> = ({ x, width, isActive }) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isActive || !mounted) {
      setFireworks([]);
      return;
    }

    // Generate initial fireworks
    const generateFireworks = () => {
      const newFireworks: Firework[] = [];
      const count = 6;
      for (let i = 0; i < count; i++) {
        newFireworks.push({
          id: Date.now() + i,
          x: (i / count) * width + Math.random() * 50,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: i * 0.5 + Math.random() * 0.5,
          size: 80 + Math.random() * 60,
        });
      }
      setFireworks(newFireworks);
    };

    generateFireworks();

    // Regenerate fireworks periodically
    const interval = setInterval(() => {
      generateFireworks();
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, width, mounted]);

  if (!mounted || !isActive) return null;

  return (
    <div 
      className="absolute top-0 pointer-events-none"
      style={{ left: x, width, height: '60%' }}
    >
      <AnimatePresence>
        {fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute"
            style={{ left: fw.x, bottom: '10%' }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -300, opacity: 0 }}
            transition={{ duration: 1.2, delay: fw.delay, ease: 'easeOut' }}
          >
            {/* Launch trail */}
            <div 
              className="w-1 h-8 rounded-full"
              style={{ 
                background: `linear-gradient(to top, ${fw.color}, transparent)`,
              }}
            />
          </motion.div>
        ))}

        {fireworks.map((fw) => (
          <motion.div
            key={`burst-${fw.id}`}
            className="absolute"
            style={{ left: fw.x, top: '15%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 2, 
              delay: fw.delay + 1.2,
              times: [0, 0.1, 0.7, 1],
            }}
          >
            {/* Burst particles - outer ring */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const distance = fw.size;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{ 
                    width: '6px',
                    height: '6px',
                    backgroundColor: fw.color,
                    boxShadow: `0 0 8px ${fw.color}, 0 0 16px ${fw.color}, 0 0 24px ${fw.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: tx, 
                    y: ty, 
                    opacity: [1, 1, 0.5, 0],
                    scale: [1, 1.5, 0.8, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: fw.delay + 1.2,
                    times: [0, 0.2, 0.6, 1],
                    ease: 'easeOut',
                  }}
                />
              );
            })}
            
            {/* Inner sparkles - middle ring */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
              const distance = fw.size * 0.6;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={`inner-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{ 
                    width: '4px',
                    height: '4px',
                    boxShadow: `0 0 6px #fff, 0 0 12px ${fw.color}, 0 0 18px ${fw.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: tx, 
                    y: ty, 
                    opacity: [1, 1, 0.3, 0],
                    scale: [1, 1.3, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 1.8, 
                    delay: fw.delay + 1.25,
                    times: [0, 0.15, 0.7, 1],
                    ease: 'easeOut',
                  }}
                />
              );
            })}
            
            {/* Center sparkle burst */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '12px',
                height: '12px',
                left: '-6px',
                top: '-6px',
                background: `radial-gradient(circle, #fff 0%, ${fw.color} 50%, transparent 100%)`,
                boxShadow: `0 0 10px ${fw.color}, 0 0 20px ${fw.color}, 0 0 30px ${fw.color}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 2, 3, 0],
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{ 
                duration: 2, 
                delay: fw.delay + 1.2,
                times: [0, 0.1, 0.5, 1],
                ease: 'easeOut',
              }}
            />
            
            {/* Additional twinkling sparkles */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const distance = fw.size * 0.3;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={`twinkle-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{ 
                    width: '3px',
                    height: '3px',
                    boxShadow: `0 0 4px #fff, 0 0 8px ${fw.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ 
                    x: tx, 
                    y: ty, 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1.2, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: fw.delay + 1.3,
                    times: [0, 0.2, 0.6, 1],
                    ease: 'easeOut',
                    repeat: 1,
                  }}
                />
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default Fireworks;


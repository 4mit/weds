'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DiscoLightsProps {
  x: number;
  width?: number;
  isActive?: boolean;
}

const DISCO_COLORS = [
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff6b35', // Orange
  '#ff1493', // Pink
  '#9400d3', // Purple
  '#00ff7f', // Spring Green
];

export const DiscoLights: React.FC<DiscoLightsProps> = ({ x, width = 600, isActive = true }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute top-0 left-0 h-full pointer-events-none overflow-hidden"
      style={{ left: x, width }}
    >
      {/* Disco Ball */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            {/* Ball base */}
            <circle cx="30" cy="30" r="25" fill="#c0c0c0" />
            {/* Mirror tiles */}
            {Array.from({ length: 8 }).map((_, ring) =>
              Array.from({ length: 12 }).map((_, tile) => {
                const angle = (tile / 12) * Math.PI * 2 + (ring * 0.2);
                const r = 8 + ring * 2.5;
                const cx = 30 + Math.cos(angle) * r;
                const cy = 30 + Math.sin(angle) * r;
                return (
                  <rect
                    key={`${ring}-${tile}`}
                    x={cx - 2}
                    y={cy - 2}
                    width="4"
                    height="4"
                    fill={tile % 2 === 0 ? '#fff' : '#e0e0e0'}
                    transform={`rotate(${(tile * 30) + (ring * 15)}, ${cx}, ${cy})`}
                  />
                );
              })
            )}
            {/* Highlight */}
            <ellipse cx="22" cy="22" rx="8" ry="6" fill="rgba(255,255,255,0.4)" />
          </svg>
          {/* Hanging wire */}
          <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-400 -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Spotlight beams from disco ball */}
      {isActive && Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const color = DISCO_COLORS[i % DISCO_COLORS.length];
        return (
          <motion.div
            key={i}
            className="absolute top-[8%] left-1/2 origin-top"
            style={{
              width: 4,
              height: '70%',
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              transform: `translateX(-50%) rotate(${angle}deg)`,
              opacity: 0.4,
            }}
            animate={{
              rotate: [angle, angle + 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
            }}
          />
        );
      })}

      {/* Stage spotlights from top */}
      {isActive && [0.2, 0.4, 0.6, 0.8].map((pos, i) => (
        <motion.div
          key={`spot-${i}`}
          className="absolute top-0"
          style={{
            left: `${pos * 100}%`,
            width: 0,
            height: 0,
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderTop: `300px solid ${DISCO_COLORS[(i * 3) % DISCO_COLORS.length]}`,
            opacity: 0.15,
            filter: 'blur(10px)',
            transform: 'translateX(-50%)',
          }}
          animate={{
            opacity: [0.1, 0.25, 0.1],
            borderTopColor: DISCO_COLORS.slice(i, i + 4).concat(DISCO_COLORS.slice(0, i)),
          }}
          transition={{
            opacity: { duration: 0.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
            borderTopColor: { duration: 2, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}

      {/* Floor glow effects */}
      {isActive && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`floor-${i}`}
          className="absolute bottom-[15%] rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            width: 80,
            height: 30,
            background: DISCO_COLORS[i % DISCO_COLORS.length],
            filter: 'blur(20px)',
            transform: 'translateX(-50%)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            background: DISCO_COLORS.slice(i).concat(DISCO_COLORS.slice(0, i)),
          }}
          transition={{
            opacity: { duration: 0.3 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.5 + (i % 2) * 0.3, repeat: Infinity, ease: 'easeInOut' },
            background: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}

      {/* Laser beams crossing */}
      {isActive && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`laser-${i}`}
          className="absolute"
          style={{
            top: '10%',
            left: i % 2 === 0 ? '10%' : '90%',
            width: 2,
            height: '60%',
            background: `linear-gradient(to bottom, ${DISCO_COLORS[i * 2]}, transparent)`,
            transformOrigin: 'top center',
          }}
          animate={{
            rotate: i % 2 === 0 ? [30, 60, 30] : [-30, -60, -30],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Strobe flash effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{ opacity: [0, 0, 0, 0.3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeOut',
          }}
        />
      )}

      {/* Floating music notes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-2xl md:text-3xl"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '20%',
            color: DISCO_COLORS[i % DISCO_COLORS.length],
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        >
          {['♪', '♫', '♬', '🎵', '🎶'][i % 5]}
        </motion.div>
      ))}

      {/* Particle sparkles */}
      {isActive && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${5 + (i * 5) % 90}%`,
            top: `${10 + (i * 7) % 60}%`,
            background: DISCO_COLORS[i % DISCO_COLORS.length],
            boxShadow: `0 0 6px ${DISCO_COLORS[i % DISCO_COLORS.length]}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1 + (i % 3) * 0.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default DiscoLights;


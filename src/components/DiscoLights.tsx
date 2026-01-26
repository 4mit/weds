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
  '#ffd700', // Gold
  '#ff4500', // Orange Red
];

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
      {/* Enhanced Disco Ball with realistic reflections */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-2xl">
            <defs>
              <radialGradient id="discoBallGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e0e0e0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c0c0c0" stopOpacity="0.7" />
              </radialGradient>
              <linearGradient id="mirrorShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Ball base with gradient */}
            <circle cx="40" cy="40" r="35" fill="url(#discoBallGradient)" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#a0a0a0" strokeWidth="0.5" opacity="0.3" />
            
            {/* Realistic mirror tiles with better positioning */}
            {Array.from({ length: 10 }).map((_, ring) =>
              Array.from({ length: 16 }).map((_, tile) => {
                const angle = (tile / 16) * Math.PI * 2 + (ring * 0.15);
                const r = 6 + ring * 2.8;
                const cx = 40 + Math.cos(angle) * r;
                const cy = 40 + Math.sin(angle) * r;
                const size = 2.5 + (ring % 2) * 0.5;
                const brightness = 0.7 + (tile % 3) * 0.1;
                return (
                  <rect
                    key={`${ring}-${tile}`}
                    x={cx - size / 2}
                    y={cy - size / 2}
                    width={size}
                    height={size}
                    fill={`rgba(255,255,255,${brightness})`}
                    transform={`rotate(${(tile * 22.5) + (ring * 10)}, ${cx}, ${cy})`}
                    style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.5))' }}
                  />
                );
              })
            )}
            
            {/* Enhanced highlight with glow */}
            <ellipse cx="30" cy="30" rx="12" ry="8" fill="rgba(255,255,255,0.6)" />
            <ellipse cx="30" cy="30" rx="8" ry="5" fill="rgba(255,255,255,0.9)" />
            
            {/* Light reflection spots */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const r = 20;
              const cx = 40 + Math.cos(angle) * r;
              const cy = 40 + Math.sin(angle) * r;
              return (
                <circle
                  key={`reflection-${i}`}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="rgba(255,255,255,0.8)"
                  style={{ filter: 'blur(1px)' }}
                />
              );
            })}
          </svg>
          
          {/* Enhanced hanging wire with shadow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-1 h-10 bg-gradient-to-b from-gray-500 via-gray-400 to-transparent shadow-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full" />
          </div>
          
          {/* Glow around disco ball */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Realistic spotlight beams from disco ball - cone-shaped with proper falloff */}
      {isActive && Array.from({ length: 16 }).map((_, i) => {
        const baseAngle = (i / 16) * 360;
        const color = DISCO_COLORS[i % DISCO_COLORS.length];
        const beamWidth = 15 + (i % 3) * 5; // Varying beam widths
        return (
          <motion.div
            key={`beam-${i}`}
            className="absolute top-[8%] left-1/2 origin-top"
            style={{
              width: `${beamWidth}px`,
              height: '75%',
              background: `linear-gradient(to bottom, 
                ${color} 0%, 
                ${color} 5%,
                ${hexToRgba(color, 0.8)} 15%,
                ${hexToRgba(color, 0.6)} 30%,
                ${hexToRgba(color, 0.4)} 50%,
                ${hexToRgba(color, 0.2)} 70%,
                transparent 100%)`,
              transform: `translateX(-50%) rotate(${baseAngle}deg)`,
              opacity: 0.5,
              filter: `blur(${2 + (i % 2)}px) drop-shadow(0 0 ${4 + (i % 3) * 2}px ${color})`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            animate={{
              rotate: [baseAngle, baseAngle + 360],
              opacity: [0.2, 0.7, 0.3, 0.6, 0.2],
              scaleY: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 10 + (i % 3) * 2, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 1.2 + (i % 4) * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 },
              scaleY: { duration: 1.5 + (i % 2) * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        );
      })}

      {/* Realistic stage spotlights from top - moving and changing colors */}
      {isActive && [0.15, 0.35, 0.5, 0.65, 0.85].map((pos, i) => {
        const baseColor = DISCO_COLORS[(i * 3) % DISCO_COLORS.length];
        return (
          <motion.div
            key={`spot-${i}`}
            className="absolute top-0"
            style={{
              left: `${pos * 100}%`,
              width: 0,
              height: 0,
              borderLeft: `${50 + (i % 2) * 20}px solid transparent`,
              borderRight: `${50 + (i % 2) * 20}px solid transparent`,
              borderTop: `400px solid ${baseColor}`,
              opacity: 0.2,
              filter: `blur(${12 + (i % 2) * 4}px) drop-shadow(0 0 ${15 + i * 3}px ${baseColor})`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              opacity: [0.15, 0.35, 0.2, 0.3, 0.15],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              borderTopColor: [
                DISCO_COLORS[(i * 3) % DISCO_COLORS.length],
                DISCO_COLORS[((i * 3) + 1) % DISCO_COLORS.length],
                DISCO_COLORS[((i * 3) + 2) % DISCO_COLORS.length],
                DISCO_COLORS[(i * 3) % DISCO_COLORS.length],
              ],
              scaleX: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              opacity: { duration: 0.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
              borderTopColor: { duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'linear' },
              scaleX: { duration: 1.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        );
      })}

      {/* Enhanced floor glow effects with realistic light pools */}
      {isActive && Array.from({ length: 8 }).map((_, i) => {
        const color = DISCO_COLORS[i % DISCO_COLORS.length];
        return (
          <motion.div
            key={`floor-${i}`}
            className="absolute bottom-[15%]"
            style={{
              left: `${10 + i * 12}%`,
              width: `${100 + (i % 3) * 30}px`,
              height: `${40 + (i % 2) * 20}px`,
              background: `radial-gradient(ellipse, ${color} 0%, ${hexToRgba(color, 0.87)} 30%, ${hexToRgba(color, 0.53)} 60%, transparent 100%)`,
              filter: `blur(${15 + (i % 2) * 5}px) drop-shadow(0 0 ${10 + i * 2}px ${color})`,
              transform: 'translateX(-50%)',
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
              scale: [1, 1.3, 0.9, 1.2, 1],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              background: [
                `radial-gradient(ellipse, ${DISCO_COLORS[i % DISCO_COLORS.length]} 0%, ${hexToRgba(DISCO_COLORS[i % DISCO_COLORS.length], 0.87)} 30%, transparent 100%)`,
                `radial-gradient(ellipse, ${DISCO_COLORS[(i + 1) % DISCO_COLORS.length]} 0%, ${hexToRgba(DISCO_COLORS[(i + 1) % DISCO_COLORS.length], 0.87)} 30%, transparent 100%)`,
                `radial-gradient(ellipse, ${DISCO_COLORS[(i + 2) % DISCO_COLORS.length]} 0%, ${hexToRgba(DISCO_COLORS[(i + 2) % DISCO_COLORS.length], 0.87)} 30%, transparent 100%)`,
                `radial-gradient(ellipse, ${DISCO_COLORS[i % DISCO_COLORS.length]} 0%, ${hexToRgba(DISCO_COLORS[i % DISCO_COLORS.length], 0.87)} 30%, transparent 100%)`,
              ],
            }}
            transition={{
              opacity: { duration: 0.4 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.6 + (i % 2) * 0.4, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
              background: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'linear' },
            }}
          />
        );
      })}

      {/* Enhanced laser beams with realistic movement and glow */}
      {isActive && Array.from({ length: 6 }).map((_, i) => {
        const color = DISCO_COLORS[(i * 2) % DISCO_COLORS.length];
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={`laser-${i}`}
            className="absolute"
            style={{
              top: '8%',
              left: isLeft ? `${5 + (i % 3) * 10}%` : `${85 - (i % 3) * 10}%`,
              width: '3px',
              height: '65%',
              background: `linear-gradient(to bottom, 
                ${color} 0%,
                ${color} 10%,
                ${hexToRgba(color, 0.8)} 30%,
                ${hexToRgba(color, 0.6)} 50%,
                ${hexToRgba(color, 0.4)} 70%,
                transparent 100%)`,
              transformOrigin: 'top center',
              filter: `blur(1px) drop-shadow(0 0 ${3 + i}px ${color})`,
              boxShadow: `0 0 ${5 + i * 2}px ${color}, 0 0 ${10 + i * 3}px ${hexToRgba(color, 0.6)}`,
            }}
            animate={{
              rotate: isLeft 
                ? [25, 70, 35, 60, 25] 
                : [-25, -70, -35, -60, -25],
              opacity: [0.6, 1, 0.8, 0.9, 0.6],
              scaleY: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
              scaleY: { duration: 1.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        );
      })}

      {/* Enhanced strobe flash effect with color variations */}
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
            }}
            animate={{ 
              opacity: [0, 0, 0, 0.4, 0, 0, 0, 0.3, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${30 + (10 % 4) * 10}% ${20 + (10 % 3) * 10}%, ${hexToRgba(DISCO_COLORS[10 % DISCO_COLORS.length], 0.4)} 0%, transparent 60%)`,
            }}
            animate={{ 
              opacity: [0, 0, 0.2, 0, 0, 0, 0.15, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: 'easeOut',
            }}
          />
        </>
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

      {/* Enhanced particle sparkles with trails */}
      {isActive && Array.from({ length: 30 }).map((_, i) => {
        const color = DISCO_COLORS[i % DISCO_COLORS.length];
        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${5 + (i * 4) % 90}%`,
              top: `${10 + (i * 6) % 70}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: color,
              boxShadow: `
                0 0 ${4 + (i % 3) * 2}px ${color},
                0 0 ${8 + (i % 2) * 3}px ${hexToRgba(color, 0.87)},
                0 0 ${12 + i}px ${hexToRgba(color, 0.6)}
              `,
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0, 1, 0.8, 1, 0],
              scale: [0, 1.8, 1.2, 1.5, 0],
              y: [0, -20 - (i % 3) * 10, -40 - (i % 2) * 15],
              x: [(i % 2 === 0 ? 0 : 10), (i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? -10 : 10)],
            }}
            transition={{
              duration: 1.5 + (i % 4) * 0.4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
          />
        );
      })}
      
      {/* Light rays effect - realistic light scattering */}
      {isActive && Array.from({ length: 12 }).map((_, i) => {
        const color = DISCO_COLORS[i % DISCO_COLORS.length];
        const angle = (i / 12) * 360;
        return (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-[10%] left-1/2 origin-top"
            style={{
              width: '2px',
              height: '50%',
              background: `linear-gradient(to bottom, 
                ${hexToRgba(color, 0.87)} 0%,
                ${hexToRgba(color, 0.73)} 20%,
                ${hexToRgba(color, 0.6)} 40%,
                ${hexToRgba(color, 0.4)} 60%,
                transparent 80%)`,
              transform: `translateX(-50%) rotate(${angle}deg)`,
              filter: `blur(1px) drop-shadow(0 0 2px ${color})`,
            }}
            animate={{
              rotate: [angle, angle + 360],
              opacity: [0.3, 0.7, 0.4, 0.6, 0.3],
            }}
            transition={{
              rotate: { duration: 12 + (i % 3) * 2, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 1.5 + (i % 4) * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
            }}
          />
        );
      })}
    </div>
  );
};

export default DiscoLights;


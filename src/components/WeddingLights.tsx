'use client';

import React, { useState, useEffect } from 'react';

interface WeddingLightsProps {
  x: number;
  width: number;
  isActive: boolean;
}

const WeddingLights: React.FC<WeddingLightsProps> = ({ x, width, isActive }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isActive) return null;

  const LIGHT_COLORS = ['#ffd700', '#ff6b35', '#ff1493', '#00ff00', '#ff0000', '#87ceeb'];
  const stringCount = Math.floor(width / 150);

  return (
    <div 
      className="absolute top-0 pointer-events-none overflow-visible"
      style={{ left: x, width, height: '40%' }}
    >
      {/* String lights at top */}
      {Array.from({ length: stringCount }).map((_, stringIdx) => (
        <svg 
          key={stringIdx}
          className="absolute"
          style={{ left: stringIdx * 150, top: 0 }}
          width="180" 
          height="100" 
          viewBox="0 0 180 100"
        >
          {/* String/wire */}
          <path
            d="M0 10 Q45 40 90 35 Q135 30 180 10"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          
          {/* Light bulbs */}
          {[20, 50, 80, 110, 140, 160].map((lx, i) => {
            const ly = 10 + Math.sin((lx / 180) * Math.PI) * 30;
            const color = LIGHT_COLORS[(stringIdx + i) % LIGHT_COLORS.length];
            return (
              <g key={i}>
                {/* Wire to bulb */}
                <line 
                  x1={lx} 
                  y1={ly} 
                  x2={lx} 
                  y2={ly + 8} 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                {/* Bulb glow */}
                <circle
                  cx={lx}
                  cy={ly + 15}
                  r="12"
                  fill={color}
                  opacity="0.3"
                  className="light-bulb"
                  style={{ '--delay': `${(i * 0.2 + stringIdx * 0.3) % 1.5}s`, '--glow-color': color } as React.CSSProperties}
                />
                {/* Bulb */}
                <ellipse
                  cx={lx}
                  cy={ly + 15}
                  rx="5"
                  ry="7"
                  fill={color}
                  className="light-bulb"
                  style={{ '--delay': `${(i * 0.2 + stringIdx * 0.3) % 1.5}s`, '--glow-color': color } as React.CSSProperties}
                />
                {/* Bulb cap */}
                <rect
                  x={lx - 3}
                  y={ly + 6}
                  width="6"
                  height="4"
                  fill="#888"
                  rx="1"
                />
              </g>
            );
          })}
        </svg>
      ))}

      {/* Decorative diyas/lamps on ground level */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {Array.from({ length: Math.floor(width / 80) }).map((_, i) => (
          <div 
            key={i}
            className="relative"
            style={{ 
              transform: `translateY(${Math.sin(i * 0.5) * 10}px)`,
            }}
          >
            <svg width="30" height="40" viewBox="0 0 30 40">
              {/* Diya base */}
              <ellipse cx="15" cy="35" rx="12" ry="4" fill="#cd853f" />
              <ellipse cx="15" cy="33" rx="10" ry="3" fill="#daa520" />
              {/* Oil */}
              <ellipse cx="15" cy="31" rx="7" ry="2" fill="#8b4513" />
              {/* Flame */}
              <path
                d="M15 28 Q19 22 17 15 Q15 10 13 15 Q11 22 15 28"
                fill="#ff6b00"
                className="flame"
              />
              <path
                d="M15 28 Q17 24 16 18 Q15 14 14 18 Q13 24 15 28"
                fill="#ffd700"
                className="flame"
              />
              {/* Glow */}
              <circle
                cx="15"
                cy="20"
                r="10"
                fill="#ffa500"
                opacity="0.2"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Spotlight effects from above */}
      {[0.2, 0.5, 0.8].map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${pos * 100}%`,
            top: '5%',
            width: '100px',
            height: '200px',
            background: `linear-gradient(to bottom, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 50%, transparent 100%)`,
            transform: `rotate(${-10 + i * 10}deg)`,
            transformOrigin: 'top center',
            opacity: 0.6,
          }}
        />
      ))}

      {/* Floating sparkles - centered on screen */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute sparkle-burst"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${35 + (i * 8) % 30}%`, // Centered around 35-65% (middle of screen)
            '--delay': `${(i * 0.2) % 2}s`,
          } as React.CSSProperties}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
              fill="#ffd700"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}

      {/* Corner decorative lights */}
      <svg className="absolute top-0 left-0" width="80" height="80" viewBox="0 0 80 80">
        <path d="M0 0 Q40 10 80 0" stroke="#ffd700" strokeWidth="3" fill="none" />
        {[10, 30, 50, 70].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={5 + Math.sin((cx / 80) * Math.PI) * 5}
            r="4"
            fill={LIGHT_COLORS[i % LIGHT_COLORS.length]}
            className="light-bulb"
            style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties}
          />
        ))}
      </svg>

      <svg className="absolute top-0 right-0" width="80" height="80" viewBox="0 0 80 80">
        <path d="M0 0 Q40 10 80 0" stroke="#ffd700" strokeWidth="3" fill="none" />
        {[10, 30, 50, 70].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={5 + Math.sin((cx / 80) * Math.PI) * 5}
            r="4"
            fill={LIGHT_COLORS[(i + 2) % LIGHT_COLORS.length]}
            className="light-bulb"
            style={{ '--delay': `${i * 0.3 + 0.5}s` } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
};

export default WeddingLights;


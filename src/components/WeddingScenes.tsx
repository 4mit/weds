'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Guest } from './Character';

// Fancy Arrow Signboard with Bamboo
export const ArrowSignboard: React.FC<{ 
  x: number; 
  eventName: string; 
  direction?: 'right' | 'left';
}> = ({ x, eventName, direction = 'right' }) => (
  <div 
    className="absolute bottom-[15%] z-20" 
    style={{ left: x, position: 'absolute' }}
  >
    <svg width="160" height="200" viewBox="0 0 160 200">
      {/* Bamboo pole */}
      <defs>
        <linearGradient id="bambooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b8e23" />
          <stop offset="30%" stopColor="#9acd32" />
          <stop offset="50%" stopColor="#8fbc8f" />
          <stop offset="70%" stopColor="#9acd32" />
          <stop offset="100%" stopColor="#6b8e23" />
        </linearGradient>
        <linearGradient id="bambooNodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#556b2f" />
          <stop offset="50%" stopColor="#6b8e23" />
          <stop offset="100%" stopColor="#556b2f" />
        </linearGradient>
        <linearGradient id="boardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5deb3" />
          <stop offset="50%" stopColor="#deb887" />
          <stop offset="100%" stopColor="#d2b48c" />
        </linearGradient>
        <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="0.5" floodColor="#8b4513" floodOpacity="0.5"/>
        </filter>
      </defs>
      
      {/* Main bamboo pole */}
      <rect x="70" y="50" width="22" height="150" fill="url(#bambooGrad)" rx="4" />
      
      {/* Bamboo nodes/joints */}
      <ellipse cx="81" cy="65" rx="14" ry="5" fill="url(#bambooNodeGrad)" />
      <ellipse cx="81" cy="105" rx="14" ry="5" fill="url(#bambooNodeGrad)" />
      <ellipse cx="81" cy="145" rx="14" ry="5" fill="url(#bambooNodeGrad)" />
      <ellipse cx="81" cy="185" rx="14" ry="5" fill="url(#bambooNodeGrad)" />
      
      {/* Bamboo leaves at top */}
      <path d="M75 50 Q55 38 45 18 Q65 32 75 50" fill="#228b22" />
      <path d="M87 50 Q107 38 117 18 Q97 32 87 50" fill="#228b22" />
      <path d="M81 48 Q81 25 74 8 Q88 25 81 48" fill="#2e8b2e" />
      <path d="M70 52 Q50 45 40 30 Q58 42 70 52" fill="#32cd32" opacity="0.8" />
      <path d="M92 52 Q112 45 122 30 Q104 42 92 52" fill="#32cd32" opacity="0.8" />
      
      {/* Arrow board - larger */}
      <g transform={direction === 'left' ? 'translate(160, 0) scale(-1, 1)' : ''}>
        {/* Board shadow */}
        <path 
          d="M8 72 L125 72 L145 95 L125 118 L8 118 L8 72" 
          fill="#3d2914" 
          opacity="0.3"
          transform="translate(2, 2)"
        />
        {/* Board background with arrow shape */}
        <path 
          d="M8 70 L125 70 L145 95 L125 120 L8 120 L8 70" 
          fill="#8b4513" 
          stroke="#5c3317" 
          strokeWidth="3"
        />
        {/* Inner board with gradient */}
        <path 
          d="M14 76 L120 76 L137 95 L120 114 L14 114 L14 76" 
          fill="url(#boardGrad)" 
        />
        {/* Decorative golden border */}
        <path 
          d="M17 79 L117 79 L132 95 L117 111 L17 111 L17 79" 
          fill="none" 
          stroke="#d4af37" 
          strokeWidth="2"
        />
        {/* Inner decorative line */}
        <path 
          d="M20 82 L114 82 L127 95 L114 108 L20 108 L20 82" 
          fill="none" 
          stroke="#b8860b" 
          strokeWidth="1"
          strokeDasharray="3,2"
        />
        
        {/* Rope/string holding the board */}
        <path d="M25 70 Q40 55 81 52 Q122 55 137 70" fill="none" stroke="#8b6914" strokeWidth="4" />
        <path d="M25 70 Q40 55 81 52 Q122 55 137 70" fill="none" stroke="#d2b48c" strokeWidth="2" />
        {/* Rope knots */}
        <circle cx="25" cy="70" r="5" fill="#8b6914" />
        <circle cx="25" cy="70" r="3" fill="#d4af37" />
        <circle cx="137" cy="70" r="5" fill="#8b6914" />
        <circle cx="137" cy="70" r="3" fill="#d4af37" />
      </g>
      
      {/* Event name text - stylish and bigger */}
      <text 
        x={direction === 'left' ? 82 : 75} 
        y="100" 
        textAnchor="middle" 
        fill="#5c3317" 
        fontSize="14" 
        fontWeight="bold"
        fontFamily="'Playfair Display', Georgia, serif"
        letterSpacing="1"
        filter="url(#textShadow)"
      >
        {eventName}
      </text>
      
      {/* Decorative swirl under text */}
      <path 
        d={direction === 'left' ? 'M50 106 Q75 112 100 106' : 'M45 106 Q70 112 95 106'}
        fill="none" 
        stroke="#d4af37" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Decorative flowers on pole */}
      <g>
        <circle cx="68" cy="80" r="7" fill="#ff6b35" />
        <circle cx="68" cy="80" r="3" fill="#ffd700" />
        {/* Petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse 
            key={i}
            cx={68 + Math.cos(angle * Math.PI / 180) * 5} 
            cy={80 + Math.sin(angle * Math.PI / 180) * 5} 
            rx="3" ry="2" 
            fill="#ff8c00"
            transform={`rotate(${angle} ${68 + Math.cos(angle * Math.PI / 180) * 5} ${80 + Math.sin(angle * Math.PI / 180) * 5})`}
          />
        ))}
      </g>
      
      <g>
        <circle cx="94" cy="125" r="7" fill="#ff1493" />
        <circle cx="94" cy="125" r="3" fill="#fff" />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse 
            key={i}
            cx={94 + Math.cos(angle * Math.PI / 180) * 5} 
            cy={125 + Math.sin(angle * Math.PI / 180) * 5} 
            rx="3" ry="2" 
            fill="#ff69b4"
            transform={`rotate(${angle} ${94 + Math.cos(angle * Math.PI / 180) * 5} ${125 + Math.sin(angle * Math.PI / 180) * 5})`}
          />
        ))}
      </g>
      
      {/* Small marigold at bottom */}
      <circle cx="68" cy="160" r="5" fill="#ffa500" />
      <circle cx="68" cy="160" r="2" fill="#ffd700" />
      
      {/* Ground/base decoration */}
      <ellipse cx="81" cy="198" rx="30" ry="6" fill="#3d2914" opacity="0.4" />
      
      {/* Small grass tufts */}
      <path d="M60 195 Q58 185 62 195" stroke="#228b22" strokeWidth="2" fill="none" />
      <path d="M65 195 Q64 183 68 195" stroke="#32cd32" strokeWidth="2" fill="none" />
      <path d="M95 195 Q93 186 97 195" stroke="#228b22" strokeWidth="2" fill="none" />
      <path d="M100 195 Q99 184 103 195" stroke="#32cd32" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

// Decorative Diya (oil lamp)
export const Diya: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <div
    className="absolute"
    style={{ left: x, bottom: y, transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
  >
    <svg width="30" height="40" viewBox="0 0 30 40">
      {/* Flame glow */}
      <ellipse cx="15" cy="8" rx="8" ry="10" fill="url(#flameGlow)" className="flame" />
      {/* Flame */}
      <path
        d="M15 2 Q20 8 18 15 Q15 18 12 15 Q10 8 15 2"
        fill="#ff6b00"
        className="flame"
      />
      <path
        d="M15 5 Q18 10 16 14 Q15 15 14 14 Q12 10 15 5"
        fill="#ffff00"
        className="flame"
      />
      {/* Diya base */}
      <ellipse cx="15" cy="25" rx="12" ry="5" fill="#cd853f" />
      <ellipse cx="15" cy="23" rx="10" ry="4" fill="#daa520" />
      <ellipse cx="15" cy="30" rx="8" ry="3" fill="#8b4513" />
      <defs>
        <radialGradient id="flameGlow">
          <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

// Marigold Garland
export const Garland: React.FC<{ x: number; y: number; width?: number }> = ({ x, y, width = 200 }) => (
  <div className="absolute" style={{ left: x, top: y }}>
    <svg width={width} height="60" viewBox={`0 0 ${width} 60`}>
      {/* String */}
      <path
        d={`M0 10 Q${width / 4} 50 ${width / 2} 40 Q${(width * 3) / 4} 30 ${width} 10`}
        fill="none"
        stroke="#228b22"
        strokeWidth="3"
      />
      {/* Flowers */}
      {Array.from({ length: Math.floor(width / 25) }).map((_, i) => {
        const t = i / (Math.floor(width / 25) - 1);
        const fx = t * width;
        const fy = 10 + Math.sin(t * Math.PI) * 35;
        return (
          <g key={i} transform={`translate(${fx}, ${fy})`}>
            <circle r="8" fill="#ff8c00" />
            <circle r="5" fill="#ffa500" />
            <circle r="2" fill="#ffcc00" />
          </g>
        );
      })}
    </svg>
  </div>
);

// Rangoli pattern
export const Rangoli: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 150 }) => (
  <div></div>
  // <div
  //   className="absolute rangoli-spin"
  //   style={{ left: x, bottom: y, transform: `translateX(-50%)` }}
  // >
  //   <svg width={size} height={size} viewBox="0 0 100 100">
  //     {/* Outer petals */}
  //     {Array.from({ length: 8 }).map((_, i) => (
  //       <ellipse
  //         key={`outer-${i}`}
  //         cx="50"
  //         cy="15"
  //         rx="8"
  //         ry="15"
  //         fill="#ff6b35"
  //         transform={`rotate(${i * 45} 50 50)`}
  //       />
  //     ))}
  //     {/* Middle petals */}
  //     {Array.from({ length: 8 }).map((_, i) => (
  //       <ellipse
  //         key={`mid-${i}`}
  //         cx="50"
  //         cy="25"
  //         rx="6"
  //         ry="12"
  //         fill="#ff0066"
  //         transform={`rotate(${i * 45 + 22.5} 50 50)`}
  //       />
  //     ))}
  //     {/* Inner petals */}
  //     {Array.from({ length: 8 }).map((_, i) => (
  //       <ellipse
  //         key={`inner-${i}`}
  //         cx="50"
  //         cy="35"
  //         rx="4"
  //         ry="8"
  //         fill="#ffcc00"
  //         transform={`rotate(${i * 45} 50 50)`}
  //       />
  //     ))}
  //     {/* Center */}
  //     <circle cx="50" cy="50" r="10" fill="#ff0066" />
  //     <circle cx="50" cy="50" r="6" fill="#ffcc00" />
  //     <circle cx="50" cy="50" r="3" fill="#fff" />
  //   </svg>
  // </div>
);

// Tree
export const Tree: React.FC<{ x: number; variant?: 'palm' | 'banyan' | 'mango' }> = ({
  x,
  variant = 'mango',
}) => {
  if (variant === 'palm') {
    return (
      <div className="absolute bottom-[15%]" style={{ left: x }}>
        <svg width="80" height="200" viewBox="0 0 80 200">
          {/* Trunk */}
          <path d="M35 200 Q38 150 40 80 Q42 150 45 200" fill="#8b4513" />
          {/* Fronds */}
          {[-60, -30, 0, 30, 60].map((angle, i) => (
            <path
              key={i}
              d={`M40 80 Q${40 + angle} 40 ${40 + angle * 1.5} 20`}
              fill="none"
              stroke="#228b22"
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute bottom-[15%]" style={{ left: x }}>
      <svg width="120" height="180" viewBox="0 0 120 180">
        {/* Trunk */}
        <rect x="50" y="120" width="20" height="60" fill="#8b4513" />
        {/* Foliage */}
        <ellipse cx="60" cy="70" rx="55" ry="60" fill="#228b22" />
        <ellipse cx="45" cy="50" rx="35" ry="40" fill="#2e8b2e" />
        <ellipse cx="75" cy="55" rx="30" ry="35" fill="#32cd32" />
        <ellipse cx="60" cy="40" rx="25" ry="30" fill="#3cb371" />
      </svg>
    </div>
  );
};

// Decorated Car
export const WeddingCar: React.FC<{ x: number; flipped?: boolean }> = ({ x, flipped = false }) => (
  <div
    className={x === 0 ? "relative" : "absolute bottom-[12%]"}
    style={x !== 0 ? { left: x, transform: flipped ? 'scaleX(-1)' : 'none' } : { transform: flipped ? 'scaleX(-1)' : 'none' }}
  >
    <svg width="180" height="100" viewBox="0 0 180 100">
      {/* Car body */}
      <path
        d="M20 70 L20 50 Q30 30 60 30 L120 30 Q150 30 160 50 L160 70 Z"
        fill="#fff"
        stroke="#ccc"
        strokeWidth="2"
      />
      {/* Windows */}
      <path d="M45 35 L55 50 L85 50 L85 35 Z" fill="#87ceeb" />
      <path d="M95 35 L95 50 L125 50 L135 35 Z" fill="#87ceeb" />
      {/* Wheels */}
      <circle cx="45" cy="75" r="15" fill="#333" />
      <circle cx="45" cy="75" r="8" fill="#666" />
      <circle cx="135" cy="75" r="15" fill="#333" />
      <circle cx="135" cy="75" r="8" fill="#666" />
      {/* Decorations */}
      <path d="M10 45 Q90 20 170 45" fill="none" stroke="#ff6b35" strokeWidth="4" />
      {/* Flowers on hood */}
      <circle cx="60" cy="40" r="8" fill="#ff69b4" />
      <circle cx="80" cy="38" r="8" fill="#ff6b35" />
      <circle cx="100" cy="40" r="8" fill="#ff69b4" />
      {/* Ribbon */}
      <path d="M90 25 L85 10 M90 25 L95 10" stroke="#d4af37" strokeWidth="3" />
    </svg>
  </div>
);

// Welcome Gate/Arch
export const WelcomeGate: React.FC<{ x: number; title?: string }> = ({ x, title = 'Welcome' }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[12%]"} style={x !== 0 ? { left: x } : undefined}>
    <svg width="300" height="350" viewBox="0 0 300 350">
      {/* Left pillar */}
      <rect x="20" y="100" width="40" height="250" fill="#d4af37" />
      <rect x="25" y="100" width="30" height="250" fill="#f4e4bc" />
      
      {/* Right pillar */}
      <rect x="240" y="100" width="40" height="250" fill="#d4af37" />
      <rect x="245" y="100" width="30" height="250" fill="#f4e4bc" />
      
      {/* Arch */}
      <path
        d="M20 100 Q150 -20 280 100"
        fill="none"
        stroke="#d4af37"
        strokeWidth="30"
      />
      <path
        d="M30 100 Q150 0 270 100"
        fill="none"
        stroke="#f4e4bc"
        strokeWidth="15"
      />
      
      {/* Flower decorations on arch */}
      {[0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9].map((t, i) => {
        const angle = Math.PI * (1 - t);
        const r = 130;
        const cx = 150 + Math.cos(angle) * r * 0.9;
        const cy = 100 - Math.sin(angle) * r * 0.7;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="12" fill="#ff6b35" />
            <circle cx={cx} cy={cy} r="7" fill="#ffa500" />
            <circle cx={cx} cy={cy} r="3" fill="#ffcc00" />
          </g>
        );
      })}
      
      {/* Hanging garlands */}
      <path d="M60 100 Q90 150 60 180" fill="none" stroke="#228b22" strokeWidth="8" />
      <path d="M240 100 Q210 150 240 180" fill="none" stroke="#228b22" strokeWidth="8" />
      
      {/* Marigold strings */}
      {[80, 120, 180, 220].map((lx, i) => (
        <g key={i}>
          <line x1={lx} y1="80" x2={lx} y2="130" stroke="#228b22" strokeWidth="2" />
          {[90, 105, 120].map((ly, j) => (
            <circle key={j} cx={lx} cy={ly} r="6" fill="#ff8c00" />
          ))}
        </g>
      ))}
      
      {/* Title banner */}
      <rect x="70" y="50" width="160" height="40" fill="#800020" rx="5" />
      <text
        x="150"
        y="78"
        textAnchor="middle"
        fill="#d4af37"
        fontSize="20"
        fontFamily="serif"
        fontWeight="bold"
      >
        {title}
      </text>
    </svg>
  </div>
);

// Event Banner with animation and decorative hanging ropes
export const EventBanner: React.FC<{ 
  x: number; 
  title: string; 
  subtitle?: string;
  isActive?: boolean;
}> = ({
  x,
  title,
  subtitle,
  isActive = false,
}) => {
  const [showBanner, setShowBanner] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isActive) {
      // Delay showing the banner by 300ms after entering section (reduced for faster appearance)
      timeoutRef.current = setTimeout(() => {
        setShowBanner(true);
      }, 300);
    } else {
      // Hide immediately when leaving
      setShowBanner(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive]);

  return (
  <motion.div 
    className="absolute top-0 origin-top scale-50 sm:scale-75 md:scale-100 z-40" 
    style={{ left: x, position: 'absolute' }}
    initial={{ y: -200, opacity: 0 }}
    animate={{ 
      y: showBanner ? 80 : -400, 
      opacity: showBanner ? 1 : 0,
    }}
    transition={{ 
      type: 'spring', 
      stiffness: 70, 
      damping: 14,
      delay: showBanner ? 0.1 : 0, // Small additional delay when showing
    }}
  >
    <div className="relative">
      {/* Fancy Hanging Ropes with Banner - Wider */}
      <svg width="360" height="400" viewBox="0 0 360 400">
        <defs>
          {/* Gold gradient for ropes */}
          <linearGradient id="ropeGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F4E4BC" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          {/* Bead gradient */}
          <radialGradient id="beadGold" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#FFE4A0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
          {/* Jewel gradient */}
          <radialGradient id="jewelRed" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#C41E3A" />
            <stop offset="100%" stopColor="#800020" />
          </radialGradient>
        </defs>

        {/* Top decorative bar (where ropes attach) - bigger and wider */}
        <rect x="20" y="0" width="320" height="14" fill="url(#ropeGold)" rx="7" />
        <circle cx="40" cy="7" r="9" fill="url(#beadGold)" />
        <circle cx="320" cy="7" r="9" fill="url(#beadGold)" />
        <circle cx="180" cy="7" r="8" fill="url(#jewelRed)" />

        {/* Left rope with beads and twist */}
        <g>
          {/* Main rope strand - longer and thicker */}
          <path 
            d="M50 14 Q40 80 50 150 Q60 220 50 250" 
            fill="none" 
            stroke="url(#ropeGold)" 
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Rope twist overlay */}
          <path 
            d="M50 14 Q60 80 50 150 Q40 220 50 250" 
            fill="none" 
            stroke="#B8960C" 
            strokeWidth="5"
            strokeDasharray="10,10"
          />
          {/* Decorative beads - bigger */}
          <circle cx="46" cy="50" r="9" fill="url(#beadGold)" />
          <circle cx="54" cy="90" r="8" fill="url(#jewelRed)" />
          <circle cx="47" cy="130" r="9" fill="url(#beadGold)" />
          <circle cx="53" cy="170" r="8" fill="url(#jewelRed)" />
          <circle cx="50" cy="210" r="10" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="2" />
          <circle cx="50" cy="240" r="11" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="2" />
        </g>

        {/* Right rope with beads and twist */}
        <g>
          {/* Main rope strand - longer and thicker */}
          <path 
            d="M310 14 Q320 80 310 150 Q300 220 310 250" 
            fill="none" 
            stroke="url(#ropeGold)" 
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Rope twist overlay */}
          <path 
            d="M310 14 Q300 80 310 150 Q320 220 310 250" 
            fill="none" 
            stroke="#B8960C" 
            strokeWidth="5"
            strokeDasharray="10,10"
          />
          {/* Decorative beads - bigger */}
          <circle cx="314" cy="50" r="9" fill="url(#beadGold)" />
          <circle cx="306" cy="90" r="8" fill="url(#jewelRed)" />
          <circle cx="313" cy="130" r="9" fill="url(#beadGold)" />
          <circle cx="307" cy="170" r="8" fill="url(#jewelRed)" />
          <circle cx="310" cy="210" r="10" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="2" />
          <circle cx="310" cy="240" r="11" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="2" />
        </g>

        {/* Decorative swag chain between ropes - adjusted for wider banner */}
        <path 
          d="M60 50 Q180 80 300 50" 
          fill="none" 
          stroke="url(#ropeGold)" 
          strokeWidth="7"
        />
        {/* Beads on swag chain - bigger */}
        <circle cx="120" cy="60" r="7" fill="url(#jewelRed)" />
        <circle cx="180" cy="70" r="8" fill="url(#beadGold)" />
        <circle cx="240" cy="60" r="7" fill="url(#jewelRed)" />

        {/* Main Banner - moved down and wider */}
        <g transform="translate(15, 245)">
          {/* Banner shadow */}
          <path
            d="M17 14 L313 14 L313 76 L165 100 L17 76 Z"
            fill="rgba(0,0,0,0.25)"
          />
          {/* Banner body - maroon with gold border */}
          <path
            d="M15 12 L315 12 L315 74 L165 98 L15 74 Z"
            fill="#800020"
            stroke="#d4af37"
            strokeWidth="3"
          />
          {/* Inner decorative border */}
          <path
            d="M25 20 L305 20 L305 68 L165 88 L25 68 Z"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1.5"
            opacity="0.5"
          />
          {/* Top decorative bar - wider */}
          <rect x="10" y="6" width="310" height="14" fill="url(#ropeGold)" rx="5" />
          
          {/* Corner rosettes - left */}
          <g transform="translate(15, 12)">
            <circle r="14" fill="url(#beadGold)" />
            <circle r="8" fill="url(#jewelRed)" />
            <circle r="3" fill="#FFE4A0" />
          </g>
          {/* Corner rosettes - right */}
          <g transform="translate(315, 12)">
            <circle r="14" fill="url(#beadGold)" />
            <circle r="8" fill="url(#jewelRed)" />
            <circle r="3" fill="#FFE4A0" />
          </g>

          {/* Marigold flowers on top bar - more flowers for wider banner */}
          {[70, 110, 150, 165, 180, 220, 260].map((fx, i) => (
            <g key={i} transform={`translate(${fx}, 10)`}>
              <circle r="8" fill="#FF8C00" />
              <circle r="5" fill="#FFA500" />
              <circle r="2.5" fill="#FFCC00" />
            </g>
          ))}

          {/* Bottom tassels */}
          {/* Left tassel */}
          <g transform="translate(70, 74)">
            <line x1="0" y1="0" x2="0" y2="22" stroke="url(#ropeGold)" strokeWidth="5" />
            <ellipse cx="0" cy="28" rx="8" ry="10" fill="url(#beadGold)" />
            <circle cx="0" cy="28" r="5" fill="url(#jewelRed)" />
            <path d="M-7 38 L0 58 L7 38" fill="#D4AF37" />
            <path d="M-4 38 L0 52 L4 38" fill="#F4E4BC" />
          </g>
          {/* Center tassel (larger) */}
          <g transform="translate(165, 98)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="url(#ropeGold)" strokeWidth="6" />
            <ellipse cx="0" cy="28" rx="12" ry="14" fill="url(#beadGold)" />
            <circle cx="0" cy="28" r="7" fill="url(#jewelRed)" />
            <circle cx="0" cy="28" r="3" fill="#FFE4A0" />
            <path d="M-10 42 L0 68 L10 42" fill="#D4AF37" />
            <path d="M-6 42 L0 60 L6 42" fill="#F4E4BC" />
          </g>
          {/* Right tassel */}
          <g transform="translate(260, 74)">
            <line x1="0" y1="0" x2="0" y2="22" stroke="url(#ropeGold)" strokeWidth="5" />
            <ellipse cx="0" cy="28" rx="8" ry="10" fill="url(#beadGold)" />
            <circle cx="0" cy="28" r="5" fill="url(#jewelRed)" />
            <path d="M-7 38 L0 58 L7 38" fill="#D4AF37" />
            <path d="M-4 38 L0 52 L4 38" fill="#F4E4BC" />
          </g>
        </g>
      </svg>

      {/* Text overlay - improved fonts and wider layout */}
      <div 
        className="absolute flex flex-col items-center justify-center"
        style={{ 
          top: 275, 
          left: 'clamp(25px, 10%, 40px)', 
          width: 'clamp(250px, 85%, 300px)', 
          height: title.length > 15 ? 80 : 65 
        }}
      >
        <h2
          className="font-extrabold text-[#d4af37] drop-shadow-2xl text-center px-2 tracking-wide"
          style={{ 
            fontFamily: '"Playfair Display", "Georgia", serif', 
            textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)',
            fontSize: title.length > 15 ? 'clamp(1.1rem, 3.5vw, 1.4rem)' : 'clamp(1.4rem, 4vw, 1.9rem)',
            lineHeight: '1.3',
            wordBreak: 'break-word',
            letterSpacing: '0.05em',
            fontWeight: 800,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className="text-[#f4e4bc] drop-shadow-lg text-center px-2 mt-2 italic" 
            style={{ 
              fontFamily: '"Dancing Script", "Brush Script MT", cursive', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,0.8)',
              fontSize: 'clamp(0.95rem, 2.8vw, 1.3rem)',
              lineHeight: '1.4',
              letterSpacing: '0.03em',
              fontWeight: 600,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </motion.div>
  );
};

// Mehendi Scene - Enhanced with more people, lights, and decorations
export const MehendiScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    {/* Decorated area */}
    <div className="relative w-[700px] h-[400px]">
      
      {/* Background decorative elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="none">
        <defs>
          {/* Gradient for backdrop */}
          <linearGradient id="mehendiBackdrop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a1942" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2d1f3d" stopOpacity="0.3" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Sparkle gradient */}
          <radialGradient id="sparkle" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Soft backdrop */}
        <rect x="50" y="50" width="600" height="300" fill="url(#mehendiBackdrop)" rx="20" />
        
        {/* Decorative arch/canopy frame */}
        <path 
          d="M80 350 L80 100 Q350 20 620 100 L620 350" 
          fill="none" 
          stroke="#d4af37" 
          strokeWidth="8"
          opacity="0.7"
        />
        <path 
          d="M90 345 L90 110 Q350 35 610 110 L610 345" 
          fill="none" 
          stroke="#ff69b4" 
          strokeWidth="4"
          opacity="0.5"
        />
        
        {/* Hanging flower garlands from arch */}
        {[120, 200, 280, 350, 420, 500, 580].map((gx, i) => (
          <g key={`garland-${i}`}>
            <path 
              d={`M${gx} ${60 + Math.sin(i) * 20} Q${gx + 10} ${120 + i * 5} ${gx} ${150 + i * 3}`}
              fill="none"
              stroke="#228b22"
              strokeWidth="3"
            />
            {/* Marigold flowers on garland */}
            {[0, 25, 50, 75].map((offset, j) => (
              <g key={`flower-${i}-${j}`} transform={`translate(${gx + (j % 2) * 5}, ${80 + offset + i * 3})`}>
                <circle r="8" fill="#ff8c00" />
                <circle r="5" fill="#ffa500" />
                <circle r="2" fill="#ffcc00" />
              </g>
            ))}
          </g>
        ))}
        
        {/* String lights across the top */}
        <path 
          d="M100 80 Q350 50 600 80" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2"
        />
        {[130, 180, 230, 280, 330, 380, 430, 480, 530, 570].map((lx, i) => (
          <g key={`light-${i}`}>
            <circle 
              cx={lx} 
              cy={65 + Math.sin(i * 0.8) * 10} 
              r="8" 
              fill={['#ff69b4', '#ffff00', '#00ffff', '#ff6b35', '#9932cc'][i % 5]}
              filter="url(#glow)"
              className="glow"
              style={{ '--glow-color': ['#ff69b4', '#ffff00', '#00ffff', '#ff6b35', '#9932cc'][i % 5] } as React.CSSProperties}
            />
            <circle 
              cx={lx} 
              cy={65 + Math.sin(i * 0.8) * 10} 
              r="4" 
              fill="#fff"
              opacity="0.8"
            />
          </g>
        ))}
        
        {/* Sparkles/twinkles in background */}
        {[150, 250, 400, 550, 180, 480, 320].map((sx, i) => (
          <circle 
            key={`sparkle-${i}`}
            cx={sx} 
            cy={100 + (i * 30) % 150} 
            r="3"
            fill="url(#sparkle)"
            className="star"
            style={{ '--delay': `${i * 0.3}s`, '--duration': '2s' } as React.CSSProperties}
          />
        ))}
        
        {/* Floating flower petals */}
        {[100, 200, 350, 500, 600].map((px, i) => (
          <g key={`petal-${i}`} className="petal" style={{ '--fall-duration': `${5 + i}s`, '--fall-delay': `${i * 0.5}s` } as React.CSSProperties}>
            <ellipse 
              cx={px} 
              cy={50 + i * 20} 
              rx="6" 
              ry="10" 
              fill="#ff69b4"
              opacity="0.7"
              transform={`rotate(${i * 30} ${px} ${50 + i * 20})`}
            />
          </g>
        ))}
        
        {/* Decorative rangoli on floor */}
        <g transform="translate(350, 340)">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={`rangoli-${i}`}
              cx="0"
              cy="-30"
              rx="15"
              ry="30"
              fill={i % 2 === 0 ? '#ff6b35' : '#ff1493'}
              transform={`rotate(${i * 45} 0 0)`}
              opacity="0.6"
            />
          ))}
          <circle cx="0" cy="0" r="20" fill="#ffcc00" opacity="0.5" />
          <circle cx="0" cy="0" r="12" fill="#ff69b4" opacity="0.6" />
        </g>
      </svg>
      
      {/* Floor mat/carpet - larger */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg width="550" height="60" viewBox="0 0 550 60">
          <rect x="0" y="0" width="550" height="60" fill="#8b0000" rx="5" />
          <rect x="10" y="5" width="530" height="50" fill="#cd5c5c" rx="3" />
          {/* Decorative pattern */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={i}>
              <circle cx={40 + i * 40} cy="30" r="12" fill="#ffd700" opacity="0.4" />
              <circle cx={40 + i * 40} cy="30" r="6" fill="#ff6b35" opacity="0.6" />
            </g>
          ))}
          {/* Border design */}
          <rect x="5" y="2" width="540" height="4" fill="#d4af37" opacity="0.7" />
          <rect x="5" y="54" width="540" height="4" fill="#d4af37" opacity="0.7" />
        </svg>
      </div>
      
      {/* Cushions - more of them */}
      {[60, 140, 220, 300, 380, 460].map((cx, i) => (
        <div key={i} className="absolute bottom-[25px]" style={{ left: cx }}>
          <svg width="70" height="45" viewBox="0 0 70 45">
            <ellipse cx="35" cy="28" rx="32" ry="17" fill={['#ff69b4', '#9932cc', '#ff1493', '#ff6b35', '#00bcd4', '#ff69b4'][i]} />
            <ellipse cx="35" cy="23" rx="28" ry="14" fill={['#ff1493', '#7b1fa2', '#e91e63', '#ff8c00', '#00acc1', '#ff1493'][i]} />
            {/* Tassels */}
            <circle cx="5" cy="28" r="5" fill="#ffd700" />
            <circle cx="65" cy="28" r="5" fill="#ffd700" />
            {/* Center decoration */}
            <circle cx="35" cy="23" r="6" fill="#ffd700" opacity="0.6" />
          </svg>
        </div>
      ))}
      
      {/* People - More guests */}
      
      {/* Mehendi artist 1 - applying mehendi to bride */}
      <div className="absolute bottom-[70px] left-[80px]">
        <Guest isMoving={false} variant="female" color="#9932cc" scale={0.95} />
      </div>
      
      {/* Bride getting mehendi - center */}
      <div className="absolute bottom-[70px] left-[160px]">
        <Guest isMoving={false} variant="female" color="#ff1493" scale={1} />
      </div>
      
      {/* Mehendi artist 2 */}
      <div className="absolute bottom-[70px] left-[240px]">
        <Guest isMoving={false} variant="female" color="#7b1fa2" scale={0.9} />
      </div>
      
      {/* Friend/relative watching - sitting */}
      <div className="absolute bottom-[70px] left-[320px]">
        <Guest isMoving={false} variant="female" color="#e91e63" scale={0.85} />
      </div>
      
      {/* Another friend getting mehendi */}
      <div className="absolute bottom-[70px] left-[400px]">
        <Guest isMoving={false} variant="female" color="#ff6b35" scale={0.9} />
      </div>
      
      {/* Standing guests in background */}
      <div className="absolute bottom-[120px] left-[50px]">
        <Guest isMoving={false} variant="female" color="#00bcd4" scale={0.75} />
      </div>
      
      <div className="absolute bottom-[130px] left-[280px]">
        <Guest isMoving={false} variant="female" color="#8bc34a" scale={0.7} />
      </div>
      
      <div className="absolute bottom-[125px] left-[480px]">
        <Guest isMoving={false} variant="female" color="#ff9800" scale={0.75} />
      </div>
      
      {/* Male guest (maybe brother/father) */}
      <div className="absolute bottom-[135px] left-[550px]">
        <Guest isMoving={false} variant="male" color="#3f51b5" scale={0.7} />
      </div>
      
      {/* Mehendi cones and supplies */}
      <div className="absolute bottom-[35px] left-[130px]">
        <svg width="80" height="40" viewBox="0 0 80 40">
          {/* Mehendi cones */}
          <path d="M10 35 L17 8 L24 35 Z" fill="#228b22" />
          <path d="M30 35 L37 8 L44 35 Z" fill="#2e7d32" />
          <path d="M50 35 L57 8 L64 35 Z" fill="#1b5e20" />
          {/* Small bowl */}
          <ellipse cx="72" cy="30" rx="8" ry="5" fill="#8d6e63" />
          <ellipse cx="72" cy="28" rx="6" ry="3" fill="#228b22" />
        </svg>
      </div>
      
      {/* More mehendi supplies */}
      <div className="absolute bottom-[35px] left-[380px]">
        <svg width="60" height="35" viewBox="0 0 60 35">
          <path d="M8 30 L14 5 L20 30 Z" fill="#228b22" />
          <path d="M28 30 L34 5 L40 30 Z" fill="#2e7d32" />
          {/* Decorative plate */}
          <ellipse cx="52" cy="25" rx="10" ry="6" fill="#d4af37" />
          <ellipse cx="52" cy="23" rx="7" ry="4" fill="#ff6b35" opacity="0.6" />
        </svg>
      </div>
      
      {/* Decorative diyas/candles on sides */}
      <div className="absolute bottom-[50px] left-[20px]">
        <svg width="30" height="40" viewBox="0 0 30 40">
          <ellipse cx="15" cy="32" rx="12" ry="6" fill="#cd853f" />
          <ellipse cx="15" cy="30" rx="10" ry="5" fill="#daa520" />
          <path d="M15 25 Q20 18 17 10 Q15 5 13 10 Q10 18 15 25" fill="#ff6b00" className="flame" />
          <path d="M15 25 Q18 20 16 14 Q15 10 14 14 Q12 20 15 25" fill="#ffff00" className="flame" />
        </svg>
      </div>
      
      <div className="absolute bottom-[50px] left-[620px]">
        <svg width="30" height="40" viewBox="0 0 30 40">
          <ellipse cx="15" cy="32" rx="12" ry="6" fill="#cd853f" />
          <ellipse cx="15" cy="30" rx="10" ry="5" fill="#daa520" />
          <path d="M15 25 Q20 18 17 10 Q15 5 13 10 Q10 18 15 25" fill="#ff6b00" className="flame" />
          <path d="M15 25 Q18 20 16 14 Q15 10 14 14 Q12 20 15 25" fill="#ffff00" className="flame" />
        </svg>
      </div>
      
      {/* Flower vases on sides */}
      <div className="absolute bottom-[60px] left-[0px]">
        <svg width="50" height="80" viewBox="0 0 50 80">
          {/* Vase */}
          <path d="M15 80 L10 50 Q5 40 15 35 L35 35 Q45 40 40 50 L35 80 Z" fill="#8d6e63" />
          <ellipse cx="25" cy="35" rx="12" ry="5" fill="#6d4c41" />
          {/* Flowers */}
          <circle cx="20" cy="20" r="10" fill="#ff69b4" />
          <circle cx="30" cy="15" r="10" fill="#ff1493" />
          <circle cx="25" cy="25" r="8" fill="#e91e63" />
          <circle cx="20" cy="20" r="5" fill="#ffcc00" />
          <circle cx="30" cy="15" r="5" fill="#ffcc00" />
          {/* Leaves */}
          <ellipse cx="12" cy="30" rx="5" ry="10" fill="#228b22" transform="rotate(-30 12 30)" />
          <ellipse cx="38" cy="28" rx="5" ry="10" fill="#228b22" transform="rotate(30 38 28)" />
        </svg>
      </div>
      
      <div className="absolute bottom-[60px] left-[650px]">
        <svg width="50" height="80" viewBox="0 0 50 80">
          {/* Vase */}
          <path d="M15 80 L10 50 Q5 40 15 35 L35 35 Q45 40 40 50 L35 80 Z" fill="#8d6e63" />
          <ellipse cx="25" cy="35" rx="12" ry="5" fill="#6d4c41" />
          {/* Flowers */}
          <circle cx="20" cy="20" r="10" fill="#ff6b35" />
          <circle cx="30" cy="15" r="10" fill="#ff8c00" />
          <circle cx="25" cy="25" r="8" fill="#ffa500" />
          <circle cx="20" cy="20" r="5" fill="#ffcc00" />
          <circle cx="30" cy="15" r="5" fill="#ffcc00" />
          {/* Leaves */}
          <ellipse cx="12" cy="30" rx="5" ry="10" fill="#228b22" transform="rotate(-30 12 30)" />
          <ellipse cx="38" cy="28" rx="5" ry="10" fill="#228b22" transform="rotate(30 38 28)" />
        </svg>
      </div>
    </div>
  </div>
);

// Sangeet Scene (Music & Dance)
export const SangeetScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[500px] h-[300px]">
      {/* Stage */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg width="450" height="100" viewBox="0 0 450 100">
          {/* Stage platform */}
          <rect x="0" y="50" width="450" height="50" fill="#4a0012" />
          <rect x="10" y="40" width="430" height="15" fill="#800020" />
          {/* Stage lights */}
          {[50, 150, 250, 350, 400].map((lx, i) => (
            <g key={i}>
              <circle cx={lx} cy="20" r="15" fill={i % 2 === 0 ? '#ff0' : '#f0f'} opacity="0.8" />
              <circle cx={lx} cy="20" r="8" fill="#fff" />
            </g>
          ))}
        </svg>
      </div>
      
      {/* Dancers */}
      {[100, 200, 300].map((dx, i) => (
        <div key={i} className="absolute bottom-[100px]" style={{ left: dx }}>
          <Guest isMoving={true} variant="female" color={['#ff6b35', '#ff1493', '#9932cc'][i]} />
        </div>
      ))}
      
      {/* Big Speakers - Left */}
      <div className="absolute bottom-[80px] left-[20px]">
        <svg width="100" height="150" viewBox="0 0 100 150">
          {/* Speaker box */}
          <rect x="10" y="20" width="80" height="130" fill="#1a1a1a" rx="5" />
          <rect x="15" y="25" width="70" height="120" fill="#2d2d2d" rx="3" />
          {/* Speaker grille */}
          <rect x="25" y="40" width="50" height="90" fill="#000" rx="2" />
          {/* Speaker cone */}
          <circle cx="50" cy="85" r="20" fill="#333" />
          <circle cx="50" cy="85" r="12" fill="#1a1a1a" />
          <circle cx="50" cy="85" r="6" fill="#000" />
          {/* Speaker stand */}
          <rect x="45" y="150" width="10" height="20" fill="#1a1a1a" />
        </svg>
      </div>
      
      {/* Big Speakers - Right */}
      <div className="absolute bottom-[80px] right-[20px]">
        <svg width="100" height="150" viewBox="0 0 100 150">
          {/* Speaker box */}
          <rect x="10" y="20" width="80" height="130" fill="#1a1a1a" rx="5" />
          <rect x="15" y="25" width="70" height="120" fill="#2d2d2d" rx="3" />
          {/* Speaker grille */}
          <rect x="25" y="40" width="50" height="90" fill="#000" rx="2" />
          {/* Speaker cone */}
          <circle cx="50" cy="85" r="20" fill="#333" />
          <circle cx="50" cy="85" r="12" fill="#1a1a1a" />
          <circle cx="50" cy="85" r="6" fill="#000" />
          {/* Speaker stand */}
          <rect x="45" y="150" width="10" height="20" fill="#1a1a1a" />
        </svg>
      </div>
      
      {/* DJ/Musicians */}
      <div className="absolute bottom-[100px] left-[380px]">
        <svg width="80" height="80" viewBox="0 0 80 80">
          {/* DJ booth */}
          <rect x="10" y="40" width="60" height="40" fill="#333" rx="5" />
          <rect x="15" y="45" width="20" height="15" fill="#222" rx="2" />
          <rect x="45" y="45" width="20" height="15" fill="#222" rx="2" />
          {/* Turntables */}
          <circle cx="25" cy="52" r="6" fill="#111" />
          <circle cx="55" cy="52" r="6" fill="#111" />
          <circle cx="25" cy="52" r="2" fill="#d4af37" />
          <circle cx="55" cy="52" r="2" fill="#d4af37" />
        </svg>
      </div>
      
      {/* Music notes floating */}
      {[60, 150, 280].map((nx, i) => (
        <div
          key={i}
          className="absolute float"
          style={{ left: nx, bottom: 180 + i * 20, animationDelay: `${i * 0.3}s` }}
        >
          <span className="text-3xl">♪</span>
        </div>
      ))}
    </div>
  </div>
);

// Haldi Scene (Turmeric ceremony)
export const HaldiScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* ===== BACKGROUND DECORATIONS ===== */}
      
      {/* Sunny/joyful background glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-yellow-300/30 via-orange-200/20 to-transparent rounded-full blur-3xl" />
      
      {/* String lights at the top */}
      <svg className="absolute -top-10 left-0" width="550" height="60" viewBox="0 0 550 60">
        {/* Main wire */}
        <path d="M0 20 Q70 40 140 20 Q210 0 280 20 Q350 40 420 20 Q490 0 550 20" fill="none" stroke="#8b4513" strokeWidth="2" />
        {/* Light bulbs */}
        {[35, 105, 175, 245, 315, 385, 455, 520].map((lx, i) => (
          <g key={i}>
            <line x1={lx} y1="20" x2={lx} y2="30" stroke="#8b4513" strokeWidth="1" />
            <circle cx={lx} cy="35" r="8" fill={['#ffff00', '#ffd700', '#ff8c00', '#ffff00'][i % 4]} className="light-glow" style={{ animationDelay: `${i * 0.2}s` }} />
            <circle cx={lx} cy="35" r="4" fill="#fff" opacity="0.8" />
          </g>
        ))}
      </svg>
      
      {/* Decorative bunting/flags */}
      <svg className="absolute top-0 left-0" width="550" height="50" viewBox="0 0 550 50">
        {Array.from({ length: 18 }).map((_, i) => (
          <polygon
            key={i}
            points={`${i * 30 + 10},5 ${i * 30 + 25},5 ${i * 30 + 17.5},35`}
            fill={['#ff6b35', '#ffd700', '#ff1493', '#00ff00', '#ffff00'][i % 5]}
            opacity="0.8"
          />
        ))}
      </svg>
      
      {/* Floating flower petals animation */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="absolute animate-float"
          style={{
            left: 30 + (i * 35),
            top: 20 + (i % 4) * 30,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <ellipse cx="6" cy="6" rx="5" ry="3" fill={['#ffff00', '#ffd700', '#ff8c00'][i % 3]} opacity="0.7" transform={`rotate(${i * 25})`} />
          </svg>
        </div>
      ))}
      
      {/* ===== CANOPY/TENT STRUCTURE ===== */}
      <svg className="absolute top-10 left-1/2 -translate-x-1/2" width="480" height="150" viewBox="0 0 480 150">
        {/* Tent poles */}
        <rect x="20" y="50" width="12" height="200" fill="#8b4513" />
        <rect x="448" y="50" width="12" height="200" fill="#8b4513" />
        {/* Tent fabric */}
        <path d="M0 60 Q240 -20 480 60" fill="#ff8c00" opacity="0.6" />
        <path d="M10 60 Q240 -10 470 60" fill="#ffd700" opacity="0.5" />
        {/* Scalloped edge */}
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={15 + i * 30} cy="60" r="12" fill="#ff6b35" opacity="0.8" />
        ))}
        {/* Tassels hanging */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`tassel-${i}`}>
            <line x1={30 + i * 60} y1="60" x2={30 + i * 60} y2="90" stroke="#d4af37" strokeWidth="2" />
            <circle cx={30 + i * 60} cy="95" r="6" fill="#d4af37" />
            <path d={`M${24 + i * 60} 95 Q${30 + i * 60} 115 ${36 + i * 60} 95`} fill="none" stroke="#d4af37" strokeWidth="3" />
          </g>
        ))}
      </svg>
      
      {/* Marigold garlands hanging */}
      <svg className="absolute top-[60px] left-0" width="550" height="80" viewBox="0 0 550 80">
        {/* Garland 1 */}
        <path d="M50 10 Q150 50 275 40 Q400 30 500 10" fill="none" stroke="#ff8c00" strokeWidth="18" />
        <path d="M50 10 Q150 50 275 40 Q400 30 500 10" fill="none" stroke="#ffd700" strokeWidth="10" />
        {/* Individual flowers on garland */}
        {[80, 140, 200, 260, 320, 380, 440].map((gx, i) => (
          <circle key={i} cx={gx} cy={25 + Math.sin(i) * 10} r="10" fill="#ff6b35" />
        ))}
      </svg>
      
      {/* ===== YELLOW/TURMERIC THEMED BACKDROP ===== */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg width="500" height="100" viewBox="0 0 500 100">
          {/* Larger decorated platform */}
          <rect x="0" y="30" width="500" height="70" fill="#ffd700" opacity="0.4" rx="15" />
          <rect x="20" y="40" width="460" height="60" fill="#ffff00" opacity="0.3" rx="12" />
          {/* Yellow splash effects */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={40 + i * 60} cy={50 + (i % 2) * 20} r={15 + (i % 3) * 5} fill="#ffd700" opacity="0.2" />
          ))}
        </svg>
      </div>
      
      {/* ===== DECORATED SEAT/CHOWKI ===== */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2">
        <svg width="160" height="80" viewBox="0 0 160 80">
          {/* Main seat */}
          <rect x="10" y="40" width="140" height="40" fill="#8b4513" rx="5" />
          <rect x="5" y="32" width="150" height="12" fill="#d2691e" rx="3" />
          {/* Decorative carvings */}
          {[25, 55, 85, 115, 135].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="60" r="8" fill="#a0522d" />
              <circle cx={cx} cy="60" r="4" fill="#d4af37" />
            </g>
          ))}
          {/* Marigold decoration on top */}
          {[15, 35, 55, 75, 95, 115, 135, 150].map((fx, i) => (
            <g key={`flower-${i}`}>
              <circle cx={fx} cy="28" r="10" fill="#ff8c00" />
              <circle cx={fx} cy="28" r="5" fill="#ffd700" />
            </g>
          ))}
          {/* Leaves */}
          {[25, 65, 105, 140].map((lx, i) => (
            <ellipse key={`leaf-${i}`} cx={lx} cy="25" rx="8" ry="4" fill="#228b22" transform={`rotate(${-20 + i * 15} ${lx} 25)`} />
          ))}
        </svg>
      </div>
      
      {/* ===== RANGOLI ON FLOOR ===== */}
      <svg className="absolute bottom-[20px] left-[80px]" width="80" height="40" viewBox="0 0 80 40">
        <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke="#ff6b35" strokeWidth="3" />
        <ellipse cx="40" cy="20" rx="25" ry="10" fill="none" stroke="#ffd700" strokeWidth="2" />
        <ellipse cx="40" cy="20" rx="15" ry="6" fill="#ff1493" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={40 + Math.cos(rad) * 30} cy={20 + Math.sin(rad) * 12} r="4" fill="#ff6b35" />;
        })}
      </svg>
      
      <svg className="absolute bottom-[20px] right-[80px]" width="80" height="40" viewBox="0 0 80 40">
        <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke="#ffd700" strokeWidth="3" />
        <ellipse cx="40" cy="20" rx="25" ry="10" fill="none" stroke="#ff8c00" strokeWidth="2" />
        <ellipse cx="40" cy="20" rx="15" ry="6" fill="#ffff00" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={40 + Math.cos(rad) * 30} cy={20 + Math.sin(rad) * 12} r="4" fill="#ffd700" />;
        })}
      </svg>
      
      {/* ===== PERSON GETTING HALDI (CENTER) ===== */}
      <div className="absolute bottom-[100px] left-[220px]">
        <svg width="80" height="120" viewBox="0 0 80 120">
          {/* Person sitting on stool - covered in haldi */}
          {/* Body */}
          <ellipse cx="40" cy="100" rx="25" ry="10" fill="#f5f5dc" /> {/* Sitting base */}
          <rect x="20" y="60" width="40" height="45" fill="#ffff00" rx="5" /> {/* Torso with haldi */}
          {/* Arms */}
          <rect x="8" y="65" width="15" height="30" fill="#ffd700" rx="5" />
          <rect x="57" y="65" width="15" height="30" fill="#ffd700" rx="5" />
          {/* Head */}
          <circle cx="40" cy="45" r="22" fill="#d2b48c" />
          {/* Haldi on face */}
          <circle cx="40" cy="50" r="18" fill="#ffd700" opacity="0.6" />
          {/* Happy expression */}
          <circle cx="32" cy="42" r="3" fill="#1a1a1a" />
          <circle cx="48" cy="42" r="3" fill="#1a1a1a" />
          <path d="M32 55 Q40 62 48 55" fill="none" stroke="#1a1a1a" strokeWidth="2" /> {/* Smile */}
          {/* Hair */}
          <ellipse cx="40" cy="30" rx="18" ry="10" fill="#1a1a1a" />
          {/* Haldi dripping */}
          <path d="M25 50 Q22 60 25 70" fill="none" stroke="#ffd700" strokeWidth="4" />
          <path d="M55 50 Q58 60 55 70" fill="none" stroke="#ffd700" strokeWidth="4" />
        </svg>
      </div>
      
      {/* ===== FAMILY MEMBERS APPLYING HALDI ===== */}
      {/* Mother/Elder woman on left */}
      <div className="absolute bottom-[80px] left-[100px]">
        <svg width="70" height="100" viewBox="0 0 70 100">
          {/* Saree */}
          <path d="M15 45 Q5 60 10 95 L60 95 Q65 60 55 45 Z" fill="#ff6b35" />
          <path d="M20 45 L15 95" stroke="#ffd700" strokeWidth="2" />
          {/* Blouse */}
          <rect x="20" y="35" width="30" height="15" fill="#ff8c00" rx="3" />
          {/* Arms reaching out */}
          <rect x="48" y="40" width="20" height="10" fill="#d2b48c" rx="3" transform="rotate(-20 48 40)" />
          {/* Hand with haldi */}
          <circle cx="65" cy="45" r="8" fill="#d2b48c" />
          <circle cx="65" cy="45" r="5" fill="#ffd700" /> {/* Haldi in hand */}
          {/* Head */}
          <circle cx="35" cy="25" r="15" fill="#d2b48c" />
          {/* Hair in bun */}
          <circle cx="35" cy="15" r="10" fill="#1a1a1a" />
          <circle cx="45" cy="18" r="6" fill="#1a1a1a" />
          {/* Bindi */}
          <circle cx="35" cy="22" r="2" fill="#ff0000" />
          {/* Smile */}
          <path d="M30 30 Q35 35 40 30" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Sister on right */}
      <div className="absolute bottom-[80px] right-[100px]">
        <svg width="70" height="100" viewBox="0 0 70 100">
          {/* Salwar */}
          <path d="M20 50 L15 95 L30 95 L35 55 L40 95 L55 95 L50 50 Z" fill="#ff1493" />
          {/* Kameez */}
          <rect x="18" y="35" width="34" height="20" fill="#ff69b4" rx="3" />
          {/* Arms */}
          <rect x="2" y="40" width="18" height="10" fill="#d2b48c" rx="3" transform="rotate(20 20 40)" />
          {/* Hand with haldi */}
          <circle cx="5" cy="50" r="8" fill="#d2b48c" />
          <circle cx="5" cy="50" r="5" fill="#ffd700" />
          {/* Head */}
          <circle cx="35" cy="22" r="14" fill="#d2b48c" />
          {/* Long hair */}
          <ellipse cx="35" cy="15" rx="12" ry="8" fill="#1a1a1a" />
          <path d="M23 20 Q20 40 25 60" stroke="#1a1a1a" strokeWidth="6" fill="none" />
          <path d="M47 20 Q50 40 45 60" stroke="#1a1a1a" strokeWidth="6" fill="none" />
          {/* Bindi */}
          <circle cx="35" cy="18" r="2" fill="#ff0000" />
          {/* Smile */}
          <path d="M30 27 Q35 32 40 27" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Aunt applying from behind */}
      <div className="absolute bottom-[110px] left-[280px]">
        <svg width="60" height="80" viewBox="0 0 60 80">
          {/* Saree */}
          <path d="M15 35 Q10 50 15 75 L45 75 Q50 50 45 35 Z" fill="#00ced1" />
          {/* Arms reaching forward */}
          <rect x="10" y="38" width="15" height="8" fill="#d2b48c" rx="2" />
          <rect x="35" y="38" width="15" height="8" fill="#d2b48c" rx="2" />
          {/* Hands */}
          <circle cx="8" cy="42" r="6" fill="#d2b48c" />
          <circle cx="52" cy="42" r="6" fill="#d2b48c" />
          {/* Haldi */}
          <circle cx="8" cy="42" r="4" fill="#ffd700" />
          <circle cx="52" cy="42" r="4" fill="#ffd700" />
          {/* Head */}
          <circle cx="30" cy="20" r="12" fill="#d2b48c" />
          <ellipse cx="30" cy="12" rx="10" ry="6" fill="#1a1a1a" />
          <circle cx="30" cy="17" r="2" fill="#ff0000" />
        </svg>
      </div>
      
      {/* ===== HALDI BOWLS AND ITEMS ===== */}
      {/* Large brass bowl */}
      <div className="absolute bottom-[45px] left-[180px]">
        <svg width="50" height="35" viewBox="0 0 50 35">
          <ellipse cx="25" cy="25" rx="22" ry="10" fill="#cd853f" />
          <ellipse cx="25" cy="22" rx="18" ry="8" fill="#daa520" />
          <ellipse cx="25" cy="20" rx="15" ry="6" fill="#ffd700" /> {/* Haldi paste */}
          {/* Decorative rim */}
          <ellipse cx="25" cy="15" rx="20" ry="5" fill="none" stroke="#b8860b" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Small bowl */}
      <div className="absolute bottom-[40px] left-[240px]">
        <svg width="35" height="25" viewBox="0 0 35 25">
          <ellipse cx="17" cy="18" rx="15" ry="7" fill="#cd853f" />
          <ellipse cx="17" cy="15" rx="12" ry="5" fill="#ffd700" />
        </svg>
      </div>
      
      {/* Coconut */}
      <div className="absolute bottom-[35px] left-[280px]">
        <svg width="30" height="35" viewBox="0 0 30 35">
          <ellipse cx="15" cy="22" rx="12" ry="13" fill="#8b4513" />
          <circle cx="10" cy="18" r="2" fill="#1a1a1a" />
          <circle cx="20" cy="18" r="2" fill="#1a1a1a" />
          <circle cx="15" cy="24" r="2" fill="#1a1a1a" />
          {/* Leaves on top */}
          <path d="M15 10 Q10 5 15 0 Q20 5 15 10" fill="#228b22" />
        </svg>
      </div>
      
      {/* Mango leaves arrangement */}
      <div className="absolute bottom-[35px] right-[150px]">
        <svg width="40" height="30" viewBox="0 0 40 30">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={20}
              cy={25}
              rx="4"
              ry="15"
              fill="#228b22"
              transform={`rotate(${-40 + i * 20} 20 25)`}
            />
          ))}
        </svg>
      </div>
      
      {/* ===== DIYAS/LAMPS ===== */}
      {[60, 480].map((dx, i) => (
        <div key={`diya-${i}`} className="absolute bottom-[30px]" style={{ left: dx }}>
          <svg width="35" height="45" viewBox="0 0 35 45">
            <ellipse cx="17" cy="38" rx="15" ry="7" fill="#cd853f" />
            <ellipse cx="17" cy="35" rx="12" ry="5" fill="#daa520" />
            {/* Flame */}
            <path d="M17 30 Q22 22 19 12 Q17 5 15 12 Q12 22 17 30" fill="#ff6b00" className="flame" />
            <path d="M17 30 Q20 24 18 16 Q17 10 16 16 Q14 24 17 30" fill="#ffff00" className="flame" />
          </svg>
        </div>
      ))}
      
      {/* ===== DECORATIVE ELEMENTS ===== */}
      {/* Flower vases */}
      {[30, 500].map((vx, i) => (
        <div key={`vase-${i}`} className="absolute bottom-[30px]" style={{ left: vx }}>
          <svg width="40" height="70" viewBox="0 0 40 70">
            {/* Vase */}
            <path d="M12 70 L8 50 Q5 40 10 35 L10 30 Q5 25 10 20 L30 20 Q35 25 30 30 L30 35 Q35 40 32 50 L28 70 Z" fill="#cd853f" />
            <ellipse cx="20" cy="20" rx="12" ry="5" fill="#daa520" />
            {/* Flowers */}
            {[-8, 0, 8].map((fx, j) => (
              <g key={j}>
                <line x1={20 + fx} y1="20" x2={20 + fx * 1.5} y2={5 - j * 3} stroke="#228b22" strokeWidth="2" />
                <circle cx={20 + fx * 1.5} cy={3 - j * 3} r="6" fill={['#ff6b35', '#ffd700', '#ff1493'][j]} />
              </g>
            ))}
          </svg>
        </div>
      ))}
      
      {/* ===== ADDITIONAL GUESTS WATCHING ===== */}
      {/* Kids playing/watching */}
      <div className="absolute bottom-[60px] left-[30px]">
        <svg width="40" height="60" viewBox="0 0 40 60">
          {/* Small kid */}
          <rect x="12" y="30" width="16" height="25" fill="#ffff00" rx="3" />
          <circle cx="20" cy="20" r="12" fill="#d2b48c" />
          <ellipse cx="20" cy="12" rx="10" ry="6" fill="#1a1a1a" />
          <circle cx="16" cy="18" r="2" fill="#1a1a1a" />
          <circle cx="24" cy="18" r="2" fill="#1a1a1a" />
          <path d="M16 25 Q20 28 24 25" fill="none" stroke="#1a1a1a" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Elder watching */}
      <div className="absolute bottom-[70px] right-[30px]">
        <svg width="50" height="80" viewBox="0 0 50 80">
          {/* Kurta */}
          <rect x="10" y="35" width="30" height="40" fill="#f5f5dc" rx="3" />
          {/* Dhoti */}
          <path d="M10 75 L15 95 L35 95 L40 75" fill="#fff" />
          {/* Head */}
          <circle cx="25" cy="22" r="14" fill="#d2b48c" />
          {/* White hair */}
          <ellipse cx="25" cy="14" rx="12" ry="7" fill="#dcdcdc" />
          {/* Glasses */}
          <circle cx="20" cy="20" r="5" fill="none" stroke="#1a1a1a" strokeWidth="1" />
          <circle cx="30" cy="20" r="5" fill="none" stroke="#1a1a1a" strokeWidth="1" />
          <line x1="25" y1="20" x2="25" y2="20" stroke="#1a1a1a" />
          {/* Smile */}
          <path d="M20 28 Q25 32 30 28" fill="none" stroke="#1a1a1a" strokeWidth="1" />
        </svg>
      </div>
      
      {/* ===== SPARKLE EFFECTS ===== */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-pulse"
          style={{
            left: 50 + (i * 40),
            top: 80 + (i % 3) * 40,
            animationDelay: `${i * 0.15}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="#ffd700" opacity="0.8" />
          </svg>
        </div>
      ))}
      
      {/* ===== YELLOW SPLASH EFFECTS ===== */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`splash-${i}`}
          className="absolute"
          style={{
            left: 120 + i * 50,
            top: 180 + (i % 2) * 30,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r={8 + (i % 3) * 3} fill="#ffd700" opacity={0.3 + (i % 3) * 0.1} />
            {/* Splash drops */}
            {[0, 72, 144, 216, 288].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <circle
                  key={j}
                  cx={15 + Math.cos(rad) * 12}
                  cy={15 + Math.sin(rad) * 12}
                  r="3"
                  fill="#ffd700"
                  opacity="0.5"
                />
              );
            })}
          </svg>
        </div>
      ))}
    </div>
  </div>
);

// Wedding Mandap Scene
export const WeddingMandap: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[10%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[700px] h-[450px]">
      {/* Main Mandap SVG */}
      <svg className="absolute" width="500" height="400" viewBox="0 0 500 400" style={{ left: 100 }}>
        {/* Mandap pillars */}
        {[50, 450].map((px, i) => (
          <g key={i}>
            <rect x={px - 20} y="100" width="40" height="300" fill="#d4af37" />
            <rect x={px - 15} y="100" width="30" height="300" fill="#f4e4bc" />
            {/* Pillar decorations */}
            {[150, 220, 290].map((py, j) => (
              <g key={j}>
                <circle cx={px} cy={py} r="15" fill="#ff6b35" />
                <circle cx={px} cy={py} r="8" fill="#ffa500" />
              </g>
            ))}
          </g>
        ))}
        
        {/* Mandap roof */}
        <path
          d="M0 100 L250 20 L500 100"
          fill="#800020"
          stroke="#d4af37"
          strokeWidth="5"
        />
        <path
          d="M30 100 L250 40 L470 100"
          fill="#a00030"
        />
        
        {/* Dome */}
        <ellipse cx="250" cy="50" rx="60" ry="40" fill="#d4af37" />
        <ellipse cx="250" cy="45" rx="50" ry="30" fill="#f4e4bc" />
        {/* Kalash on top */}
        <path d="M250 10 L240 30 L260 30 Z" fill="#d4af37" />
        <circle cx="250" cy="8" r="5" fill="#ff0000" />
        
        {/* Flower garlands hanging */}
        <path
          d="M80 100 Q150 150 250 140 Q350 130 420 100"
          fill="none"
          stroke="#ff6b35"
          strokeWidth="15"
        />
        <path
          d="M80 100 Q150 170 250 160 Q350 150 420 100"
          fill="none"
          stroke="#ff1493"
          strokeWidth="10"
        />
        
        {/* Sacred fire (Agni) in center */}
        <g transform="translate(250, 300)">
          {/* Havan Kund */}
          <rect x="-35" y="10" width="70" height="25" fill="#8b4513" />
          <rect x="-30" y="5" width="60" height="12" fill="#cd853f" />
          <rect x="-25" y="0" width="50" height="8" fill="#a0522d" />
          {/* Fire */}
          <path
            d="M0 0 Q20 -35 12 -55 Q0 -70 -12 -55 Q-20 -35 0 0"
            fill="#ff4500"
            className="flame"
          />
          <path
            d="M0 0 Q12 -28 7 -45 Q0 -55 -7 -45 Q-12 -28 0 0"
            fill="#ff8c00"
            className="flame"
          />
          <path
            d="M0 0 Q6 -18 4 -30 Q0 -38 -4 -30 Q-6 -18 0 0"
            fill="#ffd700"
            className="flame"
          />
        </g>
        
        {/* Floor decoration */}
        <ellipse cx="250" cy="380" rx="180" ry="25" fill="#ff6b35" opacity="0.2" />
        <ellipse cx="250" cy="380" rx="140" ry="18" fill="#ffd700" opacity="0.15" />
      </svg>

      {/* Pandit Ji sitting behind the fire */}
      <svg className="absolute" width="80" height="100" viewBox="0 0 80 100" style={{ left: 310, top: 220 }}>
        {/* Body - sitting position with dhoti */}
        <ellipse cx="40" cy="85" rx="30" ry="12" fill="#f5f5dc" /> {/* Dhoti spread */}
        <path d="M20 60 Q15 75 20 90 L60 90 Q65 75 60 60 Z" fill="#f5f5dc" /> {/* Dhoti */}
        <rect x="25" y="40" width="30" height="25" fill="#ff8c00" rx="3" /> {/* Upper body/kurta */}
        {/* Uttariya (sacred cloth) */}
        <path d="M25 45 Q10 50 15 70" stroke="#ffd700" strokeWidth="4" fill="none" />
        {/* Arms */}
        <rect x="15" y="45" width="12" height="20" fill="#d2b48c" rx="4" />
        <rect x="53" y="45" width="12" height="20" fill="#d2b48c" rx="4" />
        {/* Hands */}
        <ellipse cx="21" cy="67" rx="6" ry="5" fill="#d2b48c" />
        <ellipse cx="59" cy="67" rx="6" ry="5" fill="#d2b48c" />
        {/* Head */}
        <circle cx="40" cy="28" r="15" fill="#d2b48c" />
        {/* Hair/bald with shikha */}
        <ellipse cx="40" cy="18" rx="12" ry="6" fill="#4a4a4a" />
        <path d="M45 12 Q50 5 45 2" stroke="#1a1a1a" strokeWidth="3" fill="none" /> {/* Shikha */}
        {/* Tilak */}
        <path d="M40 20 L38 28 L42 28 Z" fill="#ff4500" />
        <circle cx="40" cy="22" r="2" fill="#ffd700" />
        {/* Eyes */}
        <circle cx="35" cy="28" r="2" fill="#1a1a1a" />
        <circle cx="45" cy="28" r="2" fill="#1a1a1a" />
        {/* Nose */}
        <path d="M40 30 L39 34 L41 34" stroke="#b8860b" strokeWidth="1" fill="none" />
        {/* Mouth - chanting */}
        <ellipse cx="40" cy="38" rx="4" ry="2" fill="#8b4513" />
        {/* Janeu (sacred thread) */}
        <path d="M30 45 Q25 55 30 70 Q40 75 50 70 Q55 55 50 45" stroke="#f5f5dc" strokeWidth="2" fill="none" />
      </svg>

      {/* Puja Samagri (items) near the pandit */}
      <svg className="absolute" width="120" height="60" viewBox="0 0 120 60" style={{ left: 380, top: 320 }}>
        {/* Puja Thali */}
        <ellipse cx="30" cy="45" rx="25" ry="8" fill="#cd7f32" />
        <ellipse cx="30" cy="42" rx="22" ry="6" fill="#daa520" />
        {/* Diya on thali */}
        <ellipse cx="20" cy="40" rx="6" ry="3" fill="#cd853f" />
        <path d="M20 38 Q23 32 21 28 Q20 25 19 28 Q17 32 20 38" fill="#ff8c00" className="flame" />
        {/* Kumkum */}
        <circle cx="35" cy="40" r="5" fill="#ff0000" />
        {/* Flowers */}
        <circle cx="45" cy="38" r="4" fill="#ff6b35" />
        <circle cx="42" cy="42" r="3" fill="#ff1493" />
        
        {/* Kalash */}
        <g transform="translate(75, 20)">
          <ellipse cx="0" cy="30" rx="12" ry="5" fill="#cd7f32" />
          <path d="M-10 30 Q-12 15 -8 5 Q0 0 8 5 Q12 15 10 30" fill="#cd7f32" />
          <path d="M-8 28 Q-10 15 -6 7 Q0 3 6 7 Q10 15 8 28" fill="#daa520" />
          {/* Coconut on kalash */}
          <ellipse cx="0" cy="3" rx="6" ry="5" fill="#8b4513" />
          {/* Mango leaves */}
          <path d="M-8 8 Q-15 5 -12 -2" stroke="#228b22" strokeWidth="2" fill="none" />
          <path d="M8 8 Q15 5 12 -2" stroke="#228b22" strokeWidth="2" fill="none" />
          <path d="M0 3 Q0 -5 0 -8" stroke="#228b22" strokeWidth="2" fill="none" />
        </g>
        
        {/* Ghee container */}
        <rect x="95" y="35" width="15" height="18" fill="#8b4513" rx="2" />
        <rect x="97" y="32" width="11" height="5" fill="#a0522d" rx="1" />
        <ellipse cx="102" cy="38" rx="5" ry="2" fill="#ffd700" />
      </svg>

      {/* More Puja items on the other side */}
      <svg className="absolute" width="100" height="50" viewBox="0 0 100 50" style={{ left: 220, top: 330 }}>
        {/* Camphor plate */}
        <ellipse cx="20" cy="40" rx="15" ry="5" fill="#c0c0c0" />
        <ellipse cx="20" cy="38" rx="12" ry="4" fill="#d3d3d3" />
        <rect x="15" y="30" width="10" height="8" fill="#fff" rx="2" /> {/* Camphor */}
        
        {/* Incense sticks holder */}
        <rect x="50" y="25" width="8" height="20" fill="#8b4513" />
        <line x1="52" y1="25" x2="52" y2="5" stroke="#4a4a4a" strokeWidth="1" />
        <line x1="56" y1="25" x2="56" y2="8" stroke="#4a4a4a" strokeWidth="1" />
        {/* Smoke */}
        <path d="M52 5 Q48 0 52 -5 Q56 -10 52 -15" stroke="#ccc" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M56 8 Q60 3 56 -2 Q52 -7 56 -12" stroke="#ccc" strokeWidth="1" fill="none" opacity="0.5" />
        
        {/* Bell */}
        <g transform="translate(80, 25)">
          <rect x="-2" y="-15" width="4" height="8" fill="#cd7f32" />
          <path d="M-8 0 Q-10 -8 0 -10 Q10 -8 8 0 Z" fill="#daa520" />
          <circle cx="0" cy="-2" r="2" fill="#8b4513" />
        </g>
      </svg>

      {/* Sitting guests - Groom's side (left) */}
      {/* Guest 1 - Elder male */}
      <svg className="absolute" width="50" height="70" viewBox="0 0 50 70" style={{ left: 30, top: 300 }}>
        <ellipse cx="25" cy="60" rx="20" ry="8" fill="#f5f5dc" /> {/* Dhoti */}
        <rect x="15" y="35" width="20" height="20" fill="#4169e1" rx="3" />
        <circle cx="25" cy="25" r="12" fill="#d2b48c" />
        <ellipse cx="25" cy="17" rx="10" ry="5" fill="#808080" /> {/* Grey hair */}
        <circle cx="21" cy="25" r="1.5" fill="#1a1a1a" />
        <circle cx="29" cy="25" r="1.5" fill="#1a1a1a" />
        <path d="M22 32 Q25 34 28 32" stroke="#8b4513" strokeWidth="1" fill="none" />
      </svg>
      
      {/* Guest 2 - Elder female */}
      <svg className="absolute" width="50" height="70" viewBox="0 0 50 70" style={{ left: 70, top: 310 }}>
        <path d="M10 40 Q5 55 15 65 L35 65 Q45 55 40 40 Z" fill="#800080" /> {/* Saree */}
        <rect x="18" y="30" width="14" height="15" fill="#800080" rx="2" />
        <path d="M18 32 Q5 35 10 50" stroke="#ffd700" strokeWidth="3" fill="none" /> {/* Pallu */}
        <circle cx="25" cy="20" r="10" fill="#d2b48c" />
        <ellipse cx="25" cy="14" rx="9" ry="5" fill="#1a1a1a" />
        <circle cx="25" cy="12" r="3" fill="#ff0000" /> {/* Bindi */}
        <circle cx="22" cy="20" r="1.5" fill="#1a1a1a" />
        <circle cx="28" cy="20" r="1.5" fill="#1a1a1a" />
        <circle cx="15" cy="22" r="3" fill="#ffd700" /> {/* Earring */}
        <circle cx="35" cy="22" r="3" fill="#ffd700" />
      </svg>

      {/* Guest 3 - Young male */}
      <svg className="absolute" width="45" height="65" viewBox="0 0 45 65" style={{ left: 50, top: 350 }}>
        <ellipse cx="22" cy="55" rx="18" ry="7" fill="#f5f5dc" />
        <rect x="12" y="32" width="20" height="18" fill="#228b22" rx="3" />
        <circle cx="22" cy="22" r="10" fill="#d2b48c" />
        <ellipse cx="22" cy="15" rx="8" ry="4" fill="#1a1a1a" />
        <circle cx="19" cy="22" r="1.5" fill="#1a1a1a" />
        <circle cx="25" cy="22" r="1.5" fill="#1a1a1a" />
      </svg>

      {/* Sitting guests - Bride's side (right) */}
      {/* Guest 4 - Elder female */}
      <svg className="absolute" width="50" height="70" viewBox="0 0 50 70" style={{ left: 580, top: 300 }}>
        <path d="M10 40 Q5 55 15 65 L35 65 Q45 55 40 40 Z" fill="#ff1493" />
        <rect x="18" y="30" width="14" height="15" fill="#ff1493" rx="2" />
        <path d="M32 32 Q45 35 40 50" stroke="#ffd700" strokeWidth="3" fill="none" />
        <circle cx="25" cy="20" r="10" fill="#d2b48c" />
        <ellipse cx="25" cy="14" rx="9" ry="5" fill="#1a1a1a" />
        <circle cx="25" cy="12" r="3" fill="#ff0000" />
        <circle cx="22" cy="20" r="1.5" fill="#1a1a1a" />
        <circle cx="28" cy="20" r="1.5" fill="#1a1a1a" />
        <circle cx="15" cy="22" r="3" fill="#ffd700" />
        <circle cx="35" cy="22" r="3" fill="#ffd700" />
      </svg>

      {/* Guest 5 - Elder male */}
      <svg className="absolute" width="50" height="70" viewBox="0 0 50 70" style={{ left: 620, top: 310 }}>
        <ellipse cx="25" cy="60" rx="20" ry="8" fill="#f5f5dc" />
        <rect x="15" y="35" width="20" height="20" fill="#8b0000" rx="3" />
        <circle cx="25" cy="25" r="12" fill="#d2b48c" />
        <ellipse cx="25" cy="17" rx="10" ry="5" fill="#d3d3d3" />
        <circle cx="21" cy="25" r="1.5" fill="#1a1a1a" />
        <circle cx="29" cy="25" r="1.5" fill="#1a1a1a" />
        <path d="M20 33 Q25 30 30 33" stroke="#808080" strokeWidth="2" fill="none" /> {/* Mustache */}
      </svg>

      {/* Guest 6 - Young female */}
      <svg className="absolute" width="45" height="65" viewBox="0 0 45 65" style={{ left: 600, top: 350 }}>
        <path d="M8 35 Q3 50 12 60 L33 60 Q42 50 37 35 Z" fill="#ff6347" />
        <rect x="15" y="28" width="15" height="12" fill="#ff6347" rx="2" />
        <circle cx="22" cy="18" r="9" fill="#d2b48c" />
        <ellipse cx="22" cy="12" rx="8" ry="4" fill="#1a1a1a" />
        <circle cx="22" cy="10" r="2" fill="#ff0000" />
        <circle cx="19" cy="18" r="1.5" fill="#1a1a1a" />
        <circle cx="25" cy="18" r="1.5" fill="#1a1a1a" />
        <circle cx="13" cy="20" r="2" fill="#ffd700" />
        <circle cx="31" cy="20" r="2" fill="#ffd700" />
      </svg>

      {/* Kids sitting in front */}
      <svg className="absolute" width="35" height="45" viewBox="0 0 35 45" style={{ left: 180, top: 380 }}>
        <ellipse cx="17" cy="38" rx="12" ry="5" fill="#87ceeb" />
        <rect x="10" y="25" width="14" height="12" fill="#87ceeb" rx="2" />
        <circle cx="17" cy="18" r="8" fill="#d2b48c" />
        <ellipse cx="17" cy="13" rx="6" ry="3" fill="#1a1a1a" />
        <circle cx="14" cy="18" r="1" fill="#1a1a1a" />
        <circle cx="20" cy="18" r="1" fill="#1a1a1a" />
        <path d="M15 22 Q17 24 19 22" stroke="#ff6b6b" strokeWidth="1" fill="none" />
      </svg>

      <svg className="absolute" width="35" height="45" viewBox="0 0 35 45" style={{ left: 480, top: 380 }}>
        <path d="M5 28 Q2 38 10 42 L25 42 Q33 38 30 28 Z" fill="#ffb6c1" />
        <rect x="12" y="22" width="11" height="10" fill="#ffb6c1" rx="2" />
        <circle cx="17" cy="15" r="7" fill="#d2b48c" />
        <ellipse cx="17" cy="10" rx="6" ry="3" fill="#1a1a1a" />
        <path d="M11 10 Q17 5 23 10" stroke="#1a1a1a" strokeWidth="2" fill="none" /> {/* Hair bow style */}
        <circle cx="14" cy="15" r="1" fill="#1a1a1a" />
        <circle cx="20" cy="15" r="1" fill="#1a1a1a" />
        <circle cx="17" cy="12" r="1.5" fill="#ff69b4" /> {/* Small bindi */}
      </svg>

      {/* Flower decorations on ground */}
      {[150, 200, 450, 500, 550].map((fx, i) => (
        <div 
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{ 
            left: fx, 
            top: 420,
            backgroundColor: ['#ff6b35', '#ff1493', '#ffd700', '#ff6b35', '#ff1493'][i]
          }}
        />
      ))}
    </div>
  </div>
);

// Dancing Celebration Scene - People dancing with lights and lamps in the sky
export const DancingCelebrationScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[600px] h-[500px]">
      {/* Sky background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1e]" />
      
      {/* Floating lamps in the sky */}
      {[50, 150, 250, 350, 450, 550].map((lx, i) => (
        <div
          key={`lamp-${i}`}
          className="absolute float"
          style={{
            left: lx,
            top: 30 + (i % 3) * 40,
            animationDelay: `${i * 0.4}s`,
            '--duration': '3s'
          } as React.CSSProperties}
        >
          <svg width="60" height="80" viewBox="0 0 60 80">
            <defs>
              <radialGradient id={`lampGlow-${i}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.3" />
              </radialGradient>
              <filter id={`lampFilter-${i}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Lamp chain/string */}
            <line x1="30" y1="0" x2="30" y2="20" stroke="#d4af37" strokeWidth="2" />
            {/* Lamp body */}
            <ellipse cx="30" cy="35" rx="20" ry="25" fill="#ffd700" opacity="0.9" />
            <ellipse cx="30" cy="35" rx="15" ry="20" fill="url(#lampGlow-${i})" filter={`url(#lampFilter-${i})`} />
            <ellipse cx="30" cy="35" rx="10" ry="15" fill="#fff" opacity="0.6" />
            {/* Lamp flame */}
            <ellipse cx="30" cy="25" rx="4" ry="8" fill="#ff6b35" className="flame" />
            <ellipse cx="30" cy="25" rx="2" ry="5" fill="#ffff00" />
          </svg>
        </div>
      ))}

      {/* String lights across the top */}
      <svg className="absolute top-0 left-0 w-full" height="100" viewBox="0 0 800 100" preserveAspectRatio="none">
        <defs>
          <filter id="stringLightGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* String wire */}
        <path 
          d="M0 30 Q200 20 400 30 T800 30" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2"
        />
        {/* Light bulbs */}
        {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750].map((bx, i) => (
          <g key={`bulb-${i}`}>
            <circle 
              cx={bx} 
              cy={25 + Math.sin(i * 0.5) * 5} 
              r="8" 
              fill={['#ff69b4', '#ffff00', '#00ffff', '#ff6b35', '#9932cc'][i % 5]}
              filter="url(#stringLightGlow)"
              className="light-bulb"
              style={{ '--delay': `${i * 0.2}s`, '--glow-color': ['#ff69b4', '#ffff00', '#00ffff', '#ff6b35', '#9932cc'][i % 5] } as React.CSSProperties}
            />
          </g>
        ))}
      </svg>

      {/* Ground/floor */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-[#2d1f3d] to-[#1a1a2e]" />

      {/* Dancing people */}
      {[
        { x: 100, variant: 'female' as const, color: '#ff6b35', delay: 0 },
        { x: 200, variant: 'male' as const, color: '#4169e1', delay: 0.2 },
        { x: 300, variant: 'female' as const, color: '#ff1493', delay: 0.4 },
        { x: 400, variant: 'male' as const, color: '#9932cc', delay: 0.1 },
        { x: 500, variant: 'female' as const, color: '#ffd700', delay: 0.3 },
      ].map((person, i) => (
        <div
          key={`dancer-${i}`}
          className="absolute bottom-[100px] float"
          style={{
            left: person.x,
            animationDelay: `${person.delay}s`,
            '--duration': '1.5s'
          } as React.CSSProperties}
        >
          <Guest isMoving={true} variant={person.variant} color={person.color} />
        </div>
      ))}

      {/* Decorative ground lights */}
      {[80, 180, 280, 380, 480].map((gx, i) => (
        <div
          key={`ground-light-${i}`}
          className="absolute bottom-[50px]"
          style={{ left: gx }}
        >
          <svg width="40" height="60" viewBox="0 0 40 60">
            <defs>
              <radialGradient id={`groundGlow-${i}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Light base */}
            <ellipse cx="20" cy="55" rx="15" ry="5" fill="#333" />
            {/* Light pole */}
            <rect x="18" y="30" width="4" height="25" fill="#d4af37" />
            {/* Light bulb */}
            <circle cx="20" cy="30" r="8" fill="url(#groundGlow-${i})" className="light-bulb" style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties} />
            <circle cx="20" cy="30" r="4" fill="#fff" opacity="0.9" />
          </svg>
        </div>
      ))}

      {/* Floating confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute confetti"
          style={{
            left: `${(i * 37) % 800}px`,
            top: `${20 + (i % 5) * 15}%`,
            '--confetti-duration': `${4 + (i % 3)}s`,
            '--delay': `${(i * 0.2) % 2}s`,
            backgroundColor: ['#ff6b35', '#ff1493', '#ffd700', '#00ffff', '#9932cc'][i % 5],
            width: '8px',
            height: '8px',
            borderRadius: i % 2 === 0 ? '50%' : '0',
            transform: `rotate(${i * 45}deg)`
          } as React.CSSProperties}
        />
      ))}

      {/* Music notes floating */}
      {[120, 250, 380, 520, 650].map((nx, i) => (
        <div
          key={`note-${i}`}
          className="absolute float"
          style={{
            left: nx,
            bottom: 250 + i * 30,
            animationDelay: `${i * 0.4}s`,
            '--duration': '2s'
          } as React.CSSProperties}
        >
          <span className="text-4xl text-yellow-300 opacity-80">♪</span>
        </div>
      ))}
    </div>
  </div>
);

// Wedding Hall Building
export const WeddingHall: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[10%]"} style={x !== 0 ? { left: x } : undefined}>
    <svg width="400" height="350" viewBox="0 0 400 350">
      {/* Main building */}
      <rect x="50" y="100" width="300" height="250" fill="#f5f5dc" stroke="#d4af37" strokeWidth="3" />
      
      {/* Roof */}
      <path d="M30 100 L200 20 L370 100 Z" fill="#800020" stroke="#d4af37" strokeWidth="3" />
      
      {/* Central dome */}
      <ellipse cx="200" cy="60" rx="50" ry="35" fill="#d4af37" />
      <ellipse cx="200" cy="55" rx="40" ry="25" fill="#f4e4bc" />
      <path d="M200 20 L190 40 L210 40 Z" fill="#d4af37" />
      <circle cx="200" cy="18" r="8" fill="#ff0000" />
      
      {/* Windows */}
      {[100, 200, 300].map((wx, i) => (
        <g key={i}>
          <rect x={wx - 25} y="130" width="50" height="70" fill="#87ceeb" stroke="#d4af37" strokeWidth="2" />
          <line x1={wx} y1="130" x2={wx} y2="200" stroke="#d4af37" strokeWidth="2" />
          <line x1={wx - 25} y1="165" x2={wx + 25} y2="165" stroke="#d4af37" strokeWidth="2" />
        </g>
      ))}
      
      {/* Main entrance */}
      <rect x="150" y="220" width="100" height="130" fill="#4a0012" stroke="#d4af37" strokeWidth="3" />
      <path d="M150 220 Q200 180 250 220" fill="#800020" stroke="#d4af37" strokeWidth="2" />
      
      {/* Door details */}
      <line x1="200" y1="220" x2="200" y2="350" stroke="#d4af37" strokeWidth="2" />
      <circle cx="185" cy="290" r="5" fill="#d4af37" />
      <circle cx="215" cy="290" r="5" fill="#d4af37" />
      
      {/* Decorative lights */}
      {[80, 120, 160, 240, 280, 320].map((lx, i) => (
        <circle key={i} cx={lx} cy="110" r="8" fill="#ffff00" className="glow" style={{ '--glow-color': '#ffff00' } as React.CSSProperties} />
      ))}
      
      {/* Flower decorations at entrance */}
      <path d="M140 220 Q120 250 140 280" fill="none" stroke="#ff6b35" strokeWidth="10" />
      <path d="M260 220 Q280 250 260 280" fill="none" stroke="#ff6b35" strokeWidth="10" />
      
      {/* Welcome text */}
      <text x="200" y="250" textAnchor="middle" fill="#d4af37" fontSize="14" fontWeight="bold">
        SONI
      </text>
      <text x="200" y="268" textAnchor="middle" fill="#d4af37" fontSize="12">
        FAMILY
      </text>
    </svg>
  </div>
);

// Groom's Home (Starting point)
export const GroomHome: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[10%]"} style={x !== 0 ? { left: x } : undefined}>
    <svg width="350" height="320" viewBox="0 0 350 320">
      {/* Main house */}
      <rect x="50" y="120" width="250" height="200" fill="#e8d4b8" stroke="#8b4513" strokeWidth="3" />
      
      {/* Roof */}
      <path d="M30 120 L175 40 L320 120 Z" fill="#8b0000" stroke="#d4af37" strokeWidth="2" />
      
      {/* Windows */}
      <rect x="80" y="150" width="60" height="50" fill="#87ceeb" stroke="#8b4513" strokeWidth="2" />
      <line x1="110" y1="150" x2="110" y2="200" stroke="#8b4513" strokeWidth="2" />
      <rect x="210" y="150" width="60" height="50" fill="#87ceeb" stroke="#8b4513" strokeWidth="2" />
      <line x1="240" y1="150" x2="240" y2="200" stroke="#8b4513" strokeWidth="2" />
      
      {/* Door */}
      <rect x="135" y="220" width="80" height="100" fill="#4a2810" stroke="#d4af37" strokeWidth="2" />
      <circle cx="200" cy="275" r="5" fill="#d4af37" />
      
      {/* Toran (door hanging) */}
      <path d="M130 220 Q175 200 220 220" fill="none" stroke="#ff6b35" strokeWidth="8" />
      {[140, 160, 175, 190, 210].map((tx, i) => (
        <g key={i}>
          <circle cx={tx} cy={215 - Math.sin((i / 4) * Math.PI) * 10} r="6" fill="#ff8c00" />
        </g>
      ))}
      
      {/* Decorative banner */}
      <rect x="100" y="100" width="150" height="25" fill="#800020" rx="3" />
      <text x="175" y="118" textAnchor="middle" fill="#d4af37" fontSize="12" fontWeight="bold">
        GROOM&apos;S HOME
      </text>
      
      {/* Diyas at entrance */}
      <circle cx="120" cy="310" r="8" fill="#cd853f" />
      <path d="M120 302 Q125 295 120 288 Q115 295 120 302" fill="#ff6b00" className="flame" />
      <circle cx="230" cy="310" r="8" fill="#cd853f" />
      <path d="M230 302 Q235 295 230 288 Q225 295 230 302" fill="#ff6b00" className="flame" />
    </svg>
  </div>
);

// Finale Home with Welcoming Family
export const FinaleHome: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[10%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[600px] h-[400px]">
      {/* Beautiful Home */}
      <svg className="absolute" width="400" height="380" viewBox="0 0 400 380" style={{ left: 100 }}>
        {/* Ground/Garden */}
        <ellipse cx="200" cy="370" rx="190" ry="15" fill="#228b22" opacity="0.3" />
        
        {/* Main House */}
        <rect x="50" y="120" width="300" height="250" fill="#fff8dc" stroke="#8b4513" strokeWidth="4" />
        
        {/* Roof */}
        <path d="M30 120 L200 30 L370 120 Z" fill="#8b0000" stroke="#d4af37" strokeWidth="3" />
        <path d="M50 120 L200 50 L350 120 Z" fill="#a52a2a" />
        
        {/* Roof decorations - Kalash */}
        <g transform="translate(200, 20)">
          <ellipse cx="0" cy="15" rx="8" ry="4" fill="#cd7f32" />
          <path d="M-6 15 Q-8 5 0 0 Q8 5 6 15" fill="#daa520" />
          <ellipse cx="0" cy="0" rx="4" ry="3" fill="#8b4513" />
          <path d="M-5 3 Q-8 0 -6 -3" stroke="#228b22" strokeWidth="2" fill="none" />
          <path d="M5 3 Q8 0 6 -3" stroke="#228b22" strokeWidth="2" fill="none" />
        </g>
        
        {/* Windows with warm light */}
        {[100, 300].map((wx, i) => (
          <g key={i}>
            <rect x={wx - 30} y="150" width="60" height="80" fill="#ffd700" stroke="#8b4513" strokeWidth="3" opacity="0.8" />
            <line x1={wx} y1="150" x2={wx} y2="230" stroke="#8b4513" strokeWidth="2" />
            <line x1={wx - 30} y1="190" x2={wx + 30} y2="190" stroke="#8b4513" strokeWidth="2" />
            {/* Curtains */}
            <path d={`M${wx - 28} 152 Q${wx - 15} 160 ${wx - 28} 170`} fill="#800020" opacity="0.7" />
            <path d={`M${wx + 28} 152 Q${wx + 15} 160 ${wx + 28} 170`} fill="#800020" opacity="0.7" />
            {/* Window glow */}
            <rect x={wx - 28} y="152" width="56" height="76" fill="#ffa500" opacity="0.2" />
          </g>
        ))}
        
        {/* Main Door - Grand entrance */}
        <rect x="150" y="220" width="100" height="150" fill="#4a2c2a" stroke="#d4af37" strokeWidth="4" />
        <path d="M150 220 Q200 180 250 220" fill="#8b0000" stroke="#d4af37" strokeWidth="3" />
        
        {/* Door decorations */}
        <line x1="200" y1="220" x2="200" y2="370" stroke="#d4af37" strokeWidth="3" />
        <circle cx="180" cy="300" r="6" fill="#d4af37" />
        <circle cx="220" cy="300" r="6" fill="#d4af37" />
        
        {/* Toran (door hanging) */}
        <path d="M145 218 Q200 240 255 218" fill="none" stroke="#ff6b35" strokeWidth="8" />
        <path d="M145 218 Q200 250 255 218" fill="none" stroke="#228b22" strokeWidth="5" />
        {/* Mango leaves on toran */}
        {[155, 175, 195, 215, 235].map((tx, i) => (
          <g key={i}>
            <ellipse cx={tx} cy={225 + Math.sin(i) * 3} rx="4" ry="8" fill="#228b22" />
            <circle cx={tx} cy={235 + Math.sin(i) * 3} r="4" fill="#ff6b35" />
          </g>
        ))}
        
        {/* Rangoli at entrance */}
        <g transform="translate(200, 380)">
          <circle cx="0" cy="0" r="30" fill="none" stroke="#ff6b35" strokeWidth="3" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#ff1493" strokeWidth="2" />
          <circle cx="0" cy="0" r="10" fill="#ffd700" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle 
              key={i}
              cx={Math.cos(angle * Math.PI / 180) * 25}
              cy={Math.sin(angle * Math.PI / 180) * 25}
              r="5"
              fill={['#ff6b35', '#ff1493', '#ffd700'][i % 3]}
            />
          ))}
        </g>
        
        {/* Decorative lights on roof */}
        {[60, 100, 140, 180, 220, 260, 300, 340].map((lx, i) => (
          <g key={i}>
            <circle cx={lx} cy="125" r="6" fill={['#ff0000', '#ffd700', '#00ff00', '#ff6b35'][i % 4]} className="glow" />
          </g>
        ))}
        
        {/* Diyas at entrance */}
        <g transform="translate(130, 360)">
          <ellipse cx="0" cy="0" rx="10" ry="4" fill="#cd853f" />
          <path d="M0 -5 Q5 -12 3 -18 Q0 -22 -3 -18 Q-5 -12 0 -5" fill="#ff6b00" className="flame" />
        </g>
        <g transform="translate(270, 360)">
          <ellipse cx="0" cy="0" rx="10" ry="4" fill="#cd853f" />
          <path d="M0 -5 Q5 -12 3 -18 Q0 -22 -3 -18 Q-5 -12 0 -5" fill="#ff6b00" className="flame" />
        </g>
        
        {/* Flower pots */}
        <g transform="translate(100, 350)">
          <rect x="-12" y="0" width="24" height="20" fill="#cd853f" />
          <ellipse cx="0" cy="0" rx="14" ry="5" fill="#8b4513" />
          <circle cx="-5" cy="-8" r="6" fill="#ff1493" />
          <circle cx="5" cy="-10" r="5" fill="#ff6b35" />
          <circle cx="0" cy="-5" r="4" fill="#ffd700" />
          <path d="M0 0 L0 -5" stroke="#228b22" strokeWidth="2" />
          <path d="M-5 0 L-5 -8" stroke="#228b22" strokeWidth="2" />
          <path d="M5 0 L5 -10" stroke="#228b22" strokeWidth="2" />
        </g>
        <g transform="translate(300, 350)">
          <rect x="-12" y="0" width="24" height="20" fill="#cd853f" />
          <ellipse cx="0" cy="0" rx="14" ry="5" fill="#8b4513" />
          <circle cx="-5" cy="-8" r="6" fill="#ff6b35" />
          <circle cx="5" cy="-10" r="5" fill="#ff1493" />
          <circle cx="0" cy="-5" r="4" fill="#ffd700" />
          <path d="M0 0 L0 -5" stroke="#228b22" strokeWidth="2" />
          <path d="M-5 0 L-5 -8" stroke="#228b22" strokeWidth="2" />
          <path d="M5 0 L5 -10" stroke="#228b22" strokeWidth="2" />
        </g>
        
        {/* "Welcome Home" banner */}
        <rect x="120" y="90" width="160" height="25" fill="#800020" rx="3" stroke="#d4af37" strokeWidth="2" />
        <text x="200" y="108" textAnchor="middle" fill="#d4af37" fontSize="14" fontWeight="bold">
          WELCOME HOME
        </text>
      </svg>

      {/* Family Member 1 - Mother with aarti thali */}
      <svg className="absolute" width="60" height="90" viewBox="0 0 60 90" style={{ left: 20, top: 280 }}>
        {/* Saree */}
        <path d="M15 40 Q10 60 18 85 L42 85 Q50 60 45 40 Z" fill="#ff1493" />
        <path d="M15 42 Q5 50 10 70" stroke="#ffd700" strokeWidth="5" fill="none" opacity="0.8" />
        {/* Blouse */}
        <rect x="20" y="30" width="20" height="15" fill="#ff1493" rx="3" />
        {/* Arms holding thali */}
        <rect x="12" y="35" width="10" height="18" fill="#d2b48c" rx="3" />
        <rect x="38" y="35" width="10" height="18" fill="#d2b48c" rx="3" />
        {/* Aarti Thali */}
        <ellipse cx="30" cy="58" rx="15" ry="5" fill="#cd7f32" />
        <ellipse cx="30" cy="56" rx="12" ry="4" fill="#daa520" />
        <circle cx="25" cy="54" r="3" fill="#ff0000" /> {/* Kumkum */}
        <circle cx="35" cy="54" r="3" fill="#ffd700" /> {/* Rice */}
        {/* Diya on thali */}
        <ellipse cx="30" cy="54" rx="4" ry="2" fill="#cd853f" />
        <path d="M30 52 Q33 48 31 44 Q30 42 29 44 Q27 48 30 52" fill="#ff6b00" className="flame" />
        {/* Head */}
        <circle cx="30" cy="20" r="12" fill="#d2b48c" />
        <ellipse cx="30" cy="12" rx="10" ry="5" fill="#1a1a1a" />
        {/* Bindi */}
        <circle cx="30" cy="15" r="2" fill="#ff0000" />
        {/* Face */}
        <circle cx="26" cy="20" r="1.5" fill="#1a1a1a" />
        <circle cx="34" cy="20" r="1.5" fill="#1a1a1a" />
        <path d="M27 25 Q30 28 33 25" stroke="#c44" strokeWidth="1" fill="none" />
        {/* Earrings */}
        <circle cx="18" cy="22" r="3" fill="#ffd700" />
        <circle cx="42" cy="22" r="3" fill="#ffd700" />
      </svg>

      {/* Family Member 2 - Father */}
      <svg className="absolute" width="55" height="85" viewBox="0 0 55 85" style={{ left: 70, top: 290 }}>
        {/* Dhoti */}
        <ellipse cx="27" cy="75" rx="22" ry="8" fill="#f5f5dc" />
        {/* Kurta */}
        <rect x="12" y="35" width="30" height="30" fill="#f5f5dc" rx="3" />
        <path d="M27 40 L27 60" stroke="#d4af37" strokeWidth="2" />
        {/* Arms */}
        <rect x="5" y="38" width="10" height="20" fill="#f5f5dc" rx="3" />
        <rect x="40" y="38" width="10" height="20" fill="#f5f5dc" rx="3" />
        {/* Hands - folded namaste */}
        <ellipse cx="27" cy="55" rx="8" ry="6" fill="#d2b48c" />
        {/* Head */}
        <circle cx="27" cy="22" r="13" fill="#d2b48c" />
        <ellipse cx="27" cy="13" rx="11" ry="5" fill="#808080" /> {/* Grey hair */}
        {/* Face */}
        <circle cx="23" cy="22" r="1.5" fill="#1a1a1a" />
        <circle cx="31" cy="22" r="1.5" fill="#1a1a1a" />
        <path d="M24 28 Q27 30 30 28" stroke="#8b6914" strokeWidth="1" fill="none" />
        {/* Tilak */}
        <path d="M27 15 L26 19 L28 19 Z" fill="#ff4500" />
      </svg>

      {/* Family Member 3 - Grandmother with flowers */}
      <svg className="absolute" width="50" height="80" viewBox="0 0 50 80" style={{ left: 520, top: 295 }}>
        {/* Saree */}
        <path d="M12 38 Q8 55 15 75 L35 75 Q42 55 38 38 Z" fill="#006400" />
        <path d="M12 40 Q2 48 8 65" stroke="#ffd700" strokeWidth="4" fill="none" opacity="0.7" />
        {/* Blouse */}
        <rect x="15" y="28" width="20" height="14" fill="#006400" rx="2" />
        {/* Arms with flowers */}
        <rect x="8" y="32" width="9" height="16" fill="#d2b48c" rx="3" />
        <rect x="33" y="32" width="9" height="16" fill="#d2b48c" rx="3" />
        {/* Flower basket */}
        <ellipse cx="25" cy="52" rx="12" ry="5" fill="#8b4513" />
        <circle cx="20" cy="48" r="4" fill="#ff6b35" />
        <circle cx="30" cy="48" r="4" fill="#ff1493" />
        <circle cx="25" cy="46" r="3" fill="#ffd700" />
        {/* Head */}
        <circle cx="25" cy="18" r="11" fill="#d2b48c" />
        <ellipse cx="25" cy="10" rx="9" ry="4" fill="#d3d3d3" /> {/* White hair */}
        {/* Bindi */}
        <circle cx="25" cy="13" r="2" fill="#ff0000" />
        {/* Face */}
        <circle cx="22" cy="18" r="1.5" fill="#1a1a1a" />
        <circle cx="28" cy="18" r="1.5" fill="#1a1a1a" />
        <path d="M22 23 Q25 25 28 23" stroke="#8b6914" strokeWidth="1" fill="none" />
        {/* Earrings */}
        <circle cx="14" cy="20" r="2" fill="#ffd700" />
        <circle cx="36" cy="20" r="2" fill="#ffd700" />
      </svg>

      {/* Family Member 4 - Young boy with sparklers */}
      <svg className="absolute" width="40" height="65" viewBox="0 0 40 65" style={{ left: 560, top: 320 }}>
        {/* Kurta */}
        <rect x="10" y="28" width="20" height="25" fill="#4169e1" rx="3" />
        {/* Pants */}
        <rect x="12" y="50" width="7" height="15" fill="#1a1a1a" rx="2" />
        <rect x="21" y="50" width="7" height="15" fill="#1a1a1a" rx="2" />
        {/* Arms */}
        <rect x="5" y="30" width="7" height="15" fill="#4169e1" rx="2" />
        <rect x="28" y="30" width="7" height="15" fill="#4169e1" rx="2" />
        {/* Sparkler in hand */}
        <line x1="35" y1="42" x2="45" y2="20" stroke="#8b4513" strokeWidth="2" />
        {/* Sparkler effect */}
        <circle cx="45" cy="18" r="8" fill="#ffd700" opacity="0.5" className="sparkle-burst" style={{ '--delay': '0s' } as React.CSSProperties} />
        <circle cx="45" cy="18" r="4" fill="#fff" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line 
            key={i}
            x1={45 + Math.cos(angle * Math.PI / 180) * 5}
            y1={18 + Math.sin(angle * Math.PI / 180) * 5}
            x2={45 + Math.cos(angle * Math.PI / 180) * 12}
            y2={18 + Math.sin(angle * Math.PI / 180) * 12}
            stroke="#ffd700"
            strokeWidth="1"
            opacity="0.8"
          />
        ))}
        {/* Head */}
        <circle cx="20" cy="18" r="10" fill="#d2b48c" />
        <ellipse cx="20" cy="11" rx="8" ry="4" fill="#1a1a1a" />
        {/* Face */}
        <circle cx="17" cy="18" r="1.5" fill="#1a1a1a" />
        <circle cx="23" cy="18" r="1.5" fill="#1a1a1a" />
        <path d="M17 23 Q20 26 23 23" stroke="#ff6b6b" strokeWidth="1.5" fill="none" /> {/* Big smile */}
      </svg>

      {/* Family Member 5 - Young girl throwing petals */}
      <svg className="absolute" width="45" height="70" viewBox="0 0 45 70" style={{ left: 0, top: 310 }}>
        {/* Lehenga */}
        <path d="M10 35 Q5 50 12 65 L33 65 Q40 50 35 35 Z" fill="#ff69b4" />
        <path d="M12 45 Q22 42 33 45" stroke="#ffd700" strokeWidth="2" fill="none" />
        <path d="M11 55 Q22 52 34 55" stroke="#ffd700" strokeWidth="2" fill="none" />
        {/* Choli */}
        <rect x="15" y="25" width="15" height="12" fill="#ff69b4" rx="2" />
        {/* Arms throwing petals */}
        <rect x="8" y="28" width="8" height="12" fill="#d2b48c" rx="2" />
        <rect x="29" y="26" width="8" height="12" fill="#d2b48c" rx="2" transform="rotate(-20, 33, 32)" />
        {/* Flower petals being thrown */}
        <circle cx="42" cy="20" r="3" fill="#ff6b35" className="petal" style={{ '--fall-duration': '2s', '--fall-delay': '0s' } as React.CSSProperties} />
        <circle cx="38" cy="15" r="2" fill="#ff1493" className="petal" style={{ '--fall-duration': '2.5s', '--fall-delay': '0.3s' } as React.CSSProperties} />
        <circle cx="45" cy="25" r="2.5" fill="#ffd700" className="petal" style={{ '--fall-duration': '2.2s', '--fall-delay': '0.5s' } as React.CSSProperties} />
        {/* Head */}
        <circle cx="22" cy="16" r="9" fill="#d2b48c" />
        <ellipse cx="22" cy="9" rx="8" ry="4" fill="#1a1a1a" />
        {/* Hair accessories */}
        <circle cx="14" cy="10" r="3" fill="#ff1493" />
        <circle cx="30" cy="10" r="3" fill="#ff1493" />
        {/* Bindi */}
        <circle cx="22" cy="12" r="1.5" fill="#ff0000" />
        {/* Face */}
        <circle cx="19" cy="16" r="1.5" fill="#1a1a1a" />
        <circle cx="25" cy="16" r="1.5" fill="#1a1a1a" />
        <path d="M19 21 Q22 24 25 21" stroke="#ff6b6b" strokeWidth="1.5" fill="none" /> {/* Smile */}
        {/* Small earrings */}
        <circle cx="13" cy="18" r="2" fill="#ffd700" />
        <circle cx="31" cy="18" r="2" fill="#ffd700" />
      </svg>

      {/* Extra flower petals in the air */}
      {[
        { x: 50, y: 250, color: '#ff6b35', delay: '0s' },
        { x: 80, y: 260, color: '#ff1493', delay: '0.5s' },
        { x: 30, y: 270, color: '#ffd700', delay: '1s' },
        { x: 550, y: 255, color: '#ff6b35', delay: '0.3s' },
        { x: 580, y: 265, color: '#ff1493', delay: '0.8s' },
        { x: 530, y: 275, color: '#ffd700', delay: '1.2s' },
      ].map((petal, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full petal"
          style={{
            left: petal.x,
            top: petal.y,
            backgroundColor: petal.color,
            '--fall-duration': '3s',
            '--fall-delay': petal.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  </div>
);

// Churmati Scene (Morning welcome with speakers and people)
export const ChurmatiScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* Background glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-orange-300/30 via-yellow-200/20 to-transparent rounded-full blur-3xl" />
      
      {/* Large speakers - lowered */}
      <div className="absolute bottom-[50px] left-[50px]">
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Speaker cabinet */}
          <rect x="10" y="20" width="100" height="160" fill="#1a1a1a" rx="8" />
          <rect x="15" y="25" width="90" height="150" fill="#2d2d2d" rx="5" />
          {/* Speaker grille */}
          <circle cx="60" cy="100" r="35" fill="none" stroke="#444" strokeWidth="3" />
          <circle cx="60" cy="100" r="25" fill="none" stroke="#444" strokeWidth="2" />
          <circle cx="60" cy="100" r="15" fill="#333" />
          {/* Sound waves */}
          <path d="M0 100 Q20 90 40 100" stroke="#ffd700" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M80 100 Q100 90 120 100" stroke="#ffd700" strokeWidth="3" fill="none" opacity="0.6" />
        </svg>
      </div>
      
      <div className="absolute bottom-[50px] right-[50px]">
        <svg width="120" height="180" viewBox="0 0 120 180">
          <rect x="10" y="20" width="100" height="160" fill="#1a1a1a" rx="8" />
          <rect x="15" y="25" width="90" height="150" fill="#2d2d2d" rx="5" />
          <circle cx="60" cy="100" r="35" fill="none" stroke="#444" strokeWidth="3" />
          <circle cx="60" cy="100" r="25" fill="none" stroke="#444" strokeWidth="2" />
          <circle cx="60" cy="100" r="15" fill="#333" />
        </svg>
      </div>
      
      {/* People around - lowered */}
      {[
        { x: 200, y: 30 },
        { x: 300, y: 50 },
        { x: 400, y: 30 },
        { x: 250, y: 110 },
        { x: 350, y: 130 },
      ].map((pos, i) => (
        <div key={i} className="absolute" style={{ left: pos.x, bottom: pos.y }}>
          <svg width="50" height="80" viewBox="0 0 50 80">
            <circle cx="25" cy="15" r="12" fill="#d2b48c" />
            <rect x="15" y="25" width="20" height="30" fill={['#ff6b35', '#4a90e2', '#ff1493', '#00ced1', '#ffd700'][i]} rx="3" />
            <rect x="10" y="55" width="30" height="25" fill="#333" rx="2" />
          </svg>
        </div>
      ))}
      
      {/* Breakfast table */}
      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2">
        <svg width="300" height="80" viewBox="0 0 300 80">
          <rect x="0" y="0" width="300" height="20" fill="#8b4513" rx="5" />
          {/* Food items */}
          <circle cx="50" cy="10" r="8" fill="#ffd700" />
          <circle cx="150" cy="10" r="8" fill="#ff6b35" />
          <circle cx="250" cy="10" r="8" fill="#ff1493" />
        </svg>
      </div>
    </div>
  </div>
);

// Engagement Scene (7 people, lighting, flowers)
export const EngagementScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* Lighting effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-20 bg-gradient-to-b from-yellow-300 to-transparent opacity-60 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: '10%',
              animationDelay: `${i * 0.2}s`,
              transform: `rotate(${i % 2 === 0 ? '5deg' : '-5deg'})`,
            }}
          />
        ))}
      </div>
      
      {/* Flower decorations */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${5 + (i * 5)}%`,
            top: `${10 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <span className="text-2xl">🌸</span>
        </div>
      ))}
      
      {/* 7 People arranged in a circle - lowered */}
      {[
        { x: 200, y: 50, angle: 0 },
        { x: 100, y: 20, angle: -45 },
        { x: 50, y: 100, angle: -90 },
        { x: 100, y: 180, angle: -135 },
        { x: 200, y: 210, angle: 180 },
        { x: 300, y: 180, angle: 135 },
        { x: 350, y: 100, angle: 90 },
      ].map((pos, i) => (
        <div key={i} className="absolute" style={{ left: pos.x, bottom: pos.y }}>
          <svg width="60" height="90" viewBox="0 0 60 90">
            <circle cx="30" cy="18" r="14" fill="#d2b48c" />
            <rect x="18" y="30" width="24" height="35" fill={['#d4af37', '#ff6b35', '#ff1493', '#4a90e2', '#00ced1', '#ffd700', '#c77dff'][i]} rx="4" />
            <rect x="12" y="65" width="36" height="25" fill="#333" rx="3" />
            {/* Engagement ring sparkle */}
            {i === 0 && (
              <circle cx="30" cy="45" r="3" fill="#ffd700" className="animate-ping" />
            )}
          </svg>
        </div>
      ))}
      
      {/* Center engagement setup - lowered */}
      <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2">
        <svg width="100" height="80" viewBox="0 0 100 80">
          <circle cx="50" cy="40" r="25" fill="#d4af37" opacity="0.3" />
          <circle cx="50" cy="40" r="15" fill="#ffd700" opacity="0.5" />
          <text x="50" y="45" textAnchor="middle" fill="#d4af37" fontSize="20" fontWeight="bold">💍</text>
        </svg>
      </div>
    </div>
  </div>
);

// Barat Scene (DJs, music, lights, dancing people)
export const BaratScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* Disco lights background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-8 opacity-30"
            style={{
              top: `${i * 8}%`,
              background: `linear-gradient(90deg, transparent, ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]}, transparent)`,
              animation: `pulse 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      
      {/* Big Speakers - Left */}
      <div className="absolute bottom-[180px] left-[30px]">
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Speaker box */}
          <rect x="10" y="20" width="100" height="160" fill="#1a1a1a" rx="5" />
          <rect x="15" y="25" width="90" height="150" fill="#2d2d2d" rx="3" />
          {/* Speaker grille */}
          <rect x="25" y="40" width="70" height="130" fill="#000" rx="2" />
          {/* Speaker cone */}
          <circle cx="60" cy="105" r="25" fill="#333" />
          <circle cx="60" cy="105" r="15" fill="#1a1a1a" />
          <circle cx="60" cy="105" r="8" fill="#000" />
          {/* Speaker stand */}
          <rect x="55" y="180" width="10" height="25" fill="#1a1a1a" />
          {/* Decorative lights on speaker */}
          <circle cx="30" cy="60" r="3" fill="#ff0000" className="animate-pulse" />
          <circle cx="90" cy="60" r="3" fill="#00ff00" className="animate-pulse" />
        </svg>
      </div>
      
      {/* Big Speakers - Right */}
      <div className="absolute bottom-[180px] right-[30px]">
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Speaker box */}
          <rect x="10" y="20" width="100" height="160" fill="#1a1a1a" rx="5" />
          <rect x="15" y="25" width="90" height="150" fill="#2d2d2d" rx="3" />
          {/* Speaker grille */}
          <rect x="25" y="40" width="70" height="130" fill="#000" rx="2" />
          {/* Speaker cone */}
          <circle cx="60" cy="105" r="25" fill="#333" />
          <circle cx="60" cy="105" r="15" fill="#1a1a1a" />
          <circle cx="60" cy="105" r="8" fill="#000" />
          {/* Speaker stand */}
          <rect x="55" y="180" width="10" height="25" fill="#1a1a1a" />
          {/* Decorative lights on speaker */}
          <circle cx="30" cy="60" r="3" fill="#0000ff" className="animate-pulse" />
          <circle cx="90" cy="60" r="3" fill="#ffff00" className="animate-pulse" />
        </svg>
      </div>
      
      {/* DJ Setup */}
      <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2">
        <svg width="200" height="150" viewBox="0 0 200 150">
          {/* DJ Table */}
          <rect x="20" y="80" width="160" height="70" fill="#1a1a1a" rx="5" />
          <rect x="25" y="85" width="150" height="60" fill="#2d2d2d" rx="3" />
          {/* Mixer */}
          <rect x="40" y="95" width="60" height="40" fill="#333" rx="2" />
          {/* Turntables */}
          <circle cx="130" cy="115" r="20" fill="#000" />
          <circle cx="130" cy="115" r="15" fill="#1a1a1a" />
          <circle cx="130" cy="115" r="3" fill="#fff" />
          <circle cx="170" cy="115" r="20" fill="#000" />
          <circle cx="170" cy="115" r="15" fill="#1a1a1a" />
          <circle cx="170" cy="115" r="3" fill="#fff" />
        </svg>
      </div>
      
      {/* Dancing people */}
      {[
        { x: 50, y: 100 },
        { x: 150, y: 120 },
        { x: 250, y: 100 },
        { x: 350, y: 130 },
        { x: 450, y: 110 },
        { x: 100, y: 200 },
        { x: 200, y: 220 },
        { x: 300, y: 200 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: pos.x, bottom: pos.y }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          <svg width="50" height="80" viewBox="0 0 50 80">
            <circle cx="25" cy="15" r="12" fill="#d2b48c" />
            <rect x="15" y="25" width="20" height="30" fill={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b35', '#ff1493'][i]} rx="3" />
            <rect x="10" y="55" width="30" height="25" fill="#333" rx="2" />
            {/* Arms up dancing */}
            <line x1="15" y1="30" x2="5" y2="10" stroke="#d2b48c" strokeWidth="3" />
            <line x1="35" y1="30" x2="45" y2="10" stroke="#d2b48c" strokeWidth="3" />
          </svg>
        </motion.div>
      ))}
    </div>
  </div>
);

// Reception Scene (Stage with sofa, groom & bride, lights, decorations)
export const ReceptionScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* Stage background */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-[#2d1f0f] via-[#3d2914] to-[#4a3520]" />
      
      {/* Stage platform */}
      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-[400px] h-[200px]">
        <svg width="400" height="200" viewBox="0 0 400 200">
          <rect x="0" y="0" width="400" height="200" fill="#8b4513" rx="10" />
          <rect x="10" y="10" width="380" height="180" fill="#a0522d" rx="8" />
          {/* Stage pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={20 + i * 45} y="20" width="35" height="160" fill="#6b4423" opacity="0.3" />
          ))}
        </svg>
      </div>
      
      {/* Decorative lights on stage */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-[240px] animate-pulse"
          style={{
            left: `${5 + i * 10}%`,
            width: '20px',
            height: '30px',
            background: `radial-gradient(circle, ${['#ffd700', '#ff6b35', '#ff1493', '#4a90e2'][i % 4]}, transparent)`,
            borderRadius: '50%',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      
      {/* Wedding Sofa */}
      <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2">
        <svg width="300" height="150" viewBox="0 0 300 150">
          {/* Sofa base */}
          <rect x="0" y="50" width="300" height="100" fill="#8b4513" rx="10" />
          <rect x="10" y="60" width="280" height="80" fill="#a0522d" rx="8" />
          {/* Sofa back */}
          <rect x="20" y="20" width="260" height="40" fill="#8b4513" rx="5" />
          <rect x="25" y="25" width="250" height="30" fill="#a0522d" rx="3" />
          {/* Cushions */}
          <rect x="30" y="70" width="100" height="60" fill="#d4af37" rx="5" />
          <rect x="170" y="70" width="100" height="60" fill="#d4af37" rx="5" />
          {/* Groom */}
          <circle cx="80" cy="40" r="15" fill="#d2b48c" />
          <rect x="70" y="50" width="20" height="40" fill="#4a90e2" rx="3" />
          {/* Bride */}
          <circle cx="220" cy="40" r="15" fill="#d2b48c" />
          <rect x="210" y="50" width="20" height="40" fill="#ff1493" rx="3" />
          {/* Crown/veil */}
          <path d="M220 25 Q225 15 230 25" stroke="#d4af37" strokeWidth="3" fill="none" />
        </svg>
      </div>
      
      {/* Flower decorations around stage */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i % 5) * 20}%`,
            bottom: `${30 + Math.floor(i / 5) * 15}%`,
          }}
        >
          <span className="text-2xl">🌺</span>
        </div>
      ))}
    </div>
  </div>
);

// Satyanarayan Katha Scene (Stage with puja)
export const SatyanarayanKathaScene: React.FC<{ x: number }> = ({ x }) => (
  <div className={x === 0 ? "relative" : "absolute bottom-[15%]"} style={x !== 0 ? { left: x } : undefined}>
    <div className="relative w-[550px] h-[400px]">
      {/* Puja stage */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[450px] h-[300px]">
        <svg width="450" height="300" viewBox="0 0 450 300">
          {/* Stage base */}
          <rect x="0" y="150" width="450" height="150" fill="#8b4513" rx="10" />
          <rect x="10" y="160" width="430" height="130" fill="#a0522d" rx="8" />
          
          {/* Puja platform */}
          <rect x="150" y="80" width="150" height="120" fill="#d4af37" rx="8" />
          <rect x="160" y="90" width="130" height="100" fill="#ffd700" rx="5" />
          
          {/* Diya/lamps */}
          {[180, 225, 270].map((dx, i) => (
            <g key={i}>
              <ellipse cx={dx} cy="140" rx="8" ry="4" fill="#cd7f32" />
              <path d={`M${dx - 4} 140 Q${dx} 120 ${dx + 4} 140`} fill="#daa520" />
              <circle cx={dx} cy="125" r="3" fill="#ffd700" className="animate-pulse" />
            </g>
          ))}
          
          {/* Puja items */}
          <circle cx="190" cy="110" r="8" fill="#ff6b35" /> {/* Fruit */}
          <circle cx="260" cy="110" r="8" fill="#ffd700" /> {/* Coconut */}
          <rect x="220" y="105" width="10" height="15" fill="#8b4513" /> {/* Incense */}
          
          {/* Sacred symbol */}
          <text x="225" y="135" textAnchor="middle" fill="#d4af37" fontSize="30" fontWeight="bold">🕉️</text>
        </svg>
      </div>
      
      {/* People sitting for puja - lowered */}
      {[
        { x: 100, y: 100 },
        { x: 200, y: 120 },
        { x: 300, y: 100 },
        { x: 350, y: 120 },
      ].map((pos, i) => (
        <div key={i} className="absolute" style={{ left: pos.x, bottom: pos.y }}>
          <svg width="60" height="80" viewBox="0 0 60 80">
            <circle cx="30" cy="18" r="14" fill="#d2b48c" />
            <rect x="18" y="30" width="24" height="35" fill={['#d4af37', '#8b4513', '#a0522d', '#6b4423'][i]} rx="4" />
            <rect x="12" y="65" width="36" height="15" fill="#333" rx="2" />
            {/* Hands in prayer */}
            <ellipse cx="20" cy="50" rx="5" ry="8" fill="#d2b48c" transform="rotate(-20 20 50)" />
            <ellipse cx="40" cy="50" rx="5" ry="8" fill="#d2b48c" transform="rotate(20 40 50)" />
          </svg>
        </div>
      ))}
      
      {/* Floating flower petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${5 + (i % 3) * 10}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <span className="text-xl">🌼</span>
        </div>
      ))}
    </div>
  </div>
);


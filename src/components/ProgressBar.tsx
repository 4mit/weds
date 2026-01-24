'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number;
  sections: Array<{ name: string; position: number }>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, sections }) => {
  return (
    <div className="fixed top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[90%] max-w-2xl px-1 sm:px-2 safe-area-top">
      {/* Background track */}
      <div className="relative h-1 sm:h-1.5 md:h-2 bg-black/40 rounded-full backdrop-blur-sm border border-[#d4af37]/30">
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4af37] via-[#ff6b35] to-[#d4af37] rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        
        {/* Section markers */}
        {sections.map((section, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${section.position * 100}%` }}
          >
            {/* Marker dot */}
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full border sm:border-2 transition-all duration-200 ${
                progress >= section.position
                  ? 'bg-[#d4af37] border-[#fff]'
                  : 'bg-[#1a1a2e] border-[#d4af37]/50'
              }`}
            />
            {/* Label - show only first, last and current on mobile */}
            <span
              className={`absolute top-2.5 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 text-[6px] sm:text-[8px] md:text-xs whitespace-nowrap transition-all duration-200 ${
                progress >= section.position ? 'text-[#d4af37]' : 'text-[#f4e4bc]/40'
              } ${i > 0 && i < sections.length - 1 ? 'hidden sm:block' : ''}`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {section.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Groom indicator */}
      <div
        className="absolute -top-0.5 transition-all duration-200 ease-out pointer-events-none"
        style={{ left: `calc(${progress * 100}% - 6px)` }}
      >
        <div className="text-xs sm:text-sm md:text-lg">🤵</div>
      </div>
    </div>
  );
};

export default ProgressBar;


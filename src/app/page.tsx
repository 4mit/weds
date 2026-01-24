'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartScreen from '@/components/StartScreen';
import ParallaxEngine from '@/components/ParallaxEngine';
import ProgressBar from '@/components/ProgressBar';
import { Groom, Bride } from '@/components/Character';
import {
  Diya,
  Garland,
  Rangoli,
  Tree,
  WeddingCar,
  WelcomeGate,
  EventBanner,
  MehendiScene,
  SangeetScene,
  HaldiScene,
  WeddingMandap,
  DancingCelebrationScene,
  GroomHome,
  ArrowSignboard,
} from '@/components/WeddingScenes';
import DiscoLights from '@/components/DiscoLights';
import SoundManager from '@/components/SoundManager';
import Fireworks from '@/components/Fireworks';
import WeddingLights from '@/components/WeddingLights';

// World configuration - responsive (shorter journey on mobile for better UX)
const getWorldWidth = (isMobile: boolean) => isMobile ? 6000 : 12000;

// Section positions (as percentage of world width)
const SECTIONS = [
  { name: 'Start', position: 0 },
  { name: 'Mehendi', position: 0.2 },
  { name: 'Sangeet', position: 0.4 },
  { name: 'Haldi', position: 0.6 },
  { name: 'Wedding', position: 0.75 },
  { name: 'Celebration', position: 0.88 },
  { name: 'Finale', position: 1 },
];

export default function WeddingJourney() {
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile-first
  const [worldWidth, setWorldWidth] = useState(6000); // Default mobile width
  const [facingDirection, setFacingDirection] = useState<'left' | 'right' | 'idle'>('right');
  const [score, setScore] = useState(0);
  const crossedSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      setWorldWidth(getWorldWidth(mobile));
    };
    // Initial check on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameStarted && showInstructions) {
      const timer = setTimeout(() => setShowInstructions(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, showInstructions]);

  const handleStart = useCallback(() => {
    setGameStarted(true);
    // Reset score and crossed sections when starting
    setScore(0);
    crossedSectionsRef.current.clear();
  }, []);

  const handleProgress = useCallback((p: number) => {
    setProgress(p);
  }, []);

  const handlePositionChange = useCallback((pos: number) => {
    setScrollPosition(pos);
  }, []);

  const [isWalking, setIsWalking] = useState(false);
  const lastPositionRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track position changes to keep groom moving during scroll
  useEffect(() => {
    if (Math.abs(scrollPosition - lastPositionRef.current) > 0.5) {
      // Position is changing - keep walking
      setIsWalking(true);
      lastPositionRef.current = scrollPosition;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set walking to false after scroll stops (no position change for 200ms)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsWalking(false);
      }, 200);
    }
    
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollPosition]);

  const handleDirectionChange = useCallback((direction: 'left' | 'right' | 'idle') => {
    if (direction === 'idle') {
      // Don't immediately stop walking - let position tracking handle it
      // This allows smooth transitions during scrolling
    } else {
      setFacingDirection(direction);
      setIsWalking(true);
    }
  }, []);

  // Track section crossings and award points
  useEffect(() => {
    if (!gameStarted) return;

    // Check each section to see if it's been crossed
    SECTIONS.forEach((section) => {
      // Skip 'Start' section
      if (section.name === 'Start') return;
      
      // Check if progress has crossed this section's position
      if (progress >= section.position && !crossedSectionsRef.current.has(section.name)) {
        // Mark section as crossed
        crossedSectionsRef.current.add(section.name);
        // Award 10 points
        setScore((prevScore) => prevScore + 10);
      }
    });
  }, [progress, gameStarted]);

  // Calculate groom position on screen (stays roughly in center-left)
  const groomScreenX = isMobile ? '25%' : '30%';
  const reachedEnd = progress >= 0.98;
  
  // Detect when groom reaches bride (bride is at ~85% of world width)
  // Mobile: 5100/6000 = 0.85, Desktop: 10850/12000 = 0.904
  const bridePosition = isMobile ? 0.85 : 0.904;
  const isHugging = progress >= bridePosition && !reachedEnd;

  if (!gameStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Score display at top left */}
      <div className="fixed top-[5rem] left-[1rem] z-50">
        <div className="glass rounded-lg px-4 py-2 shadow-lg border-2 border-[#d4af37]/40">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
              <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" />
              <circle cx="12" cy="11" r="2" fill="#ffd700" />
            </svg>
            <span className="text-[#d4af37] font-bold text-lg sm:text-xl">
              Score: <span className="text-[#ffd700]">{score}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar progress={progress} sections={SECTIONS} />

      {/* Parallax Engine with world content */}
      <ParallaxEngine
        worldWidth={worldWidth}
        onProgress={handleProgress}
        onPositionChange={handlePositionChange}
        onDirectionChange={handleDirectionChange}
      >
        {/* ========== SKY LAYER (Parallax 0.1) ========== */}
        <div
          className="parallax-layer"
          style={{
            width: worldWidth,
            transform: `translateX(${scrollPosition * 0.1}px)`,
          }}
        >
          {/* Moon */}
          <div className="absolute top-[5%] left-[10%]">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#fffacd] to-[#f0e68c] shadow-[0_0_30px_rgba(255,250,205,0.5)] md:shadow-[0_0_60px_rgba(255,250,205,0.5)]" />
              <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3 md:w-6 md:h-6 rounded-full bg-[#e6d5a8] opacity-50" />
            </div>
          </div>

          {/* Stars - fewer on mobile */}
          {Array.from({ length: isMobile ? 50 : 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white star"
              style={{
                left: `${(i * 123) % worldWidth}px`,
                top: `${5 + ((i * 47) % 40)}%`,
                width: 1 + (i % 2),
                height: 1 + (i % 2),
                '--delay': `${(i * 0.17) % 3}s`,
                '--duration': `${2 + (i % 2)}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ========== MOUNTAINS LAYER (Parallax 0.3) ========== */}
        <div
          className="parallax-layer"
          style={{
            width: worldWidth,
            transform: `translateX(${scrollPosition * 0.3}px)`,
          }}
        >
          {/* Distant mountains */}
          {Array.from({ length: isMobile ? 12 : 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-[25%]"
              style={{ left: i * (isMobile ? 400 : 600) }}
            >
              <svg 
                width={isMobile ? 250 : 400} 
                height={isMobile ? 120 : 200} 
                viewBox="0 0 400 200"
              >
                <path
                  d={`M0 200 L${100 + (i % 3) * 30} ${50 + (i % 2) * 30} L200 200 Z`}
                  fill={`rgba(30, 40, 60, ${0.8 - (i % 3) * 0.1})`}
                />
                <path
                  d={`M150 200 L${250 + (i % 2) * 20} ${30 + (i % 3) * 20} L350 200 Z`}
                  fill={`rgba(25, 35, 55, ${0.9 - (i % 2) * 0.1})`}
                />
              </svg>
            </div>
          ))}
        </div>

        {/* ========== TREES BACKGROUND LAYER (Parallax 0.5) ========== */}
        <div
          className="parallax-layer"
          style={{
            width: worldWidth,
            transform: `translateX(${scrollPosition * 0.5}px)`,
          }}
        >
          {/* Background trees - fewer on mobile */}
          {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
            <Tree key={i} x={i * (isMobile ? 300 : 400) + 100} variant={i % 3 === 0 ? 'palm' : 'mango'} />
          ))}
        </div>

        {/* ========== MAIN GROUND LAYER (Parallax 0 - moves with scroll) ========== */}
        <div className="parallax-layer" style={{ width: worldWidth }}>
          {/* Ground/Wedding Carpet */}
          <div className="absolute bottom-0 left-0 w-full h-[18%] sm:h-[16%] md:h-[15%] bg-gradient-to-t from-[#2d1f0f] via-[#3d2914] to-[#4a3520]">
            {/* Carpet base - rich red/maroon */}
            <div className="absolute top-[15%] left-0 w-full h-[50%] bg-gradient-to-b from-[#8b0000] via-[#800020] to-[#6b0000]">
              {/* Carpet border */}
              <div className="absolute top-0 left-0 w-full h-full border-t-4 border-b-4 border-[#d4af37]" />
              <div className="absolute top-0 left-0 w-4 h-full border-l-4 border-r-4 border-[#d4af37]" style={{ borderRightWidth: 0 }} />
              <div className="absolute top-0 right-0 w-4 h-full border-r-4 border-[#d4af37]" />
              
              {/* Carpet pattern - decorative borders */}
              <div className="absolute top-2 left-0 w-full h-1 bg-[#d4af37] opacity-60" />
              <div className="absolute bottom-2 left-0 w-full h-1 bg-[#d4af37] opacity-60" />
              
              {/* Carpet center pattern - geometric designs */}
              {Array.from({ length: Math.ceil(worldWidth / (isMobile ? 200 : 300)) }).map((_, i) => (
                <div
                  key={`pattern-${i}`}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: i * (isMobile ? 200 : 300) + 50 }}
                >
                  <svg width={isMobile ? 80 : 120} height={isMobile ? 20 : 30} viewBox="0 0 120 30">
                    {/* Decorative pattern */}
                    <circle cx="20" cy="15" r="4" fill="#d4af37" opacity="0.4" />
                    <circle cx="60" cy="15" r="5" fill="#ffd700" opacity="0.5" />
                    <circle cx="100" cy="15" r="4" fill="#d4af37" opacity="0.4" />
                    <path d="M15 15 L25 15" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />
                    <path d="M55 15 L65 15" stroke="#ffd700" strokeWidth="2" opacity="0.7" />
                    <path d="M95 15 L105 15" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                </div>
              ))}
            </div>
            
            {/* ===== FLOWER CARPET ON CARPET (Enhanced) ===== */}
            <div className="absolute top-[20%] left-0 w-full h-[35%] overflow-hidden">
              {/* Rose petals - reduced spacing */}
              {Array.from({ length: Math.ceil(worldWidth / (isMobile ? 60 : 80)) }).map((_, i) => (
                <div
                  key={`rose-${i}`}
                  className="absolute"
                  style={{
                    left: i * (isMobile ? 60 : 80) + (i % 3) * 15,
                    top: `${(i % 3) * 30}%`,
                  }}
                >
                  <svg width={isMobile ? 10 : 14} height={isMobile ? 8 : 12} viewBox="0 0 18 15">
                    <ellipse 
                      cx="9" cy="7" rx="8" ry="6" 
                      fill={['#ff6b6b', '#ff1493', '#ff69b4'][i % 3]}
                      opacity="0.7"
                    />
                  </svg>
                </div>
              ))}
              
              {/* Marigold flowers - reduced */}
              {Array.from({ length: Math.ceil(worldWidth / (isMobile ? 100 : 140)) }).map((_, i) => (
                <div
                  key={`marigold-${i}`}
                  className="absolute"
                  style={{
                    left: i * (isMobile ? 100 : 140) + 30,
                    top: `${15 + (i % 2) * 40}%`,
                  }}
                >
                  <svg width={isMobile ? 12 : 18} height={isMobile ? 12 : 18} viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="8" fill={i % 2 === 0 ? '#ff8c00' : '#ffd700'} />
                    <circle cx="11" cy="11" r="4" fill="#ffa500" />
                  </svg>
                </div>
              ))}
              
              {/* Scattered petals - reduced */}
              {Array.from({ length: Math.ceil(worldWidth / (isMobile ? 50 : 70)) }).map((_, i) => (
                <div
                  key={`petal-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: i * (isMobile ? 50 : 70) + (i % 4) * 10,
                    top: `${(i % 4) * 25}%`,
                    width: isMobile ? 5 : 8,
                    height: isMobile ? 3 : 5,
                    backgroundColor: ['#ff6b35', '#ffd700', '#ff69b4'][i % 3],
                    opacity: 0.6,
                    transform: `rotate(${(i * 45) % 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ===== STARTING AREA ===== */}
          <div 
            className="absolute bottom-[10%] origin-bottom-left"
            style={{ 
              left: isMobile ? 80 : 200,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <GroomHome x={0} />
          </div>
          
          {/* Welcome people at start */}
          <div 
            className="absolute bottom-[18%] sm:bottom-[7%] md:bottom-[7%]" 
            style={{ left: isMobile ? 260 : 400 }}
          >
            <div className="relative">
              {/* Welcoming family members */}
              {[0, 30, 60].map((offset, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: offset }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <span className="text-lg sm:text-2xl md:text-3xl">👋</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Wedding cars */}
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 350 : 600,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WeddingCar x={0} />
          </div>
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 480 : 850,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WeddingCar x={0} />
          </div>

          {/* Diyas along the path - fewer on mobile */}
          {Array.from({ length: isMobile ? 25 : 60 }).map((_, i) => (
            <Diya key={i} x={200 + i * (isMobile ? 180 : 200)} y={isMobile ? 60 : 80} scale={isMobile ? 0.5 : 0.8} />
          ))}

          {/* Rangolis along the path */}
          {(isMobile ? [350, 1200, 2200, 3200, 4200, 5200] : [500, 2500, 4500, 6500, 8500, 10500]).map((rx, i) => (
            <Rangoli key={i} x={rx} y={isMobile ? 20 : 30} size={isMobile ? 60 : 100} />
          ))}

          {/* ===== MEHENDI SECTION ===== */}
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 317 : 1400,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WelcomeGate x={0} title="Soni Family" />
          </div>
          {/* Arrow signboard pointing to Mehendi */}
          <ArrowSignboard x={isMobile ? 550 : 1300} eventName="Mehendi" direction="right" />
          
          <EventBanner 
            x={isMobile ? 800 : 1800} 
            title="Mehendi" 
            subtitle="The Art of Love" 
            isActive={progress >= 0.05 && progress <= 0.28}
          />
          <div 
            className="absolute bottom-[15%] origin-bottom-left"
            style={{ 
              left: isMobile ? 850 : 2000,
              transform: isMobile ? 'scale(0.4)' : 'scale(1)'
            }}
          >
            <MehendiScene x={0} />
          </div>
          <Garland x={isMobile ? 800 : 1900} y={isMobile ? 50 : 80} width={isMobile ? 150 : 300} />
          <Garland x={isMobile ? 1050 : 2300} y={isMobile ? 60 : 100} width={isMobile ? 120 : 250} />

          {/* ===== SANGEET SECTION ===== */}
          {/* Arrow signboard pointing to Sangeet */}
          <ArrowSignboard x={isMobile ? 1250 : 3300} eventName="Sangeet" direction="right" />
          
          <EventBanner 
            x={isMobile ? 1500 : 3800} 
            title="Sangeet" 
            subtitle="Dance & Celebration" 
            isActive={progress >= 0.18 && progress <= 0.45}
          />
          <div 
            className="absolute bottom-[15%] origin-bottom-left"
            style={{ 
              left: isMobile ? 1550 : 4000,
              transform: isMobile ? 'scale(0.45)' : 'scale(1)'
            }}
          >
            <SangeetScene x={0} />
          </div>
          <Garland x={isMobile ? 1500 : 3900} y={isMobile ? 45 : 70} width={isMobile ? 160 : 350} />
          
          {/* Disco lights effect - Full immersive experience */}
          <DiscoLights x={isMobile ? 1400 : 3700} width={isMobile ? 350 : 800} isActive={progress >= 0.25 && progress <= 0.5} />

          {/* ===== HALDI SECTION ===== */}
          {/* Arrow signboard pointing to Haldi */}
          <ArrowSignboard x={isMobile ? 2050 : 5300} eventName="Haldi" direction="right" />
          
          <EventBanner 
            x={isMobile ? 2300 : 5800} 
            title="Haldi" 
            subtitle="Golden Blessings" 
            isActive={progress >= 0.35 && progress <= 0.62}
          />
          <div 
            className="absolute bottom-[15%] origin-bottom-left"
            style={{ 
              left: isMobile ? 2350 : 6000,
              transform: isMobile ? 'scale(0.45)' : 'scale(1)'
            }}
          >
            <HaldiScene x={0} />
          </div>
          <Garland x={isMobile ? 2300 : 5900} y={isMobile ? 55 : 90} width={isMobile ? 140 : 280} />
          
          {/* Yellow/turmeric splashes */}
          {(isMobile ? [2400, 2470, 2550] : [6100, 6200, 6350]).map((hx, i) => (
            <div
              key={i}
              className="absolute bottom-[20%] opacity-30"
              style={{ left: hx }}
            >
              <div className={`${isMobile ? 'w-8 h-8' : 'w-16 h-16'} rounded-full bg-[#ffd700] blur-xl`} />
            </div>
          ))}

          {/* ===== WEDDING SECTION ===== */}
          {/* Arrow signboard pointing to Wedding */}
          <ArrowSignboard x={isMobile ? 2850 : 7300} eventName="Wedding" direction="right" />
          
          <EventBanner 
            x={isMobile ? 3100 : 7800} 
            title="Wedding" 
            subtitle="Two Souls, One Journey" 
            isActive={progress >= 0.50 && progress <= 0.85}
          />
          <div 
            className="absolute bottom-[10%] origin-bottom-left"
            style={{ 
              left: isMobile ? 3200 : 8200,
              transform: isMobile ? 'scale(0.4)' : 'scale(1)'
            }}
          >
            <WeddingMandap x={0} />
          </div>
          <Garland x={isMobile ? 3150 : 8100} y={isMobile ? 40 : 60} width={isMobile ? 180 : 400} />
          <Garland x={isMobile ? 3400 : 8300} y={isMobile ? 50 : 80} width={isMobile ? 160 : 350} />
          
          {/* Flower petals near mandap */}
          {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute petal"
              style={{
                left: (isMobile ? 3250 : 8200) + (i % 5) * (isMobile ? 35 : 100),
                top: '10%',
                '--fall-duration': `${6 + (i % 4)}s`,
                '--fall-delay': `${(i * 0.5) % 5}s`,
              } as React.CSSProperties}
            >
              <span className={`text-pink-400 ${isMobile ? 'text-xs' : 'text-lg'}`}>🌸</span>
            </div>
          ))}

          {/* Wedding Lights - String lights and decorative lighting */}
          <WeddingLights 
            x={isMobile ? 3050 : 7900} 
            width={isMobile ? 500 : 900} 
            isActive={progress >= 0.52 && progress <= 0.88}
          />

          {/* Fireworks for Wedding celebration */}
          <Fireworks 
            x={isMobile ? 3000 : 7800} 
            width={isMobile ? 600 : 1000} 
            isActive={progress >= 0.55 && progress <= 0.85}
          />

          {/* ===== DANCING CELEBRATION SECTION ===== */}
          {/* Arrow signboard pointing to Celebration */}
          <ArrowSignboard x={isMobile ? 3800 : 9000} eventName="Celebration" direction="right" />
          
          <EventBanner 
            x={isMobile ? 4050 : 9500} 
            title="Celebration" 
            subtitle="Dance & Joy" 
            isActive={progress >= 0.75 && progress <= 0.95}
          />
          <div 
            className="absolute bottom-[15%] origin-bottom-left"
            style={{ 
              left: isMobile ? 4100 : 9700,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <DancingCelebrationScene x={0} />
          </div>
          <Garland x={isMobile ? 4000 : 9400} y={isMobile ? 40 : 60} width={isMobile ? 200 : 450} />
          <Garland x={isMobile ? 4300 : 9600} y={isMobile ? 50 : 80} width={isMobile ? 180 : 400} />

          {/* Additional disco lights for celebration */}
          <DiscoLights 
            x={isMobile ? 3900 : 9200} 
            width={isMobile ? 500 : 1000} 
            isActive={progress >= 0.78 && progress <= 0.92} 
          />

          {/* ===== FINALE SECTION ===== */}
          {/* Arrow signboard pointing to Home/Finale */}
          <ArrowSignboard x={isMobile ? 4500 : 9800} eventName="Home" direction="right" />
          
          {/* Finale Home with welcoming family */}
          <div 
            className="absolute bottom-[15%]"
            style={{ left: isMobile ? 4800 : 10300 }}
          >
            {/* Beautiful decorated home */}
            <svg width={isMobile ? 200 : 400} height={isMobile ? 200 : 380} viewBox="0 0 400 380">
              {/* Ground */}
              <ellipse cx="200" cy="370" rx="190" ry="15" fill="#228b22" opacity="0.3" />
              
              {/* Main House */}
              <rect x="50" y="120" width="300" height="250" fill="#fff8dc" stroke="#8b4513" strokeWidth="4" />
              
              {/* Roof */}
              <path d="M30 120 L200 30 L370 120 Z" fill="#8b0000" stroke="#d4af37" strokeWidth="3" />
              <path d="M50 120 L200 50 L350 120 Z" fill="#a52a2a" />
              
              {/* Kalash on roof */}
              <g transform="translate(200, 20)">
                <ellipse cx="0" cy="15" rx="8" ry="4" fill="#cd7f32" />
                <path d="M-6 15 Q-8 5 0 0 Q8 5 6 15" fill="#daa520" />
                <ellipse cx="0" cy="0" rx="4" ry="3" fill="#8b4513" />
              </g>
              
              {/* Windows with warm light */}
              <rect x="70" y="150" width="60" height="80" fill="#ffd700" stroke="#8b4513" strokeWidth="3" opacity="0.8" />
              <line x1="100" y1="150" x2="100" y2="230" stroke="#8b4513" strokeWidth="2" />
              <line x1="70" y1="190" x2="130" y2="190" stroke="#8b4513" strokeWidth="2" />
              
              <rect x="270" y="150" width="60" height="80" fill="#ffd700" stroke="#8b4513" strokeWidth="3" opacity="0.8" />
              <line x1="300" y1="150" x2="300" y2="230" stroke="#8b4513" strokeWidth="2" />
              <line x1="270" y1="190" x2="330" y2="190" stroke="#8b4513" strokeWidth="2" />
              
              {/* Main Door */}
              <rect x="150" y="220" width="100" height="150" fill="#4a2c2a" stroke="#d4af37" strokeWidth="4" />
              <path d="M150 220 Q200 180 250 220" fill="#8b0000" stroke="#d4af37" strokeWidth="3" />
              <line x1="200" y1="220" x2="200" y2="370" stroke="#d4af37" strokeWidth="3" />
              <circle cx="180" cy="300" r="6" fill="#d4af37" />
              <circle cx="220" cy="300" r="6" fill="#d4af37" />
              
              {/* Toran (door hanging) */}
              <path d="M145 218 Q200 240 255 218" fill="none" stroke="#ff6b35" strokeWidth="8" />
              <path d="M145 218 Q200 250 255 218" fill="none" stroke="#228b22" strokeWidth="5" />
              
              {/* Decorative lights */}
              {[60, 100, 140, 260, 300, 340].map((lx, i) => (
                <circle key={i} cx={lx} cy="125" r="6" fill={['#ff0000', '#ffd700', '#00ff00'][i % 3]} className="glow" />
              ))}
              
              {/* Welcome banner */}
              <rect x="120" y="90" width="160" height="25" fill="#800020" rx="3" stroke="#d4af37" strokeWidth="2" />
              <text x="200" y="108" textAnchor="middle" fill="#d4af37" fontSize="14" fontWeight="bold">WELCOME HOME</text>
              
              {/* Diyas */}
              <circle cx="130" cy="365" r="8" fill="#cd853f" />
              <path d="M130 357 Q135 350 133 343 Q130 338 127 343 Q125 350 130 357" fill="#ff6b00" className="flame" />
              <circle cx="270" cy="365" r="8" fill="#cd853f" />
              <path d="M270 357 Q275 350 273 343 Q270 338 267 343 Q265 350 270 357" fill="#ff6b00" className="flame" />
              
              {/* Rangoli */}
              <circle cx="200" cy="385" r="25" fill="none" stroke="#ff6b35" strokeWidth="3" />
              <circle cx="200" cy="385" r="15" fill="none" stroke="#ff1493" strokeWidth="2" />
              <circle cx="200" cy="385" r="8" fill="#ffd700" />
            </svg>
          </div>

          {/* Family members welcoming */}
          {/* Mother with aarti */}
          <div className="absolute bottom-[15%]" style={{ left: isMobile ? 4750 : 10200 }}>
            <svg width={isMobile ? 35 : 60} height={isMobile ? 55 : 90} viewBox="0 0 60 90">
              <path d="M15 40 Q10 60 18 85 L42 85 Q50 60 45 40 Z" fill="#ff1493" />
              <rect x="20" y="30" width="20" height="15" fill="#ff1493" rx="3" />
              <ellipse cx="30" cy="58" rx="12" ry="4" fill="#daa520" />
              <circle cx="30" cy="56" r="3" fill="#ff6b00" className="flame" />
              <circle cx="30" cy="20" r="12" fill="#d2b48c" />
              <ellipse cx="30" cy="12" rx="10" ry="5" fill="#1a1a1a" />
              <circle cx="30" cy="15" r="2" fill="#ff0000" />
            </svg>
          </div>

          {/* Father */}
          <div className="absolute bottom-[15%]" style={{ left: isMobile ? 4780 : 10260 }}>
            <svg width={isMobile ? 30 : 55} height={isMobile ? 50 : 85} viewBox="0 0 55 85">
              <ellipse cx="27" cy="75" rx="22" ry="8" fill="#f5f5dc" />
              <rect x="12" y="35" width="30" height="30" fill="#f5f5dc" rx="3" />
              <circle cx="27" cy="22" r="13" fill="#d2b48c" />
              <ellipse cx="27" cy="13" rx="11" ry="5" fill="#808080" />
              <path d="M27 15 L26 19 L28 19 Z" fill="#ff4500" />
            </svg>
          </div>

          {/* Grandmother with flowers */}
          <div className="absolute bottom-[15%]" style={{ left: isMobile ? 5020 : 10720 }}>
            <svg width={isMobile ? 30 : 50} height={isMobile ? 50 : 80} viewBox="0 0 50 80">
              <path d="M12 38 Q8 55 15 75 L35 75 Q42 55 38 38 Z" fill="#006400" />
              <rect x="15" y="28" width="20" height="14" fill="#006400" rx="2" />
              <ellipse cx="25" cy="52" rx="10" ry="4" fill="#8b4513" />
              <circle cx="20" cy="48" r="4" fill="#ff6b35" />
              <circle cx="30" cy="48" r="4" fill="#ff1493" />
              <circle cx="25" cy="18" r="11" fill="#d2b48c" />
              <ellipse cx="25" cy="10" rx="9" ry="4" fill="#d3d3d3" />
              <circle cx="25" cy="13" r="2" fill="#ff0000" />
            </svg>
          </div>

          {/* Young boy with sparkler */}
          <div className="absolute bottom-[15%]" style={{ left: isMobile ? 5050 : 10780 }}>
            <svg width={isMobile ? 30 : 45} height={isMobile ? 45 : 70} viewBox="0 0 45 70">
              <rect x="12" y="28" width="18" height="22" fill="#4169e1" rx="3" />
              <rect x="14" y="48" width="6" height="14" fill="#1a1a1a" rx="2" />
              <rect x="22" y="48" width="6" height="14" fill="#1a1a1a" rx="2" />
              <line x1="32" y1="38" x2="42" y2="15" stroke="#8b4513" strokeWidth="2" />
              <circle cx="42" cy="12" r="6" fill="#ffd700" opacity="0.7" className="sparkle-burst" />
              <circle cx="42" cy="12" r="3" fill="#fff" />
              <circle cx="21" cy="18" r="9" fill="#d2b48c" />
              <ellipse cx="21" cy="11" rx="7" ry="4" fill="#1a1a1a" />
            </svg>
          </div>

          {/* Young girl throwing petals */}
          <div className="absolute bottom-[15%]" style={{ left: isMobile ? 4720 : 10150 }}>
            <svg width={isMobile ? 28 : 45} height={isMobile ? 45 : 70} viewBox="0 0 45 70">
              <path d="M10 35 Q5 50 12 65 L33 65 Q40 50 35 35 Z" fill="#ff69b4" />
              <rect x="15" y="25" width="15" height="12" fill="#ff69b4" rx="2" />
              <circle cx="40" cy="18" r="3" fill="#ff6b35" className="petal" />
              <circle cx="36" cy="12" r="2" fill="#ff1493" className="petal" />
              <circle cx="22" cy="16" r="9" fill="#d2b48c" />
              <ellipse cx="22" cy="9" rx="8" ry="4" fill="#1a1a1a" />
              <circle cx="22" cy="12" r="1.5" fill="#ff0000" />
            </svg>
          </div>
          
          {/* Bride waiting at the end - visible when hugging */}
          <div 
            className="absolute bottom-[8%] sm:bottom-[6%] md:bottom-[6%]" 
            style={{ 
              left: isMobile ? 5100 : 10850
            }}
          >
            <Bride isMoving={false} scale={isMobile ? 0.5 : 1.2} />
          </div>

          {/* ===== FIREWORKS & ROCKETS ===== */}
          {/* Firework bursts in the sky */}
          {[
            { x: isMobile ? 4780 : 10400, y: 29, color: '#ff6b35', delay: 0 },
            { x: isMobile ? 4850 : 10550, y: 35, color: '#ffd700', delay: 0.5 },
            { x: isMobile ? 4950 : 10700, y: 29, color: '#ff1493', delay: 1 },
            { x: isMobile ? 4900 : 10480, y: 12, color: '#00ff00', delay: 1.5 },
            { x: isMobile ? 4870 : 10620, y: 26, color: '#ff0000', delay: 2 },
            { x: isMobile ? 5000 : 10620, y: 51, color: '#ff0000', delay: 2 },
          ].map((fw, idx) => (
            <div 
              key={`fw-${idx}`}
              className="absolute firework-burst"
              style={{ 
                left: fw.x, 
                top: `${fw.y}%`,
                '--delay': `${fw.delay}s`,
              } as React.CSSProperties}
            >
              <svg width={isMobile ? 60 : 100} height={isMobile ? 60 : 100} viewBox="0 0 100 100" className="firework-svg">
                <defs>
                  <radialGradient id={`firework-glow-${idx}`}>
                    <stop offset="0%" stopColor={fw.color} stopOpacity="1" />
                    <stop offset="50%" stopColor={fw.color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={fw.color} stopOpacity="0" />
                  </radialGradient>
                  <filter id={`firework-blur-${idx}`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>
                {/* Center glow - animated */}
                <circle cx="50" cy="50" r="8" fill={fw.color} opacity="0.8" className="firework-center">
                  <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="15" fill={fw.color} opacity="0.3" className="firework-glow">
                  <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Burst rays - animated */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const x2 = 50 + Math.cos(angle) * 45;
                  const y2 = 50 + Math.sin(angle) * 45;
                  return (
                    <line 
                      key={i}
                      x1="50" y1="50" x2={x2} y2={y2}
                      stroke={fw.color}
                      strokeWidth="2"
                      opacity="0.8"
                      filter={`url(#firework-blur-${idx})`}
                      className="firework-ray"
                    >
                      <animate attributeName="opacity" values="0.8;1;0.6;0.8" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                      <animate attributeName="stroke-width" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                    </line>
                  );
                })}
                {/* Sparkle dots - animated */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
                  const cx = 50 + Math.cos(angle) * 35;
                  const cy = 50 + Math.sin(angle) * 35;
                  return (
                    <circle 
                      key={`dot-${i}`} 
                      cx={cx} 
                      cy={cy} 
                      r="3" 
                      fill="#fff" 
                      opacity="0.9"
                      className="firework-dot"
                    >
                      <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                      <animate attributeName="opacity" values="0.9;1;0.7;0.9" dur="1s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                    </circle>
                  );
                })}
              </svg>
            </div>
          ))}

          {/* Rockets launching - animate up and fade when bride reaches groom */}
          {[
            { x: isMobile ? 4820 : 10350, delay: 0.3 },
            { x: isMobile ? 4920 : 10500, delay: 0.8 },
            { x: isMobile ? 5020 : 10650, delay: 1.3 },
            { x: isMobile ? 5080 : 10750, delay: 1.8 },
          ].map((rocket, idx) => (
            <div 
              key={`rocket-${idx}`}
              className="fixed"
              style={{ 
                left: rocket.x,
                top: isHugging ? '0%' : '80%',
                opacity: isHugging ? 0 : 1,
                transform: isHugging ? 'translateY(-100vh)' : 'translateY(0)',
                transition: isHugging ? `all ${2 + idx * 0.3}s ease-out ${rocket.delay}s` : 'none',
                pointerEvents: isHugging ? 'none' : 'auto'
              }}
            >
              <svg width={isMobile ? 20 : 35} height={isMobile ? 50 : 80} viewBox="0 0 35 80">
                {/* Rocket body */}
                <path d="M17.5 0 L10 25 L10 55 L25 55 L25 25 Z" fill="#ff4500" stroke="#ffd700" strokeWidth="1" />
                {/* Rocket nose */}
                <path d="M17.5 0 L10 25 L25 25 Z" fill="#ffd700" />
                {/* Fins */}
                <path d="M10 45 L2 60 L10 55 Z" fill="#ff0000" />
                <path d="M25 45 L33 60 L25 55 Z" fill="#ff0000" />
                {/* Fire trail */}
                <path d="M12 55 Q17.5 75 12 80 Q17.5 70 23 80 Q17.5 75 23 55" fill="#ff8c00" className="flame" />
                <path d="M14 55 Q17.5 68 14 72 Q17.5 65 21 72 Q17.5 68 21 55" fill="#ffd700" className="flame" />
              </svg>
            </div>
          ))}

          {/* Ground Chakri (spinning firework) */}
          {[
            { x: isMobile ? 4780 : 10280 },
            { x: isMobile ? 5060 : 10800 },
          ].map((chakri, idx) => (
            <div 
              key={`chakri-${idx}`}
              className="absolute bottom-[16%]"
              style={{ left: chakri.x }}
            >
              <svg width={isMobile ? 25 : 40} height={isMobile ? 25 : 40} viewBox="0 0 40 40" className="rangoli-spin">
                <circle cx="20" cy="20" r="8" fill="#8b4513" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const x2 = 20 + Math.cos(angle) * 18;
                  const y2 = 20 + Math.sin(angle) * 18;
                  return (
                    <line 
                      key={i}
                      x1="20" y1="20" x2={x2} y2={y2}
                      stroke={['#ff0000', '#ffd700', '#00ff00', '#ff6b35'][i % 4]}
                      strokeWidth="3"
                    />
                  );
                })}
                <circle cx="20" cy="20" r="3" fill="#ffd700" />
              </svg>
            </div>
          ))}

          {/* Phuljhadi (Sparklers) */}
          {[
            { x: isMobile ? 4760 : 10220 },
            { x: isMobile ? 5100 : 10880 },
          ].map((sparkler, idx) => (
            <div 
              key={`sparkler-${idx}`}
              className="absolute bottom-[17%]"
              style={{ left: sparkler.x }}
            >
              <svg width={isMobile ? 15 : 25} height={isMobile ? 45 : 70} viewBox="0 0 25 70">
                {/* Stick */}
                <rect x="11" y="30" width="3" height="40" fill="#8b4513" />
                {/* Sparkle head */}
                <circle cx="12.5" cy="25" r="8" fill="#ffd700" opacity="0.5" className="sparkle-burst" />
                <circle cx="12.5" cy="25" r="4" fill="#fff" />
                {/* Sparks */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const length = 10 + (i % 2) * 5;
                  const x2 = 12.5 + Math.cos(angle) * length;
                  const y2 = 25 + Math.sin(angle) * length;
                  return (
                    <line 
                      key={i}
                      x1="12.5" y1="25" x2={x2} y2={y2}
                      stroke="#ffd700"
                      strokeWidth="1"
                      opacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>
          ))}

          {/* ===== DECORATIVE LAMPS (Diyas & Lanterns) ===== */}
          {/* Hanging lanterns */}
          {[
            { x: isMobile ? 4830 : 10380, color: '#ff6b35' },
            { x: isMobile ? 4930 : 10530, color: '#ff1493' },
            { x: isMobile ? 5030 : 10680, color: '#ffd700' },
          ].map((lantern, idx) => (
            <div 
              key={`lantern-${idx}`}
              className="absolute top-[5%]"
              style={{ left: lantern.x }}
            >
              <svg width={isMobile ? 25 : 40} height={isMobile ? 50 : 80} viewBox="0 0 40 80">
                {/* Hanging wire */}
                <line x1="20" y1="0" x2="20" y2="15" stroke="#333" strokeWidth="1" />
                {/* Lantern top */}
                <rect x="12" y="15" width="16" height="5" fill="#8b4513" />
                {/* Lantern body */}
                <rect x="8" y="20" width="24" height="35" fill={lantern.color} opacity="0.7" stroke="#8b4513" strokeWidth="2" rx="3" />
                {/* Inner glow */}
                <rect x="12" y="24" width="16" height="27" fill="#fff" opacity="0.3" rx="2" />
                {/* Lantern bottom */}
                <rect x="12" y="55" width="16" height="5" fill="#8b4513" />
                {/* Tassel */}
                <line x1="20" y1="60" x2="20" y2="75" stroke={lantern.color} strokeWidth="2" />
                <circle cx="20" cy="77" r="3" fill={lantern.color} />
              </svg>
            </div>
          ))}

          {/* Ground Diyas (oil lamps) row */}
          {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
            <div 
              key={`diya-row-${i}`}
              className="absolute bottom-[14%]"
              style={{ left: (isMobile ? 4750 : 10200) + i * (isMobile ? 45 : 50) }}
            >
              <svg width={isMobile ? 18 : 28} height={isMobile ? 25 : 38} viewBox="0 0 28 38">
                {/* Diya base */}
                <ellipse cx="14" cy="32" rx="12" ry="5" fill="#cd853f" />
                <ellipse cx="14" cy="30" rx="10" ry="4" fill="#daa520" />
                {/* Oil */}
                <ellipse cx="14" cy="28" rx="7" ry="2.5" fill="#8b4513" />
                {/* Flame */}
                <path 
                  d="M14 25 Q18 18 16 12 Q14 8 12 12 Q10 18 14 25" 
                  fill="#ff6b00" 
                  className="flame"
                />
                <path 
                  d="M14 25 Q16 20 15 15 Q14 12 13 15 Q12 20 14 25" 
                  fill="#ffd700" 
                  className="flame"
                />
                {/* Glow */}
                <circle cx="14" cy="18" r="8" fill="#ffa500" opacity="0.2" />
              </svg>
            </div>
          ))}

          {/* Aakash Kandil (Sky Lanterns) */}
          {[
            { x: isMobile ? 4870 : 10420, y: 3, color: '#ff6b35' },
            { x: isMobile ? 4970 : 10570, y: 6, color: '#ffd700' },
            { x: isMobile ? 5070 : 10720, y: 4, color: '#ff1493' },
          ].map((kandil, idx) => (
            <div 
              key={`kandil-${idx}`}
              className="absolute float"
              style={{ left: kandil.x, top: `${kandil.y}%` }}
            >
              <svg width={isMobile ? 30 : 50} height={isMobile ? 45 : 70} viewBox="0 0 50 70">
                {/* Top hook */}
                <path d="M25 0 L25 8" stroke="#333" strokeWidth="1" />
                {/* Kandil frame */}
                <path d="M15 8 L35 8 L40 35 L35 60 L15 60 L10 35 Z" fill={kandil.color} opacity="0.6" stroke="#8b4513" strokeWidth="1" />
                {/* Inner design */}
                <path d="M20 15 L30 15 L33 35 L30 52 L20 52 L17 35 Z" fill="#fff" opacity="0.2" />
                {/* Bottom tassel */}
                <line x1="20" y1="60" x2="20" y2="68" stroke={kandil.color} strokeWidth="1" />
                <line x1="25" y1="60" x2="25" y2="70" stroke={kandil.color} strokeWidth="1" />
                <line x1="30" y1="60" x2="30" y2="68" stroke={kandil.color} strokeWidth="1" />
              </svg>
            </div>
          ))}

          {/* String lights across */}
          <svg 
            className="absolute top-[8%]" 
            style={{ left: isMobile ? 4750 : 10200 }}
            width={isMobile ? 400 : 700} 
            height={isMobile ? 40 : 60} 
            viewBox="0 0 700 60"
          >
            {/* Wire */}
            <path d="M0 10 Q175 40 350 30 Q525 20 700 10" fill="none" stroke="#333" strokeWidth="2" />
            {/* Bulbs */}
            {Array.from({ length: 14 }).map((_, i) => {
              const x = i * 50 + 25;
              const y = 10 + Math.sin((i / 14) * Math.PI) * 25;
              const colors = ['#ff0000', '#ffd700', '#00ff00', '#ff6b35', '#ff1493', '#87ceeb'];
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x} y2={y + 8} stroke="#333" strokeWidth="1" />
                  <ellipse cx={x} cy={y + 14} rx="6" ry="8" fill={colors[i % colors.length]} className="light-bulb" style={{ '--delay': `${(i * 0.15) % 1.5}s` } as React.CSSProperties} />
                </g>
              );
            })}
          </svg>

          {/* Finale decorations */}
          <Garland x={isMobile ? 4750 : 10400} y={isMobile ? 35 : 50} width={isMobile ? 250 : 500} />
          
          {/* Light rays at finale */}
          {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-[15%] light-ray"
              style={{
                left: (isMobile ? 4850 : 10600) + i * (isMobile ? 30 : 50),
                width: isMobile ? 10 : 20,
                height: isMobile ? 150 : 300,
                background: `linear-gradient(to top, transparent, rgba(212, 175, 55, 0.3))`,
                transform: `rotate(${-20 + i * 5}deg)`,
                transformOrigin: 'bottom center',
              }}
            />
          ))}

          {/* Confetti at finale when reached */}
          {reachedEnd && (
            <div className="absolute" style={{ left: isMobile ? 4800 : 10500 }}>
              {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute confetti"
                  style={{
                    left: (i % 10) * (isMobile ? 25 : 50),
                    top: '-50px',
                    '--confetti-duration': `${2 + (i % 3)}s`,
                  } as React.CSSProperties}
                >
                  <div
                    className={`${isMobile ? 'w-1.5 h-1.5' : 'w-3 h-3'} rounded-sm`}
                    style={{
                      backgroundColor: ['#d4af37', '#ff6b35', '#ff1493', '#00ff00', '#ff0000'][i % 5],
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Happily Ever After text at finale */}
          {reachedEnd && (
            <motion.div
              className="absolute top-[8%] sm:top-[12%] md:top-[20%]"
              style={{ left: isMobile ? 4800 : 10550 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-lg sm:text-2xl md:text-6xl text-[#d4af37] text-center"
                style={{ fontFamily: 'Dancing Script, cursive' }}
              >
                Happily Ever After
              </h1>
              <p
                className="text-[10px] sm:text-sm md:text-xl text-[#f4e4bc] text-center mt-1 sm:mt-2 md:mt-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                ❤️ Thank you for joining our journey ❤️
              </p>
            </motion.div>
          )}
        </div>
      </ParallaxEngine>

      {/* ========== GROOM CHARACTER (Fixed on screen) ========== */}
      <div
        className="fixed z-40 transition-all duration-75"
        style={{
          left: groomScreenX,
          bottom: isMobile ? '6%' : '10%',
          transform: 'translateX(-50%)',
        }}
      >
        <Groom 
          isMoving={isWalking && !reachedEnd && !isHugging} 
          scale={isMobile ? 0.75 : 1.8} 
          facingLeft={facingDirection === 'left'}
          isHugging={isHugging}
        />
      </div>

      {/* ========== INSTRUCTIONS OVERLAY ========== */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="fixed bottom-20 sm:bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 z-40 glass rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <p className="text-[#f4e4bc] text-xs sm:text-sm md:text-base text-center whitespace-nowrap">
              {isMobile ? (
                <>Swipe or tap buttons to move →</>
              ) : (
                <>Use Arrow Keys ← → or Scroll to navigate</>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== CURRENT SECTION INDICATOR ========== */}
      <div className="fixed top-12 sm:top-14 md:top-16 left-2 sm:left-3 md:left-4 z-40 left-[1rem]">
        <div className="glass rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 p-[0.2rem]">
          <p
            className="text-[#d4af37] text-xs sm:text-sm font-semibold"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {SECTIONS.find((s, i) => {
              const next = SECTIONS[i + 1];
              return progress >= s.position && (!next || progress < next.position);
            })?.name || 'Journey'}
          </p>
        </div>
      </div>

      {/* ========== SOUND MANAGER ========== */}
      <SoundManager isPlaying={gameStarted} />
    </div>
  );
}

'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountdownScreen from '@/components/CountdownScreen';
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
  ChurmatiScene,
  HaldiScene,
  SangeetScene,
  EngagementScene,
  BaratScene,
  WeddingMandap,
  ReceptionScene,
  SatyanarayanKathaScene,
  DancingCelebrationScene,
  GroomHome,
  FinaleHome,
  ArrowSignboard,
} from '@/components/WeddingScenes';
import DiscoLights from '@/components/DiscoLights';
import SoundManager from '@/components/SoundManager';
import SangeetMusicManager from '@/components/SangeetMusicManager';
import WeddingMusicManager from '@/components/WeddingMusicManager';
import BaratMusicManager from '@/components/BaratMusicManager';
import Fireworks from '@/components/Fireworks';
import WeddingLights from '@/components/WeddingLights';

// Wedding date - February 21, 2026
const WEDDING_DATE = new Date('2026-02-21T00:00:00');

// World configuration - responsive (extended for all events)
const getWorldWidth = (isMobile: boolean) => isMobile ? 10000 : 20000;

// Event configuration matching invitation book exactly
const EVENT_SECTIONS = [
  { 
    name: 'Mehendi', 
    position: 0.08,
    subtitle: 'The Art of Love',
    scene: MehendiScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 2,
  },
  { 
    name: 'Churmati', 
    position: 0.18,
    subtitle: 'Traditional Welcome',
    scene: ChurmatiScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
  },
  { 
    name: 'Haldi', 
    position: 0.28,
    subtitle: 'Golden Blessings',
    scene: HaldiScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
    hasSplashes: true,
  },
  { 
    name: 'Sangeet', 
    position: 0.38,
    subtitle: 'Dance & Celebration',
    scene: SangeetScene,
    hasDiscoLights: true,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
  },
  { 
    name: 'Engagement', 
    position: 0.48,
    subtitle: 'The Promise',
    scene: EngagementScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
  },
  { 
    name: 'Barat', 
    position: 0.58,
    subtitle: 'The Procession',
    scene: BaratScene,
    hasDiscoLights: true,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 0,
  },
  { 
    name: 'Sadi', 
    position: 0.68,
    subtitle: 'The Wedding',
    scene: WeddingMandap,
    hasDiscoLights: false,
    hasWeddingLights: true,
    hasFireworks: true,
    garlandCount: 2,
    hasPetals: true,
  },
  { 
    name: 'Reception', 
    position: 0.78,
    subtitle: 'Celebration',
    scene: ReceptionScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
  },
  { 
    name: 'Satyanarayan Katha Puja', 
    position: 0.88,
    subtitle: 'Divine Blessings',
    scene: SatyanarayanKathaScene,
    hasDiscoLights: false,
    hasWeddingLights: false,
    hasFireworks: false,
    garlandCount: 1,
  },
];

// Section positions for progress tracking (must be defined after EVENT_SECTIONS)
const SECTIONS = [
  { name: 'Start', position: 0 },
  { name: 'Mehendi', position: 0.08 },
  { name: 'Churmati', position: 0.18 },
  { name: 'Haldi', position: 0.28 },
  { name: 'Sangeet', position: 0.38 },
  { name: 'Engagement', position: 0.48 },
  { name: 'Barat', position: 0.58 },
  { name: 'Sadi', position: 0.68 },
  { name: 'Reception', position: 0.78 },
  { name: 'Satyanarayan Katha Puja', position: 0.88 },
  { name: 'Finale', position: 0.95 },
];

export default function WeddingJourney() {
  const [showCountdown, setShowCountdown] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile-first
  const [worldWidth, setWorldWidth] = useState(10000); // Default mobile width (extended for all events)
  const [facingDirection, setFacingDirection] = useState<'left' | 'right' | 'idle'>('right');
  const [score, setScore] = useState(0);
  const crossedSectionsRef = useRef<Set<string>>(new Set());
  const [showHeadphonePopup, setShowHeadphonePopup] = useState(false);

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
  }, []);

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
    // Show headphone popup when journey starts
    setShowHeadphonePopup(true);
    // Reset score and crossed sections when starting
    setScore(0);
    crossedSectionsRef.current.clear();
  }, []);

  // Hide headphone popup after 2.5 seconds
  useEffect(() => {
    if (showHeadphonePopup) {
      const timer = setTimeout(() => {
        setShowHeadphonePopup(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showHeadphonePopup]);

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
  // Bride is at Welcome Home section (Finale at 0.95)
  // Mobile: 9900/10000 = 0.99, Desktop: 19800/20000 = 0.99
  const bridePosition = 0.93;
  const isHugging = progress >= bridePosition && !reachedEnd;

  // Detect when in Sangeet section (for music management and dancing)
  // Sangeet is at position 0.38 (38%) - match SangeetMusicManager boundaries
  const isInSangeetSection = progress >= 0.33 && progress <= 0.43;
  
  // Detect when in Barat section (for music management)
  // Barat is at position 0.58 (58%) - match BaratMusicManager boundaries
  const isInBaratSection = progress >= 0.56 && progress <= 0.63;
  
  // Detect when in Sadi/Wedding section (for music management)
  // Sadi is at position 0.68 (68%) - match WeddingMusicManager boundaries
  const isInWeddingSection = progress >= 0.63 && progress <= 0.73;

  // Show countdown screen first
  if (showCountdown) {
    return <CountdownScreen onComplete={handleCountdownComplete} weddingDate={WEDDING_DATE} />;
  }

  // Then show start screen
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
          {/* Calculate positions accounting for scaled widths:
              GroomHome: 350px width -> scaled 0.5 = 175px (mobile), scaled 1 = 350px (desktop)
              WelcomeGate: 300px width -> scaled 0.5 = 150px (mobile), scaled 1 = 300px (desktop)
              We want a large gap between them, so position gate much further right */}
          
          {/* GroomHome - positioned on the far left */}
          <div 
            className="absolute bottom-[15%] origin-bottom-left"
            style={{ 
              left: isMobile ? '80px' : 0,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <GroomHome x={0} />
          </div>

          {/* Headphone Popup - Flashing message over GroomHome section */}
          <AnimatePresence>
            {showHeadphonePopup && gameStarted && (
              <motion.div
                className="fixed top-[40%] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ 
                  opacity: [0.7, 1, 0.7, 1, 0.7, 1],
                  scale: [0.95, 1, 0.95, 1, 0.95, 1],
                }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  duration: 2.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  ease: "easeInOut"
                }}
              >
                <div className="bg-gradient-to-br from-[#800020] via-[#a00030] to-[#800020] border-2 border-[#d4af37] rounded-2xl px-6 py-4 sm:px-8 sm:py-5 shadow-2xl backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    {/* Headphone icon */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-4xl sm:text-5xl"
                    >
                      🎧
                    </motion.div>
                    {/* Message */}
                    <div className="text-center">
                      <p 
                        className="text-[#d4af37] font-bold text-base sm:text-lg md:text-xl mb-1"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        Use Headphones
                      </p>
                      <p 
                        className="text-[#f4e4bc] text-sm sm:text-base"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        for Better Experience
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Welcome people at start - positioned between GroomHome and WelcomeGate */}
          <div 
            className="absolute bottom-[18%] sm:bottom-[7%] md:bottom-[7%]" 
            style={{ left: isMobile ? 300 : 500 }}
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

          {/* Wedding cars - positioned after the Welcome Gate */}
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 600 : 1000,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WeddingCar x={0} />
          </div>
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 750 : 1200,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WeddingCar x={0} />
          </div>

          {/* Diyas along the path - fewer on mobile */}
          {Array.from({ length: isMobile ? 50 : 100 }).map((_, i) => (
            <Diya key={i} x={200 + i * (isMobile ? 200 : 200)} y={isMobile ? 60 : 80} scale={isMobile ? 0.5 : 0.8} />
          ))}

          {/* Rangolis along the path */}
          {(isMobile ? [500, 1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500] : [1000, 3000, 5000, 7000, 9000, 11000, 13000, 15000, 17000, 19000]).map((rx, i) => (
            <Rangoli key={i} x={rx} y={isMobile ? 20 : 30} size={isMobile ? 60 : 100} />
          ))}

          {/* Welcome Gate - positioned right after GroomHome at the start of journey
              Mobile: GroomHome ends at ~255px (80px start + 175px width), Gate starts at 400px = ~145px gap
              Desktop: GroomHome ends at ~350px (0px start + 350px width), Gate starts at 600px = ~250px gap */}
          <div 
            className="absolute bottom-[12%] origin-bottom-left"
            style={{ 
              left: isMobile ? 400 : 600,
              transform: isMobile ? 'scale(0.5)' : 'scale(1)'
            }}
          >
            <WelcomeGate x={0} title="Soni Family" />
          </div>

          {/* Render all event sections dynamically */}
          {EVENT_SECTIONS.map((event, index) => {
            const SceneComponent = event.scene;
            const baseX = event.position * worldWidth;
            const arrowOffset = isMobile ? -200 : -400;
            const bannerOffset = isMobile ? 0 : 0;
            const sceneOffset = isMobile ? 100 : 200;
            const garlandSpacing = isMobile ? 150 : 300;
            
            // Calculate active range (8% before and after section position for better visibility)
            const activeStart = Math.max(0, event.position - 0.08);
            const activeEnd = Math.min(0.95, event.position + 0.08);
            
            // Scene scale based on event type
            const sceneScale = event.name === 'Sadi' ? (isMobile ? 'scale(0.4)' : 'scale(1)') : (isMobile ? 'scale(0.45)' : 'scale(1)');
            const sceneBottom = event.name === 'Sadi' ? 'bottom-[10%]' : 'bottom-[15%]';
            
            return (
              <React.Fragment key={event.name}>
                {/* Arrow Signboard */}
                <ArrowSignboard 
                  x={baseX + arrowOffset} 
                  eventName={event.name} 
                  direction="right" 
                />
                
                {/* Event Banner */}
                <EventBanner 
                  x={baseX + bannerOffset} 
                  title={event.name}
                  subtitle={event.subtitle} 
                  isActive={progress >= activeStart && progress <= activeEnd}
                />
                
                {/* Scene */}
                <div 
                  className={`absolute ${sceneBottom} origin-bottom-left`}
                  style={{ 
                    left: baseX + sceneOffset,
                    transform: sceneScale
                  }}
                >
                  <SceneComponent x={0} />
                </div>
                
                {/* Garlands */}
                {Array.from({ length: event.garlandCount }).map((_, i) => (
                  <Garland 
                    key={`garland-${i}`}
                    x={baseX + (i * garlandSpacing)} 
                    y={isMobile ? (40 + i * 10) : (60 + i * 20)} 
                    width={isMobile ? (140 + i * 20) : (280 + i * 40)} 
                  />
                ))}
                
                {/* Disco Lights */}
                {event.hasDiscoLights && (
                  <DiscoLights 
                    x={baseX - (isMobile ? 100 : 200)} 
                    width={isMobile ? 500 : 800} 
                    isActive={progress >= activeStart && progress <= activeEnd} 
                  />
                )}
                
                {/* Wedding Lights */}
                {event.hasWeddingLights && (
                  <WeddingLights 
                    x={baseX - (isMobile ? 100 : 200)} 
                    width={isMobile ? 600 : 1000} 
                    isActive={progress >= activeStart && progress <= activeEnd} 
                  />
                )}
                
                {/* Fireworks */}
                {event.hasFireworks && (
                  <Fireworks 
                    x={baseX - (isMobile ? 150 : 300)} 
                    width={isMobile ? 700 : 1100} 
                    isActive={progress >= activeStart && progress <= activeEnd} 
                  />
                )}
                
                {/* Haldi Splashes */}
                {event.hasSplashes && (
                  <>
                    {(isMobile ? [baseX + 200, baseX + 250, baseX + 300] : [baseX + 200, baseX + 250, baseX + 300]).map((hx, i) => (
                      <div key={`splash-${i}`} className="absolute bottom-[20%] opacity-30" style={{ left: hx }}>
                        <div className={`${isMobile ? 'w-8 h-8' : 'w-16 h-16'} rounded-full bg-[#ffd700] blur-xl`} />
                      </div>
                    ))}
                  </>
                )}
                
                {/* Flower Petals for Sadi */}
                {event.hasPetals && (
                  <>
                    {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
                      <div
                        key={`petal-${i}`}
                        className="absolute petal"
                        style={{
                          left: (baseX + sceneOffset + 50) + (i % 5) * (isMobile ? 50 : 100),
                          top: '10%',
                          '--fall-duration': `${6 + (i % 4)}s`,
                          '--fall-delay': `${(i * 0.5) % 5}s`,
                        } as React.CSSProperties}
                      >
                        <span className={`text-pink-400 ${isMobile ? 'text-xs' : 'text-lg'}`}>🌸</span>
                      </div>
                    ))}
                  </>
                )}
              </React.Fragment>
            );
          })}

          {/* ===== FINALE SECTION ===== */}
          {/* Calculate Finale position: 0.95 of world width */}
          {(() => {
            const finaleBaseX = 0.95 * worldWidth;
            const arrowOffset = isMobile ? -200 : -400;
            const bannerOffset = isMobile ? 100 : 200;
            // Position house directly below/after the banner
            // Account for building width (600px * scale) to ensure it's fully visible
            // Mobile: building scaled to 0.7 = 420px wide, so position at 9500 + 100 + 200 = 9800 (leaves 200px margin)
            // Desktop: building scaled to 0.9 = 540px wide, so position at 19000 + 200 + 300 = 19500 (leaves 500px margin)
            const houseOffset = isMobile ? 200 : 300;
            
            return (
              <>
                <ArrowSignboard x={finaleBaseX + arrowOffset} eventName="Home" direction="right" />
                {/* Home Banner - spaced from house */}
                <EventBanner 
                  x={finaleBaseX + bannerOffset} 
                  title="Welcome Home" 
                  subtitle="Happily Ever After" 
                  isActive={progress >= 0.92 && progress <= 0.98}
                />
                {/* Welcome Home Building - using FinaleHome component */}
                {/* Position it so it's visible on screen - ensure it doesn't go beyond world width */}
                <div 
                  className="absolute bottom-[12%] origin-bottom-left z-50"
                  style={{ 
                    left: Math.min(finaleBaseX + bannerOffset + houseOffset, worldWidth - (isMobile ? 450 : 600)),
                    transform: isMobile ? 'scale(0.7)' : 'scale(0.9)',
                    pointerEvents: 'none',
                  }}
                >
                  <FinaleHome x={0} />
                </div>
              </>
            );
          })()}

          {/* Family members welcoming - positioned relative to Finale */}
          {(() => {
            const finaleBaseX = 0.95 * worldWidth;
            const familyOffset = isMobile ? -4750 : -8800; // Position before the house
            return (
              <>
          {/* Mother with aarti */}
          <div className="absolute bottom-[15%]" style={{ left: finaleBaseX + familyOffset + (isMobile ? 0 : 200) }}>
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
          <div className="absolute bottom-[15%]" style={{ left: finaleBaseX + familyOffset + (isMobile ? 30 : 260) }}>
            <svg width={isMobile ? 30 : 55} height={isMobile ? 50 : 85} viewBox="0 0 55 85">
              <ellipse cx="27" cy="75" rx="22" ry="8" fill="#f5f5dc" />
              <rect x="12" y="35" width="30" height="30" fill="#f5f5dc" rx="3" />
              <circle cx="27" cy="22" r="13" fill="#d2b48c" />
              <ellipse cx="27" cy="13" rx="11" ry="5" fill="#808080" />
              <path d="M27 15 L26 19 L28 19 Z" fill="#ff4500" />
            </svg>
          </div>

          {/* Grandmother with flowers */}
          <div className="absolute bottom-[15%]" style={{ left: finaleBaseX + familyOffset + (isMobile ? 270 : 920) }}>
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
          <div className="absolute bottom-[15%]" style={{ left: finaleBaseX + familyOffset + (isMobile ? 300 : 980) }}>
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
          <div className="absolute bottom-[15%]" style={{ left: finaleBaseX + familyOffset + (isMobile ? -30 : 150) }}>
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
              </>
            );
          })()}

          {/* Bride waiting at Welcome Home - visible when hugging */}
          {(() => {
            const finaleBaseX = 0.95 * worldWidth;
            const bannerOffset = isMobile ? 100 : 200;
            const houseOffset = isMobile ? 500 : 600;
            const brideOffset = bannerOffset + houseOffset + (isMobile ? 200 : 400);
            return (
              <div 
                className="absolute bottom-[8%] sm:bottom-[6%] md:bottom-[6%] z-35" 
                style={{ 
                  left: finaleBaseX + brideOffset
                }}
              >
                <Bride isMoving={false} scale={isMobile ? 0.5 : 1.2} />
              </div>
            );
          })()}

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
            { x: isMobile ? 9900 : 19800, delay: 0.3 },
            { x: isMobile ? 10000 : 20000, delay: 0.8 },
            { x: isMobile ? 10100 : 20200, delay: 1.3 },
            { x: isMobile ? 10150 : 20300, delay: 1.8 },
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
            <div className="absolute" style={{ left: isMobile ? 9900 : 19800 }}>
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
              style={{ left: isMobile ? 9900 : 19800 }}
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
          isMoving={isWalking && !reachedEnd && !isHugging && !isInSangeetSection && !isInBaratSection} 
          scale={isMobile ? 0.75 : 1.8} 
          facingLeft={facingDirection === 'left'}
          isHugging={isHugging}
          isDancing={isInSangeetSection || isInBaratSection}
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
      <SoundManager isPlaying={gameStarted} isPaused={isInSangeetSection || isInBaratSection || isInWeddingSection} />
      
      {/* ========== SANGEET MUSIC MANAGER ========== */}
      <SangeetMusicManager 
        progress={progress}
      />
      
      {/* ========== BARAT MUSIC MANAGER ========== */}
      <BaratMusicManager 
        progress={progress}
      />
      
      {/* ========== WEDDING MUSIC MANAGER ========== */}
      <WeddingMusicManager 
        progress={progress}
      />
    </div>
  );
}

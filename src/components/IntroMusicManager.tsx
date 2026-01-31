'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, useState } from 'react';

interface IntroMusicManagerProps {
  /** Play when true (from app load until invitation card ends). Stop when false. */
  isPlaying: boolean;
  /** When true, show music spectrum at bottom (e.g. on start screen). */
  showSpectrum?: boolean;
}

export interface IntroMusicManagerRef {
  play: () => void;
}

const SPECTRUM_BAR_COUNT = 18;
const SPECTRUM_HEIGHT = 56;
const SEGMENT_HEIGHT = 4;
const SEGMENT_GAP = 1;
const MAX_SEGMENTS = 12;
// Equalizer colors: green (bottom) → yellow → orange → red (top)
const SEGMENT_COLORS = ['#81c784', '#a5d6a7', '#c8e6c9', '#fff59d', '#ffee58', '#ffca28', '#ffb74d', '#ff9800', '#fb8c00', '#f4511e', '#e64a19', '#d84315'];

/**
 * Plays oh_mere.mp3 from app load through countdown and start screen.
 * Tries to start automatically when ready (muted then unmute); button tap is fallback.
 * Can show a frequency spectrum at bottom when showSpectrum and music is playing.
 */
const IntroMusicManager = forwardRef<IntroMusicManagerRef, IntroMusicManagerProps>(
  function IntroMusicManager({ isPlaying, showSpectrum = false }, ref) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const autoPlayTriedRef = useRef(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationIdRef = useRef<number>(0);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    const tryAutoPlay = useCallback(() => {
      const el = audioRef.current;
      if (!el || !isPlaying || autoPlayTriedRef.current) return;
      autoPlayTriedRef.current = true;
      el.volume = 0.5;
      el.muted = true;
      el.play()
        .then(() => {
          el.muted = false;
        })
        .catch(() => {
          autoPlayTriedRef.current = false;
        });
    }, [isPlaying]);

    const setupAnalyser = useCallback(() => {
      const el = audioRef.current;
      if (!el || audioContextRef.current) return;
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const source = ctx.createMediaElementSource(el);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        if (ctx.state === 'suspended') ctx.resume();
        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      } catch {
        // Web Audio not supported or blocked
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play() {
          const el = audioRef.current;
          if (!el || !isPlaying) return;
          el.volume = 0.5;
          el.muted = false;
          el.play().catch(() => {});
        },
      }),
      [isPlaying]
    );

    useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      if (!isPlaying) {
        el.pause();
        autoPlayTriedRef.current = false;
      }
    }, [isPlaying]);

    // Track play state and set up analyser on first play
    const handlePlay = useCallback(() => {
      setIsAudioPlaying(true);
      if (!audioContextRef.current) setupAnalyser();
    }, [setupAnalyser]);

    const handlePause = useCallback(() => {
      setIsAudioPlaying(false);
    }, []);

    // Spectrum animation: live when playing, idle pulse when not
    useEffect(() => {
      if (!showSpectrum || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const barWidth = w / SPECTRUM_BAR_COUNT;
      let startTime = 0;

      const drawSegment = (sx: number, sy: number, sw: number, sh: number, radius: number) => {
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(sx, sy, sw, sh, radius);
          ctx.fill();
        } else {
          ctx.fillRect(sx, sy, sw, sh);
        }
      };

      const draw = (timestamp: number) => {
        animationIdRef.current = requestAnimationFrame(draw);
        if (startTime === 0) startTime = timestamp;
        const t = (timestamp - startTime) / 1000;

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, w, h);

        const segW = Math.max(3, barWidth * 0.75);
        const barGap = barWidth * 0.15;
        const radius = 2;

        if (isAudioPlaying && analyserRef.current && dataArrayRef.current) {
          const analyser = analyserRef.current;
          const dataArray = dataArrayRef.current;
          analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
          const step = Math.floor(dataArray.length / SPECTRUM_BAR_COUNT);
          for (let bi = 0; bi < SPECTRUM_BAR_COUNT; bi++) {
            const value = dataArray[bi * step] ?? 0;
            const activeSegments = Math.round((value / 255) * MAX_SEGMENTS);
            const barX = bi * barWidth + (barWidth - segW) / 2;
            for (let si = 0; si < MAX_SEGMENTS; si++) {
              const isLit = si < activeSegments;
              const segY = h - (si + 1) * (SEGMENT_HEIGHT + SEGMENT_GAP);
              ctx.fillStyle = isLit ? SEGMENT_COLORS[si] ?? SEGMENT_COLORS[SEGMENT_COLORS.length - 1] : 'rgba(40, 40, 40, 0.6)';
              drawSegment(barX, segY, segW, SEGMENT_HEIGHT, radius);
            }
          }
        } else {
          for (let bi = 0; bi < SPECTRUM_BAR_COUNT; bi++) {
            const wave = Math.sin(t * 2 + bi * 0.25) * 0.45 + 0.5;
            const activeSegments = Math.max(1, Math.round(MAX_SEGMENTS * wave));
            const barX = bi * barWidth + (barWidth - segW) / 2;
            for (let si = 0; si < MAX_SEGMENTS; si++) {
              const isLit = si < activeSegments;
              const segY = h - (si + 1) * (SEGMENT_HEIGHT + SEGMENT_GAP);
              ctx.fillStyle = isLit ? SEGMENT_COLORS[si] ?? SEGMENT_COLORS[SEGMENT_COLORS.length - 1] : 'rgba(40, 40, 40, 0.6)';
              drawSegment(barX, segY, segW, SEGMENT_HEIGHT, radius);
            }
          }
        }
      };
      animationIdRef.current = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(animationIdRef.current);
    }, [showSpectrum, isAudioPlaying]);

    return (
      <>
        <audio
          ref={audioRef}
          src="/oh_mere.mp3"
          loop
          autoPlay
          playsInline
          preload="auto"
          muted
          style={{ display: 'none' }}
          onCanPlay={tryAutoPlay}
          onCanPlayThrough={tryAutoPlay}
          onLoadedData={tryAutoPlay}
          onPlay={(e) => {
            e.currentTarget.muted = false;
            handlePlay();
          }}
          onPause={handlePause}
        />
        {/* {showSpectrum && (
          <div
            className="m-auto w-[80vw] fixed bottom-0 left-0 right-0 z-[110] flex items-center justify-center py-2 px-2 safe-area-bottom"
            style={{
              background: '#0a0a0a',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.5)',
            }}
          >
            <canvas
              ref={canvasRef}
              width={400}
              height={SPECTRUM_HEIGHT}
              className="rounded-lg w-full max-w-[min(100vw,300px)]"
              style={{ display: 'block', width: '100%', maxWidth: 'min(100vw, 300px)' }}
            />
          </div>
        )} */}
      </>
    );
  }
);

export default IntroMusicManager;

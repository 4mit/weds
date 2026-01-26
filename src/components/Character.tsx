'use client';

import React from 'react';

interface CharacterProps {
  isMoving: boolean;
  scale?: number;
  facingLeft?: boolean;
  isHugging?: boolean;
  isDancing?: boolean;
}

// Groom character - Indian wedding attire (Sherwani)
export const Groom: React.FC<CharacterProps> = ({ isMoving, scale = 1, facingLeft = false, isHugging = false, isDancing = false }) => {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    if (isDancing) {
      // Faster animation for dancing
      const interval = setInterval(() => {
        setFrame((f) => (f + 1) % 8);
      }, 80);
      return () => clearInterval(interval);
    } else if (!isMoving) {
      setFrame(0);
      return;
    } else {
      const interval = setInterval(() => {
        setFrame((f) => (f + 1) % 8);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isMoving, isDancing]);

  // Walking animation phases
  const walkCycle = frame / 8;
  const legPhase = Math.sin(walkCycle * Math.PI * 2);
  const armPhase = Math.sin(walkCycle * Math.PI * 2 + Math.PI);
  const bodyBob = Math.abs(Math.sin(walkCycle * Math.PI * 4)) * 2;

  // Dancing animation - jumping and dancing
  const danceCycle = frame / 8;
  const jumpHeight = isDancing ? Math.abs(Math.sin(danceCycle * Math.PI * 2)) * 25 : 0;
  const danceRotation = isDancing ? Math.sin(danceCycle * Math.PI * 4) * 8 : 0;
  const danceBounce = isDancing ? Math.abs(Math.sin(danceCycle * Math.PI * 4)) * 15 : 0;

  // Leg angles - more exaggerated for dancing
  const leftLegAngle = isDancing ? Math.sin(danceCycle * Math.PI * 2) * 40 : (isMoving ? legPhase * 25 : 0);
  const rightLegAngle = isDancing ? -Math.sin(danceCycle * Math.PI * 2) * 40 : (isMoving ? -legPhase * 25 : 0);
  const leftKnee = isDancing ? Math.max(0, Math.sin(danceCycle * Math.PI * 2)) * 50 : (isMoving ? Math.max(0, legPhase) * 30 : 0);
  const rightKnee = isDancing ? Math.max(0, -Math.sin(danceCycle * Math.PI * 2)) * 50 : (isMoving ? Math.max(0, -legPhase) * 30 : 0);

  // Arm swing - different for hugging, dancing, or walking
  // When dancing, arms go up in celebration
  const leftArmAngle = isHugging ? 60 : (isDancing ? Math.sin(danceCycle * Math.PI * 2) * 60 + 30 : (isMoving ? armPhase * 15 : 0));
  const rightArmAngle = isHugging ? -60 : (isDancing ? -Math.sin(danceCycle * Math.PI * 2) * 60 - 30 : (isMoving ? -armPhase * 15 : 0));
  const leftArmBend = isHugging ? 45 : (isDancing ? 20 : 0);
  const rightArmBend = isHugging ? 45 : (isDancing ? 20 : 0);

  return (
    <svg
      width={80 * scale}
      height={140 * scale}
      viewBox="0 0 80 140"
      className="gpu-accelerate"
      style={{ 
        transform: `translateY(${isDancing ? -jumpHeight - danceBounce : (isMoving ? -bodyBob : 0)}px) rotate(${isDancing ? danceRotation : 0}deg) scaleX(${facingLeft ? -1 : 1})`,
        transition: isDancing ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      {/* Shadow */}
      <ellipse
        cx="40"
        cy="138"
        rx={isDancing ? 18 + Math.abs(Math.sin(danceCycle * Math.PI * 2)) * 5 : (isMoving ? 18 + Math.abs(legPhase) * 3 : 18)}
        ry="4"
        fill="rgba(0,0,0,0.3)"
        opacity={isDancing ? 0.5 + Math.abs(Math.sin(danceCycle * Math.PI * 2)) * 0.3 : 1}
      />

      {/* Left Leg */}
      <g transform={`rotate(${leftLegAngle}, 35, 95)`}>
        {/* Thigh */}
        <rect x="32" y="95" width="8" height="20" fill="#f5deb3" rx="3" />
        {/* Lower leg with knee bend */}
        <g transform={`rotate(${leftKnee}, 36, 115)`}>
          <rect x="32" y="115" width="8" height="18" fill="#f5deb3" rx="3" />
          {/* Shoe */}
          <ellipse cx="36" cy="133" rx="8" ry="4" fill="#8B4513" />
          <ellipse cx="38" cy="132" rx="6" ry="3" fill="#A0522D" />
        </g>
      </g>

      {/* Right Leg */}
      <g transform={`rotate(${rightLegAngle}, 45, 95)`}>
        {/* Thigh */}
        <rect x="40" y="95" width="8" height="20" fill="#f5deb3" rx="3" />
        {/* Lower leg with knee bend */}
        <g transform={`rotate(${rightKnee}, 44, 115)`}>
          <rect x="40" y="115" width="8" height="18" fill="#f5deb3" rx="3" />
          {/* Shoe */}
          <ellipse cx="44" cy="133" rx="8" ry="4" fill="#8B4513" />
          <ellipse cx="46" cy="132" rx="6" ry="3" fill="#A0522D" />
        </g>
      </g>

      {/* Sherwani Body */}
      <path
        d="M25 50 Q20 60 22 95 L58 95 Q60 60 55 50 Z"
        fill="#800020"
        stroke="#d4af37"
        strokeWidth="1"
      />
      
      {/* Sherwani Details - Gold embroidery */}
      <path d="M38 55 L38 90" stroke="#d4af37" strokeWidth="2" fill="none" />
      <path d="M42 55 L42 90" stroke="#d4af37" strokeWidth="2" fill="none" />
      <circle cx="40" cy="60" r="2" fill="#d4af37" />
      <circle cx="40" cy="70" r="2" fill="#d4af37" />
      <circle cx="40" cy="80" r="2" fill="#d4af37" />

      {/* Dupatta/Stole */}
      <path
        d="M25 50 Q15 55 18 75 Q20 85 25 90"
        fill="none"
        stroke="#ff6b35"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M25 50 Q15 55 18 75 Q20 85 25 90"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1"
        strokeDasharray="3,3"
      />

      {/* Left Arm */}
      {isHugging ? (
        <g transform={`rotate(${leftArmAngle}, 25, 55)`}>
          {/* Upper arm */}
          <rect x="15" y="52" width="10" height="18" fill="#800020" rx="4" />
          {/* Forearm bent for hugging */}
          <g transform={`rotate(${leftArmBend}, 20, 70)`}>
            <rect x="15" y="70" width="10" height="18" fill="#800020" rx="4" />
            <ellipse cx="20" cy="88" rx="5" ry="6" fill="#f5deb3" />
          </g>
        </g>
      ) : isDancing ? (
        <g transform={`rotate(${leftArmAngle}, 25, 55)`}>
          {/* Upper arm */}
          <rect x="15" y="52" width="10" height="18" fill="#800020" rx="4" />
          {/* Forearm bent for dancing */}
          <g transform={`rotate(${leftArmBend}, 20, 70)`}>
            <rect x="15" y="70" width="10" height="18" fill="#800020" rx="4" />
            <ellipse cx="20" cy="88" rx="5" ry="6" fill="#f5deb3" />
          </g>
        </g>
      ) : (
        <g transform={`rotate(${leftArmAngle}, 25, 55)`}>
          <rect x="15" y="52" width="10" height="25" fill="#800020" rx="4" />
          <ellipse cx="20" cy="78" rx="5" ry="6" fill="#f5deb3" />
        </g>
      )}

      {/* Right Arm */}
      {isHugging ? (
        <g transform={`rotate(${rightArmAngle}, 55, 55)`}>
          {/* Upper arm */}
          <rect x="55" y="52" width="10" height="18" fill="#800020" rx="4" />
          {/* Forearm bent for hugging */}
          <g transform={`rotate(${rightArmBend}, 60, 70)`}>
            <rect x="55" y="70" width="10" height="18" fill="#800020" rx="4" />
            <ellipse cx="60" cy="88" rx="5" ry="6" fill="#f5deb3" />
          </g>
        </g>
      ) : isDancing ? (
        <g transform={`rotate(${rightArmAngle}, 55, 55)`}>
          {/* Upper arm */}
          <rect x="55" y="52" width="10" height="18" fill="#800020" rx="4" />
          {/* Forearm bent for dancing */}
          <g transform={`rotate(${rightArmBend}, 60, 70)`}>
            <rect x="55" y="70" width="10" height="18" fill="#800020" rx="4" />
            <ellipse cx="60" cy="88" rx="5" ry="6" fill="#f5deb3" />
          </g>
        </g>
      ) : (
        <g transform={`rotate(${rightArmAngle}, 55, 55)`}>
          <rect x="55" y="52" width="10" height="25" fill="#800020" rx="4" />
          <ellipse cx="60" cy="78" rx="5" ry="6" fill="#f5deb3" />
        </g>
      )}

      {/* Neck */}
      <rect x="35" y="42" width="10" height="10" fill="#f5deb3" />

      {/* Head */}
      <ellipse cx="40" cy="32" rx="16" ry="18" fill="#f5deb3" />
      
      {/* Hair */}
      <ellipse cx="40" cy="20" rx="14" ry="8" fill="#1a1a1a" />
      <path
        d="M26 25 Q28 35 26 40"
        fill="#1a1a1a"
        stroke="#1a1a1a"
        strokeWidth="3"
      />
      <path
        d="M54 25 Q52 35 54 40"
        fill="#1a1a1a"
        stroke="#1a1a1a"
        strokeWidth="3"
      />

      {/* Turban (Safa) */}
      <ellipse cx="40" cy="15" rx="18" ry="12" fill="#ff6b35" />
      <ellipse cx="40" cy="12" rx="15" ry="8" fill="#d4af37" />
      <path
        d="M30 8 Q40 0 50 8"
        fill="none"
        stroke="#800020"
        strokeWidth="3"
      />
      {/* Turban jewel */}
      <circle cx="40" cy="8" r="4" fill="#d4af37" />
      <circle cx="40" cy="8" r="2" fill="#ff0000" />
      {/* Feather */}
      <path
        d="M40 4 Q45 -5 42 -10 Q40 -5 38 -10 Q35 -5 40 4"
        fill="#fff"
        stroke="#d4af37"
        strokeWidth="0.5"
      />

      {/* Face */}
      {/* Eyes */}
      <ellipse cx="34" cy="32" rx="3" ry="2" fill="#fff" />
      <ellipse cx="46" cy="32" rx="3" ry="2" fill="#fff" />
      <circle cx="35" cy="32" r="1.5" fill="#4a3728" />
      <circle cx="47" cy="32" r="1.5" fill="#4a3728" />
      
      {/* Eyebrows */}
      <path d="M30 28 Q34 26 38 28" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      <path d="M42 28 Q46 26 50 28" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      
      {/* Nose */}
      <path d="M40 33 L39 38 L41 38" stroke="#d4a574" strokeWidth="1" fill="none" />
      
      {/* Smile */}
      <path
        d="M35 42 Q40 46 45 42"
        stroke="#8b6914"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Mustache */}
      <path
        d="M33 40 Q36 42 40 40 Q44 42 47 40"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

// Bride character - Indian wedding attire (Lehenga)
export const Bride: React.FC<CharacterProps> = ({ isMoving, scale = 1 }) => {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    if (!isMoving) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);
    }, 120);
    return () => clearInterval(interval);
  }, [isMoving]);

  const sway = isMoving ? Math.sin((frame / 8) * Math.PI * 2) * 3 : 0;

  return (
    <svg
      width={90 * scale}
      height={150 * scale}
      viewBox="0 0 90 150"
      className="gpu-accelerate"
    >
      {/* Shadow */}
      <ellipse cx="45" cy="148" rx="25" ry="5" fill="rgba(0,0,0,0.3)" />

      {/* Lehenga (Skirt) */}
      <path
        d={`M20 75 Q${10 + sway} 110 ${15 + sway} 145 L${75 - sway} 145 Q${80 - sway} 110 70 75 Z`}
        fill="#ff0044"
        stroke="#d4af37"
        strokeWidth="2"
      />
      
      {/* Lehenga embroidery */}
      <path
        d="M25 100 Q45 95 65 100"
        stroke="#d4af37"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M22 120 Q45 115 68 120"
        stroke="#d4af37"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M18 140 Q45 135 72 140"
        stroke="#d4af37"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Gold dots on lehenga */}
      {[30, 45, 60].map((x) =>
        [85, 105, 125].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#d4af37" />
        ))
      )}

      {/* Blouse */}
      <path
        d="M30 50 Q25 55 28 75 L62 75 Q65 55 60 50 Z"
        fill="#ff0044"
        stroke="#d4af37"
        strokeWidth="1"
      />

      {/* Dupatta drape */}
      <path
        d={`M30 50 Q20 60 15 80 Q10 100 ${20 + sway} 130`}
        fill="none"
        stroke="#ff6b9d"
        strokeWidth="15"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d={`M30 50 Q20 60 15 80 Q10 100 ${20 + sway} 130`}
        fill="none"
        stroke="#d4af37"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Arms */}
      <rect x="18" y="52" width="12" height="20" fill="#f5deb3" rx="5" />
      <rect x="60" y="52" width="12" height="20" fill="#f5deb3" rx="5" />
      
      {/* Bangles */}
      <rect x="18" y="68" width="12" height="3" fill="#ff0000" rx="1" />
      <rect x="18" y="65" width="12" height="3" fill="#00ff00" rx="1" />
      <rect x="60" y="68" width="12" height="3" fill="#ff0000" rx="1" />
      <rect x="60" y="65" width="12" height="3" fill="#00ff00" rx="1" />

      {/* Hands */}
      <ellipse cx="24" cy="75" rx="6" ry="5" fill="#f5deb3" />
      <ellipse cx="66" cy="75" rx="6" ry="5" fill="#f5deb3" />

      {/* Neck */}
      <rect x="40" y="42" width="10" height="10" fill="#f5deb3" />

      {/* Necklace */}
      <path
        d="M35 50 Q45 58 55 50"
        stroke="#d4af37"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="45" cy="56" r="4" fill="#ff0000" stroke="#d4af37" strokeWidth="1" />

      {/* Head */}
      <ellipse cx="45" cy="32" rx="15" ry="17" fill="#f5deb3" />

      {/* Hair */}
      <ellipse cx="45" cy="20" rx="16" ry="10" fill="#1a1a1a" />
      <path d="M29 22 Q30 35 29 42" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="4" />
      <path d="M61 22 Q60 35 61 42" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="4" />

      {/* Maang Tikka */}
      <circle cx="45" cy="18" r="5" fill="#d4af37" />
      <circle cx="45" cy="18" r="2" fill="#ff0000" />
      <path d="M45 13 L45 5" stroke="#d4af37" strokeWidth="2" />
      <circle cx="45" cy="4" r="2" fill="#d4af37" />

      {/* Veil/Dupatta on head */}
      <path
        d="M30 15 Q45 8 60 15 Q65 25 62 35"
        fill="none"
        stroke="#ff6b9d"
        strokeWidth="10"
        opacity="0.6"
      />

      {/* Face */}
      {/* Eyes with makeup */}
      <ellipse cx="39" cy="32" rx="3" ry="2.5" fill="#fff" />
      <ellipse cx="51" cy="32" rx="3" ry="2.5" fill="#fff" />
      <circle cx="39" cy="32" r="1.5" fill="#4a3728" />
      <circle cx="51" cy="32" r="1.5" fill="#4a3728" />
      
      {/* Eyeliner */}
      <path d="M35 31 Q39 29 43 31" stroke="#1a1a1a" strokeWidth="1" fill="none" />
      <path d="M47 31 Q51 29 55 31" stroke="#1a1a1a" strokeWidth="1" fill="none" />
      
      {/* Bindi */}
      <circle cx="45" cy="26" r="2.5" fill="#ff0000" />

      {/* Nose with nose ring */}
      <path d="M45 33 L44 38 L46 38" stroke="#d4a574" strokeWidth="1" fill="none" />
      <circle cx="43" cy="37" r="1.5" fill="#d4af37" />

      {/* Lips */}
      <ellipse cx="45" cy="42" rx="4" ry="2" fill="#ff4466" />

      {/* Earrings */}
      <circle cx="30" cy="35" r="3" fill="#d4af37" />
      <circle cx="30" cy="40" r="2" fill="#ff0000" />
      <circle cx="60" cy="35" r="3" fill="#d4af37" />
      <circle cx="60" cy="40" r="2" fill="#ff0000" />
    </svg>
  );
};

// Guest/Family member
export const Guest: React.FC<CharacterProps & { variant?: 'male' | 'female'; color?: string }> = ({
  isMoving,
  scale = 1,
  variant = 'male',
  color = '#4169E1',
}) => {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    if (!isMoving) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);
    }, 100);
    return () => clearInterval(interval);
  }, [isMoving]);

  const walkPhase = isMoving ? Math.sin((frame / 8) * Math.PI * 2) : 0;

  if (variant === 'female') {
    return (
      <svg width={50 * scale} height={90 * scale} viewBox="0 0 50 90" className="gpu-accelerate">
        <ellipse cx="25" cy="88" rx="12" ry="3" fill="rgba(0,0,0,0.2)" />
        {/* Saree */}
        <path d="M15 40 Q10 60 12 85 L38 85 Q40 60 35 40 Z" fill={color} />
        <path d="M15 40 Q5 50 8 70" stroke="#d4af37" strokeWidth="8" fill="none" opacity="0.7" />
        {/* Body */}
        <ellipse cx="25" cy="35" rx="10" ry="8" fill={color} />
        {/* Head */}
        <circle cx="25" cy="20" r="10" fill="#f5deb3" />
        <ellipse cx="25" cy="14" rx="9" ry="5" fill="#1a1a1a" />
        {/* Face */}
        <circle cx="22" cy="20" r="1" fill="#333" />
        <circle cx="28" cy="20" r="1" fill="#333" />
        <circle cx="25" cy="17" r="1.5" fill="#ff0000" />
        <path d="M23 24 Q25 26 27 24" stroke="#c44" strokeWidth="1" fill="none" />
      </svg>
    );
  }

  return (
    <svg width={50 * scale} height={90 * scale} viewBox="0 0 50 90" className="gpu-accelerate">
      <ellipse cx="25" cy="88" rx="10" ry="3" fill="rgba(0,0,0,0.2)" />
      {/* Legs */}
      <g transform={`rotate(${walkPhase * 15}, 20, 55)`}>
        <rect x="18" y="55" width="6" height="30" fill="#f5deb3" rx="2" />
        <ellipse cx="21" cy="86" rx="5" ry="3" fill="#333" />
      </g>
      <g transform={`rotate(${-walkPhase * 15}, 30, 55)`}>
        <rect x="26" y="55" width="6" height="30" fill="#f5deb3" rx="2" />
        <ellipse cx="29" cy="86" rx="5" ry="3" fill="#333" />
      </g>
      {/* Kurta */}
      <path d="M15 30 Q12 40 14 58 L36 58 Q38 40 35 30 Z" fill={color} />
      {/* Arms */}
      <rect x="8" y="32" width="7" height="18" fill={color} rx="3" />
      <rect x="35" y="32" width="7" height="18" fill={color} rx="3" />
      <ellipse cx="11" cy="52" rx="4" ry="3" fill="#f5deb3" />
      <ellipse cx="39" cy="52" rx="4" ry="3" fill="#f5deb3" />
      {/* Neck */}
      <rect x="22" cy="25" width="6" height="6" fill="#f5deb3" />
      {/* Head */}
      <circle cx="25" cy="18" r="10" fill="#f5deb3" />
      <ellipse cx="25" cy="12" rx="8" ry="5" fill="#1a1a1a" />
      {/* Face */}
      <circle cx="22" cy="18" r="1" fill="#333" />
      <circle cx="28" cy="18" r="1" fill="#333" />
      <path d="M23 22 Q25 24 27 22" stroke="#8b6914" strokeWidth="1" fill="none" />
    </svg>
  );
};


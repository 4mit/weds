'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InvitationBookProps {
  onProceed: () => void;
}

// Themed decorations for each event
const MehendiDecor = () => (
  <div className="event-decor mehendi-decor">
    {/* Henna/Paisley patterns */}
    <svg className="decor-svg decor-top-left" viewBox="0 0 60 60" width="50" height="50">
      <path d="M30 5 Q45 15 40 30 Q35 45 20 45 Q10 40 10 25 Q15 10 30 5" fill="none" stroke="#ff6b35" strokeWidth="2" opacity="0.6"/>
      <circle cx="25" cy="25" r="5" fill="#ff6b35" opacity="0.4"/>
      <path d="M20 35 Q25 40 30 35" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.5"/>
    </svg>
    <svg className="decor-svg decor-top-right" viewBox="0 0 60 60" width="45" height="45">
      <path d="M30 10 Q40 20 35 35 Q25 45 15 35 Q10 25 20 15 Q25 10 30 10" fill="none" stroke="#ff6b35" strokeWidth="2" opacity="0.5"/>
      <circle cx="28" cy="28" r="3" fill="#ff6b35" opacity="0.4"/>
    </svg>
    {/* Floating flowers */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="floating-flower"
        style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 5}%` }}
        animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
      >
        🌸
      </motion.div>
    ))}
    {/* Henna hand icon */}
    <div className="decor-center-icon">✋</div>
  </div>
);

const SangeetDecor = () => (
  <div className="event-decor sangeet-decor">
    {/* Music wave animation */}
    <div className="music-waves">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="wave-bar"
          style={{ backgroundColor: '#ff69b4' }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
    {/* Floating music notes */}
    {['♪', '♫', '♬', '🎵', '🎶'].map((note, i) => (
      <motion.div
        key={i}
        className="floating-note"
        style={{ left: `${10 + i * 20}%`, color: '#ff69b4' }}
        animate={{ y: [0, -15, 0], x: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
      >
        {note}
      </motion.div>
    ))}
    {/* Disco lights effect */}
    <div className="disco-lights">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="disco-dot"
          style={{ left: `${20 + i * 30}%`, backgroundColor: ['#ff69b4', '#ffd700', '#ff6b35'][i] }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

const HaldiDecor = () => (
  <div className="event-decor haldi-decor">
    {/* Marigold flowers */}
    {['🌼', '🌻', '💛', '🌼', '✨'].map((flower, i) => (
      <motion.div
        key={i}
        className="floating-marigold"
        style={{ left: `${8 + i * 20}%`, top: `${5 + (i % 2) * 10}%` }}
        animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
      >
        {flower}
      </motion.div>
    ))}
    {/* Turmeric drops */}
    <svg className="decor-svg decor-bottom" viewBox="0 0 100 30" width="100" height="30">
      {[15, 35, 55, 75, 85].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="15"
          r="6"
          fill="#ffd700"
          opacity="0.5"
          animate={{ cy: [15, 20, 15], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
    {/* Golden sparkles */}
    <div className="golden-sparkles">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="sparkle"
          style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 15}%` }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  </div>
);

const WeddingDecor = () => (
  <div className="event-decor wedding-decor">
    {/* Floating hearts */}
    {['❤️', '💕', '💗', '💖', '💝'].map((heart, i) => (
      <motion.div
        key={i}
        className="floating-heart"
        style={{ left: `${5 + i * 20}%` }}
        animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
      >
        {heart}
      </motion.div>
    ))}
    {/* Sacred fire/mandap flames */}
    <div className="mandap-flames">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="flame"
          animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
        >
          🔥
        </motion.div>
      ))}
    </div>
    {/* Wedding bells */}
    <motion.div
      className="wedding-bells"
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      🔔
    </motion.div>
    {/* Garland decoration */}
    <svg className="decor-svg garland-svg" viewBox="0 0 120 25" width="120" height="25">
      <path d="M5 12 Q30 22 60 12 Q90 2 115 12" fill="none" stroke="#d4af37" strokeWidth="3" opacity="0.6"/>
      {[15, 40, 60, 80, 105].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 14 : 10} r="4" fill={['#ff6b35', '#ff1493', '#ffd700'][i % 3]} opacity="0.7"/>
      ))}
    </svg>
  </div>
);

// Get decoration component based on event name
const getEventDecor = (eventName: string) => {
  switch (eventName) {
    case 'Mehendi': return <MehendiDecor />;
    case 'Churmati': return <MehendiDecor />;
    case 'Haldi': return <HaldiDecor />;
    case 'Sangeet': return <SangeetDecor />;
    case 'Engagement': return <WeddingDecor />;
    case 'Barat': return <WeddingDecor />;
    case 'Sadi': return <WeddingDecor />;
    case 'Reception': return <SangeetDecor />;
    case 'Satyanarayan Katha Puja': return <HaldiDecor />;
    default: return null;
  }
};

const EVENTS = [
  {
    name: 'Mehendi',
    subtitle: 'The Art of Love',
    description: 'Join us for the beautiful tradition of Mehendi, where intricate henna designs tell stories of love and celebration.',
    color: '#ff6b35',
    icon: '🎨',
    date: '19 Feb 2026',
    schedule: [
      { time: 'Evening', activity: 'Mehendi Ceremony', icon: '✋' },
      { time: 'Location', activity: 'Home Bijabhat', icon: '🏠' },
    ]
  },
  {
    name: 'Churmati',
    subtitle: 'Traditional Welcome',
    description: 'A morning celebration with breakfast to welcome the wedding festivities.',
    color: '#ff9f40',
    icon: '🌅',
    date: '20 Feb 2026',
    schedule: [
      { time: 'Morning', activity: 'Breakfast', icon: '🍳' },
      { time: 'Location', activity: 'Town Hall', icon: '🏛️' },
    ]
  },
  {
    name: 'Haldi',
    subtitle: 'Golden Blessings',
    description: 'The sacred turmeric ceremony where blessings are showered upon the couple for a prosperous life ahead.',
    color: '#ffd700',
    icon: '✨',
    date: '20 Feb 2026',
    schedule: [
      { time: 'Afternoon', activity: 'Haldi Ceremony', icon: '💛' },
      { time: 'Afternoon', activity: 'Lunch', icon: '🍽️' },
    ]
  },
  {
    name: 'Sangeet',
    subtitle: 'Dance & Celebration',
    description: 'A night of music, dance, and joy as families come together to celebrate with traditional performances.',
    color: '#ff69b4',
    icon: '💃',
    date: '20 Feb 2026',
    schedule: [
      { time: 'Evening', activity: 'Dance & Music', icon: '🎵' },
      { time: 'Evening', activity: 'Dinner', icon: '🍽️' },
    ]
  },
  {
    name: 'Engagement',
    subtitle: 'The Promise',
    description: 'The formal engagement ceremony marking the beginning of the wedding celebrations.',
    color: '#c77dff',
    icon: '💍',
    date: '21 Feb 2026',
    schedule: [
      { time: 'Morning', activity: 'Engagement Ceremony', icon: '💍' },
      { time: 'Morning', activity: 'Breakfast', icon: '🍳' },
    ]
  },
  {
    name: 'Barat',
    subtitle: 'The Procession',
    description: 'The groom\'s procession arriving with pomp and celebration.',
    color: '#4a90e2',
    icon: '🐴',
    date: '21 Feb 2026',
    schedule: [
      { time: 'Lunch Time', activity: 'Barat Arrival', icon: '🎉' },
      { time: 'Lunch Time', activity: 'Lunch', icon: '🍽️' },
    ]
  },
  {
    name: 'Sadi',
    subtitle: 'The Wedding',
    description: 'The sacred wedding ceremony where two souls unite in holy matrimony.',
    color: '#d4af37',
    icon: '🔥',
    date: '21 Feb 2026',
    schedule: [
      { time: 'Evening', activity: 'Wedding Ceremony', icon: '💐' },
      { time: 'Evening', activity: 'Pheras & Vows', icon: '🔥' },
    ]
  },
  {
    name: 'Reception',
    subtitle: 'Celebration',
    description: 'An evening of celebration, music, and joy with family and friends.',
    color: '#ff1493',
    icon: '🎊',
    date: '21 Feb 2026',
    schedule: [
      { time: 'Night', activity: 'Reception Party', icon: '🎉' },
      { time: 'Night', activity: 'Dinner', icon: '🍽️' },
    ]
  },
  {
    name: 'Satyanarayan Katha Puja',
    subtitle: 'Divine Blessings',
    description: 'A sacred prayer ceremony seeking blessings for the newlyweds\' journey together.',
    color: '#8b4513',
    icon: '🪔',
    date: '22 Feb 2026',
    schedule: [
      { time: 'Morning', activity: 'Puja Ceremony', icon: '🪔' },
      { time: 'Location', activity: 'Home Bijabhat', icon: '🏠' },
    ]
  }
];

const InvitationBook: React.FC<InvitationBookProps> = ({ onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [currentCoupleIndex, setCurrentCoupleIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const couples = [
    { groom: 'Amit', bride: 'Ranjana' },
    { groom: 'Laxminarayan', bride: 'Pratima' }
  ];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentSection(null);
  };

  const handleSectionClick = (sectionName: string) => {
    setCurrentSection(currentSection === sectionName ? null : sectionName);
  };

  // Scroll to section when animation completes
  const scrollToSection = useCallback((sectionName: string) => {
    const sectionEl = sectionRefs.current[sectionName];
    if (sectionEl) {
      // Small delay to ensure content is fully rendered
      setTimeout(() => {
        sectionEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 100);
    }
  }, []);

  // Auto-transition between couples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoupleIndex((prev) => (prev + 1) % couples.length);
    }, 3000); // Change couple every 3 seconds

    return () => clearInterval(interval);
  }, [couples.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${10 + (i % 5) * 5}px`,
              height: `${10 + (i % 5) * 5}px`,
              backgroundColor: ['#d4af37', '#ff6b35', '#ff69b4', '#ffd700'][i % 4],
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* 3D Menu Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-3d">
        <div
          ref={menuRef}
          className={`menu-3d ${isOpen ? 'open' : ''}`}
        >
          {/* Cover Page */}
          <motion.div
            className="menu-cover"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpen ? -180 : 0 }}
            transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="menu-cover-front">
              <div className="cover-content">
                <h1 className="cover-title">Wedding Invitation</h1>
                <h2 className="cover-subtitle">A Celebration of Love</h2>
                
                {/* Couple Names with Transition Effect */}
                <div className="couple-names-container" style={{ minHeight: '80px', marginBottom: '1.5rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCoupleIndex}
                      className="couple-names"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                        fontWeight: 700,
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <span>{couples[currentCoupleIndex].groom}</span>
                      <motion.span 
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                      >
                        💕
                      </motion.span>
                      <span>{couples[currentCoupleIndex].bride}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="cover-icon">💒</div>
                <motion.button
                  onClick={handleOpen}
                  className="cover-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View the Events
                </motion.button>
              </div>
            </div>
            <div className="menu-cover-back"></div>
          </motion.div>

          {/* Menu Content */}
          <motion.div
            className="menu-content"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isOpen ? 0 : 180 }}
            transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="menu-inner">
              {/* Header */}
              <div className="menu-header">
                <h1 className="menu-title">Wedding Celebration</h1>
                <h2 className="menu-subtitle">Join Us in Our Journey</h2>
                
                {/* Couple Names with Transition Effect in Header */}
                <div className="menu-couple-names" style={{ minHeight: '50px', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCoupleIndex}
                      className="couple-names-header"
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                        fontWeight: 600,
                        color: '#800020',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <span>{couples[currentCoupleIndex].groom}</span>
                      <motion.span 
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        💕
                      </motion.span>
                      <span>{couples[currentCoupleIndex].bride}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <button
                  onClick={handleClose}
                  className="menu-close"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              {/* Events Sections */}
              <div className="menu-sections">
                {EVENTS.map((event, index) => (
                  <div key={index} className="menu-section">
                    <button
                      className={`section-header ${currentSection === event.name ? 'active' : ''}`}
                      onClick={() => handleSectionClick(event.name)}
                      style={{ borderLeftColor: event.color }}
                    >
                      <span className="section-icon">{event.icon}</span>
                      <div className="section-title-group">
                        <h3 className="section-title">{event.name}</h3>
                        <p className="section-subtitle">{event.subtitle}</p>
                        <p className="section-subtitle">{event.date}</p>
                      </div>
                      <span className="section-toggle">
                        {currentSection === event.name ? (
                          '−'
                        ) : (
                          <span className="view-detail-text">View Detail</span>
                        )}
                      </span>
                    </button>
                    <AnimatePresence>
                      {currentSection === event.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`section-content section-${event.name.toLowerCase()}`}
                          onAnimationComplete={(definition) => {
                            // Only scroll when opening (not closing)
                            if (definition === 'animate' || (typeof definition === 'object' && 'opacity' in definition && definition.opacity === 1)) {
                              scrollToSection(event.name);
                            }
                          }}
                        >
                          <div 
                            className="event-details"
                            ref={(el) => { sectionRefs.current[event.name] = el; }}
                          >
                            {/* Themed Decorations */}
                            {getEventDecor(event.name)}
                            
                            <p className="event-description">{event.description}</p>
                            
                            {/* Event Schedule List */}
                            <div className="event-schedule">
                              <h4 className="schedule-title" style={{ color: event.color }}>
                                📅 Event Schedule ({event.date})
                              </h4>
                              <ul className="schedule-list">
                                {event.schedule.map((item, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="schedule-item"
                                    initial={{ 
                                      x: -30, 
                                      opacity: 0, 
                                      scale: 0.9,
                                      filter: 'blur(4px)'
                                    }}
                                    animate={{ 
                                      x: 0, 
                                      opacity: 1, 
                                      scale: 1,
                                      filter: 'blur(0px)'
                                    }}
                                    transition={{ 
                                      delay: idx * 0.15,
                                      duration: 0.5,
                                      ease: [0.25, 0.46, 0.45, 0.94],
                                      scale: { type: "spring", stiffness: 200, damping: 15 }
                                    }}
                                    whileHover={{ 
                                      scale: 1.02, 
                                      x: 8,
                                      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15), 0 0 15px ${event.color}30`,
                                      transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ 
                                      borderLeftColor: event.color,
                                      '--item-color': event.color 
                                    } as React.CSSProperties}
                                  >
                                    <motion.span 
                                      className="schedule-icon"
                                      initial={{ rotate: -10, scale: 0 }}
                                      animate={{ rotate: 0, scale: 1 }}
                                      transition={{ 
                                        delay: idx * 0.15 + 0.2,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10
                                      }}
                                    >
                                      {item.icon}
                                    </motion.span>
                                    <motion.span 
                                      className="schedule-time" 
                                      style={{ color: event.color }}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.15 + 0.1 }}
                                    >
                                      {item.time}
                                    </motion.span>
                                    <motion.span 
                                      className="schedule-divider"
                                      initial={{ scaleX: 0 }}
                                      animate={{ scaleX: 1 }}
                                      transition={{ delay: idx * 0.15 + 0.25, duration: 0.3 }}
                                    >
                                      —
                                    </motion.span>
                                    <motion.span 
                                      className="schedule-activity"
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.15 + 0.2, duration: 0.4 }}
                                    >
                                      {item.activity}
                                    </motion.span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div
                              className="event-accent"
                              style={{ backgroundColor: event.color }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="menu-footer">
                <motion.button
                  onClick={onProceed}
                  className="proceed-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Click to Begin Journey
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvitationBook;

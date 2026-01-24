'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InvitationBookProps {
  onProceed: () => void;
}

const EVENTS = [
  {
    name: 'Mehendi',
    subtitle: 'The Art of Love',
    description: 'Join us for the beautiful tradition of Mehendi, where intricate henna designs tell stories of love and celebration.',
    color: '#ff6b35',
    icon: '🎨'
  },
  {
    name: 'Sangeet',
    subtitle: 'Dance & Celebration',
    description: 'A night of music, dance, and joy as families come together to celebrate with traditional performances.',
    color: '#ff69b4',
    icon: '💃'
  },
  {
    name: 'Haldi',
    subtitle: 'Golden Blessings',
    description: 'The sacred turmeric ceremony where blessings are showered upon the couple for a prosperous life ahead.',
    color: '#ffd700',
    icon: '✨'
  },
  {
    name: 'Wedding',
    subtitle: 'Two Souls, One Journey',
    description: 'The moment when two hearts become one, surrounded by love, blessings, and eternal promises.',
    color: '#d4af37',
    icon: '💍'
  }
];

const InvitationBook: React.FC<InvitationBookProps> = ({ onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
                      </div>
                      <span className="section-toggle">
                        {currentSection === event.name ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {currentSection === event.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="section-content"
                        >
                          <div className="event-details">
                            <p className="event-description">{event.description}</p>
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

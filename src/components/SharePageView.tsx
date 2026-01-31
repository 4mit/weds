'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SharePageViewProps {
  onBack: () => void;
}

const SharePageView: React.FC<SharePageViewProps> = ({ onBack }) => {
  const handleWhatsAppShare = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://soni-wedding.com';
    const message = encodeURIComponent(
      `🎉 *Soni Family Wedding Invitation* 🎉\n\n` +
      `Join us for a beautiful celebration!\n\n` +
      `Experience our interactive wedding journey featuring:\n` +
      `✨ Mehendi\n` +
      `✨ Haldi\n` +
      `✨ Sangeet\n` +
      `✨ Engagement\n` +
      `✨ Barat\n` +
      `✨ Wedding\n` +
      `✨ Reception\n\n` +
      `Click here to view: ${siteUrl}\n\n` +
      `💕 Looking forward to celebrating with you! 💕`
    );
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Header with Back */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-[#d4af37]/30">
        <button
          type="button"
          onClick={onBack}
          className="unified-button flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="text-[#f4e4bc] font-medium">Share</span>
      </div>

      {/* Content - leave space for spectrum at bottom */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 pb-24">
        <motion.p
          className="text-[#f4e4bc] text-center text-lg sm:text-xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Share the wedding invitation with friends & family
        </motion.p>
        <motion.button
          type="button"
          onClick={handleWhatsAppShare}
          className="unified-button flex items-center gap-3 px-8 py-4"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #20BA5A 100%)',
            borderColor: '#25D366',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share on WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.873.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="text-lg font-semibold">Share on WhatsApp</span>
        </motion.button>
      </div>
      {/* Spectrum is rendered by IntroMusicManager at bottom when showSpectrum is true */}
    </div>
  );
};

export default SharePageView;

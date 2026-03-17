import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';
import { getWhatsAppLink, scrollToTop } from '../../utils/helpers';

const FloatingButtons: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = "Hi, I'm interested in UCCOPAINTS products. Can you help me?";

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink(COMPANY_INFO.whatsapp, whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse-slow"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToTop()}
          className="fixed bottom-24 right-6 z-40 bg-primary-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default FloatingButtons;

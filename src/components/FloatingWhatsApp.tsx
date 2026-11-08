import React from 'react';
import { openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <button
      onClick={() => openWhatsApp()}
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-20 md:bottom-6 left-4 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      title="تواصل معنا عبر واتساب 01128440008"
    >
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full" />
      <WhatsAppIcon className="w-8 h-8" variant="white" />
    </button>
  );
};

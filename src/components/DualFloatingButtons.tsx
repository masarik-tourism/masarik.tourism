import React from 'react';
import { Phone } from 'lucide-react';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TravelRepository } from '../data/travelData';

export const DualFloatingButtons: React.FC = () => {
  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-4 z-40 flex flex-col items-center gap-2.5"
      dir="ltr"
    >
      {/* Direct Phone Call Button */}
      <button
        onClick={() => dialPhoneNumber()}
        aria-label="اتصال هاتفي مباشر"
        title={`اتصال هاتفي مباشر: ${TravelRepository.PHONE_NUMBER}`}
        className="w-12 h-12 rounded-full bg-[#0F2438] hover:bg-[#163B65] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white"
      >
        <Phone className="w-5 h-5 text-[#E5C887]" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={() => openWhatsApp()}
        aria-label="تواصل فوري عبر واتساب"
        title={`تواصل معنا عبر واتساب: ${TravelRepository.PHONE_NUMBER}`}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white"
      >
        <WhatsAppIcon className="w-7 h-7" variant="white" />
      </button>
    </div>
  );
};

import React from 'react';
import { Phone } from 'lucide-react';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TravelRepository } from '../data/travelData';

export const DualFloatingButtons: React.FC = () => {
  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-4 z-40 flex flex-col items-start gap-2.5"
      dir="ltr"
    >
      {/* Direct Phone Call Button */}
      <button
        onClick={() => dialPhoneNumber()}
        aria-label="اتصال هاتفي مباشر"
        title={`اتصال هاتفي مباشر: ${TravelRepository.PHONE_NUMBER}`}
        className="w-12 h-12 rounded-full bg-[#0F2438] hover:bg-[#163B65] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052] focus-visible:ring-offset-2"
      >
        <Phone className="w-5 h-5 text-[#E5C887]" />
      </button>

      {/* Fixed WhatsApp Floating Button */}
      <button
        onClick={() =>
          openWhatsApp(
            'السلام عليكم، أود الاستفسار وطلب خدمة (تأشيرات / حجز طيران وفنادق / تخليص إجراءات) من شركة مسارك للإنجاز السياحي.'
          )
        }
        aria-label="تواصل فوري عبر واتساب لطلب الخدمات"
        title={`تواصل معنا عبر واتساب: ${TravelRepository.PHONE_NUMBER}`}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white p-3 sm:px-4 sm:py-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2438] focus-visible:ring-offset-2 animate-pulse-float-a"
      >
        <WhatsAppIcon className="w-7 h-7 shrink-0" variant="white" />
        <span className="hidden md:inline text-xs font-black tracking-wide whitespace-nowrap" dir="rtl">
          اطلب خدمة واتساب
        </span>
      </button>
    </div>
  );
};

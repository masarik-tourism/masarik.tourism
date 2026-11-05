import React from 'react';
import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';

interface NavbarProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { label: 'الرئيسية', index: 0 },
    { label: 'الخدمات', index: 1 },
    { label: 'طرق الدفع', index: 2 },
    { label: 'اتصل بنا', index: 3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DAC8] shadow-sm">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-[#0F2437] to-[#17344F] text-white px-4 py-1.5 text-xs font-bold flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#E5C887]" />
          <span>{TravelRepository.CERTIFICATION_TITLE} • س.ت: {TravelRepository.COMMERCIAL_RECORD}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => dialPhoneNumber()}
            className="hover:text-[#E5C887] transition flex items-center gap-1 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{TravelRepository.PHONE_NUMBER}</span>
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="text-[#E5C887] hover:underline transition flex items-center gap-1 cursor-pointer font-black"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب مباشر</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onSelectTab(0)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img
            src="/images/masarik_logo.jpg"
            alt="شعار مسارك للإنجاز السياحي"
            className="w-12 h-12 rounded-full border-2 border-[#C6A052] object-cover shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-black text-[#17344F] leading-tight">
              {TravelRepository.COMPANY_NAME_AR}
            </h1>
            <span className="text-xs font-bold text-[#2A7688] tracking-wide">
              {TravelRepository.COMPANY_NAME_EN}
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FAF8F2] p-1.5 rounded-full border border-[#E2DAC8]">
          {tabs.map((tab) => (
            <button
              key={tab.index}
              onClick={() => onSelectTab(tab.index)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                currentTab === tab.index
                  ? 'bg-[#17344F] text-white shadow-sm'
                  : 'text-[#17344F] hover:text-[#2A7688] hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhatsApp()}
            className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs md:text-sm font-black px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow hover:shadow-md transition-all active:scale-95 cursor-pointer"
            title="تواصل معنا عبر واتساب"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">واتساب:</span>
            <span>{TravelRepository.PHONE_NUMBER}</span>
          </button>
          <button
            onClick={() => dialPhoneNumber()}
            className="p-2 text-[#17344F] hover:bg-[#FAF8F2] rounded-full border border-[#E2DAC8] transition cursor-pointer md:hidden"
            title="اتصل بنا"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Phone, ShieldCheck, Compass, Download } from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import masarikLogoImg from '../assets/images/masarik_logo.jpg';
import { FacebookIcon } from './FacebookIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { isRunningInApp } from '../utils/appEnvironment';

interface NavbarProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [logoError, setLogoError] = useState(false);
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(isRunningInApp());
  }, []);

  const tabs = [
    { label: 'الرئيسية', index: 0 },
    { label: 'الخدمات', index: 1 },
    { label: 'طرق الدفع', index: 2 },
    { label: 'اتصل بنا', index: 3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DAC8] shadow-sm">
      <div className="bg-gradient-to-r from-[#0F2437] via-[#17344F] to-[#0F2437] text-white px-4 py-1.5 text-xs font-bold flex justify-center items-center text-center">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#E5C887] shrink-0" />
          <span>{TravelRepository.CERTIFICATION_TITLE} • س.ت: {TravelRepository.COMMERCIAL_RECORD}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div
          onClick={() => onSelectTab(0)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {!logoError ? (
            <img
              src={masarikLogoImg}
              onError={() => setLogoError(true)}
              alt="شعار مسارك للإنجاز السياحي"
              className="w-12 h-12 rounded-full border-2 border-[#C6A052] object-cover shadow-sm group-hover:scale-105 transition-transform bg-white"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-[#C6A052] bg-gradient-to-br from-[#17344F] to-[#0F2437] flex items-center justify-center text-[#E5C887] shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-[#E5C887]" />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-black text-[#17344F] leading-tight whitespace-nowrap">
              {TravelRepository.COMPANY_NAME_AR}
            </h1>
            <span className="text-[10px] sm:text-xs font-bold text-[#2A7688] tracking-wide whitespace-nowrap">
              {TravelRepository.COMPANY_NAME_EN}
            </span>
          </div>
        </div>

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

        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isApp && (
            <a
              href={TravelRepository.APK_DOWNLOAD_URL}
              className="bg-gradient-to-r from-[#C6A052] to-[#E5C887] hover:from-[#d4b063] hover:to-[#f0d59a] text-[#0F2437] font-black text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              title="تحميل وتثبيت تطبيق مسارك المباشر (APK)"
            >
              <Download className="w-3.5 h-3.5 text-[#0F2437]" />
              <span className="hidden xs:inline">تثبيت التطبيق</span>
              <span className="xs:hidden">تثبيت</span>
            </a>
          )}
          <button
            onClick={() => openWhatsApp()}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-[#25D366]/10 rounded-full border border-[#E2DAC8] transition cursor-pointer flex items-center justify-center shrink-0 shadow-xs active:scale-95"
            title="تواصل معنا عبر واتساب"
          >
            <WhatsAppIcon className="w-4.5 h-4.5" variant="colored" />
          </button>
          <a
            href={TravelRepository.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#1877F2] hover:bg-[#1877F2]/10 rounded-full border border-[#E2DAC8] transition cursor-pointer flex items-center justify-center shrink-0 shadow-xs active:scale-95"
            title="صفحة مسارك للإنجاز السياحي على فيسبوك"
          >
            <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
          </a>
          <button
            onClick={() => dialPhoneNumber()}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#17344F] hover:bg-[#FAF8F2] rounded-full border border-[#E2DAC8] transition cursor-pointer flex items-center justify-center shrink-0 shadow-xs active:scale-95"
            title="اتصال هاتفي"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

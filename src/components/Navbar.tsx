import React, { useState, useEffect, useRef } from 'react';
import { Phone, ShieldCheck, Compass, Download, Menu, X, ChevronDown, RotateCw } from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import masarikLogoImg from '../assets/images/masarik_logo.jpg';
import { FacebookIcon } from './FacebookIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { isRunningInApp } from '../utils/appEnvironment';
import { useLatestApkInfo, handleApkDownload, FAST_CDN_APK_URL } from '../hooks/useLatestApkUrl';

interface NavbarProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onSelectService }) => {
  const [logoError, setLogoError] = useState(false);
  const [isApp, setIsApp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const apkInfo = useLatestApkInfo();

  const handleHardRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setShowRefreshToast(true);

    // Clear caches in ServiceWorker / CacheStorage if supported
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_ALL_CACHES' });
      } catch {}
    }
    if ('caches' in window) {
      try {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        }).catch(() => {});
      } catch {}
    }

    // Force cache-busting reload
    setTimeout(() => {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('t', Date.now().toString());
        window.location.href = url.toString();
      } catch {
        window.location.reload();
      }
    }, 600);
  };

  useEffect(() => {
    setIsApp(isRunningInApp());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs = [
    { label: 'الرئيسية', index: 0 },
    { label: 'دليل الخدمات', index: 1, hasDropdown: true },
    { label: 'طرق الدفع المعتمدة', index: 2 },
    { label: 'تواصل معنا', index: 3 },
  ];

  const handleTabClick = (index: number) => {
    onSelectTab(index);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleServiceSelect = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Official Top Bar */}
      <div className="bg-[#0A1926] text-white px-4 py-1.5 text-xs font-semibold flex justify-center items-center text-center border-b border-[#C6A052]/40">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E5C887] shrink-0" />
          <span className="text-[11px] sm:text-xs">
            {TravelRepository.CERTIFICATION_TITLE} • سجل تجاري رقم: {TravelRepository.COMMERCIAL_RECORD}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <div
          onClick={() => handleTabClick(0)}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
        >
          {!logoError ? (
            <img
              src={masarikLogoImg}
              onError={() => setLogoError(true)}
              alt="شعار مسارك للإنجاز السياحي"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C6A052] object-cover shadow-xs group-hover:scale-105 transition-transform bg-white shrink-0"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C6A052] bg-[#0F2438] flex items-center justify-center text-[#E5C887] shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C887]" />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base md:text-lg font-black text-[#0F2438] leading-tight whitespace-nowrap">
              مسارك للإنجاز السياحي
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#0284C7] tracking-wider uppercase whitespace-nowrap">
              {TravelRepository.COMPANY_NAME_EN}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold">
          {tabs.map((tab) => {
            if (tab.hasDropdown) {
              return (
                <div key={tab.index} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                      currentTab === tab.index
                        ? 'bg-[#0F2438] text-white shadow-xs'
                        : 'text-slate-700 hover:text-[#0F2438] hover:bg-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 border-b border-slate-100">
                        الخدمات المعتمدة الرسمية
                      </div>
                      {TravelRepository.services.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => handleServiceSelect(svc.title)}
                          className="w-full text-right px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0284C7] transition flex items-center justify-between"
                        >
                          <span className="truncate">{svc.title}</span>
                          {svc.badge && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-medium shrink-0">
                              {svc.badge}
                            </span>
                          )}
                        </button>
                      ))}
                      <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                        <button
                          onClick={() => handleTabClick(1)}
                          className="w-full text-center py-1.5 text-xs font-bold text-[#0284C7] hover:underline"
                        >
                          عرض كل الخدمات بالتفصيل
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={tab.index}
                onClick={() => handleTabClick(tab.index)}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === tab.index
                    ? 'bg-[#0F2438] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#0F2438] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Contact & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {!isApp && (
            <a
              href={apkInfo.downloadUrl || FAST_CDN_APK_URL}
              onClick={(e) => handleApkDownload(apkInfo.downloadUrl, e)}
              className="hidden sm:flex bg-[#0F2438] hover:bg-[#163B65] text-[#E5C887] font-bold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full items-center gap-1 sm:gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap border border-[#C6A052]/40"
              title={`تحميل وتحديث تطبيق مسارك للإنجاز السياحي (${apkInfo.version})`}
            >
              <Download className="w-3.5 h-3.5 text-[#E5C887]" />
              <span>تطبيق أندرويد ({apkInfo.version})</span>
            </a>
          )}

          {/* Refresh / Reload Button */}
          <button
            onClick={handleHardRefresh}
            disabled={isRefreshing}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 hover:bg-[#0F2438] text-[#0F2438] hover:text-[#E5C887] rounded-full border border-slate-200 transition cursor-pointer flex items-center justify-center shrink-0 active:scale-95 disabled:opacity-80"
            title="تحديث البيانات وإعادة تحميل الصفحة"
            aria-label="تحديث البيانات"
          >
            <RotateCw className={`w-4 h-4 transition-transform ${isRefreshing ? 'animate-spin text-[#0284C7]' : ''}`} />
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() => openWhatsApp()}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 hover:bg-[#25D366]/10 text-[#25D366] rounded-full border border-slate-200 transition cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
            title="تواصل معنا عبر واتساب 01128440008"
          >
            <WhatsAppIcon className="w-4.5 h-4.5" variant="colored" />
          </button>

          {/* Facebook Link */}
          <a
            href={TravelRepository.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 hover:bg-[#1877F2]/10 text-[#1877F2] rounded-full border border-slate-200 transition cursor-pointer items-center justify-center shrink-0 active:scale-95"
            title="صفحة مسارك للإنجاز السياحي على فيسبوك"
          >
            <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
          </a>

          {/* Phone Call */}
          <button
            onClick={() => dialPhoneNumber()}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 text-[#0F2438] hover:bg-slate-100 rounded-full border border-slate-200 transition cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
            title="اتصال هاتفي مباشر"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 hover:bg-slate-200 text-[#0F2438] rounded-full flex items-center justify-center shrink-0 transition"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating Refresh Toast */}
      {showRefreshToast && (
        <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2438] text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl border border-[#C6A052]/50 flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200 pointer-events-none">
          <RotateCw className="w-3.5 h-3.5 text-[#E5C887] animate-spin" />
          <span>جاري تحديث البيانات...</span>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-150 shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.index}
              onClick={() => handleTabClick(tab.index)}
              className={`w-full text-right px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-between ${
                currentTab === tab.index
                  ? 'bg-[#0F2438] text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleHardRefresh();
            }}
            className="w-full text-right px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-between border border-dashed border-slate-200"
          >
            <span className="flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[#0F2438]" />
              <span>تحديث البيانات والصفحة</span>
            </span>
            <span className="text-[10px] text-slate-400">فوري</span>
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>خدمة العملاء: {TravelRepository.PHONE_NUMBER}</span>
            <span className="text-[#0284C7] font-semibold">متاح 24 ساعة</span>
          </div>
        </div>
      )}
    </header>
  );
};

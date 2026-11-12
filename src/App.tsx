import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DualFloatingButtons } from './components/DualFloatingButtons';
import { HomeScreen } from './screens/HomeScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { ContactScreen } from './screens/ContactScreen';
import { TravelRepository } from './data/travelData';
import { dialPhoneNumber, openWhatsApp } from './utils/communication';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FacebookIcon } from './components/FacebookIcon';
import { WhatsAppIcon } from './components/WhatsAppIcon';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | null>(null);

  const handleNavigateToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForContact(serviceTitle);
    }
    setCurrentTab(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: number) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceFromNavbar = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
    setCurrentTab(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F2438] selection:bg-[#0284C7]/20">
      {/* Organized Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onSelectService={handleSelectServiceFromNavbar}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentTab === 0 && (
          <HomeScreen
            onNavigateToServices={() => handleSelectTab(1)}
            onNavigateToContact={handleNavigateToContact}
          />
        )}
        {currentTab === 1 && (
          <ServicesScreen onNavigateToContact={handleNavigateToContact} />
        )}
        {currentTab === 2 && (
          <PaymentScreen onNavigateToContact={() => handleSelectTab(3)} />
        )}
        {currentTab === 3 && (
          <ContactScreen initialService={selectedServiceForContact} />
        )}
      </main>

      {/* Professional Portal Footer */}
      <footer className="bg-[#0A1926] text-white pt-12 pb-24 md:pb-10 border-t-2 border-[#C6A052]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs sm:text-sm">
          {/* Col 1: Bio & Licensing */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-white">
                {TravelRepository.COMPANY_NAME_AR}
              </span>
              <span className="text-xs text-[#C6A052] font-bold">
                ({TravelRepository.COMPANY_NAME_EN})
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              شباكك الواحد وبوابتك المعتمدة رسمياً لإنجاز كافة معاملات التأشيرات وحجز مواعيد تساهيل VFS، تسديد منصة إنجاز والتأمين الصحي، حجز تذاكر الطيران وتوثيق الأوراق الحكومية – بخبرة رائدة ومستمرة منذ عام 2022.
            </p>
            <div className="flex flex-col gap-1 text-xs text-[#E5C887] font-semibold pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#C6A052]" />
                <span>سجل تجاري رقم: {TravelRepository.COMMERCIAL_RECORD} • الرقم الموحد: {TravelRepository.UNIFIED_NUMBER}</span>
              </div>
              <span className="text-slate-400 text-[11px] pr-6">شركة معتمدة وموثقة من الغرفة التجارية المصرية</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#E5C887] uppercase tracking-wider">
              أقسام المنصة
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => handleSelectTab(0)}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <span>الرئيسية والدليل التفاعلي</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelectTab(1)}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <span>دليل الخدمات والتأشيرات</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelectTab(2)}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <span>طرق الدفع المعتمدة (InstaPay)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelectTab(3)}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <span>بيانات الاتصال ومقر الفروع</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#E5C887] uppercase tracking-wider">
              التواصل والمقر الرسمي
            </h3>
            <div className="space-y-2 text-slate-300">
              <button
                onClick={() => dialPhoneNumber()}
                className="flex items-center gap-2 hover:text-[#E5C887] transition cursor-pointer text-right w-full"
              >
                <Phone className="w-4 h-4 text-[#C6A052] shrink-0" />
                <span>الهاتف: {TravelRepository.PHONE_NUMBER}</span>
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2 hover:text-[#25D366] transition cursor-pointer text-right w-full"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="colored" />
                <span>واتساب: {TravelRepository.PHONE_NUMBER}</span>
              </button>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-[#C6A052] shrink-0" />
                <span className="truncate">البريد: {TravelRepository.OFFICIAL_EMAIL}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-[#C6A052] shrink-0" />
                <span>{TravelRepository.WORKING_HOURS}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                <span>العنوان: {TravelRepository.ADDRESS}</span>
              </div>

              <a
                href={TravelRepository.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#60A5FA] text-slate-200 transition cursor-pointer pt-1"
              >
                <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
                <span>صفحة مسارك على فيسبوك</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal notice bottom */}
        <div className="border-t border-white/10 pt-6 pb-2 text-center max-w-5xl mx-auto px-4">
          <p className="text-xs md:text-sm text-slate-300 font-medium tracking-wide">
            مسارك للإنجاز السياحي (2022) © جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {/* Floating Call & WhatsApp Buttons */}
      <DualFloatingButtons />

      {/* Offline Mode Alert */}
      <OfflineIndicator />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav currentTab={currentTab} onSelectTab={handleSelectTab} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeScreen } from './screens/HomeScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { ContactScreen } from './screens/ContactScreen';
import { TravelRepository } from './data/travelData';
import { dialPhoneNumber, openWhatsApp } from './utils/communication';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FacebookIcon } from './components/FacebookIcon';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#132838] selection:bg-[#2A7688]/20">
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

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

      <footer className="bg-[#0F2437] text-white pt-10 pb-20 md:pb-8 border-t-4 border-[#C6A052]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-xs md:text-sm">
          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-black text-[#E5C887]">
              {TravelRepository.COMPANY_NAME_AR}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              وكالة معتمدة وموثقة من الغرفة التجارية المصرية تحمل السجل التجاري رقم {TravelRepository.COMMERCIAL_RECORD}. إنجاز جميع معاملات التأشيرات والسفر والسياحة الدينية بأعلى احترافية.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-black text-[#E5C887]">
              بيانات التواصل الرسمية
            </h3>
            <div className="space-y-1.5 text-gray-300">
              <button
                onClick={() => dialPhoneNumber()}
                className="flex items-center gap-2 hover:text-[#E5C887] transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>الهاتف: {TravelRepository.PHONE_NUMBER}</span>
              </button>
              <button
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2 hover:text-[#E5C887] transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>الواتساب: {TravelRepository.PHONE_NUMBER}</span>
              </button>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">الإيميل: {TravelRepository.OFFICIAL_EMAIL}</span>
              </div>
              <a
                href={TravelRepository.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#60A5FA] text-gray-200 transition cursor-pointer"
              >
                <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0">
                  <FacebookIcon className="w-3 h-3 text-[#1877F2] fill-[#1877F2]" />
                </span>
                <span>فيسبوك: {TravelRepository.FACEBOOK_USERNAME}</span>
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-black text-[#E5C887]">
              مواعيد العمل والفروع
            </h3>
            <div className="space-y-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{TravelRepository.WORKING_HOURS}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>فروعنا: محافظة القاهرة • محافظة الدقهلية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 text-center text-[11px] text-gray-400">
          جميع الحقوق محفوظة © 2026 {TravelRepository.COMPANY_NAME_AR} ({TravelRepository.COMPANY_NAME_EN}) • سجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}
        </div>
      </footer>

      <FloatingWhatsApp />
      <OfflineIndicator />
      <BottomNav currentTab={currentTab} onSelectTab={handleSelectTab} />
    </div>
  );
};

export default App;

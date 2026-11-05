import React from 'react';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Check,
  Building,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  Star,
} from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';

interface HomeScreenProps {
  onNavigateToServices: () => void;
  onNavigateToContact: (serviceTitle?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToServices,
  onNavigateToContact,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 md:pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF8F2] border-b border-[#E2DAC8]">
        {/* Background Image with Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/masarik_hero_bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/90 via-[#FAF8F2]/95 to-[#FAF8F2]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-16 text-center flex flex-col items-center">
          {/* Official Badge Logo */}
          <div className="relative mb-4">
            <img
              src="/images/masarik_logo.jpg"
              alt="شعار مسارك للإنجاز السياحي"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#C6A052] shadow-lg object-cover bg-white"
            />
            <div className="absolute -bottom-1 -left-1 bg-[#17344F] text-[#E5C887] p-1.5 rounded-full border-2 border-white shadow">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-[#0F2437] tracking-tight mb-1">
            {TravelRepository.COMPANY_NAME_AR}
          </h1>
          <span className="text-xs md:text-sm font-bold text-[#2A7688] tracking-widest uppercase mb-3">
            {TravelRepository.COMPANY_NAME_EN}
          </span>
          <p className="text-sm md:text-base font-bold text-[#324D61] max-w-xl mx-auto mb-6 leading-relaxed">
            {TravelRepository.TAGLINE}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openWhatsApp()}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب ({TravelRepository.PHONE_NUMBER})</span>
            </button>
            <button
              onClick={() => dialPhoneNumber()}
              className="bg-[#17344F] hover:bg-[#0F2437] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل بنا ({TravelRepository.PHONE_NUMBER})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-10 space-y-6">
        {/* Official Certification Card */}
        <div className="bg-[#FBF7EE] border-2 border-[#E5C887] rounded-2xl p-4 md:p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#C6A052]/20 flex items-center justify-center shrink-0 text-[#9E7B33]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-black text-[#9E7B33]">
              {TravelRepository.CERTIFICATION_TITLE}
            </h2>
            <p className="text-xs md:text-sm font-bold text-[#0F2437] mt-0.5">
              {TravelRepository.COMMERCIAL_RECORD_STATEMENT}
            </p>
          </div>
        </div>

        {/* Feature Badges Horizontal Row */}
        <div>
          <h2 className="text-base md:text-lg font-black text-[#0F2437] mb-3 px-1">
            أبرز المعاملات والخدمات المعتمدة
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {TravelRepository.featureBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2DAC8] rounded-xl p-3.5 min-w-[165px] md:min-w-[185px] shrink-0 shadow-sm hover:border-[#C6A052] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EAF4F6] text-[#2A7688] flex items-center justify-center mb-2 font-black text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-xs md:text-sm font-bold text-[#17344F] mb-1">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-[#678093] leading-snug">
                  {badge.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Highlights Header */}
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-base md:text-lg font-black text-[#0F2437]">
              باقات وخدمات التأشيرات
            </h2>
            <button
              onClick={onNavigateToServices}
              className="text-xs md:text-sm font-bold text-[#2A7688] hover:text-[#17344F] flex items-center gap-1 cursor-pointer"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top 3 Services */}
          <div className="space-y-4">
            {TravelRepository.services.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-sm md:text-base font-bold text-[#17344F]">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="bg-[#EAF4F6] text-[#2A7688] border border-[#2A7688]/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0">
                      {service.badge}
                    </span>
                  )}
                </div>

                <ul className="space-y-1.5 mb-4">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-[#324D61]">
                      <Check className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigateToContact(service.title)}
                  className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                  طلب إنجاز المعاملة
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About Us Card */}
        <div className="bg-[#FAF8F2] border-2 border-[#E5C887] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#9E7B33]">
            <Building className="w-5 h-5 shrink-0" />
            <h2 className="text-base font-black text-[#0F2437]">
              عن {TravelRepository.COMPANY_NAME_AR}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            وكالة سفر وتأشيرات معتمدة وموثقة برقم سجل تجاري ({TravelRepository.COMMERCIAL_RECORD})
            صادرة من الغرفة التجارية المصرية. متخصصة في تأشيرات السعودية (زيارة • عمل • عمرة B2C •
            سياحة)، حجز مواعيد البصمة تساهيل VFS، تسديد منصة إنجاز، والكشف الطبي جامكا GAMCA، وحجز
            الطيران والفنادق بأعلى معايير المصداقية والجودة.
          </p>

          <div className="bg-white border border-[#E2DAC8] rounded-xl p-3.5 space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-2 font-bold text-[#17344F]">
              <ShieldCheck className="w-4 h-4 text-[#C6A052]" />
              <span>رقم السجل التجاري: {TravelRepository.COMMERCIAL_RECORD}</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[#2A7688]">
              <Mail className="w-4 h-4" />
              <span>البريد الرسمي: {TravelRepository.OFFICIAL_EMAIL}</span>
            </div>
            <div className="flex items-center gap-2 text-[#132838] font-bold">
              <MapPin className="w-4 h-4 text-[#9E7B33]" />
              <span>فروعنا: محافظة القاهرة • محافظة الدقهلية</span>
            </div>
            <div className="flex items-center gap-2 text-[#678093]">
              <Clock className="w-4 h-4" />
              <span>{TravelRepository.WORKING_HOURS}</span>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div>
          <h2 className="text-base md:text-lg font-black text-[#0F2437] mb-3 px-1">
            آراء العملاء
          </h2>
          <div className="space-y-3">
            {TravelRepository.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#E2DAC8] rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs md:text-sm font-bold text-[#0F2437]">
                    {rev.author}
                  </h3>
                  <div className="flex text-[#C6A052]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C6A052]" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-[#678093] block mb-2">
                  {rev.tripType} ({rev.year})
                </span>
                <p className="text-xs md:text-sm text-[#324D61] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

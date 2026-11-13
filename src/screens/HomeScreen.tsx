import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Check,
  Star,
  Fingerprint,
  CreditCard,
  Plane,
  Award,
  FileText,
  Smartphone,
  Download,
  Lock,
  Building2,
  Clock,
  Laptop,
  FileCheck2,
  ArrowLeft,
  Hotel,
} from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { InteractiveGuide } from '../components/InteractiveGuide';
import { FAQAccordion } from '../components/FAQAccordion';
import { ServiceRequestModal } from '../components/ServiceRequestModal';
import masarikLogoImg from '../assets/images/masarik_logo.jpg';
import masarikHeroBgImg from '../assets/images/masarik_hero_bg.jpg';
import { useLatestApkInfo, handleApkDownload, FAST_CDN_APK_URL } from '../hooks/useLatestApkUrl';

interface HomeScreenProps {
  onNavigateToServices: () => void;
  onNavigateToContact: (serviceTitle?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToServices,
  onNavigateToContact,
}) => {
  const [logoError, setLogoError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalServiceTitle, setModalServiceTitle] = useState<string | undefined>(undefined);
  const apkInfo = useLatestApkInfo();

  const handleOpenModal = (serviceTitle?: string) => {
    setModalServiceTitle(serviceTitle);
    setModalOpen(true);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'tasheer-vfs':
        return <Fingerprint className="w-5 h-5 text-[#0284C7]" />;
      case 'tourist-visas':
        return <FileText className="w-5 h-5 text-[#C6A052]" />;
      case 'flight-booking':
        return <Plane className="w-5 h-5 text-[#0284C7]" />;
      case 'hotel-booking':
        return <Hotel className="w-5 h-5 text-[#C6A052]" />;
      case 'attestation-translation':
        return <Award className="w-5 h-5 text-[#0284C7]" />;
      case 'enjaz-insurance':
        return <CreditCard className="w-5 h-5 text-[#C6A052]" />;
      default:
        return <FileCheck2 className="w-5 h-5 text-[#0284C7]" />;
    }
  };

  const getWhyIcon = (icon: string) => {
    switch (icon) {
      case 'clock-check':
        return <Clock className="w-6 h-6 text-[#0284C7]" />;
      case 'laptop':
        return <Laptop className="w-6 h-6 text-[#C6A052]" />;
      case 'shield-lock':
        return <Lock className="w-6 h-6 text-[#0284C7]" />;
      case 'award-check':
      default:
        return <Building2 className="w-6 h-6 text-[#C6A052]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-16 text-[#0F2438]">
      {/* ------------------------------------------------------------- */}
      {/* 1. Mobile-First Hero Section (Services-Focused) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2438] via-[#163B65] to-[#0A1926] text-white border-b border-[#C6A052]/40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${masarikHeroBgImg}), url('./images/masarik_hero_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926] via-[#0F2438]/65 to-black/35" />

        <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-14 sm:py-14 md:py-20 text-center flex flex-col items-center">
          {/* Logo with verified seal */}
          <div className="relative mb-5">
            {!logoError ? (
              <img
                src={masarikLogoImg}
                onError={() => setLogoError(true)}
                alt="شعار مسارك للإنجاز السياحي"
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-[#C6A052] shadow-2xl object-cover bg-white"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-[#C6A052] bg-[#0F2438] flex items-center justify-center text-[#E5C887] shadow-2xl">
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-[#E5C887]" />
              </div>
            )}
            <div
              className="absolute -bottom-1 -left-1 bg-[#0F2438] text-[#E5C887] p-1.5 sm:p-2 rounded-full border-2 border-white ring-1 ring-[#C6A052]/70 shadow-lg flex items-center justify-center"
              title="شركة معتمدة وموثقة - سجل تجاري 7839"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C887] stroke-[2.25]" />
            </div>
          </div>

          {/* Subtitle kicker without pill box */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs md:text-sm font-bold text-[#E5C887] mb-3 tracking-wide">
            <span>شركة معتمدة</span>
            <span aria-hidden="true">·</span>
            <span>سجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}</span>
            <span aria-hidden="true">·</span>
            <span>خبرة منذ عام {TravelRepository.FOUNDING_YEAR}</span>
          </div>

          {/* Main Title: 2 lines with clear typographic scale */}
          <h1 className="flex flex-col items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto mb-4 text-center text-balance">
            <span className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              مسارك للإنجاز السياحي
            </span>
            <span className="block text-sm sm:text-lg md:text-2xl font-medium text-[#E5C887] leading-snug max-w-2xl">
              منصتك لجميع إجراءات التأشيرات والسفر للسعودية
            </span>
          </h1>

          {/* Description focused strictly on services */}
          <p className="text-xs sm:text-sm md:text-base font-normal text-slate-200 max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed px-2">
            بوابتك المتخصصة والموثوقة لإنجاز <strong className="text-white font-bold">خدمات التأشيرات (Visas)</strong>، <strong className="text-white font-bold">تخليص الإجراءات والأوراق الرسمية</strong>، <strong className="text-white font-bold">حجز تذاكر الطيران</strong>، و<strong className="text-white font-bold">حجز الفنادق المعتمدة</strong> بأسرع وقت وأنت في مكانك.
          </p>

          {/* Action Buttons: Mobile-first full-width 48px touch targets */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto mb-9 sm:mb-11">
            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:flex-1 min-h-[48px] px-6 bg-[#C6A052] hover:bg-[#d4b063] text-[#0A1926] rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>اطلب خدمتك الآن</span>
              <ArrowLeft className="w-4 h-4 text-[#0A1926]" />
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="w-full sm:flex-1 min-h-[48px] px-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              title="تواصل مباشر عبر واتساب"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" variant="white" />
              <span>تواصل معنا واتساب</span>
            </button>
          </div>

          {/* 4 Core Service Pillars Mini-Bar */}
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <FileText className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">خدمات التأشيرات</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <FileCheck2 className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">تخليص الإجراءات والأوراق</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Plane className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">حجز تذاكر الطيران</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Hotel className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">حجز الفنادق</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 -mt-5 relative z-10 space-y-11">
        {/* Commercial Registration Trust Card */}
        <div className="bg-white border border-[#C6A052]/60 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-[#C6A052]/15 text-[#C6A052] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#0F2438]">
                {TravelRepository.CERTIFICATION_TITLE}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 tabular-nums">
                {TravelRepository.COMMERCIAL_RECORD_STATEMENT} • خدمة عملاء متواصلة طوال الأسبوع
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={() => onNavigateToContact()}
              className="flex-1 sm:flex-none min-h-[44px] py-2 px-4 bg-[#0F2438] hover:bg-[#163B65] text-white rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap"
            >
              <span>مقر الشركة ومراسلتنا</span>
            </button>
            <button
              onClick={() => dialPhoneNumber()}
              className="flex-1 sm:flex-none min-h-[44px] py-2 px-4 bg-slate-100 hover:bg-slate-200 text-[#0F2438] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer tabular-nums whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{TravelRepository.PHONE_NUMBER}</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. Prominent Core Services Section (الخدمات المعتمدة) */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4" aria-labelledby="services-directory-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 id="services-directory-heading" className="text-lg sm:text-2xl font-black text-[#0F2438]">
                خدماتنا المعتمدة والمتخصصة
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                خدمات التأشيرات، تخليص الإجراءات والأوراق، حجز تذاكر الطيران والفنادق بأعلى دقة واحترافية
              </p>
            </div>
            <button
              onClick={onNavigateToServices}
              className="text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0F2438] flex items-center gap-1 self-start sm:self-auto cursor-pointer whitespace-nowrap"
            >
              <span>تصفح كافة الخدمات بالتفصيل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TravelRepository.services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-slate-200 hover:border-[#0284C7]/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-[#0284C7]/10 flex items-center justify-center transition-colors shrink-0">
                      {getServiceIcon(service.id)}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {service.speedBadge && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{service.speedBadge}</span>
                        </span>
                      )}
                      {service.badge && (
                        <span className="text-[11px] font-bold text-[#9E7B33]">
                          {service.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#0F2438] mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <ul className="space-y-2 mb-5">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(service.title)}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-[#0F2438] hover:bg-[#163B65] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>اطلب الخدمة الآن</span>
                  </button>

                  <button
                    onClick={() =>
                      openWhatsApp(
                        `السلام عليكم، أود الاستفسار وطلب خدمة: ${service.title} من شركة مسارك للإنجاز السياحي.`
                      )
                    }
                    className="min-w-[44px] min-h-[44px] p-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-xs transition cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                    title="طلب مباشر عبر واتساب"
                    aria-label={`طلب ${service.title} عبر واتساب`}
                  >
                    <WhatsAppIcon className="w-5 h-5" variant="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. Interactive Guide ("محتار تبدأ منين؟") */}
        {/* ------------------------------------------------------------- */}
        <InteractiveGuide onRequestModal={handleOpenModal} />

        {/* ------------------------------------------------------------- */}
        {/* 4. Why Choose Us Section (لماذا يختارنا العملاء؟) */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-lg sm:text-2xl font-black text-[#0F2438]">
              لماذا يختارنا العملاء؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              أربع ركائز أساسية تضمن لك إنجاز التأشيرات وحجوزات السفر والمعاملات الرسمية بسهولة وأمان
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TravelRepository.whyChooseUs.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between text-right"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    {getWhyIcon(item.icon)}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F2438] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 5. FAQ Accordion */}
        {/* ------------------------------------------------------------- */}
        <FAQAccordion />

        {/* ------------------------------------------------------------- */}
        {/* 6. Customer Reviews */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0F2438]">
                آراء وتقييمات عملائنا
              </h2>
              <p className="text-xs text-slate-500">
                تجارب حقيقية لعملاء تم إنجاز معاملاتهم عبر منصة مسارك
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#C6A052]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C6A052]" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TravelRepository.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-[#0F2438]">
                      {rev.author}
                    </span>
                    <div className="flex text-[#C6A052]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C6A052]" />
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-2 tabular-nums">
                    <span>{rev.tripType}</span>
                    <span className="mx-1.5">·</span>
                    <span>عام {rev.year}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 7. APK App Download & Update Banner */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-gradient-to-r from-[#0F2438] to-[#163B65] text-white rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-right border border-[#C6A052]/40">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E5C887] flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  تطبيق مسارك للسياحة للأندرويد
                </h3>
                <span className="text-[11px] font-black text-[#0A1926] bg-[#E5C887] px-2 py-0.5 rounded-md tabular-nums">
                  {apkInfo.version}
                  {apkInfo.sizeLabel ? ` • ${apkInfo.sizeLabel}` : ''}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                احصل على أحدث إصدار رسمي وموقّع من التطبيق للوصول السريع إلى خدماتك في أي وقت وتلقي التحديثات تلقائياً.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5 w-full md:w-auto shrink-0">
            <a
              id="apk-download-btn"
              href={apkInfo.downloadUrl || FAST_CDN_APK_URL}
              onClick={(e) => handleApkDownload(apkInfo.downloadUrl, e)}
              className="w-full md:w-auto min-h-[44px] bg-[#C6A052] hover:bg-[#d4b063] text-[#0A1926] px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition active:scale-95 text-center cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-[#0A1926]" />
              <span>تحميل التحديث (APK) • {apkInfo.version}</span>
            </a>
            <p className="text-[11px] text-[#E5C887] font-semibold flex items-center gap-1 text-center md:text-right">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>ملف رسمي آمن ومفحوص 100% وخالٍ من أي برمجيات ضارة.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialServiceTitle={modalServiceTitle}
      />
    </div>
  );
};

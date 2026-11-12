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
  Zap,
  Lock,
  Building2,
  Clock,
  Laptop,
  CheckCircle2,
  FileCheck2,
  ArrowLeft,
} from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { InteractiveGuide } from '../components/InteractiveGuide';
import { FAQAccordion } from '../components/FAQAccordion';
import { ServiceRequestModal } from '../components/ServiceRequestModal';
import masarikLogoImg from '../assets/images/masarik_logo.jpg';
import masarikHeroBgImg from '../assets/images/masarik_hero_bg.jpg';
import { useLatestApkUrl } from '../hooks/useLatestApkUrl';

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
  const latestApkUrl = useLatestApkUrl();

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
      case 'passports-official':
        return <ShieldCheck className="w-5 h-5 text-[#C6A052]" />;
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
      {/* 1. Hero Section (One-Stop Portal) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2438] via-[#163B65] to-[#0A1926] text-white border-b border-[#C6A052]/40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${masarikHeroBgImg}), url('./images/masarik_hero_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926] via-transparent to-black/30" />

        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16 text-center flex flex-col items-center">
          {/* Logo with verified seal */}
          <div className="relative mb-5">
            {!logoError ? (
              <img
                src={masarikLogoImg}
                onError={() => setLogoError(true)}
                alt="شعار مسارك للإنجاز السياحي"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#C6A052] shadow-2xl object-cover bg-white"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#C6A052] bg-[#0F2438] flex items-center justify-center text-[#E5C887] shadow-2xl">
                <ShieldCheck className="w-12 h-12 text-[#E5C887]" />
              </div>
            )}
            <div className="absolute -bottom-1 -left-1 bg-[#C6A052] text-[#0F2438] p-1.5 rounded-full border-2 border-white shadow-md">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* Subtitle kicker without pill box */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#E5C887] mb-2 tracking-wide">
            <span>وكالة معتمدة</span>
            <span aria-hidden="true">·</span>
            <span>سجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}</span>
            <span aria-hidden="true">·</span>
            <span>موثقة من الغرفة التجارية</span>
          </div>

          {/* Main Title: 2 lines with clear typographic scale */}
          <h1 className="flex flex-col items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto mb-5 text-center">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              مسارك للإنجاز السياحي
            </span>
            <span className="block text-sm sm:text-lg md:text-2xl font-medium text-[#E5C887] sm:text-slate-100/95 leading-snug max-w-2xl">
              منصتك لجميع إجراءات التأشيرات والسفر للسعودية
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base font-normal text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            الخدمة المعتمدة والشاملة لإنهاء كافة معاملات التأشيرات وحجز مواعيد تساهيل VFS، تسديد منصة إنجاز، حجز تذاكر الطيران، وتوثيق المستندات الرسمية بأعلى سرعة وأمان وأنت في مكانك.
          </p>

          {/* Action Buttons: 2 Side by Side */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto mb-10">
            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:flex-1 h-12 bg-[#C6A052] hover:bg-[#d4b063] text-[#0A1926] rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-98 cursor-pointer"
            >
              <span>ابدأ طلبك الآن</span>
              <ArrowLeft className="w-4 h-4 text-[#0A1926]" />
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="w-full sm:flex-1 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-98 cursor-pointer"
              title="تواصل مباشر عبر واتساب"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" variant="white" />
              <span>تواصل معنا واتساب</span>
            </button>
          </div>

          {/* 4 Quick Features Mini-Bar */}
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <Zap className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">إنجاز سريع</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Award className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">جودة عالية</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Lock className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">سرية تامة</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#E5C887] shrink-0" />
              <span className="text-xs sm:text-sm font-bold">آمن وموثوق</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 -mt-4 relative z-10 space-y-10">
        {/* Commercial Registration Trust Card */}
        <div className="bg-white border-2 border-[#C6A052]/50 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-12 h-12 rounded-xl bg-[#C6A052]/15 text-[#C6A052] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#0F2438]">
                {TravelRepository.CERTIFICATION_TITLE}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {TravelRepository.COMMERCIAL_RECORD_STATEMENT} • خدمة عملاء ومتابعة مستمرة طوال الأسبوع
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={() => onNavigateToContact()}
              className="flex-1 sm:flex-none py-2 px-3.5 bg-[#0F2438] hover:bg-[#163B65] text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <span>مقر الفروع ومراسلتنا</span>
            </button>
            <button
              onClick={() => dialPhoneNumber()}
              className="flex-1 sm:flex-none py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-[#0F2438] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{TravelRepository.PHONE_NUMBER}</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. Interactive Guide ("محتار تبدأ منين؟") */}
        {/* ------------------------------------------------------------- */}
        <InteractiveGuide onRequestModal={handleOpenModal} />

        {/* ------------------------------------------------------------- */}
        {/* 3. Service Cards Grid */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F2438]">
                دليل الخدمات المعتمدة
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                اختر خدمتك المطلوبة وسنتولى كافة الإجراءات بأعلى دقة واحترافية
              </p>
            </div>
            <button
              onClick={onNavigateToServices}
              className="text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0F2438] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>عرض تفاصيل جميع الخدمات</span>
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
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#0284C7]/10 flex items-center justify-center transition-colors shrink-0">
                      {getServiceIcon(service.id)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold text-[#C6A052] bg-[#C6A052]/10 px-2 py-0.5 rounded-md">
                        {service.badge}
                      </span>
                    )}
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
                    className="flex-1 py-2.5 px-3 bg-[#0F2438] hover:bg-[#163B65] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98] cursor-pointer"
                  >
                    <span>اطلب الخدمة الآن</span>
                  </button>

                  <button
                    onClick={() =>
                      openWhatsApp(
                        `السلام عليكم، أود الاستفسار وطلب خدمة: ${service.title} من وكالة مسارك للإنجاز السياحي.`
                      )
                    }
                    className="p-2.5 bg-slate-100 hover:bg-[#25D366]/15 text-[#25D366] rounded-xl transition cursor-pointer active:scale-95"
                    title="طلب مباشر عبر واتساب"
                  >
                    <WhatsAppIcon className="w-4 h-4" variant="colored" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. Why Choose Us Section (لماذا يختارنا العملاء؟) */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-lg sm:text-2xl font-black text-[#0F2438]">
              لماذا يختارنا العملاء؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              أربع ركائز أساسية تضمن لك تجربة سفر ومعاملات حكومية موثوقة وخالية من المتاعب
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

                  <div className="text-[11px] text-slate-400 mb-2">
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
        <div className="bg-gradient-to-r from-[#0F2438] to-[#163B65] text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-[#E5C887] flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                تطبيق مسارك للأندرويد (تثبيت وتحديث مباشر)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                حمّل أحدث إصدار رسمي وموقّع من التطبيق للوصول السريع إلى خدماتك في أي وقت وتلقي التحديثات تلقائياً.
              </p>
            </div>
          </div>

          <a
            href={latestApkUrl}
            className="w-full sm:w-auto bg-[#C6A052] hover:bg-[#d4b063] text-[#0A1926] px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition active:scale-95 text-center cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#0A1926]" />
            <span>تحميل التحديث (APK)</span>
          </a>
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

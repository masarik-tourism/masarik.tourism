import React, { useState } from 'react';
import { Check, ArrowLeft, ShieldCheck, PhoneCall, Clock } from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ServiceRequestModal } from '../components/ServiceRequestModal';

interface ServicesScreenProps {
  onNavigateToContact: (serviceTitle?: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigateToContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>(undefined);

  const filteredServices =
    selectedCategory === 'all'
      ? TravelRepository.services
      : TravelRepository.services.filter((s) => s.categoryId === selectedCategory);

  const handleOpenOrder = (title: string) => {
    setSelectedServiceForModal(title);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-16 pt-6 text-[#0F2438]">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#C6A052] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>خدمات معتمدة بسجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}</span>
              </div>
              <h1 className="text-xl md:text-3xl font-black text-[#0F2438]">
                دليل الخدمات والمعاملات الحكومية
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                اختر معاملتك المطلوبة للاطلاع على المتطلبات والبدء في الإجراءات فوراً عبر الواتساب أو النموذج المباشر.
              </p>
            </div>

            <button
              onClick={() => onNavigateToContact()}
              className="py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-[#0F2438] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>طلب استشارة أو معاملة خاصة</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pt-4 pb-1 hide-scrollbar">
            {TravelRepository.categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F2438] text-white border-[#0F2438] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {cat.titleAr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 hover:border-[#0284C7]/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-[#0F2438] leading-snug">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
                    {service.speedBadge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{service.speedBadge}</span>
                      </span>
                    )}
                    {service.badge && (
                      <span className="bg-[#C6A052]/10 text-[#9E7B33] px-2.5 py-0.5 rounded-md text-[11px] font-bold shrink-0">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenOrder(service.title)}
                  className="flex-1 min-h-[44px] bg-[#0F2438] hover:bg-[#163B65] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>اطلب الخدمة الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    const msg = `السلام عليكم، أود حجز والبدء في معاملة: ${service.title} من وكالة مسارك للإنجاز السياحي.`;
                    openWhatsApp(msg);
                  }}
                  className="min-w-[44px] min-h-[44px] p-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-xs transition cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                  title="تواصل مباشر عبر واتساب"
                  aria-label={`طلب ${service.title} عبر واتساب`}
                >
                  <WhatsAppIcon className="w-5 h-5" variant="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialServiceTitle={selectedServiceForModal}
      />
    </div>
  );
};

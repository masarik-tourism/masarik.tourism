import React, { useState } from 'react';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { openWhatsApp } from '../utils/communication';

interface ServicesScreenProps {
  onNavigateToContact: (serviceTitle?: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigateToContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices =
    selectedCategory === 'all'
      ? TravelRepository.services
      : TravelRepository.services.filter((s) => s.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 md:pb-16 pt-5">
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#0F2437]">
            دليل الخدمات والتأشيرات
          </h1>
          <p className="text-xs md:text-sm text-[#324D61] mt-1">
            اختر الخدمة المطلوبة لإنجاز معاملاتك بأسرع وقت وأعلى دقة
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {TravelRepository.categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#17344F] text-white border-[#17344F] shadow-sm'
                    : 'bg-white text-[#132838] border-[#E2DAC8] hover:border-[#17344F]'
                }`}
              >
                {cat.titleAr}
              </button>
            );
          })}
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-sm md:text-base font-bold text-[#17344F]">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="bg-[#F7F4EB] text-[#9E7B33] border border-[#E5C887]/50 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0">
                      {service.badge}
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-5">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-[#324D61]">
                      <Check className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-[#E2DAC8]/50">
                <button
                  onClick={() => onNavigateToContact(service.title)}
                  className="flex-1 bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>حجز الخدمة ومراسلتنا</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => {
                    const msg = `السلام عليكم، أستفسر عن خدمة: ${service.title}`;
                    openWhatsApp(msg);
                  }}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

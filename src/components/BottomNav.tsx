import React from 'react';
import { Home, Briefcase, CreditCard, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { label: 'الرئيسية', icon: Home, index: 0 },
    { label: 'الخدمات', icon: Briefcase, index: 1 },
    { label: 'طرق الدفع', icon: CreditCard, index: 2 },
    { label: 'اتصل بنا', icon: PhoneCall, index: 3 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2DAC8] shadow-lg">
      <div className="flex items-center justify-around py-1.5 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = currentTab === tab.index;
          return (
            <button
              key={tab.index}
              onClick={() => onSelectTab(tab.index)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'text-[#17344F]'
                  : 'text-[#678093] hover:text-[#17344F]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isSelected ? 'bg-[#EAF4F6] text-[#17344F]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span
                className={`text-[11px] mt-0.5 leading-tight ${
                  isSelected ? 'font-bold text-[#17344F]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

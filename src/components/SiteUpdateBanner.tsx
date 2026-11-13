import React from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';
import { useSiteUpdate } from '../hooks/useSiteUpdate';

export const SiteUpdateBanner: React.FC = () => {
  const { hasUpdate, isUpdating, applyUpdate, dismissUpdate } = useSiteUpdate();

  if (!hasUpdate) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 bg-[#0F2438] text-white border-2 border-[#C6A052] rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-[#C6A052]/20 text-[#E5C887] flex items-center justify-center shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black text-white leading-tight">
            يتوفر تحديث جديد للموقع
          </p>
          <p className="text-[11px] text-slate-300 mt-0.5 truncate">
            تم تحديث البيانات والخدمات لعرض أحدث نسخة
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={applyUpdate}
          disabled={isUpdating}
          className="bg-[#C6A052] hover:bg-[#d4b063] text-[#0A1926] px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-80"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
          <span>{isUpdating ? 'جاري التحديث...' : 'تحديث الآن'}</span>
        </button>

        {!isUpdating && (
          <button
            onClick={dismissUpdate}
            aria-label="إغلاق إشعار التحديث"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

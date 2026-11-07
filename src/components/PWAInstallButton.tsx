import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'banner' | 'navbar' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // If already installed as standalone PWA, suppress in-app prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowDownloadModal(true);
    }
  };

  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          className={`bg-gradient-to-r from-[#C6A052] to-[#E5C887] text-[#0F2437] font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ${className}`}
          title="تثبيت تطبيق مسارك على الهاتف"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#0F2437]" />
          <span>تثبيت التطبيق</span>
        </button>
      )}

      {variant === 'banner' && (
        <div className={`bg-gradient-to-r from-[#17344F] via-[#1C4163] to-[#17344F] border-2 border-[#C6A052] rounded-2xl p-4 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#C6A052]/20 border border-[#C6A052]/40 flex items-center justify-center shrink-0 text-[#E5C887]">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                <span>تثبيت تطبيق مسارك على هاتفك</span>
                <span className="bg-[#C6A052] text-[#0F2437] text-[10px] font-black px-2 py-0.5 rounded-full">
                  مجاناً فوراً
                </span>
              </h3>
              <p className="text-xs text-[#E2DAC8] mt-0.5">
                تصفح أسرع، إنجاز فوري للمعاملات، وتحديثات تلقائية دائمة بدون متجر.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleInstallClick}
              className="flex-1 sm:flex-initial bg-[#C6A052] hover:bg-[#d4b063] text-[#0F2437] font-black text-xs md:text-sm px-5 py-2.5 rounded-xl shadow flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تثبيت الآن بضغطة واحدة</span>
            </button>
          </div>
        </div>
      )}

      {variant === 'compact' && (
        <button
          onClick={handleInstallClick}
          className={`text-xs font-bold text-[#C6A052] hover:text-[#E5C887] flex items-center gap-1.5 transition cursor-pointer ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>تثبيت على الشاشة</span>
        </button>
      )}

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-[#C6A052] text-right space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#17344F]">
                <Smartphone className="w-5 h-5 text-[#C6A052]" />
                <h3 className="text-base font-black">تثبيت التطبيق على iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-2xl p-4 text-xs space-y-3 text-[#324D61]">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#17344F] text-[#E5C887] font-black flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p className="pt-0.5">
                  اضغط على زر <strong>المشاركة (Share)</strong>{' '}
                  <Share className="w-3.5 h-3.5 inline mx-1 text-[#2A7688]" /> في شريط متصفح سفاري
                  بالأسفل.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#17344F] text-[#E5C887] font-black flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p className="pt-0.5">
                  مرر للأسفل واضغط على <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#17344F] text-[#E5C887] font-black flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p className="pt-0.5">
                  اضغط <strong>إضافة (Add)</strong> في الزاوية، وسينزل التطبيق على شاشتك فوراً بأيقونة
                  مسارك.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 rounded-xl text-xs font-bold transition"
            >
              فهمت، شكراً
            </button>
          </div>
        </div>
      )}

      {/* Direct Guide / Browser Prompt Fallback Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#C6A052] text-right space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#17344F]">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="text-base font-black">تثبيت التطبيق على هاتفك</h3>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#324D61] leading-relaxed">
              يمكنك تثبيت تطبيق <strong>مسارك للإنجاز السياحي</strong> على هاتفك مباشرة بعدة طرق سهلة:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-2xl p-3.5 space-y-1.5">
                <h4 className="font-bold text-[#17344F] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#C6A052]" />
                  <span>طريقة 1: التثبيت الفوري من المتصفح (PWA)</span>
                </h4>
                <p className="text-[11px] text-[#678093]">
                  من متصفح هاتفك (Chrome أو Safari)، افتح القائمة (الثلاث نقاط) واختر{' '}
                  <strong>&quot;تثبيت التطبيق&quot;</strong> أو <strong>&quot;إضافة إلى الشاشة الرئيسية&quot;</strong>.
                </p>
              </div>

              <div className="bg-[#FBF7EE] border border-[#E5C887] rounded-2xl p-3.5 space-y-1.5">
                <h4 className="font-bold text-[#17344F] flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-[#C6A052]" />
                  <span>طريقة 2: تحميل ملف APK المباشر</span>
                </h4>
                <p className="text-[11px] text-[#678093]">
                  ملف تطبيق الأندرويد الموقّع متاح للتنزيل المباشر من صفحة الـ Releases على مستودع GitHub.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

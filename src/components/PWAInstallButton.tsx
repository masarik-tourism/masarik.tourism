import React, { useState } from 'react';
import { Download, Smartphone, X, Share, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLatestApkInfo } from '../hooks/useLatestApkUrl';
import { TravelRepository } from '../data/travelData';

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
  const apkInfo = useLatestApkInfo();

  // If already installed as standalone PWA, suppress in-app prompt
  if (isInstalled) {
    return null;
  }

  const handlePWAInstall = async () => {
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
          onClick={() => setShowDownloadModal(true)}
          className={`bg-gradient-to-r from-[#C6A052] to-[#E5C887] text-[#0F2437] font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ${className}`}
          title="تثبيت تطبيق مسارك على الهاتف"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#0F2437]" />
          <span>تثبيت التطبيق</span>
        </button>
      )}

      {variant === 'banner' && (
        <div className={`bg-gradient-to-r from-[#17344F] via-[#1C4163] to-[#17344F] border-2 border-[#C6A052] rounded-2xl p-4 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#C6A052]/20 border border-[#C6A052]/40 flex items-center justify-center shrink-0 text-[#E5C887]">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                <span>تثبيت تطبيق مسارك على هاتفك</span>
                <span className="bg-[#C6A052] text-[#0F2437] text-[10px] font-black px-2 py-0.5 rounded-full">
                  مجاناً وتحديث فوري
                </span>
              </h3>
              <p className="text-xs text-[#E2DAC8] mt-0.5">
                تثبيت فوري على شاشة الهاتف، أو تحميل ملف الـ APK المباشر لأجهزة أندرويد.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={handlePWAInstall}
              className="flex-1 md:flex-none bg-[#C6A052] hover:bg-[#d4b063] text-[#0F2437] font-black text-xs md:text-sm px-4 py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>تثبيت فوري على الشاشة</span>
            </button>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#E5C887]" />
              <span>تحميل ملف APK</span>
            </button>
          </div>
        </div>
      )}

      {variant === 'compact' && (
        <button
          onClick={() => setShowDownloadModal(true)}
          className={`text-xs font-bold text-[#C6A052] hover:text-[#E5C887] flex items-center gap-1.5 transition cursor-pointer ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>تثبيت التطبيق</span>
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
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
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
              className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              فهمت، شكراً
            </button>
          </div>
        </div>
      )}

      {/* Comprehensive Install & Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#C6A052] text-right space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#17344F]">
                <Smartphone className="w-5 h-5 text-[#C6A052]" />
                <h3 className="text-base font-black">خيارات تثبيت تطبيق مسارك</h3>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#324D61] leading-relaxed">
              اختر الطريقة المفضلة لتشغيل تطبيق <strong>مسارك للإنجاز السياحي</strong> على هاتفك:
            </p>

            <div className="space-y-3 text-xs">
              {/* Option 1: Instant Home Screen Install (PWA) */}
              <div className="bg-[#FAF8F2] border-2 border-[#C6A052]/50 hover:border-[#C6A052] rounded-2xl p-4 space-y-2 transition">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#17344F] flex items-center gap-1.5 text-xs md:text-sm">
                    <Smartphone className="w-4 h-4 text-[#C6A052]" />
                    <span>الخيار 1: التثبيت الفوري على الشاشة (PWA)</span>
                  </h4>
                  <span className="bg-[#2A7688] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    الأسرع والأخف
                  </span>
                </div>
                <p className="text-[11px] text-[#678093] leading-relaxed">
                  يُضاف التطبيق مباشرة كأيقونة على شاشتك الرئيسية فوراً دون تنزيل ملفات أو استهلاك ذاكرة الهاتف، مع تحديثات تلقائية مستمرة.
                </p>
                <button
                  onClick={async () => {
                    setShowDownloadModal(false);
                    await handlePWAInstall();
                  }}
                  className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer mt-1"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#E5C887]" />
                  <span>تثبيت فوري على شاشة الهاتف</span>
                </button>
              </div>

              {/* Option 2: Direct APK Download via GitHub Release */}
              <div className="bg-[#FBF7EE] border border-[#E5C887] rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#17344F] flex items-center gap-1.5 text-xs md:text-sm">
                    <Download className="w-4 h-4 text-[#C6A052]" />
                    <span>الخيار 2: تحميل ملف APK لأجهزة أندرويد</span>
                  </h4>
                  <span className="bg-[#C6A052] text-[#0F2437] text-[10px] font-black px-2 py-0.5 rounded-full">
                    أحدث إصدار رسمي
                  </span>
                </div>
                <p className="text-[11px] text-[#678093] leading-relaxed">
                  تحميل أحدث ملف موقّع للتطبيق بصيغة (APK) وتثبيته مباشرة على هاتفك الأندرويد من خوادم GitHub الرسمية.
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={apkInfo.downloadUrl}
                    className="w-full bg-[#C6A052] hover:bg-[#d4b063] text-[#0F2438] py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل ملف APK المباشر ({apkInfo.version})</span>
                  </a>
                  <p className="text-[11px] text-[#0F2438] font-semibold text-center">
                    ملف رسمي آمن ومفحوص 100% وخالٍ من أي برمجيات ضارة.
                  </p>

                  <a
                    href={TravelRepository.APK_RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-gray-50 text-[#17344F] border border-[#E2DAC8] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 text-center cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#2A7688]" />
                    <span>عرض صفحة الإصدارات الرسمية (GitHub Releases)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-[#324D61] py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
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

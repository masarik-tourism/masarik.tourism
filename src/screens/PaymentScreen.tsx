import React, { useState } from 'react';
import {
  CreditCard,
  MessageCircle,
  Store,
  CheckCircle,
  X,
  Info,
  ShieldCheck,
  Send,
  Copy,
  Check,
  ExternalLink,
  Wrench,
  AlertTriangle,
  Zap,
  Building2,
} from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { openWhatsApp } from '../utils/communication';

interface PaymentScreenProps {
  onNavigateToContact: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onNavigateToContact }) => {
  const [showPaymobModal, setShowPaymobModal] = useState(false);
  const [payAmount, setPayAmount] = useState('1500');
  const [paySuccess, setPaySuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(TravelRepository.INSTAPAY_URL);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = TravelRepository.INSTAPAY_URL;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleStartPayment = () => {
    const randomId = `MS-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactionId(randomId);
    setPaySuccess(true);
  };

  const handleResetModal = () => {
    setShowPaymobModal(false);
    setPaySuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 md:pb-16 pt-5">
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#0F2437]">
            طرق السداد الآمنة
          </h1>
          <p className="text-xs md:text-sm text-[#324D61] mt-1">
            نوفر لك خيارات دفع متعددة وموثقة لضمان سرعة إنجاز معاملتك
          </p>
        </div>

        {/* 1. InstaPay Card (Direct Link & Phone via WhatsApp) */}
        <div className="bg-gradient-to-br from-[#FAF8F2] via-white to-[#F6EFFC] border-2 border-[#7E22CE]/50 hover:border-[#7E22CE] rounded-2xl p-5 shadow-md space-y-4 transition-all">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#7E22CE]/15 text-[#7E22CE] border border-[#7E22CE]/30 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 fill-[#7E22CE]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm md:text-base font-black text-[#17344F]">
                    الدفع المباشر عبر إنستاباي (InstaPay)
                  </h2>
                  <span className="bg-[#7E22CE] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    الخيار الأسرع والموصى به
                  </span>
                </div>
                <span className="text-[11px] md:text-xs text-[#678093]">
                  شبكة المدفوعات اللحظية IPN • معتمد من البنك المركزي المصري
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            التحويل عبر الرابط هو الخيار الأفضل والأسرع، بمجرد الضغط على الرابط بالأسفل يتم تحويلك فوراً لتطبيق إنستاباي لإتمام الدفع بضغطة واحدة.
          </p>

          {/* Primary CTA: Big Direct Link Button */}
          <a
            href={TravelRepository.INSTAPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#7E22CE] via-[#6B21A8] to-[#581C87] hover:from-[#6B21A8] hover:to-[#4C1D95] text-white py-3.5 px-5 rounded-xl text-sm md:text-base font-black shadow-lg hover:shadow-xl transition active:scale-[0.99] flex items-center justify-center gap-2.5 text-center group"
          >
            <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>اضغط هنا للتحويل المباشر عبر إنستاباي الآن</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Direct Link Display & Copy Box */}
          <div className="bg-white border-2 border-[#E9D5FF] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs">
            <div className="flex flex-col text-right w-full sm:w-auto overflow-hidden">
              <span className="text-[11px] font-bold text-[#678093]">رابط الدفع الكامل المباشر:</span>
              <a
                href={TravelRepository.INSTAPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-mono text-xs md:text-sm font-bold text-[#7E22CE] hover:underline truncate mt-0.5"
              >
                {TravelRepository.INSTAPAY_URL}
              </a>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#6B21A8] border border-[#D8B4FE] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>

              <a
                href={TravelRepository.INSTAPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7E22CE] hover:bg-[#6B21A8] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <span>فتح</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Option 2: Transfer via Phone Number via WhatsApp */}
          <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
            <div>
              <h4 className="text-xs md:text-sm font-black text-[#17344F] flex items-center gap-1.5">
                <span>تفضل التحويل عن طريق رقم التليفون؟</span>
              </h4>
              <p className="text-[11px] md:text-xs text-[#678093] mt-0.5">
                تواصل معنا عبر واتساب لتزويدك برقم الهاتف الخاص بحساب إنستاباي للتحويل فوراً.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  const text = 'السلام عليكم، أود الحصول على رقم التليفون المربوط بإنستاباي للتحويل من خلاله.';
                  openWhatsApp(text);
                }}
                className="bg-[#17344F] hover:bg-[#0F2437] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>طلب رقم إنستاباي</span>
              </button>

              <button
                onClick={() => {
                  const text = 'السلام عليكم، قمت بالتحويل عبر إنستاباي، وأرفق لكم إشعار السداد لتأكيد حجز المعاملة.';
                  openWhatsApp(text);
                }}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>إرسال إشعار السداد</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Paymob Card (Under Maintenance) */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm md:text-base font-bold text-[#17344F]">
                  الدفع الإلكتروني (Paymob)
                </h2>
                <span className="text-[11px] md:text-xs text-[#678093]">
                  بطاقات فيزا / ماستركارد ومحافظ كاش
                </span>
              </div>
            </div>

            {/* Maintenance Badge */}
            <div className="bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Wrench className="w-3.5 h-3.5 text-amber-700 animate-spin" />
              <span>الخدمة تحت الصيانة حالياً</span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            سداد فوري مشفر وموثق لرسوم منصة إنجاز، مواعيد تساهيل، وتذاكر الطيران مع استلام
            إيصال إلكتروني فوري.
          </p>

          {/* Maintenance Notice Box */}
          <div className="bg-[#FFFBEB] border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>تنبيه للمتعاملين:</strong> تخضع بوابة Paymob حالياً لأعمال الترقية والتحديث الدوري. يمكنك السداد الفوري عبر <strong>إنستاباي</strong> بالأعلى أو إرسال بيانات المعاملة عبر الواتساب لإنجاز السداد فوراً.
            </p>
          </div>

          {/* WhatsApp Redirect Button requested by user */}
          <div className="pt-1">
            <button
              onClick={() => {
                const text = 'السلام عليكم، أود إرسال بيانات المعاملة لمتابعة السداد والإنجاز نظراً لأن الدفع الإلكتروني يخضع للصيانة.';
                openWhatsApp(text);
              }}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-xl text-xs md:text-sm font-black shadow-md hover:shadow-lg transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال بيانات المعاملة عبر واتساب الآن</span>
            </button>
          </div>
        </div>

        {/* 3. Bank Transfer Card */}
        <div className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F6] text-[#2A7688] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#17344F]">
                التحويل البنكي المباشر
              </h2>
              <span className="text-[11px] md:text-xs text-[#678093]">
                البنك الأهلي المصري • بنك مصر
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            تواصل عبر الواتساب للحصول على رقم الحساب البنكي الرسمي وتفاصيل التحويل الداخلي والدولي
            لتأكيد الحجز فوراً.
          </p>

          <button
            onClick={() => {
              const text =
                'السلام عليكم، أود الحصول على بيانات الحسابات البنكية الرسمية (البنك الأهلي / بنك مصر) لسداد المعاملة.';
              openWhatsApp(text);
            }}
            className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>طلب الحسابات البنكية عبر واتساب</span>
          </button>
        </div>

        {/* 4. Cash at Branch */}
        <div className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#9E7B33] border border-[#E5C887] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#17344F]">
                السداد نقداً في الفروع
              </h2>
              <span className="text-[11px] md:text-xs text-[#678093]">
                {TravelRepository.ADDRESS}
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            تشريفنا في مقرنا الرسمي واستلام إيصال وعقد موثق ومعتمد بجميع المعاملات وباقات
            السفر الصادرة بسجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD} والرقم الموحد {TravelRepository.UNIFIED_NUMBER}.
          </p>

          <button
            onClick={onNavigateToContact}
            className="w-full bg-transparent hover:bg-[#FAF8F2] text-[#17344F] border-2 border-[#17344F] py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold transition active:scale-[0.99] cursor-pointer"
          >
            عرض عناوين ومواقع الفروع
          </button>
        </div>

        <div className="bg-[#F7F4EB] border border-[#E2DAC8] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-[#0F2437] font-bold text-xs md:text-sm">
            <Info className="w-4 h-4 text-[#17344F]" />
            <span>سياسة السداد والضمان المالي</span>
          </div>
          <ul className="text-[11px] md:text-xs text-[#324D61] space-y-1 pr-4 list-disc">
            <li>جميع الرسوم موثقة بفواتير رسمية ومعتمدة بسجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}.</li>
            <li>رابط إنستاباي المباشر: {TravelRepository.INSTAPAY_URL}</li>
            <li>البريد الرسمي للمتابعة المالية: {TravelRepository.OFFICIAL_EMAIL}</li>
            <li>للاستفسارات والتحصيلات المالية والواتساب: {TravelRepository.PHONE_NUMBER}</li>
          </ul>
        </div>
      </div>

      {showPaymobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2DAC8] relative">
            <button
              onClick={handleResetModal}
              className="absolute top-4 left-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!paySuccess ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-[#17344F]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#2A7688]" />
                    <h3 className="text-base font-bold text-[#0F2437]">
                      سداد المعاملة عبر Paymob
                    </h3>
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    تحت الصيانة
                  </span>
                </div>

                <div className="bg-[#FFFBEB] border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>تخضع البوابة للصيانة حالياً؛ يمكنك السداد عبر إنستاباي أو إرسال بيانات المعاملة عبر واتساب مباشرة.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#324D61] mb-1">
                    المبلغ المراد سداده (ج.م):
                  </label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-sm font-bold bg-[#FAF8F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#324D61] mb-1.5">
                    اختر وسيلة الدفع:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'فيزا / ماستركارد' },
                      { id: 'wallet', label: 'محافظ كاش' },
                      { id: 'instapay', label: 'إنستاباي / ميزة' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id)}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition cursor-pointer ${
                          selectedMethod === m.id
                            ? 'bg-[#EAF4F6] text-[#2A7688] border-[#2A7688]'
                            : 'bg-white text-[#678093] border-[#E2DAC8]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-xl p-3 text-[11px] text-[#678093] space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#17344F]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2A7688]" />
                    <span>عملية آمنة ومشفرة 100%</span>
                  </div>
                  <p>تخضع المعاملات لبروتوكول الأمان المصرفي المعتمد من البنك المركزي المصري.</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleStartPayment}
                    className="flex-1 bg-[#2A7688] hover:bg-[#1f5967] text-white py-2.5 rounded-xl text-xs font-bold shadow transition cursor-pointer"
                  >
                    تأكيد السداد
                  </button>
                  <button
                    onClick={handleResetModal}
                    className="px-4 py-2.5 rounded-xl border border-[#E2DAC8] text-xs font-bold text-[#678093] hover:bg-gray-50 transition cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-green-700">
                    تمت عملية السداد بنجاح!
                  </h3>
                  <p className="text-xs text-[#324D61] mt-1">
                    تم سداد مبلغ <span className="font-bold text-[#0F2437]">{payAmount} ج.م</span>
                  </p>
                </div>

                <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-xl p-3 text-right space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#678093]">رقم المعاملة:</span>
                    <span className="font-mono font-bold text-[#17344F]">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#678093]">نسخة الإيصال إلى:</span>
                    <span className="font-bold text-[#2A7688] text-[11px] truncate max-w-[180px]">
                      {TravelRepository.OFFICIAL_EMAIL}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#678093]">
                  يرجى إرسال تفاصيل الإيصال عبر الواتساب ({TravelRepository.PHONE_NUMBER}) للمتابعة
                  الفورية وتأكيد إنجاز المعاملة.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      const msg = `السلام عليكم، قمت بسداد مبلغ ${payAmount} ج.م عبر Paymob برقم معاملة: ${transactionId}. برجاء تأكيد المعاملة.`;
                      openWhatsApp(msg);
                      handleResetModal();
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال تفاصيل الإيصال للواتساب</span>
                  </button>
                  <button
                    onClick={handleResetModal}
                    className="w-full py-2 rounded-xl text-xs font-bold text-[#678093] hover:text-[#17344F] transition cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

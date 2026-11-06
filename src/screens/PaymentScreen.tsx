import React, { useState } from 'react';
import {
  CreditCard,
  MessageCircle,
  Store,
  Lock,
  CheckCircle,
  X,
  Info,
  ShieldCheck,
  Send,
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

        <div className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4F6] text-[#2A7688] flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#17344F]">
                الدفع الإلكتروني (Paymob)
              </h2>
              <span className="text-[11px] md:text-xs text-[#678093]">
                بطاقات فيزا / ماستركارد ومحافظ كاش وإنستاباي
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            سداد فوري مشفر وموثق لرسوم منصة إنجاز، مواعيد تساهيل، وتذاكر الطيران مع استلام
            إيصال إلكتروني فوري.
          </p>

          <button
            onClick={() => {
              setShowPaymobModal(true);
              setPaySuccess(false);
            }}
            className="w-full bg-[#2A7688] hover:bg-[#1f5967] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>سداد عبر بوابة Paymob الآن</span>
          </button>
        </div>

        <div className="bg-white border border-[#E2DAC8] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#17344F]">
                التحويل البنكي وإنستاباي
              </h2>
              <span className="text-[11px] md:text-xs text-[#678093]">
                واتساب: {TravelRepository.PHONE_NUMBER}
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            تواصل عبر الواتساب للحصول على الحساب البنكي (البنك الأهلي / بنك مصر) أو حساب إنستاباي
            وإرسال إشعار التحويل لتأكيد الحجز فوراً.
          </p>

          <button
            onClick={() => {
              const text =
                'السلام عليكم، أود الحصول على بيانات التحويل البنكي وإنستاباي لسداد المعاملة.';
              openWhatsApp(text);
            }}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>طلب بيانات التحويل عبر واتساب</span>
          </button>
        </div>

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
                القاهرة • الدقهلية
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#324D61] leading-relaxed">
            تشريفنا في أحد مقراتنا الرسمية واستلام إيصال وعقد موثق ومعتمد بجميع المعاملات وباقات
            السفر.
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
            <span>سياسة السداد والضمان</span>
          </div>
          <ul className="text-[11px] md:text-xs text-[#324D61] space-y-1 pr-4 list-disc">
            <li>جميع الرسوم موثقة بفواتير رسمية ومعتمدة بسجل تجاري رقم {TravelRepository.COMMERCIAL_RECORD}.</li>
            <li>البريد الرسمي للمتابعة المالية: {TravelRepository.OFFICIAL_EMAIL}</li>
            <li>للاستفسارات والتحصيلات المالية: {TravelRepository.PHONE_NUMBER}</li>
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
                <div className="flex items-center gap-2 text-[#17344F]">
                  <CreditCard className="w-5 h-5 text-[#2A7688]" />
                  <h3 className="text-base font-bold text-[#0F2437]">
                    سداد المعاملة عبر Paymob
                  </h3>
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

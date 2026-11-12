import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../utils/communication';
import { WhatsAppIcon } from './WhatsAppIcon';

interface StepOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export const InteractiveGuide: React.FC<{ onRequestModal: (serviceTitle: string) => void }> = ({
  onRequestModal,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedDetail, setSelectedDetail] = useState<string>('');

  const goals: StepOption[] = [
    {
      id: 'tasheel',
      label: 'حجز موعد تساهيل VFS وبصمة السفر',
      description: 'حجز موعد البصمة وتسديد رسوم إنجاز والتأمين الصحي',
    },
    {
      id: 'visas',
      label: 'تجهيز ملف تأشيرة سياحية أو زيارة',
      description: 'تجهيز ملفات السفارات وحجوزات الطيران والفنادق المؤكدة',
    },
    {
      id: 'flights',
      label: 'حجز تذاكر طيران مؤكدة',
      description: 'تذاكر طيران دولية ومحلية بأفضل الأسعار المتاحة',
    },
    {
      id: 'documents',
      label: 'جوازات السفر والمستخرجات والتصديقات',
      description: 'تصديق خارجية وغرفة تجارية وتجديد جوازات ومستخرجات مميكنة',
    },
  ];

  const getSubOptions = (): StepOption[] => {
    switch (selectedGoal) {
      case 'tasheel':
        return [
          { id: 'tasheel_normal', label: 'موعد عادي بأقرب وقت متاح' },
          { id: 'tasheel_vip', label: 'موعد مميز (Lounge VIP) مستعجل' },
          { id: 'tasheel_enjaz_only', label: 'تسديد منصة إنجاز وإصدار التأمين فقط' },
        ];
      case 'visas':
        return [
          { id: 'visa_saudi', label: 'تأشيرات السعودية (زيارة • سياحة • تجارية)' },
          { id: 'visa_schengen', label: 'تأشيرات الشنغن وأوروبا وبريطانيا' },
          { id: 'visa_other', label: 'تأشيرات دول الخليج وشرق آسيا' },
        ];
      case 'flights':
        return [
          { id: 'flight_saudi', label: 'رحلات مباشرة إلى جدة أو الرياض أو المدينة' },
          { id: 'flight_international', label: 'رحلات دولية لأي وجهة في العالم' },
          { id: 'flight_transit', label: 'مقارنة أسعار وعروض مقاعد وأوزان إضافية' },
        ];
      case 'documents':
        return [
          { id: 'doc_attest', label: 'تصديق الغرفة التجارية ووزارة الخارجية' },
          { id: 'doc_passport', label: 'استخراج أو تجديد جواز السفر المصري' },
          { id: 'doc_translation', label: 'ترجمة معتمدة للشهادات والتقارير الطبية' },
        ];
      default:
        return [];
    }
  };

  const getMatchedService = (): {
    title: string;
    advice: string;
    required: string[];
  } => {
    switch (selectedGoal) {
      case 'tasheel':
        return {
          title: 'حجز مواعيد تساهيل و VFS Tasheer',
          advice: 'الخدمة الأنسب لك هي حجز موعد تساهيل المعتمد وتسديد إنجاز والتأمين الصحي مباشرة.',
          required: [
            'صورة جواز السفر الساري',
            'رقم طلب التأشيرة أو مستند التأشيرة',
            'بيانات جهة القدوم وفئة الموعد المطلوبة',
          ],
        };
      case 'visas':
        return {
          title: 'استخراج وتجهيز ملفات التأشيرات السياحية',
          advice: 'نقوم بتجهيز ملفك بالكامل مستوفياً كافة متطلبات السفارة لضمان أعلى نسبة قبول.',
          required: [
            'جواز سفر صالح لمدة 6 أشهر على الأقل',
            'صور شخصية حديثة بخلفية بيضاء',
            'كشف حساب بنكي وحجوزات طيران وفنادق موثقة',
          ],
        };
      case 'flights':
        return {
          title: 'حجز الطيران وتذاكر السفر المؤكدة',
          advice: 'نوفر لك خطة طيران مناسبة بأقل تكلفة ممكنة مع تأكيد فوري وحقائب كافية.',
          required: [
            'تاريخ الذهاب وتاريخ العودة المفضل',
            'مطارات المغادرة والوصول',
            'بيانات المسافرين وجوازات السفر للمطابقة',
          ],
        };
      case 'documents':
      default:
        return {
          title: 'تصديق الأوراق وترجمة الوثائق المعتمدة',
          advice: 'نوثق مستنداتك الرسمية ونعتمدها من الجهات الحكومية والغرفة التجارية والخارجية.',
          required: [
            'أصل المستند المراد تصديقه أو ترجمته',
            'تحديد الجهة أو السفارة الموجه إليها المستند',
          ],
        };
    }
  };

  const matched = getMatchedService();

  const handleSelectGoal = (id: string) => {
    setSelectedGoal(id);
    setStep(2);
  };

  const handleSelectDetail = (id: string) => {
    setSelectedDetail(id);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedGoal('');
    setSelectedDetail('');
  };

  const handleWhatsAppOrder = () => {
    const goalObj = goals.find((g) => g.id === selectedGoal);
    const detailObj = getSubOptions().find((d) => d.id === selectedDetail);
    const message = `السلام عليكم ورحمة الله وبركاته،
استخدمت الدليل التفاعلي لمنصة مسارك للإنجاز السياحي:
📌 *الخدمة الموصى بها:* ${matched.title}
🎯 *الهدف الأساسي:* ${goalObj?.label || selectedGoal}
🔍 *التفاصيل المحددة:* ${detailObj?.label || selectedDetail}
أرغب في البدء في المعاملة ومعرفة الرسوم والخطوات القادمة. شكراً لكم.`;

    openWhatsApp(message);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-[#0F2438]">
              محتار تبدأ منين؟
            </h3>
            <p className="text-xs text-slate-500">
              دليلك الذكي لاختيار الخدمة المناسبة في ٣ خطوات سريعة
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                step === num
                  ? 'bg-[#0F2438] text-[#E5C887]'
                  : step > num
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > num ? <Check className="w-3.5 h-3.5" /> : num}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Main Goal */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h4 className="text-sm font-bold text-[#0F2438]">
            الخطوة ١: ما هو نوع المعاملة التي تبحث عنها اليوم؟
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal.id)}
                className="text-right p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#0284C7] hover:shadow-xs transition-all flex flex-col justify-between gap-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-xs md:text-sm font-bold text-[#0F2438] group-hover:text-[#0284C7] transition-colors">
                    {goal.label}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] transition-colors shrink-0" />
                </div>
                {goal.description && (
                  <span className="text-[11px] text-slate-500 leading-snug">
                    {goal.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Specific Detail */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#0F2438]">
              الخطوة ٢: حدد التفاصيل أو الوجهة الأكثر ملاءمة لك:
            </h4>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-[#0F2438] flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-3 h-3" />
              <span>رجوع</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {getSubOptions().map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectDetail(opt.id)}
                className="text-right p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#0284C7] hover:shadow-xs transition-all flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <span className="text-xs md:text-sm font-bold text-[#0F2438] group-hover:text-[#0284C7] transition-colors leading-relaxed">
                  {opt.label}
                </span>
                <span className="text-[11px] font-semibold text-[#0284C7] flex items-center gap-1">
                  <span>تأكيد واختيار</span>
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Result Recommendation */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#0F2438] to-[#163B65] text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#E5C887] uppercase tracking-wider">
                الخدمة الموصى بها لحالتك
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة الاختيار</span>
              </button>
            </div>

            <h4 className="text-base md:text-lg font-bold text-white">
              {matched.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {matched.advice}
            </p>

            <div className="pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-[#E5C887] block mb-2">
                المستندات المطلوبة للبدء:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {matched.required.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-2.5 py-1.5 rounded-lg"
                  >
                    <Check className="w-3.5 h-3.5 text-[#E5C887] shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full sm:flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" variant="white" />
              <span>اطلب هذه الخدمة عبر واتساب الآن</span>
            </button>
            <button
              onClick={() => onRequestModal(matched.title)}
              className="w-full sm:w-auto py-3 px-5 bg-[#0F2438] hover:bg-[#0A1926] text-white rounded-xl text-xs md:text-sm font-bold transition active:scale-[0.98] cursor-pointer"
            >
              تقديم طلب مباشر
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

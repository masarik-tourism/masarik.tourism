import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
  Loader2,
} from 'lucide-react';
import { TravelRepository } from '../data/travelData';
import { dialPhoneNumber, openWhatsApp, launchEmail } from '../utils/communication';
import { FacebookIcon } from '../components/FacebookIcon';

interface ContactScreenProps {
  initialService?: string | null;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ initialService }) => {
  const serviceOptions = [
    'حجز موعد تساهيل VFS',
    'تسديد منصة إنجاز والتأمين',
    'تأشيرة B2C (عمرة) وحجز طيران',
    'الكشف الطبي GAMCA / LAB',
    'تأشيرات الزيارة العائلية والشخصية',
    'تأشيرات العمل والاستقدام',
    'حجز تذاكر الطيران بأفضل الأسعار',
    'حجز الفنادق بمكة والمدينة',
    'توثيق المستندات والغرفة التجارية',
    'استفسار عام آخر',
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    initialService || serviceOptions[0]
  );
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      const match = serviceOptions.find((opt) =>
        opt.includes(initialService) || initialService.includes(opt)
      );
      setSelectedService(match || initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setValidationError('يرجى ملء الاسم ورقم الهاتف والبريد الإلكتروني لإتمام الإرسال.');
      return;
    }
    setValidationError(null);
    setIsSending(true);

    const now = new Date();
    const formattedDate = now.toLocaleString('ar-EG');
    const subject = `طلب جديد من مسارك للإنجاز السياحي (س.ت: ${TravelRepository.COMMERCIAL_RECORD}): ${selectedService}`;
    const bodyText = `
السلام عليكم ورحمة الله،
طلب حجز واستفسار جديد عبر تطبيق مسارك للإنجاز السياحي:
--------------------------------------------------
• اسم العميل: ${name}
• البريد الإلكتروني للعميل: ${email}
• رقم الهاتف / الواتساب: ${phone}
• الخدمة المطلوبة: ${selectedService}
• تفاصيل الرسالة والملاحظات:
${message.trim() ? message.trim() : 'لا توجد ملاحظات إضافية'}
--------------------------------------------------
سجل تجاري: ${TravelRepository.COMMERCIAL_RECORD}
تاريخ وتوقيت الطلب: ${formattedDate}
المرسل إليه الرسمي: ${TravelRepository.OFFICIAL_EMAIL}
--------------------------------------------------
    `.trim();

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${TravelRepository.OFFICIAL_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            service: selectedService,
            message: bodyText,
            _subject: subject,
            _replyto: email.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network error');
      }
    } catch {
      launchEmail(TravelRepository.OFFICIAL_EMAIL, subject, bodyText);
    } finally {
      setIsSending(false);
      setShowSuccessDialog(true);
    }
  };

  const handleWhatsAppForward = () => {
    const msg = `السلام عليكم، أود حجز خدمة من مكتب ${TravelRepository.COMPANY_NAME_AR} (س.ت: ${TravelRepository.COMMERCIAL_RECORD}):\n• الاسم: ${name.trim() || 'عميل'}\n• الإيميل: ${email.trim() || 'غير محدد'}\n• الهاتف: ${phone.trim() || 'غير محدد'}\n• الخدمة: ${selectedService}\n• تفاصيل: ${message.trim() || 'لا توجد'}`;
    openWhatsApp(msg);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 md:pb-16 pt-5">
      <div className="max-w-4xl mx-auto px-4 space-y-5">
        <div className="bg-[#FBF7EE] border border-[#E5C887] rounded-xl p-3.5 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#9E7B33] shrink-0" />
          <div>
            <h2 className="text-xs md:text-sm font-black text-[#9E7B33]">
              {TravelRepository.CERTIFICATION_TITLE}
            </h2>
            <p className="text-[11px] md:text-xs font-bold text-[#0F2437]">
              {TravelRepository.COMMERCIAL_RECORD_STATEMENT}
            </p>
          </div>
        </div>

        <div className="bg-[#FAF8F2] border-2 border-[#E5C887] rounded-2xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6A052]/20 text-[#9E7B33] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-black text-[#0F2437]">
                تواصل ومراسلة مباشرة للإيميل
              </h2>
              <p className="text-[11px] md:text-xs text-[#324D61]">
                يتم إرسال كافة البيانات فوراً إلى بريد المكتب الرسمي:
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#E2DAC8] rounded-xl px-3.5 py-2 text-xs md:text-sm font-bold text-[#2A7688] font-mono text-center md:text-right">
            {TravelRepository.OFFICIAL_EMAIL}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => openWhatsApp()}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب فوري</span>
          </button>
          <a
            href={TravelRepository.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] text-center"
          >
            <FacebookIcon className="w-4 h-4 fill-white" />
            <span>صفحة فيسبوك</span>
          </a>
          <button
            onClick={() => dialPhoneNumber()}
            className="bg-[#17344F] hover:bg-[#0F2437] text-white py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>اتصال هاتفياً</span>
          </button>
        </div>

        <div className="bg-white border border-[#E2DAC8] rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-base md:text-lg font-bold text-[#17344F]">
              نموذج إرسال الطلب وحجز الخدمة
            </h2>
            <p className="text-xs text-[#678093] mt-0.5">
              اكتب بياناتك وسيتم إرسالها فوراً لبريد {TravelRepository.OFFICIAL_EMAIL}
            </p>
          </div>

          {validationError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-xs font-bold text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#0F2437] mb-1">
                الاسم بالكامل *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أحمد محمد علي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-xs md:text-sm bg-[#FAF8F2] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2437] mb-1">
                بريدك الإلكتروني (لإرسال الرد والتأكيد) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-xs md:text-sm bg-[#FAF8F2] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2437] mb-1">
                رقم الهاتف / الواتساب *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={TravelRepository.PHONE_NUMBER}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-xs md:text-sm bg-[#FAF8F2] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2437] mb-1">
                نوع الخدمة المراد إنجازها:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-xs md:text-sm bg-[#FAF8F2] font-bold text-[#0F2437]"
              >
                {serviceOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2437] mb-1">
                تفاصيل الرسالة أو الاستفسار أو الموعد:
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب أي بيانات إضافية تخص التأشيرة أو عدد المسافرين أو الموعد المرغوب..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DAC8] focus:border-[#2A7688] focus:ring-1 focus:ring-[#2A7688] outline-none text-xs md:text-sm bg-[#FAF8F2] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#17344F] hover:bg-[#0F2437] text-white py-3 px-4 rounded-xl text-xs md:text-sm font-bold shadow-md transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جارٍ إرسال الإيميل...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>إرسال إلى الإيميل ({TravelRepository.OFFICIAL_EMAIL})</span>
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={handleWhatsAppForward}
            className="w-full bg-transparent hover:bg-green-50 text-[#128C7E] border-2 border-[#25D366] py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>إرسال نسخة عبر الواتساب فوراً</span>
          </button>
        </div>

        <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-xl p-4 space-y-2.5 text-xs md:text-sm">
          <h3 className="font-bold text-[#0F2437]">
            فروع ومقرات {TravelRepository.COMPANY_NAME_AR}
          </h3>
          <div className="space-y-1.5 text-[#324D61]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A052] shrink-0" />
              <span>سجل تجاري معتمد رقم: {TravelRepository.COMMERCIAL_RECORD}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2A7688] shrink-0" />
              <span>الفرع الرئيسي: محافظة القاهرة، جمهورية مصر العربية</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2A7688] shrink-0" />
              <span>فرع الدلتا: محافظة الدقهلية، جمهورية مصر العربية</span>
            </div>
            <div className="flex items-center gap-2 text-[#678093]">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{TravelRepository.WORKING_HOURS}</span>
            </div>
          </div>
        </div>
      </div>

      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2DAC8] text-right space-y-4">
            <div className="flex items-center gap-2.5 text-green-700">
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
              <h3 className="text-base font-bold">تم إرسال الطلب بنجاح!</h3>
            </div>

            <p className="text-xs text-[#324D61] leading-relaxed">
              شكراً لك يا <span className="font-bold text-[#0F2437]">{name}</span>. تم إرسال رسالتك
              وتفاصيل طلبك بنجاح إلى البريد الإلكتروني الرسمي:
            </p>

            <div className="bg-[#FAF8F2] border border-[#E2DAC8] rounded-xl p-3 text-xs font-mono font-bold text-[#17344F] text-center">
              {TravelRepository.OFFICIAL_EMAIL}
            </div>

            <div className="bg-[#FBF7EE] border border-[#E5C887]/60 rounded-xl p-3 text-xs space-y-1 text-[#324D61]">
              <p>• الخدمة: <span className="font-bold text-[#0F2437]">{selectedService}</span></p>
              <p>• رقم الهاتف: <span className="font-bold text-[#0F2437]">{phone}</span></p>
              <p>• بريد العميل: <span className="font-bold text-[#0F2437]">{email}</span></p>
              <p>• رقم السجل التجاري: <span className="font-bold text-[#0F2437]">{TravelRepository.COMMERCIAL_RECORD}</span></p>
            </div>

            <p className="text-[11px] text-[#678093]">
              سيقوم فريق العمل بالرد والتواصل معك في أقرب وقت لإتمام الإجراءات وتأكيد الموعد.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  const msg = `السلام عليكم، قمت بإرسال طلب لخدمة (${selectedService}) عبر الإيميل باسم (${name}) ورقم (${phone}). أرجو المتابعة.`;
                  openWhatsApp(msg);
                  setShowSuccessDialog(false);
                }}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>متابعة بالواتساب أيضاً</span>
              </button>
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#678093] hover:text-[#17344F] transition cursor-pointer"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

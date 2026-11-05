import { TravelRepository } from '../data/travelData';

export function openWhatsApp(urlOrMessage?: string): void {
  if (!urlOrMessage) {
    window.open(TravelRepository.WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    return;
  }
  if (urlOrMessage.startsWith('http://') || urlOrMessage.startsWith('https://')) {
    window.open(urlOrMessage, '_blank', 'noopener,noreferrer');
  } else {
    const encoded = encodeURIComponent(urlOrMessage);
    window.open(`${TravelRepository.WHATSAPP_URL}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  }
}

export function dialPhoneNumber(phoneNumber = TravelRepository.PHONE_DIAL): void {
  window.location.href = `tel:${phoneNumber}`;
}

export function launchEmail(
  email = TravelRepository.OFFICIAL_EMAIL,
  subject = '',
  body = ''
): void {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

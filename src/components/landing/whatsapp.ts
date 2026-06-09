export const WHATSAPP_NUMBER = "5586999947314";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export function createWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Olá, quero gravar minha música no Carambolo Studio e gostaria de solicitar uma avaliação inicial do meu projeto.";

export const defaultWhatsAppUrl = createWhatsAppUrl(defaultWhatsAppMessage);

export const rehearsalWhatsAppUrl = createWhatsAppUrl(
  "Olá, quero reservar um horário de ensaio no Carambolo Studio e entender disponibilidade.",
);

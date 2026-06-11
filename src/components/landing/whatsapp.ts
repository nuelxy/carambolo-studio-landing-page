export const WHATSAPP_NUMBER = "5586999947314";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export function createWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Olá, quero receber uma avaliação inicial para gravar minha música no Carambolo Studio. Gostaria de entender o melhor formato, prazo e orçamento para o meu projeto.";

export const defaultWhatsAppUrl = createWhatsAppUrl(defaultWhatsAppMessage);

export const rehearsalWhatsAppUrl = createWhatsAppUrl(
  "Olá, quero consultar horários para ensaio no Carambolo Studio. Gostaria de saber a disponibilidade, duração recomendada e valores.",
);
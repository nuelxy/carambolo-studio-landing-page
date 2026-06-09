type TrackingPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: TrackingPayload[];
    gtag?: (event: "event", name: string, payload?: TrackingPayload) => void;
    fbq?: (event: "trackCustom", name: string, payload?: TrackingPayload) => void;
  }
}

export function trackEvent(name: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;

  // Conectar aqui integrações reais de GA4, GTM e Meta Pixel quando os IDs forem definidos.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  window.gtag?.("event", name, payload);
  window.fbq?.("trackCustom", name, payload);

  if (import.meta.env.DEV) {
    console.info("[track]", name, payload);
  }
}

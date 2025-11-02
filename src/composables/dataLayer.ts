export default function dataLayerEventPush(eventName: string, attrs: { [key: string]: any } = {}) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: eventName, ...attrs });
  try {
    (window as any).clarity("event", eventName);
  } catch (error) {
    console.warn("Microsoft Clarity não está instalado na sessão.");
  }
};
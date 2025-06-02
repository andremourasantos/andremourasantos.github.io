export default function dataLayerEventPush(eventName: string, attrs: { [key: string]: any } = {}) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: eventName, ...attrs });
  (window as any).clarity("event", eventName);
};
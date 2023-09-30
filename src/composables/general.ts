export function toggleHTMLOverflowY():void {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  
  htmlEl.style.overflow == 'hidden' ?  htmlEl.style.overflow = 'scroll' :  htmlEl.style.overflow = 'hidden';
}
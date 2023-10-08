export function toggleHTMLOverflowY():void {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  
  htmlEl.style.overflow == 'hidden' ?  htmlEl.style.overflow = 'scroll' :  htmlEl.style.overflow = 'hidden';
}

export function filterServicesToShow(servicesJSON:ServiceInfo[]) {
  return servicesJSON.filter(entry => {
    return entry !== undefined && entry.show === true;
  }) as NonNullable<ServiceInfo>[];
}
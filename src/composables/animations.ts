export const getElementWhenIntersectWithViewport = (el: HTMLElement, animationName: string) => {
  const observer = new IntersectionObserver((els) => {
    els.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.style.animationName = animationName;
        observer.unobserve(el);
      }
    })
  }, {
    rootMargin: '0px 0px -100px 0px'
  })
  observer.observe(el);
};
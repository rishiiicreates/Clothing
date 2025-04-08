import { useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  callback?: () => void;
  easing?: (t: number) => number;
}

// Easing functions
const easing = {
  // Sine easing in/out
  easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,
  
  // Cubic easing in/out
  easeInOutCubic: (t: number): number => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Quint easing in/out
  easeInOutQuint: (t: number): number => 
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
};

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    element: HTMLElement | string | null, 
    options: SmoothScrollOptions = {}
  ) => {
    const {
      duration = 800,
      offset = 0,
      callback,
      easing: easingFn = easing.easeInOutCubic
    } = options;
    
    if (!element) return;
    
    // Get the target element
    const targetElement = 
      typeof element === 'string' 
        ? document.querySelector(element) 
        : element;
        
    if (!targetElement) return;
    
    const startTime = performance.now();
    const startTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate the target position, accounting for the header offset if needed
    const targetPosition = targetElement.getBoundingClientRect().top + startTop - offset;
    const distance = targetPosition - startTop;
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      
      window.scrollTo(0, startTop + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else if (callback) {
        callback();
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);
  
  // Handle anchor links smoothly
  const handleAnchorClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>, 
    options: SmoothScrollOptions = {}
  ) => {
    const href = e.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#') && href !== '#') {
      e.preventDefault();
      scrollToElement(href, options);
    }
  }, [scrollToElement]);
  
  return { scrollToElement, handleAnchorClick };
};
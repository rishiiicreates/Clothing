import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: number;
}

export const useParallax = ({
  speed = 0.1,
  direction = 'up',
  easing = 0.1,
}: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const scrollPosRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only update when element is visible in viewport (with some buffer)
      if (rect.top < windowHeight + 300 && rect.bottom > -300) {
        // Calculate how much of the element is in view
        const elementVisibility = 
          (Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)) / 
          (rect.height + windowHeight);
        
        // Get scroll position relative to the element
        const scrollPosition = window.scrollY - (rect.top + window.scrollY - windowHeight / 2);
        scrollPosRef.current = scrollPosition * speed * elementVisibility;
      }
    };
    
    const animateParallax = () => {
      // Apply easing to make motion smoother
      const currentOffset = parseFloat(elementRef.current?.style.transform?.match(/-?\d+\.?\d*/)?.[0] || "0");
      const targetOffset = scrollPosRef.current;
      
      // Easing calculation
      const newOffset = currentOffset + (targetOffset - currentOffset) * easing;
      
      if (elementRef.current) {
        let transform = '';
        
        switch (direction) {
          case 'up':
            transform = `translateY(${-newOffset}px)`;
            break;
          case 'down':
            transform = `translateY(${newOffset}px)`;
            break;
          case 'left':
            transform = `translateX(${-newOffset}px)`;
            break;
          case 'right':
            transform = `translateX(${newOffset}px)`;
            break;
        }
        
        elementRef.current.style.transform = transform;
        setOffset(newOffset);
      }
      
      rafRef.current = requestAnimationFrame(animateParallax);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animateParallax);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, direction, easing]);
  
  return { ref: elementRef, offset };
};
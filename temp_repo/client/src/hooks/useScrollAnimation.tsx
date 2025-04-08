import { useEffect, useRef, RefObject } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.classList.add('appear');
    }
  }, [isInView]);
  
  return ref;
};

export default useScrollAnimation;

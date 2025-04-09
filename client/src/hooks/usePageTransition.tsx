import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Simplified transition types - fewer options for better quality
export type TransitionType = 'fade' | 'slide' | 'zoom';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
  transitionType?: TransitionType;
  duration?: number;
}

// Professional easing functions
const eases = {
  // Standard ease-out for smooth transitions
  standard: [0.33, 1, 0.68, 1],
  
  // Gentle ease for content
  gentle: [0.4, 0, 0.2, 1]
};

// Simple, clean page transition component
export const PageTransition = ({
  children,
  location,
  transitionType = 'fade',
  duration = 0.4
}: PageTransitionProps) => {
  // Simple, clean variants for consistent transitions
  const variants = {
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    'slide': {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 }
    },
    'zoom': {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 }
    }
  };

  // Get the appropriate variant
  const variant = variants[transitionType] || variants.fade;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variant}
        transition={{
          duration: duration,
          ease: eases.standard
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Simplified hook to manage page transitions
export const usePageTransition = (
  defaultTransition: TransitionType = 'fade',
  defaultDuration: number = 0.4
) => {
  const [transitionType, setTransitionType] = useState<TransitionType>(defaultTransition);
  const [transitionDuration, setTransitionDuration] = useState<number>(defaultDuration);

  useEffect(() => {
    // Reset scroll position on page change
    window.scrollTo(0, 0);
  }, []);

  return {
    transitionType,
    transitionDuration,
    setTransitionType,
    setTransitionDuration,
    PageTransition
  };
};

export default usePageTransition;
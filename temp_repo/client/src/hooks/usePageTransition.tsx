import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type TransitionType = 
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'rotate'
  | 'flip'
  | 'blur'
  | 'wipe';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
  transitionType?: TransitionType;
  duration?: number;
  bgColor?: string;
}

// Page transition component for route changes
export const PageTransition = ({
  children,
  location,
  transitionType = 'fade',
  duration = 0.5,
  bgColor = 'rgba(255, 107, 0, 1)'
}: PageTransitionProps) => {
  // Variants for different transition types
  const variants = {
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 }
    },
    'slide-down': {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 }
    },
    'slide-left': {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 }
    },
    'slide-right': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 }
    },
    'scale': {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 }
    },
    'rotate': {
      initial: { opacity: 0, rotate: -5 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 5 }
    },
    'flip': {
      initial: { opacity: 0, rotateY: -90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: 90 }
    },
    'blur': {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' }
    },
    'wipe': {
      initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
      exit: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }
    }
  };

  // Get the appropriate variant
  const variant = variants[transitionType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variant}
        transition={{ 
          duration, 
          ease: "easeOut" 
        }}
        className="w-full h-full"
      >
        {/* Page content */}
        {children}
        
        {/* Full-screen overlay for transitions (optional) */}
        <AnimatePresence>
          {transitionType === 'wipe' && (
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ 
                scaleX: [0, 1, 1, 0],
                originX: [0, 0, 1, 1],
              }}
              transition={{ 
                duration: duration * 2, 
                times: [0, 0.4, 0.6, 1],
                ease: "easeInOut" 
              }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: bgColor }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook to manage page transitions
export const usePageTransition = (
  defaultTransition: TransitionType = 'fade',
  defaultDuration: number = 0.5
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
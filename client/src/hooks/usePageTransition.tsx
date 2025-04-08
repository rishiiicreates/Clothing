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
  | 'wipe'
  | 'parallax-up'
  | 'parallax-down'
  | 'parallax-zoom';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
  transitionType?: TransitionType;
  duration?: number;
  bgColor?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// Page transition component for route changes
export const PageTransition = ({
  children,
  location,
  transitionType = 'fade',
  duration = 0.5,
  bgColor = 'rgba(255, 107, 0, 1)',
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 0.7
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
    },
    'parallax-up': {
      initial: { opacity: 0, y: 100, scale: 1.1 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -100, scale: 0.9 }
    },
    'parallax-down': {
      initial: { opacity: 0, y: -100, scale: 1.1 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 100, scale: 0.9 }
    },
    'parallax-zoom': {
      initial: { opacity: 0, scale: 1.4 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.6 }
    }
  };

  // Get the appropriate variant
  const variant = variants[transitionType as keyof typeof variants] || variants.fade;
  
  // Determine if this is a parallax transition
  const isParallaxTransition = 
    transitionType === 'parallax-up' || 
    transitionType === 'parallax-down' || 
    transitionType === 'parallax-zoom';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variant}
        transition={{ 
          duration: isParallaxTransition ? duration * 1.4 : duration, 
          ease: isParallaxTransition ? [0.25, 0.1, 0.25, 1] : "easeOut" 
        }}
        className="w-full h-full relative"
      >
        {/* Page content */}
        {children}
        
        {/* Overlay animation for parallax transitions */}
        {(isParallaxTransition && overlay) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: overlayOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 0.8 }}
            className="fixed inset-0 z-10 pointer-events-none"
            style={{ backgroundColor: overlayColor }}
          />
        )}
        
        {/* Full-screen overlay for wipe transitions */}
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
  const [overlay, setOverlay] = useState(false);
  const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0.5)');
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);

  // Select a random transition effect for parallax animations
  const selectRandomParallaxTransition = () => {
    const parallaxTransitions: TransitionType[] = ['parallax-up', 'parallax-down', 'parallax-zoom'];
    const randomIndex = Math.floor(Math.random() * parallaxTransitions.length);
    setTransitionType(parallaxTransitions[randomIndex]);
  };

  useEffect(() => {
    // Reset scroll position on page change
    window.scrollTo(0, 0);
  }, []);

  return {
    transitionType,
    transitionDuration,
    setTransitionType,
    setTransitionDuration,
    selectRandomParallaxTransition,
    overlay,
    setOverlay,
    overlayColor,
    setOverlayColor,
    overlayOpacity,
    setOverlayOpacity,
    PageTransition
  };
};

export default usePageTransition;
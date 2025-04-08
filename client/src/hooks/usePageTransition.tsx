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
  | 'parallax-zoom'
  | 'morph'
  | 'reveal'
  | 'glide';

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

// Enhanced cinematic-grade easing functions for premium transitions
const eases = {
  // Sophisticated smooth transitions with perfect timing
  smooth: [0.43, 0.13, 0.23, 0.96],
  
  // Professional film-like motion with precise deceleration
  swift: [0.22, 0.68, 0.36, 1],
  
  // Luxury brand motion with subtle anticipation and follow-through
  elegant: [0.4, 0.1, 0.25, 1.05],
  
  // Ultra-precise movement for technical animations
  precise: [0.65, 0.05, 0.15, 1],
  
  // Organic spring-like movement with controlled overshoot
  springy: [0.34, 1.42, 0.64, 1],
  
  // Imperceptible acceleration for luxury feel
  subtle: [0.6, 0.01, 0.05, 0.95],
  
  // Cinematographer's dolly movement with perfect follow-through
  cinematic: [0.33, 0.9, 0.25, 0.99],
  
  // Silky soft transitions for premium content
  silk: [0.4, 0, 0.2, 1],
  
  // Professional depth-aware movement
  depth: [0.25, 0.5, 0.125, 1],
  
  // Camera-like focus transition
  focus: [0.8, 0, 0.1, 1],
};

// Page transition component for route changes
export const PageTransition = ({
  children,
  location,
  transitionType = 'fade',
  duration = 0.5,
  bgColor = 'rgba(0,0,0,0.05)',
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.1)',
  overlayOpacity = 0.3
}: PageTransitionProps) => {
  // Enhanced variants with more sophisticated animations
  const variants = {
    'fade': {
      initial: { opacity: 0, filter: 'brightness(1.1)' },
      animate: { opacity: 1, filter: 'brightness(1)' },
      exit: { opacity: 0, filter: 'brightness(0.9)' }
    },
    'slide-up': {
      initial: { opacity: 0, y: 40, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -40, filter: 'blur(4px)' }
    },
    'slide-down': {
      initial: { opacity: 0, y: -40, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: 40, filter: 'blur(4px)' }
    },
    'slide-left': {
      initial: { opacity: 0, x: 40, filter: 'blur(4px)' },
      animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, x: -40, filter: 'blur(4px)' }
    },
    'slide-right': {
      initial: { opacity: 0, x: -40, filter: 'blur(4px)' },
      animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, x: 40, filter: 'blur(4px)' }
    },
    'scale': {
      initial: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 1.08, filter: 'blur(6px)' }
    },
    'rotate': {
      initial: { opacity: 0, rotate: -3, scale: 0.95, filter: 'blur(5px)' },
      animate: { opacity: 1, rotate: 0, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, rotate: 3, scale: 0.95, filter: 'blur(5px)' }
    },
    'flip': {
      initial: { opacity: 0, rotateY: -8, perspective: "1200px", scale: 0.9, filter: 'brightness(1.1) blur(8px)' },
      animate: { opacity: 1, rotateY: 0, perspective: "1200px", scale: 1, filter: 'brightness(1) blur(0px)' },
      exit: { opacity: 0, rotateY: 8, perspective: "1200px", scale: 0.9, filter: 'brightness(0.9) blur(8px)' }
    },
    'blur': {
      initial: { opacity: 0, filter: 'blur(20px) saturate(0.8)', scale: 1.02 },
      animate: { opacity: 1, filter: 'blur(0px) saturate(1)', scale: 1 },
      exit: { opacity: 0, filter: 'blur(20px) saturate(1.2)', scale: 0.98 }
    },
    'wipe': {
      initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
      exit: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }
    },
    // Enhanced cinematic parallax-up with depth and perspective effects
    'parallax-up': {
      initial: { 
        opacity: 0, 
        y: 65, 
        scale: 1.08, 
        rotateX: 2, // Subtle 3D tilt
        transformOrigin: "bottom",
        filter: 'blur(12px) brightness(1.15) contrast(0.95)',
        transformPerspective: 1000 // 3D perspective
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        filter: 'blur(0px) brightness(1) contrast(1)'
      },
      exit: { 
        opacity: 0, 
        y: -65, 
        scale: 0.95, 
        rotateX: -2, // Opposite tilt on exit
        transformOrigin: "top",
        filter: 'blur(12px) brightness(0.9) contrast(1.05)' 
      }
    },
    
    // Enhanced cinematic parallax-down with depth and perspective effects
    'parallax-down': {
      initial: { 
        opacity: 0, 
        y: -65, 
        scale: 1.08, 
        rotateX: -2, // Subtle 3D tilt
        transformOrigin: "top",
        filter: 'blur(12px) brightness(1.15) contrast(0.95)',
        transformPerspective: 1000 // 3D perspective
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        filter: 'blur(0px) brightness(1) contrast(1)'
      },
      exit: { 
        opacity: 0, 
        y: 65, 
        scale: 0.95, 
        rotateX: 2, // Opposite tilt on exit
        transformOrigin: "bottom",
        filter: 'blur(12px) brightness(0.9) contrast(1.05)' 
      }
    },
    
    // Enhanced premium zoom parallax with professional depth effects
    'parallax-zoom': {
      initial: { 
        opacity: 0, 
        scale: 1.25, 
        filter: 'blur(16px) saturate(0.85) contrast(0.9)',
        rotateX: 1, // Subtle depth effect
        rotateY: 1, // Subtle depth effect
        transformPerspective: 1500 // 3D perspective
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px) saturate(1) contrast(1)',
        rotateX: 0,
        rotateY: 0
      },
      exit: { 
        opacity: 0, 
        scale: 0.85, 
        filter: 'blur(16px) saturate(1.15) contrast(1.1)',
        rotateX: -1, // Subtle depth effect (opposite)
        rotateY: -1  // Subtle depth effect (opposite)
      }
    },
    // New premium transitions
    'morph': {
      initial: { 
        opacity: 0, 
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        scale: 0.9,
        filter: 'blur(10px)',
      },
      animate: { 
        opacity: 1, 
        borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%',
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: { 
        opacity: 0, 
        borderRadius: '30% 70% 30% 70% / 70% 30% 70% 30%',
        scale: 0.9,
        filter: 'blur(10px)',
      }
    },
    'reveal': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
      // This one uses a special overlay animation
    },
    'glide': {
      initial: { 
        opacity: 0, 
        y: 40, 
        x: -20, 
        rotateZ: -2,
        filter: 'blur(8px)'
      },
      animate: { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        rotateZ: 0,
        filter: 'blur(0px)'
      },
      exit: { 
        opacity: 0, 
        y: -40, 
        x: 20, 
        rotateZ: 2,
        filter: 'blur(8px)'
      }
    }
  };

  // Get the appropriate variant
  const variant = variants[transitionType as keyof typeof variants] || variants.fade;
  
  // Determine transition settings based on type
  const getTransitionSettings = () => {
    // Base settings for all transitions
    const base = {
      duration: duration,
      ease: eases.smooth
    };
    
    // Enhanced transitions for parallax effects with professional timing
    if (transitionType === 'parallax-up') {
      return {
        duration: duration * 1.25,
        ease: eases.cinematic, // Cinematographer's motion curve
        opacity: { duration: duration * 0.8, ease: eases.silk },
        scale: { duration: duration * 1.5, ease: eases.depth },
        filter: { duration: duration * 1.1, ease: eases.focus },
        rotateX: { 
          duration: duration * 1.6, 
          ease: eases.elegant 
        },
        y: { 
          duration: duration * 1.35, 
          ease: eases.cinematic 
        }
      };
    }
    
    if (transitionType === 'parallax-down') {
      return {
        duration: duration * 1.25,
        ease: eases.cinematic, // Cinematographer's motion curve
        opacity: { duration: duration * 0.8, ease: eases.silk },
        scale: { duration: duration * 1.5, ease: eases.depth },
        filter: { duration: duration * 1.1, ease: eases.focus },
        rotateX: { 
          duration: duration * 1.6, 
          ease: eases.elegant 
        },
        y: { 
          duration: duration * 1.35, 
          ease: eases.cinematic 
        }
      };
    }
    
    if (transitionType === 'parallax-zoom') {
      return {
        duration: duration * 1.3,
        ease: eases.depth, // Special depth-aware easing
        opacity: { duration: duration * 0.85, ease: eases.silk },
        scale: { 
          duration: duration * 1.65, 
          ease: eases.cinematic 
        },
        filter: { 
          duration: duration * 1.2, 
          ease: eases.focus 
        },
        rotateX: { 
          duration: duration * 1.5, 
          ease: eases.elegant 
        },
        rotateY: { 
          duration: duration * 1.6, 
          ease: eases.elegant 
        }
      };
    }
    
    if (transitionType === 'blur') {
      return {
        duration: duration * 1.1,
        filter: { duration: duration * 1.3, ease: eases.subtle },
        scale: { duration: duration * 1.2 }
      };
    }
    
    if (transitionType === 'flip') {
      return {
        type: "spring",
        stiffness: 100,
        damping: 20,
        opacity: { duration: duration * 0.7, ease: eases.smooth }
      };
    }
    
    if (transitionType === 'rotate') {
      return {
        duration: duration * 1.1,
        rotate: { type: "spring", stiffness: 80, damping: 15 },
        scale: { duration: duration * 1.2, ease: eases.elegant }
      };
    }
    
    if (transitionType === 'morph') {
      return {
        duration: duration * 1.3,
        borderRadius: { duration: duration * 1.5, ease: eases.swift },
        opacity: { duration: duration * 0.8, ease: eases.subtle }
      };
    }
    
    if (transitionType === 'glide') {
      return {
        type: "spring",
        stiffness: 70,
        damping: 14,
        mass: 1,
        opacity: { duration: duration * 0.7, ease: eases.elegant }
      };
    }
    
    // Default fallback
    return base;
  };
  
  // Determine if this is a special transition type
  const isParallaxTransition = 
    transitionType === 'parallax-up' || 
    transitionType === 'parallax-down' || 
    transitionType === 'parallax-zoom';
    
  const useRevealOverlay = transitionType === 'reveal';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variant}
        transition={getTransitionSettings()}
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
            transition={{ duration: duration * 0.8, ease: eases.subtle }}
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
                ease: eases.precise 
              }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: bgColor }}
            />
          )}
          
          {/* Enhanced cinematic reveal transition with sophisticated sliding panels */}
          {useRevealOverlay && (
            <>
              {/* Top panel with enhanced motion and timing */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                exit={{ y: 0 }}
                transition={{ 
                  duration: duration * 1.1, 
                  ease: eases.cinematic,
                }}
                className="fixed inset-0 z-50 origin-bottom"
                style={{ 
                  backgroundColor: bgColor,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)" // Subtle shadow for depth
                }}
              >
                {/* Optional decorative line for premium feel */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20"
                  style={{ boxShadow: "0 -1px 8px rgba(255, 255, 255, 0.2)" }}
                />
              </motion.div>
              
              {/* Bottom panel with enhanced motion and timing */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: '100%' }}
                exit={{ y: 0 }}
                transition={{ 
                  duration: duration * 1.1, 
                  ease: eases.cinematic,
                  delay: 0.05 // Slight offset for more dynamic feel
                }}
                className="fixed inset-0 z-50 origin-top"
                style={{ 
                  backgroundColor: bgColor,
                  boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.15)" // Subtle shadow for depth
                }}
              >
                {/* Optional decorative line for premium feel */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] bg-white/20"
                  style={{ boxShadow: "0 1px 8px rgba(255, 255, 255, 0.2)" }}
                />
              </motion.div>
              
              {/* Optional center accent flash for more premium transitions */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1],
                  opacity: [0, 0.7, 0]
                }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ 
                  duration: duration * 0.8, 
                  times: [0, 0.4, 0.8],
                  ease: eases.swift
                }}
                className="fixed left-0 right-0 top-1/2 h-[1px] z-50 origin-center"
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)"
                }}
              />
            </>
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

  // Select a random transition effect for page transitions
  const selectRandomParallaxTransition = () => {
    const premiumTransitions: TransitionType[] = [
      'parallax-up', 
      'parallax-down', 
      'parallax-zoom',
      'morph',
      'reveal',
      'glide'
    ];
    const randomIndex = Math.floor(Math.random() * premiumTransitions.length);
    setTransitionType(premiumTransitions[randomIndex]);
    
    // Randomize transition duration slightly for more organic feel
    const randomDuration = (Math.random() * 0.3) + 0.5; // Between 0.5 and 0.8
    setTransitionDuration(randomDuration);
    
    // Sometimes add an overlay for more dramatic effect (30% chance)
    setOverlay(Math.random() > 0.7);
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
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'words' | 'chars' | 'highlight';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  threshold?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  highlightColor?: string;
}

const ScrollTriggerText: React.FC<TextProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.03,
  threshold = 0.3,
  once = true,
  as = 'div',
  highlightColor = 'rgba(255, 107, 0, 0.2)',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { amount: threshold, once });

  // Split text content into words or characters
  const splitText = (text: string) => {
    if (animation === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            custom={i}
          >
            {word}
          </motion.span>
          {i !== text.split(' ').length - 1 && ' '}
        </span>
      ));
    } else if (animation === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={charVariants}
            custom={i}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ));
    }
    return text;
  };

  // Animation variants for different types
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
        staggerDirection: 1,
        when: "beforeChildren",
      },
    },
  };

  // Advanced cubic-bezier curves for cinematic-grade animations
  const eases = {
    // Premium smooth-out with refined anticipation
    premium: [0.25, 0.1, 0.25, 1.03], 
    
    // Organic bounce effect with perfect naturalism
    bounce: [0.175, 0.885, 0.32, 1.275],
    
    // Professionally timed ease for fluid text movements
    swift: [0.19, 1, 0.22, 1],
    
    // Ultra-refined overshoot with precision fall-off
    polished: [0.34, 1.28, 0.64, 1],
    
    // Imperceptible acceleration for luxury brand feel
    luxury: [0.6, 0.01, 0.05, 0.95],
    
    // Cinema-grade dramatic reveal timing
    cinematic: [0.33, 0.9, 0.25, 0.99],
    
    // Silk-smooth deceleration (ideal for important content)
    silk: [0.4, 0, 0.2, 1],
    
    // Perfect text reveal with professional timing
    textReveal: [0.25, 0.5, 0.5, 0.95]
  };

  // Enhanced word animation with more refined movement
  const wordVariants = {
    hidden: {
      y: 50, // Reduced distance for smoother motion
      opacity: 0,
      rotateX: -5, // Reduced rotation for less jittery effect
      filter: "blur(3px)",
      scale: 0.98, // Closer to 1 for subtler effect
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        // Modified spring physics for more natural word motion
        type: "tween", // Changed to tween for smoother motion
        duration: duration * 0.8,
        ease: eases.silk,
        delay: delay + i * staggerChildren,
        // Independent property transitions for more control
        opacity: { 
          duration: duration * 0.6, 
          ease: eases.silk 
        },
        filter: { 
          duration: duration * 0.5, 
          ease: "linear" 
        },
        scale: {
          duration: duration * 0.9,
          ease: eases.silk
        }
      },
    }),
  };

  // Enhanced character animation with microinteractions
  const charVariants = {
    hidden: {
      y: 20, // Reduced for smoother motion
      opacity: 0,
      rotateX: -10, // Reduced for less jittery effect
      filter: "blur(2px)",
      scale: 0.95, // Closer to 1 for subtler effect
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        // More refined tween animation for smoother characters
        type: "tween",
        duration: duration * 0.6,
        ease: eases.silk,
        delay: delay + i * staggerChildren,
        // Property-specific transitions
        opacity: { 
          duration: duration * 0.4, 
          ease: eases.silk,
          delay: delay + (i * staggerChildren * 0.9) // Slightly quicker opacity transition
        },
        filter: { 
          duration: duration * 0.3, 
          ease: "linear" 
        },
        scale: {
          duration: duration * 0.7,
          ease: eases.silk,
          delay: delay + (i * staggerChildren)
        }
      },
    }),
  };

  // Enhanced fade animation with more subtle and professional motion
  const fadeVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.98,
      transformOrigin: "center",
      rotateX: -2, // Subtle depth effect
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      rotateX: 0,
      transition: {
        // Sophisticated orchestration of properties
        duration: duration * 1.2,
        delay,
        ease: eases.silk, // Better for fade animations
        
        // Property-specific transitions
        opacity: { 
          duration: duration * 0.9, 
          ease: eases.luxury,
          delay // Maintain delay
        },
        filter: { 
          duration: duration * 0.75, 
          ease: [0.4, 0, 0.2, 1] // Custom ease for blur
        },
        scale: { 
          duration: duration * 1.3, 
          ease: eases.textReveal 
        },
        rotateX: {
          duration: duration * 1.4,
          ease: eases.polished
        }
      },
    },
  };

  // Enhanced slide-up with sophisticated physics and micro movements
  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 25, // Reduced for smoother motion
      scale: 0.98, // Closer to 1 for subtler effect
      filter: "blur(3px)", // Reduced blur amount
      rotateX: 0, // Removed rotation for less jittery effect
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        // Overall timing
        type: "tween", // Changed to tween for consistent, smooth motion
        duration: duration * 0.7,
        ease: eases.silk,
        delay,
        
        // Property-specific transitions
        opacity: { 
          duration: duration * 0.5, 
          ease: eases.silk,
          delay: delay + (duration * 0.05) // Slightly delayed for better sequencing
        },
        y: { 
          duration: duration * 0.7,
          ease: eases.premium
        },
        scale: { 
          duration: duration * 0.7, 
          ease: eases.silk 
        },
        filter: { 
          duration: duration * 0.4, 
          ease: "linear" 
        }
      },
    },
  };

  // Enhanced slide-down with sophisticated physics and micro movements
  const slideDownVariants = {
    hidden: { 
      opacity: 0, 
      y: -25, // Reduced for smoother motion
      scale: 0.98, // Closer to 1 for subtler effect
      filter: "blur(3px)", // Reduced blur amount
      rotateX: 0, // Removed rotation for less jittery effect
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        // Overall timing
        type: "tween", // Changed to tween for consistent, smooth motion
        duration: duration * 0.7,
        ease: eases.silk,
        delay,
        
        // Property-specific transitions
        opacity: { 
          duration: duration * 0.5, 
          ease: eases.silk,
          delay: delay + (duration * 0.05) // Slightly delayed for better sequencing
        },
        y: { 
          duration: duration * 0.7,
          ease: eases.premium
        },
        scale: { 
          duration: duration * 0.7, 
          ease: eases.silk 
        },
        filter: { 
          duration: duration * 0.4, 
          ease: "linear" 
        }
      },
    },
  };

  // Enhanced highlight animation with premium motion design techniques
  const highlightVariants = {
    hidden: { 
      backgroundSize: '0% 100%',
      backgroundPosition: 'left',
      opacity: 0.85,
      filter: "contrast(0.98) brightness(0.98)",
      y: 3, // Subtle shift for depth
      scale: 0.995, // Micro-scaling
    },
    visible: {
      backgroundSize: '100% 100%',
      backgroundPosition: 'left',
      opacity: 1,
      filter: "contrast(1) brightness(1)",
      y: 0,
      scale: 1,
      transition: {
        // Overall timing
        duration: duration * 1.8,
        delay,
        
        // Property-specific transitions
        backgroundSize: {
          duration: duration * 2,
          delay: delay + (duration * 0.1), // Slight delay for better sequencing
          ease: eases.textReveal, // Better for text highlights
        },
        opacity: {
          duration: duration * 0.8,
          ease: eases.premium,
          delay // Maintain delay
        },
        filter: {
          duration: duration * 1.6,
          ease: eases.silk
        },
        scale: {
          duration: duration * 1.4,
          ease: eases.polished
        },
        y: {
          duration: duration * 1.2,
          ease: eases.luxury
        }
      },
    },
  };
  
  // Enhanced styling for highlight variant
  const getHighlightStyle = () => {
    if (animation !== 'highlight') return {};
    
    return {
      backgroundPosition: 'left bottom',
      backgroundSize: isInView ? '100% 40%' : '0% 40%',
      // Additional styles for a more polished highlight effect
      transition: `filter ${duration * 0.6}s ${eases.luxury}, 
                  transform ${duration * 0.8}s ${eases.polished}`,
      display: 'inline-block',
      padding: '0 0.1em',
      margin: '0 -0.1em'
    };
  };

  // Get appropriate variants based on animation type
  const getVariants = () => {
    switch (animation) {
      case 'words':
      case 'chars':
        return containerVariants;
      case 'fade':
        return fadeVariants;
      case 'slide-up':
        return slideUpVariants;
      case 'slide-down':
        return slideDownVariants;
      case 'highlight':
        return highlightVariants;
      default:
        return fadeVariants;
    }
  };

  // Process text content if it's a string
  const processContent = () => {
    if (typeof children === 'string' && (animation === 'words' || animation === 'chars')) {
      return splitText(children);
    }
    return children;
  };

  const Component = motion[as] as any;

  return (
    <Component
      ref={textRef}
      className={`${className} ${animation === 'highlight' ? 
        `bg-gradient-to-r from-[${highlightColor}] to-[${highlightColor}] bg-no-repeat` : ''}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants()}
      style={getHighlightStyle()}
    >
      {processContent()}
    </Component>
  );
};

export default ScrollTriggerText;
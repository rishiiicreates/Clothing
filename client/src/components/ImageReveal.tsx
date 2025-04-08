import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  duration?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  threshold?: number;
  delay?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  width = '100%',
  height = '100%',
  className = '',
  duration = 1.2,
  direction = 'left',
  threshold = 0.2,
  delay = 0,
  style = {},
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: threshold });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  // Enhanced spring-based animation for professional parallax effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65, // Reduced stiffness for smoother motion
    damping: 42,   // Increased damping for more controlled movement
    restDelta: 0.0001, // Higher precision for smoother transitions
    mass: 1.2      // Heavier mass for more natural momentum and less jitter
  });
  
  // Multi-step transforms for more nuanced parallax effects - reduced scale values for smoother effect
  const imageScale = useTransform(
    smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [1, 1.01, 1.02, 1.03, 1.04] // Smaller scale changes for more subtle, professional effect
  );
  
  // More gradual opacity transitions
  const imageOpacity = useTransform(
    smoothProgress, 
    [0, 0.1, 0.2], 
    [0.75, 0.9, 1]
  );
  
  // Enhanced image filters for professional quality
  const imageFilter = useTransform(
    smoothProgress, 
    [0, 0.25, 0.5, 1], 
    [
      "brightness(0.92) contrast(1.05) saturate(0.98)",
      "brightness(0.96) contrast(1.03) saturate(1)",
      "brightness(0.98) contrast(1.02) saturate(1.02)",
      "brightness(1) contrast(1) saturate(1.04)"
    ]
  );
  
  // Premium cubic-bezier curves for cinematic animations
  const eases = {
    // Cinema-grade smooth reveal with precision timing
    reveal: [0.25, 0.8, 0.25, 1],
    
    // Professional motion curve for subtle image movement
    motion: [0.25, 0.1, 0.25, 1],
    
    // Refined springy transition with reduced overshoot
    spring: [0.34, 1.35, 0.64, 1],
    
    // Ultra-refined subtle ease for premium feel
    refined: [0.6, 0.05, 0.1, 0.95],
    
    // New cinematic ease for dramatic reveals
    cinematic: [0.33, 0.9, 0.25, 0.99]
  };
  
  // Determine the initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: '-102%', y: 0 };
      case 'right':
        return { x: '102%', y: 0 };
      case 'top':
        return { x: 0, y: '-102%' };
      case 'bottom':
        return { x: 0, y: '102%' };
      default:
        return { x: '-102%', y: 0 };
    }
  };
  
  // More nuanced and precise clip path animations based on direction
  const getClipPath = () => {
    switch (direction) {
      case 'left':
        return {
          hidden: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        };
      case 'right':
        return {
          hidden: { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
          visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        };
      case 'top':
        return {
          hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
          visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        };
      case 'bottom':
        return {
          hidden: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        };
      default:
        return {
          hidden: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        };
    }
  };
  
  // If there are children, we're wrapping content
  if (children) {
    return (
      <div
        ref={containerRef}
        className={`${className}`}
        style={{ width, ...style }}
      >
        {/* Container for the whole component */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={isInView 
            ? { opacity: 1, y: 0, filter: "blur(0px)" } 
            : { opacity: 0, y: 20, filter: "blur(5px)" }
          }
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay,
            opacity: { duration: duration * 0.7, ease: eases.refined },
            filter: { duration: duration * 0.5 }
          }}
          className="w-full"
        >
          {/* Grid layout for image and content */}
          {children}
        </motion.div>
      </div>
    );
  }
  
  // Default image reveal with enhanced animations
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      {/* Image container with clipping animation */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={getClipPath()}
        transition={{
          duration: duration * 1.1,
          delay,
          ease: eases.cinematic, // Use the new cinematic ease for more dramatic reveals
          opacity: { duration: duration * 0.8 }
        }}
        className="w-full h-full relative"
      >
        {/* The actual image with parallax effect */}
        <motion.div
          ref={imageRef}
          className="w-full h-full absolute inset-0"
          style={{ 
            opacity: imageOpacity,
            filter: imageFilter,
            transform: `scale(${imageScale.get()})`,
            ...getInitialPosition()
          }}
          animate={isInView ? { 
            x: 0, 
            y: 0,
            scale: 1.02, // Slight scale up for more depth
            transition: {
              type: "tween", // Changed to tween for smoother movement
              duration: duration * 1.2,
              ease: eases.refined,
              delay: delay + 0.08
            }
          } : getInitialPosition()}
          transition={{
            duration: duration * 1.3,
            delay: delay + 0.08,
            ease: eases.motion
          }}
        >
          {/* Enhanced shimmering effect with dual overlays for professional look */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 mix-blend-overlay"
            initial={{ opacity: 0, left: '-100%' }}
            animate={isInView ? 
              { opacity: [0, 0.18, 0], left: ['100%', '200%', '300%'] } 
              : { opacity: 0 }
            }
            transition={{ 
              delay: delay + duration * 0.4, 
              duration: duration * 1.8,
              times: [0, 0.5, 1],
              ease: [0.2, 0.6, 0.4, 0.9] // Custom ease for shine
            }}
          />
          
          {/* Secondary subtle light sweep for premium feel */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-0 mix-blend-overlay"
            initial={{ opacity: 0, top: '100%' }}
            animate={isInView ? 
              { opacity: [0, 0.08, 0], top: ['0%', '-50%', '-100%'] } 
              : { opacity: 0 }
            }
            transition={{ 
              delay: delay + duration * 0.7, 
              duration: duration * 2.5,
              times: [0, 0.5, 1],
              ease: 'easeOut'
            }}
          />
          
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ImageReveal;
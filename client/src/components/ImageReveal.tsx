import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  duration = 0.8,
  direction = 'left',
  threshold = 0.2,
  delay = 0,
  style = {},
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: threshold });
  
  // Professional easing functions
  const eases = {
    standard: [0.33, 1, 0.68, 1],
    gentle: [0.4, 0, 0.2, 1]
  };
  
  // Get initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: '-100%', y: 0 };
      case 'right':
        return { x: '100%', y: 0 };
      case 'top':
        return { x: 0, y: '-100%' };
      case 'bottom':
        return { x: 0, y: '100%' };
      default:
        return { x: '-100%', y: 0 };
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: 10 }
          }
          transition={{ 
            type: "tween",
            duration: 0.5,
            ease: eases.gentle,
            delay
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    );
  }
  
  // Clean and simple image reveal
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay,
          ease: eases.gentle
        }}
      >
        <motion.div
          className="w-full h-full absolute inset-0"
          initial={getInitialPosition()}
          animate={{ 
            x: 0, 
            y: 0
          }}
          transition={{
            duration: duration,
            delay: delay,
            ease: eases.standard
          }}
        >
          {/* Simple shine effect */}
          {isInView && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 mix-blend-overlay"
              initial={{ left: '-100%', opacity: 0 }}
              animate={{ left: '100%', opacity: [0, 0.15, 0] }}
              transition={{ 
                duration: 1.2,
                delay: delay + 0.3,
                ease: 'easeOut',
                times: [0, 0.5, 1]
              }}
            />
          )}
          
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
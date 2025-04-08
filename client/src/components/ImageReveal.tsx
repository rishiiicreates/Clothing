import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
  
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  
  // Determine the initial position based on direction
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
  
  // Styles for the reveal animation
  const clipPathAnimation = {
    hidden: {
      clipPath: 
        direction === 'left' || direction === 'right'
          ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    },
    visible: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay }}
          className="w-full"
        >
          {/* Grid layout for image and content */}
          {children}
        </motion.div>
      </div>
    );
  }
  
  // Default image reveal
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
        variants={clipPathAnimation}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
        className="w-full h-full relative"
      >
        {/* The actual image with parallax effect */}
        <motion.div
          ref={imageRef}
          className="w-full h-full absolute inset-0"
          style={{ 
            scale: imageScale,
            ...getInitialPosition()
          }}
          animate={isInView ? { x: 0, y: 0 } : getInitialPosition()}
          transition={{
            duration: duration * 1.5,
            delay: delay + 0.1,
            ease: "easeOut",
          }}
        >
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
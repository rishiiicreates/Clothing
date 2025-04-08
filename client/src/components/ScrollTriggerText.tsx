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
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: duration * 1.2,
        delay: delay + i * staggerChildren,
        ease: [0.215, 0.61, 0.355, 1], // Improved cubic-bezier for smoother motion
      },
    }),
  };

  const charVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -20,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: duration * 0.9,
        delay: delay + i * staggerChildren,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like effect with slight overshoot
      },
    }),
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: duration * 1.1,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth fade in
      },
    },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: { duration: duration * 0.8, ease: [0.25, 0.1, 0.25, 1] },
        y: { duration: duration, ease: [0.165, 0.84, 0.44, 1] }, // Optimized ease-out-cubic
        scale: { duration: duration * 1.2, ease: [0.165, 0.84, 0.44, 1] },
        delay,
      },
    },
  };

  const slideDownVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: { duration: duration * 0.8, ease: [0.25, 0.1, 0.25, 1] },
        y: { duration: duration, ease: [0.165, 0.84, 0.44, 1] },
        scale: { duration: duration * 1.2, ease: [0.165, 0.84, 0.44, 1] },
        delay,
      },
    },
  };

  const highlightVariants = {
    hidden: { 
      backgroundSize: '0% 100%',
      backgroundPosition: 'left'
    },
    visible: {
      backgroundSize: '100% 100%',
      transition: {
        duration: duration * 1.8,
        delay,
        ease: [0.25, 0.8, 0.25, 1], // Smooth acceleration and deceleration
      },
    },
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
      style={animation === 'highlight' ? {
        backgroundPosition: 'left bottom',
        backgroundSize: isInView ? '100% 40%' : '0% 40%',
      } : {}}
    >
      {processContent()}
    </Component>
  );
};

export default ScrollTriggerText;
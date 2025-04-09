import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Limited animation types for better quality
type AnimationType = 'fade' | 'slide-up' | 'words' | 'chars';

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
}

const ScrollTriggerText: React.FC<TextProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.02,
  threshold = 0.3,
  once = true,
  as = 'div'
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

  // Container variant for staggered animations
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

  // Professional easing functions
  const eases = {
    standard: [0.33, 1, 0.68, 1], // Standard ease-out
    gentle: [0.4, 0, 0.2, 1] // Gentle ease for content
  };

  // Simple, clean word animation
  const wordVariants = {
    hidden: {
      y: 12,
      opacity: 0
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: eases.gentle,
        delay: delay + (i * staggerChildren)
      }
    })
  };

  // Simple, clean character animation
  const charVariants = {
    hidden: {
      y: 8,
      opacity: 0
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "tween", 
        duration: 0.3,
        ease: eases.gentle,
        delay: delay + (i * staggerChildren)
      }
    })
  };

  // Clean fade animation
  const fadeVariants = {
    hidden: { 
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay,
        ease: eases.gentle
      }
    }
  };

  // Clean slide-up animation
  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: duration,
        ease: eases.standard,
        delay
      }
    }
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
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants()}
    >
      {processContent()}
    </Component>
  );
};

export default ScrollTriggerText;
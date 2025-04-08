import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface MagneticProps {
  isActive: boolean;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [magneticProps, setMagneticProps] = useState<MagneticProps>({ 
    isActive: false, 
    x: 0, 
    y: 0 
  });
  
  const cursorControls = useAnimation();
  const ringControls = useAnimation();
  
  // Cursor variants for different states
  const cursorVariants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as "difference"
    },
    text: {
      height: 80,
      width: 80,
      backgroundColor: "#ff6b00",
      mixBlendMode: "normal" as "normal"
    },
    link: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid #ffffff",
      mixBlendMode: "difference" as "difference"
    },
    button: {
      height: 60,
      width: 60,
      backgroundColor: "#ff6b00",
      mixBlendMode: "normal" as "normal"
    },
    image: {
      height: 120,
      width: 120,
      backgroundColor: "rgba(255, 107, 0, 0.2)",
      mixBlendMode: "normal" as "normal"
    }
  };

  useEffect(() => {
    // Helper function to check if an element is magnetizable
    const isMagnetizable = (element: HTMLElement): boolean => {
      return element.hasAttribute('data-magnetic') || 
             element.closest('[data-magnetic]') !== null;
    };
    
    // Helper function to check element type and set cursor variant
    const determineCursorType = (element: HTMLElement) => {
      const tagName = element.tagName.toLowerCase();
      
      if (element.classList.contains('magnetic-large') || element.closest('.magnetic-large')) {
        setCursorVariant('image');
        setTextContent('View');
        return;
      }
      
      if (tagName === 'button' || element.closest('button') || 
          element.classList.contains('btn') || element.closest('.btn')) {
        setCursorVariant('button');
        setTextContent('Click');
        return;
      }
      
      if (tagName === 'a' || element.closest('a') || 
          window.getComputedStyle(element).cursor === 'pointer') {
        setCursorVariant('link');
        setTextContent('');
        return;
      }
      
      if (tagName === 'img' || element.closest('img') || 
          element.classList.contains('img-hover') || element.closest('.img-hover')) {
        setCursorVariant('image');
        setTextContent('View');
        return;
      }
      
      setCursorVariant('default');
      setTextContent('');
    };
    
    // Handle magnetic effect calculations
    const handleMagneticEffect = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center of element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate a factor based on element size
      const magnetFactor = Math.min(rect.width, rect.height) * 0.4;
      
      // Only apply effect if cursor is near the element
      const isNearElement = 
        Math.abs(distanceX) < rect.width * 0.8 && 
        Math.abs(distanceY) < rect.height * 0.8;
        
      if (isNearElement) {
        // Set magnetic effect properties
        setMagneticProps({
          isActive: true,
          x: distanceX * 0.3, // Scale down the effect
          y: distanceY * 0.3
        });
      } else {
        setMagneticProps({ isActive: false, x: 0, y: 0 });
      }
    };
    
    const updatePosition = (e: MouseEvent) => {
      // Basic cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check the element type under cursor
      const target = e.target as HTMLElement;
      determineCursorType(target);
      
      // Check for magnetic elements
      if (isMagnetizable(target)) {
        const magneticElement = target.hasAttribute('data-magnetic') 
          ? target 
          : target.closest('[data-magnetic]') as HTMLElement;
          
        handleMagneticEffect(e, magneticElement);
      } else {
        setMagneticProps({ isActive: false, x: 0, y: 0 });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Sync cursor animations with changes in state
    cursorControls.start({
      opacity: isVisible ? 1 : 0,
      scale: isClicking ? 0.8 : 1,
      x: position.x - (cursorVariant === 'default' ? 8 : cursorVariant === 'text' ? 40 : 30) + 
         (magneticProps.isActive ? magneticProps.x : 0),
      y: position.y - (cursorVariant === 'default' ? 8 : cursorVariant === 'text' ? 40 : 30) + 
         (magneticProps.isActive ? magneticProps.y : 0),
      height: cursorVariants[cursorVariant as keyof typeof cursorVariants].height,
      width: cursorVariants[cursorVariant as keyof typeof cursorVariants].width,
      backgroundColor: cursorVariants[cursorVariant as keyof typeof cursorVariants].backgroundColor,
      mixBlendMode: cursorVariants[cursorVariant as keyof typeof cursorVariants].mixBlendMode,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 250,
        mass: 0.15
      }
    });
    
    // Animate the outer ring with slight delay for trailing effect
    ringControls.start({
      opacity: isVisible ? 0.4 : 0,
      scale: isClicking ? 0.9 : 1.1,
      x: position.x - (cursorVariant === 'default' ? 22 : 50) + 
         (magneticProps.isActive ? magneticProps.x * 0.8 : 0),
      y: position.y - (cursorVariant === 'default' ? 22 : 50) + 
         (magneticProps.isActive ? magneticProps.y * 0.8 : 0),
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 0.2,
        delay: 0.01
      }
    });
  }, [position, isVisible, isClicking, cursorVariant, magneticProps, cursorControls, ringControls]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        animate={cursorControls}
        initial={{ opacity: 0 }}
      >
        {/* Text content for certain cursor states */}
        {textContent && cursorVariant !== 'default' && (
          <span className="text-white text-xs font-medium select-none">
            {textContent}
          </span>
        )}
      </motion.div>
      
      {/* Outer ring effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-white/20"
        style={{
          height: cursorVariant === 'default' ? 44 : 100,
          width: cursorVariant === 'default' ? 44 : 100
        }}
        animate={ringControls}
        initial={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
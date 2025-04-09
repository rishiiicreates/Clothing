import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
  
  // Simplified cursor variants with smaller sizes
  const cursorVariants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as "difference"
    },
    link: {
      height: 40,
      width: 40,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference" as "difference"
    },
    button: {
      height: 40,
      width: 40,
      backgroundColor: "#ff6b00",
      mixBlendMode: "normal" as "normal"
    },
    image: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 107, 0, 0.15)",
      mixBlendMode: "normal" as "normal"
    }
  };

  useEffect(() => {
    // Helper function to check if element is interactive
    const isMagnetizable = (element: HTMLElement): boolean => {
      if (!element) return false;
      
      return element.hasAttribute('data-magnetic') || 
             element.classList.contains('magnetic-button') ||
             element.closest('[data-magnetic]') !== null ||
             element.closest('.magnetic-button') !== null;
    };
    
    // Helper function to check element type and set cursor variant
    const determineCursorType = (element: HTMLElement) => {
      if (!element) return;
      
      const tagName = element.tagName.toLowerCase();
      const elementOrParent = (selector: string) => 
        element.matches(selector) || !!element.closest(selector);
      
      // Check for buttons
      if (tagName === 'button' ||
          elementOrParent('button') || 
          elementOrParent('.btn') ||
          elementOrParent('[type="submit"]') ||
          elementOrParent('[type="button"]')) {
        setCursorVariant('button');
        setTextContent('');
        return;
      }
      
      // Check for links
      if (tagName === 'a' || 
          elementOrParent('a') || 
          window.getComputedStyle(element).cursor === 'pointer') {
        setCursorVariant('link');
        setTextContent('');
        return;
      }
      
      // Check for images
      if (tagName === 'img' || 
          elementOrParent('img') || 
          elementOrParent('video')) {
        setCursorVariant('image');
        setTextContent('');
        return;
      }
      
      // Default cursor
      setCursorVariant('default');
      setTextContent('');
    };
    
    // Simplified magnetic effect
    const handleMagneticEffect = (e: MouseEvent, element: HTMLElement) => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center of element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Reduced strength for subtler effect
      const magnetStrength = 0.15;
      
      // Calculate magnetic pull with reduced strength
      const newX = distanceX * magnetStrength;
      const newY = distanceY * magnetStrength;
      
      setMagneticProps({
        isActive: true,
        x: newX,
        y: newY
      });
    };
    
    // Debounced position update for smoother movement
    let lastUpdateTime = 0;
    const updatePosition = (e: MouseEvent) => {
      // Throttle updates for performance
      const now = Date.now();
      if (now - lastUpdateTime < 16) return; // ~60fps
      lastUpdateTime = now;
      
      // Basic cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check the element type under cursor
      const target = e.target as HTMLElement;
      determineCursorType(target);
      
      // Check for magnetic elements
      if (isMagnetizable(target)) {
        const magneticElement = target.hasAttribute('data-magnetic')
          ? target 
          : (target.closest('[data-magnetic]') || target.closest('.magnetic-button')) as HTMLElement;
          
        handleMagneticEffect(e, magneticElement);
      } else if (magneticProps.isActive) {
        // Reset when moving away from magnetic elements
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Get dimensions based on cursor variant
    const getDimensions = () => {
      const dims = cursorVariants[cursorVariant as keyof typeof cursorVariants];
      const size = dims.height;
      const halfSize = size / 2;
      
      return {
        halfSize,
        bgColor: dims.backgroundColor,
        blendMode: dims.mixBlendMode
      };
    };
    
    const { halfSize, bgColor, blendMode } = getDimensions();
    
    // Smoother cursor animation
    cursorControls.start({
      opacity: isVisible ? 1 : 0,
      scale: isClicking ? 0.9 : 1,
      x: position.x - halfSize + (magneticProps.isActive ? magneticProps.x : 0),
      y: position.y - halfSize + (magneticProps.isActive ? magneticProps.y : 0),
      height: cursorVariants[cursorVariant as keyof typeof cursorVariants].height,
      width: cursorVariants[cursorVariant as keyof typeof cursorVariants].width,
      backgroundColor: bgColor,
      mixBlendMode: blendMode,
      transition: {
        // Smoother transitions with tweened motion
        x: { type: "tween", duration: 0.1 },
        y: { type: "tween", duration: 0.1 },
        scale: { type: "tween", duration: 0.15 },
        opacity: { duration: 0.2 }
      }
    });
    
    // Simpler ring effect
    const ringSize = cursorVariant === 'default' ? 30 : 60;
    
    ringControls.start({
      opacity: isVisible ? (isClicking ? 0.2 : 0.3) : 0,
      scale: isClicking ? 0.9 : 1,
      x: position.x - ringSize/2 + (magneticProps.isActive ? magneticProps.x * 0.5 : 0),
      y: position.y - ringSize/2 + (magneticProps.isActive ? magneticProps.y * 0.5 : 0),
      transition: {
        x: { type: "tween", duration: 0.15 },
        y: { type: "tween", duration: 0.15 },
        opacity: { duration: 0.3 }
      }
    });
  }, [position, isVisible, isClicking, cursorVariant, magneticProps, cursorControls, ringControls]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        animate={cursorControls}
        initial={{ opacity: 0 }}
      />
      
      {/* Outer ring effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-white/20"
        style={{
          height: cursorVariant === 'default' ? 30 : 60,
          width: cursorVariant === 'default' ? 30 : 60
        }}
        animate={ringControls}
        initial={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
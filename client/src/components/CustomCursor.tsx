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
      if (!element) return false;
      
      return element.hasAttribute('data-magnetic') || 
             element.hasAttribute('data-hover') ||
             element.classList.contains('magnetic-button') ||
             element.closest('[data-magnetic]') !== null ||
             element.closest('[data-hover]') !== null ||
             element.closest('.magnetic-button') !== null;
    };
    
    // Helper function to check element type and set cursor variant
    const determineCursorType = (element: HTMLElement) => {
      if (!element) return;
      
      const tagName = element.tagName.toLowerCase();
      const elementOrParent = (selector: string) => 
        element.matches(selector) || !!element.closest(selector);
      
      // Check for large interactive elements
      if (elementOrParent('.magnetic-large')) {
        setCursorVariant('image');
        setTextContent('View');
        return;
      }
      
      // Check for buttons and magnetic elements
      if (tagName === 'button' ||
          elementOrParent('button') || 
          elementOrParent('.btn') ||
          elementOrParent('[type="submit"]') ||
          elementOrParent('[type="button"]') ||
          isMagnetizable(element)) {
        setCursorVariant('button');
        setTextContent('Click');
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
      
      // Check for images and media
      if (tagName === 'img' || 
          elementOrParent('img') || 
          elementOrParent('.img-hover') ||
          elementOrParent('video') ||
          element.dataset.cursorType === 'image') {
        setCursorVariant('image');
        setTextContent('View');
        return;
      }
      
      // Default cursor
      setCursorVariant('default');
      setTextContent('');
    };
    
    // Handle magnetic effect calculations with performance optimizations
    const handleMagneticEffect = (e: MouseEvent, element: HTMLElement) => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center of element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Adaptive sensitivity based on element size 
      const elementSize = Math.min(rect.width, rect.height);
      const magnetStrength = elementSize < 50 ? 0.3 : 0.25; // Stronger effect for smaller elements
      
      // Only apply effect if cursor is near the element
      const proximityThreshold = Math.max(rect.width, rect.height) * 0.5;
      const distance = Math.sqrt(distanceX**2 + distanceY**2);
      const isNearElement = distance < proximityThreshold;
        
      if (isNearElement) {
        // Calculate magnetic pull with adaptive strength
        const pullFactor = 1 - Math.min(1, distance / proximityThreshold);
        const newX = distanceX * magnetStrength * pullFactor;
        const newY = distanceY * magnetStrength * pullFactor;
        
        // Threshold for updates to reduce rerenders (1px change minimum)
        const shouldUpdate = 
          Math.abs(newX - magneticProps.x) > 1 || 
          Math.abs(newY - magneticProps.y) > 1 || 
          magneticProps.isActive === false;
          
        if (shouldUpdate) {
          setMagneticProps({
            isActive: true,
            x: newX,
            y: newY
          });
        }
      } else if (magneticProps.isActive) {
        // Reset when cursor moves away
        setMagneticProps({ isActive: false, x: 0, y: 0 });
      }
    };
    
    // Throttled position update for performance
    let lastUpdateTime = 0;
    const updatePosition = (e: MouseEvent) => {
      // Throttle updates to every 10ms for performance
      const now = Date.now();
      if (now - lastUpdateTime < 10) return;
      lastUpdateTime = now;
      
      // Basic cursor position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check the element type under cursor
      const target = e.target as HTMLElement;
      determineCursorType(target);
      
      // Check for magnetic elements
      if (isMagnetizable(target)) {
        const magneticElement = target.hasAttribute('data-magnetic') || target.hasAttribute('data-hover')
          ? target 
          : (target.closest('[data-magnetic]') || target.closest('[data-hover]') || target.closest('.magnetic-button')) as HTMLElement;
          
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
        size,
        halfSize,
        bgColor: dims.backgroundColor,
        blendMode: dims.mixBlendMode
      };
    };
    
    const { halfSize, bgColor, blendMode } = getDimensions();
    
    // Enhanced cursor animation with more fluid transitions
    cursorControls.start({
      opacity: isVisible ? 1 : 0,
      scale: isClicking ? 0.8 : 1,
      x: position.x - halfSize + (magneticProps.isActive ? magneticProps.x : 0),
      y: position.y - halfSize + (magneticProps.isActive ? magneticProps.y : 0),
      height: cursorVariants[cursorVariant as keyof typeof cursorVariants].height,
      width: cursorVariants[cursorVariant as keyof typeof cursorVariants].width,
      backgroundColor: bgColor,
      mixBlendMode: blendMode,
      transition: {
        // Use different types of animation for different properties
        x: { type: "spring", damping: 28, stiffness: 300, mass: 0.1 },
        y: { type: "spring", damping: 28, stiffness: 300, mass: 0.1 },
        scale: { type: "spring", damping: 25, stiffness: 300, mass: 0.5 },
        backgroundColor: { type: "tween", duration: 0.2 },
        height: { type: "spring", damping: 20, stiffness: 200 },
        width: { type: "spring", damping: 20, stiffness: 200 },
        opacity: { duration: 0.15 }
      }
    });
    
    // Outer ring follows with more delay for trailing effect
    const ringSize = cursorVariant === 'default' ? 44 : 100;
    
    ringControls.start({
      opacity: isVisible ? (isClicking ? 0.3 : 0.4) : 0,
      scale: isClicking ? 0.85 : 1.1,
      x: position.x - ringSize/2 + (magneticProps.isActive ? magneticProps.x * 0.7 : 0),
      y: position.y - ringSize/2 + (magneticProps.isActive ? magneticProps.y * 0.7 : 0),
      transition: {
        x: { type: "spring", damping: 12, stiffness: 150, mass: 0.3 },
        y: { type: "spring", damping: 12, stiffness: 150, mass: 0.3 },
        scale: { type: "spring", damping: 15, stiffness: 150, mass: 0.35 },
        opacity: { duration: 0.25 }
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
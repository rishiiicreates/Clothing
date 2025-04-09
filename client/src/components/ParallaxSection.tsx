import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxLayer = ({ 
  children, 
  speed = 0.05, // Reduced speed for subtler effect
  className = '',
  direction = 'up' 
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Convert scroll progress to smooth spring motion
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 1
  });
  
  // Calculate transform with reduced values
  let transform;
  const factor = speed * 50; // Reduced multiplier for subtler movement
  
  switch (direction) {
    case 'up':
      transform = useTransform(smoothScrollProgress, [0, 1], ['0%', `${-factor}%`]);
      break;
    case 'down':
      transform = useTransform(smoothScrollProgress, [0, 1], ['0%', `${factor}%`]);
      break;
    case 'left':
      transform = useTransform(smoothScrollProgress, [0, 1], ['0%', `${-factor}%`]);
      break;
    case 'right':
      transform = useTransform(smoothScrollProgress, [0, 1], ['0%', `${factor}%`]);
      break;
    default:
      transform = useTransform(smoothScrollProgress, [0, 1], ['0%', `${-factor}%`]);
  }
  
  const translateProperty = direction === 'up' || direction === 'down' ? 'translateY' : 'translateX';
  
  return (
    <motion.div
      ref={ref}
      style={{ [translateProperty]: transform }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export const ParallaxImage = ({
  src,
  alt,
  speed = 0.07, // Reduced speed for subtler movement
  className = '',
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.6)', // RGBA for better transparency
  overlayOpacity = 0.2 // Reduced opacity
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth spring animation for scroll
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 30, // Lower stiffness for smoother motion
    damping: 30,
    mass: 1.5 // Heavier mass for more inertia
  });
  
  // Reduced transform values for subtler effect
  const [transformAmount, setTransformAmount] = useState('8%');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1280) {
        setTransformAmount('8%');
      } else if (width > 768) {
        setTransformAmount('6%');
      } else {
        setTransformAmount('4%');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const y = useTransform(
    smoothScrollProgress, 
    [0, 1], 
    [`${-parseFloat(transformAmount) * speed}`, `${parseFloat(transformAmount) * speed}`]
  );
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
    >
      <motion.div 
        style={{ 
          y,
          height: `calc(100% + ${transformAmount})`, 
          width: '100%', 
          position: 'absolute', 
          top: `-${parseFloat(transformAmount) / 2}%` 
        }}
        className="will-change-transform"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        
        {overlay && (
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: overlayColor,
              opacity: overlayOpacity
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

// New hover effect component for page transitions
export const HoverParallax = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (0 to 1)
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply smaller effect multiplier
      setPosition({ 
        x: distanceX * 5, 
        y: distanceY * 5 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: -position.y * 0.5, // Subtle 3D effect
        rotateY: position.x * 0.5,  // Subtle 3D effect
      }}
      transition={{
        type: "tween",
        ease: [0.17, 0.67, 0.83, 0.67], // Smooth ease
        duration: 0.5 // Slow enough for smooth response
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  bgImageSpeed?: number;
}

export const ParallaxSection = ({
  children,
  className = '',
  bgImage,
  overlayColor = 'rgba(0,0,0,0.8)', // RGBA format
  overlayOpacity = 0.2, // Reduced opacity
  bgImageSpeed = 0.07 // Reduced speed
}: ParallaxSectionProps) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <ParallaxImage 
          src={bgImage}
          alt="Background"
          speed={bgImageSpeed}
          className="absolute inset-0 w-full h-full"
          overlay={true}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
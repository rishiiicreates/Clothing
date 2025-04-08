import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxLayer = ({ 
  children, 
  speed = 0.2, 
  className = '',
  direction = 'up' 
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  let transform;
  switch (direction) {
    case 'up':
      transform = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);
      break;
    case 'down':
      transform = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      break;
    case 'left':
      transform = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);
      break;
    case 'right':
      transform = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      break;
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
  priority?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export const ParallaxImage = ({
  src,
  alt,
  speed = 0.2,
  className = '',
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.4
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform more extreme when viewport is wider (desktop)
  const [transformAmount, setTransformAmount] = useState('15%');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1280) {
        setTransformAmount('20%');
      } else if (width > 768) {
        setTransformAmount('15%');
      } else {
        setTransformAmount('10%');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`${-parseFloat(transformAmount) * speed}`, `${parseFloat(transformAmount) * speed}`]
  );
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
    >
      <motion.div 
        style={{ y, height: `calc(100% + ${transformAmount})`, width: '100%', position: 'absolute', top: `-${parseFloat(transformAmount) / 2}%` }}
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
  overlayColor = 'black',
  overlayOpacity = 0.4,
  bgImageSpeed = 0.2
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
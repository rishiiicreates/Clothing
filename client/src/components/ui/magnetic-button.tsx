import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary' | 'link';
  [key: string]: any;
}

export const MagneticButton = ({
  children,
  className = '',
  strength = 30,
  radius = 400,
  as = 'button',
  onClick = () => {}, // Provide a default empty function for onClick
  href,
  disabled = false,
  variant = 'default',
  ...props
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate strength based on button dimensions
  const getStrength = () => {
    if (!buttonRef.current) return strength;
    const { width, height } = buttonRef.current.getBoundingClientRect();
    const maxDimension = Math.max(width, height);
    return (strength * maxDimension) / 100; // Scale strength with button size
  };
  
  // Define different visual styles
  const getButtonStyles = () => {
    switch (variant) {
      case 'outline':
        return 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50';
      case 'ghost':
        return 'bg-transparent text-black hover:bg-black/5';
      case 'primary':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'secondary':
        return 'bg-black text-white hover:bg-gray-900';
      case 'link':
        return 'bg-transparent text-orange-500 hover:underline p-0';
      default:
        return 'bg-white text-black shadow-md hover:shadow-lg';
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || disabled) return;

      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Only apply the magnetic effect if cursor is within radius
      if (distance < radius) {
        const adjustedStrength = getStrength() * (1 - distance / radius);
        setPosition({
          x: (distanceX / 4) * adjustedStrength / 100,
          y: (distanceY / 4) * adjustedStrength / 100,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disabled, radius]);

  const Component = as === 'a' ? motion.a : motion.button;
  
  return (
    <div 
      className="relative inline-block overflow-visible"
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-magnetic
    >
      <Component
        href={as === 'a' ? href : undefined}
        onClick={disabled ? undefined : onClick}
        disabled={as === 'button' ? disabled : undefined}
        className={`relative ${getButtonStyles()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
          transition-shadow duration-200 px-6 py-3 rounded-full font-medium ${className}`}
        animate={{
          x: disabled ? 0 : position.x,
          y: disabled ? 0 : position.y,
          scale: isHovered && !disabled ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        {...props}
      >
        {children}
      </Component>
      
      {/* Subtle glow effect on hover */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-full blur-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: variant === 'primary' ? 0.4 : 0.15,
            scale: 1.1,
            x: position.x * 1.2,
            y: position.y * 1.2
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            backgroundColor: variant === 'primary' ? 'rgb(249 115 22)' : 
                             variant === 'secondary' ? 'rgb(0 0 0)' : 
                             'rgb(249 115 22 / 0.3)'
          }}
        />
      )}
    </div>
  );
};

export default MagneticButton;
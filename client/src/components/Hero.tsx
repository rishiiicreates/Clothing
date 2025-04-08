import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./Hero.css";
import { MagneticButton } from "./ui/magnetic-button";
import ScrollTriggerText from "./ScrollTriggerText";
import ImageReveal from "./ImageReveal";
import { ParallaxLayer } from "./ParallaxSection";
import fashionModel from "../assets/images/fashion-model.jpeg";
import fashionModel2 from "../assets/images/fashion-model2.jpeg";
import { useParallax } from "../hooks/useParallax";

const Hero = () => {
  const [activeColor, setActiveColor] = useState<'white' | 'gray' | 'orange'>('orange');
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: parallaxRef } = useParallax({ speed: 0.05 });
  
  useEffect(() => {
    // Animate elements once component is mounted
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reference for scroll-based animations
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects based on scroll
  const counterY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  return (
    <section className="hero" ref={containerRef}>
      <div className="hero-left">
        <motion.div 
          className="hero-counter"
          style={{ y: counterY }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          02
        </motion.div>
        
        <div className="hero-img-container">
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
            animate={{ 
              clipPath: isLoaded ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.img
              src={fashionModel}
              alt="Fashion model"
              className="hero-img"
              style={{ scale: imgScale }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              data-magnetic="true"
            />
          </motion.div>
          
          <motion.div 
            className="hero-plus"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 1,
              type: "spring",
              stiffness: 300
            }}
          >
            +
          </motion.div>
          
          <motion.div 
            className="hero-price"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            $299
          </motion.div>
        </div>
        
        <motion.div 
          className="color-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <motion.span 
            className={`dot white ${activeColor === 'white' ? 'active' : ''}`}
            onClick={() => setActiveColor('white')}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.span 
            className={`dot gray ${activeColor === 'gray' ? 'active' : ''}`}
            onClick={() => setActiveColor('gray')}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.span 
            className={`dot orange ${activeColor === 'orange' ? 'active' : ''}`}
            onClick={() => setActiveColor('orange')}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>
      </div>

      <div className="hero-right">
        <motion.nav 
          className="hero-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ul>
            {['Home', 'Collection', 'Clothes', 'About'].map((item, index) => (
              <motion.li 
                key={item}
                className={index === 1 ? 'active' : ''}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item}
                {index === 1 && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                    layoutId="navUnderline"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
          <div className="nav-icons">
            <motion.span 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              🔍
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ☰
            </motion.span>
          </div>
        </motion.nav>

        <motion.div 
          className="hero-content"
          style={{ y: contentY }}
          ref={parallaxRef}
        >
          <ScrollTriggerText 
            animation="chars" 
            as="h1"
            className="mb-4"
            delay={0.5}
            staggerChildren={0.02}
          >
            BEST MADE CO. 
          </ScrollTriggerText>
          
          <ScrollTriggerText 
            animation="words" 
            as="h1"
            className="mb-8"
            delay={1.0}
            staggerChildren={0.08}
          >
            Premium Fashion
          </ScrollTriggerText>
          
          <ScrollTriggerText 
            animation="fade" 
            as="p"
            className="mb-8"
            delay={1.5}
          >
            Discover our unique collection featuring artistic designs and premium materials. 
            Hand-crafted pieces made with attention to detail.
          </ScrollTriggerText>
          
          <MagneticButton
            variant="primary"
            className="explore-btn"
          >
            Explore Collection
          </MagneticButton>
        </motion.div>

        <motion.div 
          className="bottom-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <motion.div
            whileHover={{ y: -5, x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <span>01</span>
            <p>Handcrafted</p>
            <small>Every piece is meticulously handcrafted by skilled artisans.</small>
          </motion.div>
          
          <motion.div 
            className="active-card"
            whileHover={{ y: -5, x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <span>02</span>
            <p>Limited Edition</p>
            <small>Exclusive designs with limited production runs.</small>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full bg-orange-100 blur-3xl opacity-60"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[25%] left-[10%] w-40 h-40 rounded-full bg-orange-200 blur-3xl opacity-40"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
};

export default Hero;

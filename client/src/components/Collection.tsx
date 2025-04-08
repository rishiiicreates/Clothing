import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { products } from '@/lib/data';
import { MagneticButton } from './ui/magnetic-button';
import { ParallaxLayer } from './ParallaxSection';
import ScrollTriggerText from './ScrollTriggerText';
import ImageReveal from './ImageReveal';
import fashionModel2 from '../assets/images/fashion-model2.jpeg';
import fashionModel3 from '../assets/images/fashion-model3.jpeg';

type FilterCategory = 'all' | 'women' | 'men' | 'accessories';

const Collection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  // Filter button variants
  const buttonVariants = {
    inactive: {
      backgroundColor: "white", 
      color: "#374151",
      scale: 1
    },
    active: {
      backgroundColor: "#f97316", 
      color: "white",
      scale: [1, 1.1, 1],
      transition: { 
        duration: 0.3,
        scale: {
          times: [0, 0.5, 1],
          duration: 0.5
        }
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.3)"
    },
    tap: {
      scale: 0.95
    }
  };

  // Product card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };
  
  // Staggered children animation
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  return (
    <section id="collection" className="py-16 px-4 md:px-8 bg-gray-50 overflow-hidden" ref={sectionRef}>
      {/* Background motion elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-100 blur-[100px] opacity-40"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-200 blur-[120px] opacity-30"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Section Header */}
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col items-center mb-16"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <ScrollTriggerText 
            animation="chars" 
            as="h2"
            className="text-3xl md:text-5xl uppercase font-bold mb-6 text-center"
            staggerChildren={0.03}
          >
            Featured Collection
          </ScrollTriggerText>
          
          <motion.div 
            className="w-20 h-1 bg-orange-500 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.div 
            className="max-w-2xl mx-auto space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-gray-800 text-lg">
              Explore our premium selection of fashion pieces designed with attention to detail and quality craftsmanship.
            </p>
          </motion.div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div 
          className="flex justify-center flex-wrap gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {['all', 'women', 'men', 'accessories'].map((category, index) => (
            <motion.button 
              key={category}
              variants={buttonVariants}
              initial="inactive"
              animate={activeFilter === category ? "active" : "inactive"}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setActiveFilter(category as FilterCategory)}
              className="px-6 py-2 rounded-full transition-all duration-300 uppercase text-sm tracking-wider font-medium"
              custom={index}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Featured Product 1 */}
          <motion.div 
            className="col-span-1 md:col-span-2 bg-white rounded-lg overflow-hidden shadow-lg magnetic-large"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
            whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="relative">
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.img 
                  src={fashionModel2} 
                  alt="Featured product" 
                  className="w-full h-96 object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <ParallaxLayer speed={0.2} direction="up" className="transform-gpu">
                  <h3 className="text-white text-2xl font-bold">Premium Collection</h3>
                  <p className="text-gray-200">2023 Edition</p>
                </ParallaxLayer>
              </motion.div>
              
              <motion.div 
                className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
              >
                New
              </motion.div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xl font-bold">Designer Dress</h4>
                  <p className="text-gray-600">Exclusive Design</p>
                </div>
                <motion.div 
                  className="text-orange-500 font-bold text-xl"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  $399
                </motion.div>
              </div>
              <MagneticButton
                variant="secondary"
                className="w-full"
              >
                Add to Cart
              </MagneticButton>
            </div>
          </motion.div>
          
          {/* Regular Product Cards */}
          {filteredProducts.slice(0, 2).map((product, index) => (
            <motion.div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover-3d"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                  animate={{ 
                    scale: hoveredProduct === product.id ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                <motion.div 
                  className="absolute top-4 right-4 bg-white text-gray-800 px-2 py-1 rounded font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  ${product.price}
                </motion.div>
                
                {/* Overlay on hover */}
                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div 
                      className="absolute inset-0 bg-black/30 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-white text-black py-2 px-4 rounded-full font-medium"
                      >
                        Quick View
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-4">
                <motion.h3 
                  className="text-lg font-bold mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {product.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 text-sm mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {product.description}
                </motion.p>
                
                <MagneticButton 
                  variant="primary"
                  className="w-full py-2 uppercase tracking-wider text-sm font-medium"
                >
                  Shop Now
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Featured Item with Parallax */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <ImageReveal
                src={fashionModel3}
                alt="Secondary featured"
                threshold={0.2}
                direction="right"
              />
              <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 rounded-full font-medium">
                Limited Edition
              </div>
            </div>
            
            <div className="p-8 flex flex-col justify-center bg-white">
              <ScrollTriggerText 
                animation="words" 
                as="h3"
                className="text-3xl font-bold mb-4"
                delay={0.3}
              >
                Autumn Collection 2023
              </ScrollTriggerText>
              
              <ScrollTriggerText 
                animation="fade" 
                as="p"
                className="text-gray-600 mb-6"
                delay={0.5}
              >
                Discover our latest Autumn pieces with warm tones and sustainable materials. 
                Perfect for the cool season ahead.
              </ScrollTriggerText>
              
              <motion.div 
                className="flex space-x-3 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {['bg-amber-700', 'bg-stone-300', 'bg-gray-800'].map((color, i) => (
                  <motion.span 
                    key={i}
                    className={`inline-block w-6 h-6 rounded-full ${color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>
              
              <div className="flex justify-between items-center">
                <motion.div 
                  className="text-2xl font-bold text-orange-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  $199.99
                </motion.div>
                
                <MagneticButton
                  variant="secondary"
                  className="px-8 py-3"
                >
                  Shop Now
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <MagneticButton 
            variant="primary"
            className="px-10 py-3 rounded-full uppercase tracking-widest font-medium"
          >
            View All Products
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Collection;

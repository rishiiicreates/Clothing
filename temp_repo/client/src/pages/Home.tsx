import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
  // Reference to main content for scroll progress
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen bg-white relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main ref={mainRef}>
        <Hero />
        <Collection />
        <Lookbook />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      
      {/* Page transitions and interactive elements */}
      <div className="fixed inset-0 pointer-events-none z-[90]">
        {/* Corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-orange-500/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-orange-500/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
};

export default Home;

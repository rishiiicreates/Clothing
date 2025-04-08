import { motion } from 'framer-motion';
import { lookbookImages } from '@/lib/data';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Lookbook = () => {
  const fadeInRef = useScrollAnimation();

  return (
    <section id="lookbook" className="py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 z-0">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#B3FFEF] rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#FFD5E7] rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-hand text-center mb-4">
          <span className="sketch-underline">Lookbook</span>
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-12">
          A visual journey through our latest collection and artistic vision.
        </p>

        <motion.div 
          ref={fadeInRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in opacity-0 transform translate-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {lookbookImages.map((image) => (
            <motion.div 
              key={image.id}
              className="relative overflow-hidden aspect-square rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              data-hover="true"
            >
              <img 
                src={image.image} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              {/* Doodle frame overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M10,10 C15,5 30,5 40,10 C50,15 60,5 70,10 C80,15 90,5 95,10 L95,20 C90,15 80,25 70,20 C60,15 50,25 40,20 C30,15 20,25 10,20 L10,80 C20,75 30,85 40,80 C50,75 60,85 70,80 C80,75 90,85 95,80 L95,90 C85,95 75,85 65,90 C55,95 45,85 35,90 C25,95 15,85 10,90 L10,10 Z" 
                  fill="none" stroke="#FFF" strokeWidth="0.5" vectorEffect="non-scaling-stroke" 
                  className="opacity-80"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Lookbook;

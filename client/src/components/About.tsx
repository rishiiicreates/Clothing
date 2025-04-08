import { motion } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const About = () => {
  const fadeInRef1 = useScrollAnimation();
  const fadeInRef2 = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-hand text-center mb-16">
          <span className="sketch-underline">Our Story</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={fadeInRef1}
            className="relative fade-in opacity-0 transform translate-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[500px] overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fashion designer sketching clothes" 
                className="w-full h-full object-cover"
              />
              {/* Doodle stars overlay */}
              <svg className="absolute top-4 right-4 w-24 h-24 text-white opacity-80" viewBox="0 0 100 100">
                <path d="M50,0 L63,38 L100,38 L69,62 L81,100 L50,77 L19,100 L31,62 L0,38 L37,38 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20,20 L26,38 L42,38 L29,48 L35,66 L20,54 L5,66 L11,48 L-2,38 L14,38 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M80,15 L86,33 L102,33 L89,43 L95,61 L80,49 L65,61 L71,43 L58,33 L74,33 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          <motion.div 
            ref={fadeInRef2}
            className="fade-in opacity-0 transform translate-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-hand text-gray-800 dark:text-cream mb-6">
              Where <span className="text-[#FF5C99]">Creativity</span> Meets Craftsmanship
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Founded in 2020, Sketch & Stitch began as a small passion project between two friends who believed fashion should be both artistic and accessible.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Every piece in our collection starts as a hand-drawn sketch before being meticulously crafted into wearable art that tells a story. We believe in sustainable practices, ethical manufacturing, and the power of self-expression through clothing.
            </p>
            <div className="flex flex-wrap gap-8 mt-10">
              {/* Values cards with hand-drawn style */}
              <div className="flex flex-col items-center max-w-[120px]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {/* Hand-drawn sustainability icon */}
                  <svg className="w-full h-full text-[#4DFFDC]" viewBox="0 0 100 100">
                    <path d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M50,20 L50,40 M50,60 L50,80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M30,30 L70,70 M30,70 L70,30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-hand text-center text-gray-800 dark:text-cream">Sustainable</span>
              </div>
              
              <div className="flex flex-col items-center max-w-[120px]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {/* Hand-drawn creativity icon */}
                  <svg className="w-full h-full text-[#FF5C99]" viewBox="0 0 100 100">
                    <path d="M30,70 C10,55 10,35 30,20 C50,5 70,15 70,35 C70,55 90,65 85,85 C80,95 60,85 60,75 L60,55 L40,75 L40,45 L20,65" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-hand text-center text-gray-800 dark:text-cream">Creative</span>
              </div>
              
              <div className="flex flex-col items-center max-w-[120px]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {/* Hand-drawn ethical icon */}
                  <svg className="w-full h-full text-[#A78BFA]" viewBox="0 0 100 100">
                    <path d="M50,20 C60,20 75,25 85,35 C75,55 65,75 50,90 C35,75 25,55 15,35 C25,25 40,20 50,20 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M35,50 L45,60 L65,40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-hand text-center text-gray-800 dark:text-cream">Ethical</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

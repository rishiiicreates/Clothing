import { motion } from 'framer-motion';
import { testimonials } from '@/lib/data';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-cream dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-hand text-center mb-16">
          <span className="sketch-underline">What People Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    avatar: string;
    text: string;
    rating: number;
  };
  delay: number;
}

const TestimonialCard = ({ testimonial, delay }: TestimonialCardProps) => {
  const fadeInRef = useScrollAnimation();

  return (
    <motion.div 
      ref={fadeInRef}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl relative fade-in opacity-0 transform translate-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Hand-drawn quote marks */}
      <svg className="absolute -top-6 -left-6 w-12 h-12 text-[#FFAFD3] dark:text-[#FF5C99]" viewBox="0 0 100 100">
        <path d="M30,30 C20,40 20,50 30,60 C40,70 30,80 20,70 C10,60 0,40 10,20 C20,0 40,10 30,30 Z" fill="currentColor" />
        <path d="M70,30 C60,40 60,50 70,60 C80,70 70,80 60,70 C50,60 40,40 50,20 C60,0 80,10 70,30 Z" fill="currentColor" />
      </svg>
      
      <p className="text-gray-700 dark:text-gray-300 font-hand text-lg mb-6 pt-4">
        {testimonial.text}
      </p>
      
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-hand text-xl text-gray-800 dark:text-cream">{testimonial.name}</h4>
          <div className="flex text-[#FF5C99]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5" fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const fadeInRef1 = useScrollAnimation();
  const fadeInRef2 = useScrollAnimation();
  const { toast } = useToast();
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formValidation, setFormValidation] = useState({
    nameValid: false,
    emailValid: false,
    messageValid: false
  });

  const validateInput = (name: string, value: string) => {
    if (name === 'name') {
      setFormValidation(prev => ({ ...prev, nameValid: value.trim() !== '' }));
    } else if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormValidation(prev => ({ ...prev, emailValid: emailPattern.test(value) }));
    } else if (name === 'message') {
      setFormValidation(prev => ({ ...prev, messageValid: value.trim() !== '' }));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thanks for your message! We'll get back to you soon."
    });
    setContactForm({ name: '', email: '', message: '' });
    setFormValidation({ nameValid: false, emailValid: false, messageValid: false });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thanks for subscribing to our newsletter!"
    });
    setNewsletterEmail('');
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Animated background elements */}
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#B3FFEF] rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#FFD5E7] rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={fadeInRef1}
            className="fade-in opacity-0 transform translate-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-hand mb-6">
              <span className="sketch-underline">Get in Touch</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have questions about our products or want to collaborate? 
              Drop us a message and we'll get back to you!
            </p>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-hand text-lg focus:outline-none focus:border-[#FF87B7] dark:focus:border-[#FF5C99] focus:ring-2 focus:ring-[#FFD5E7] dark:focus:ring-[#A30042] transition"
                />
                {/* Hand-drawn validation icon */}
                <Check 
                  className={`absolute right-3 top-3 w-6 h-6 text-green-500 transition-opacity ${
                    formValidation.nameValid ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-hand text-lg focus:outline-none focus:border-[#FF87B7] dark:focus:border-[#FF5C99] focus:ring-2 focus:ring-[#FFD5E7] dark:focus:ring-[#A30042] transition"
                />
                {/* Hand-drawn validation icon */}
                <Check 
                  className={`absolute right-3 top-3 w-6 h-6 text-green-500 transition-opacity ${
                    formValidation.emailValid ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <div className="relative">
                <textarea 
                  id="message" 
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required 
                  placeholder="Your Message" 
                  rows={4} 
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-hand text-lg focus:outline-none focus:border-[#FF87B7] dark:focus:border-[#FF5C99] focus:ring-2 focus:ring-[#FFD5E7] dark:focus:ring-[#A30042] transition"
                />
                {/* Hand-drawn validation icon */}
                <Check 
                  className={`absolute right-3 top-3 w-6 h-6 text-green-500 transition-opacity ${
                    formValidation.messageValid ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <button 
                type="submit" 
                className="relative inline-block px-8 py-3 overflow-hidden group" 
                data-hover="true"
              >
                <span className="relative z-10 font-hand text-xl text-white group-hover:text-white transition-colors">
                  Send Message
                </span>
                <span className="absolute inset-0 bg-gradient-pink rounded-full transform transition-transform duration-300 group-hover:scale-110"></span>
              </button>
            </form>
          </motion.div>

          <motion.div 
            ref={fadeInRef2}
            className="fade-in opacity-0 transform translate-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative h-[500px] overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1605289355680-75fb41239154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fashion studio workspace" 
                className="w-full h-full object-cover"
              />
              
              {/* Newsletter signup overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-hand text-white mb-4">Join Our Newsletter</h3>
                <p className="text-white/80 font-hand text-lg mb-6">
                  Get updates on new collections, events, and exclusive offers.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 font-hand focus:outline-none focus:border-[#FF87B7]"
                  />
                  <button 
                    type="submit" 
                    className="relative overflow-hidden px-6 py-3 bg-[#FF5C99] rounded-lg font-hand text-white hover:bg-[#FF2F7A] transition" 
                    data-hover="true"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

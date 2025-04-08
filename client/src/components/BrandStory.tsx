import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl uppercase tracking-widest font-bold mb-6 relative">
              OUR STORY
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-black"></span>
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong className="font-bold">BEST MADE CO.</strong> began as a studio experiment in 2023, 
                when our founder started sketching clothing designs that incorporated hand-drawn art elements.
              </p>
              
              <p>
                What started as doodles in a sketchbook transformed into a movement celebrating the 
                fusion of wearable fashion and authentic artistic expression. We believe clothing 
                should be more than practical—it should tell your story.
              </p>
              
              <p>
                Our design process begins with pen on paper. Every pattern, every illustration, 
                every detail starts as a hand-drawn concept before making its way onto our garments.
                This connection to traditional craft gives each piece a unique character that mass-produced 
                fashion simply cannot replicate.
              </p>
              
              <blockquote className="pl-4 border-l-2 border-black italic my-6">
                "We don't follow trends—we believe in creating timeless pieces that express 
                individuality through artistic design elements."
              </blockquote>
              
              <p>
                Today, we're proud to offer a collection that bridges the gap between wearable 
                fashion and gallery-worthy art. Each season brings new collaborations with artists 
                and illustrators who share our vision of clothing as a canvas for creative expression.
              </p>
            </div>
            
            <motion.button
              className="mt-8 border-2 border-black px-6 py-3 uppercase tracking-wider font-bold relative overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Read More
              </span>
              <motion.span 
                className="absolute inset-0 bg-black"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              ></motion.span>
            </motion.button>
          </motion.div>
          
          {/* Right Column - Visual Elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main Image Container with Hand-drawn Border */}
            <div className="relative">
              {/* SVG Border */}
              <svg
                className="absolute w-[calc(100%+40px)] h-[calc(100%+40px)] -left-5 -top-5 z-0 pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M10,10 C15,5 25,5 40,5 C55,5 65,5 75,10 C85,15 90,25 95,40 C100,55 95,65 90,75 C85,85 75,90 60,95 C45,100 30,95 20,90 C10,85 5,75 5,60 C5,45 5,15 10,10 Z"
                  fill="none"
                  stroke="black"
                  strokeWidth="0.8"
                  strokeDasharray="3,2"
                />
              </svg>
              
              {/* Image */}
              <div className="relative z-10 bg-gray-100 p-5">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Designer sketching"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Design Values */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="border-t-2 border-black pt-4">
                <h3 className="font-bold uppercase tracking-wider mb-2">Artistic Integrity</h3>
                <p className="text-sm text-gray-600">We never compromise on our artistic vision or quality.</p>
              </div>
              
              <div className="border-t-2 border-black pt-4">
                <h3 className="font-bold uppercase tracking-wider mb-2">Ethical Production</h3>
                <p className="text-sm text-gray-600">All products are ethically made with fair labor practices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
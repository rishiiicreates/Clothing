import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-doodle text-[#FF5C99] dark:text-[#FF87B7] mb-4">
              Sketch<span className="text-[#A78BFA]">&</span>Stitch
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mb-6">
              Where fashion meets artistry. Hand-crafted, sustainable clothing with a creative twist.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FF87B7] text-[#FF5C99] hover:bg-[#FF5C99] hover:text-white transition duration-300" 
                whileHover={{ scale: 1.1 }}
                data-hover="true"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FF87B7] text-[#FF5C99] hover:bg-[#FF5C99] hover:text-white transition duration-300" 
                whileHover={{ scale: 1.1 }}
                data-hover="true"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FF87B7] text-[#FF5C99] hover:bg-[#FF5C99] hover:text-white transition duration-300" 
                whileHover={{ scale: 1.1 }}
                data-hover="true"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FF87B7] text-[#FF5C99] hover:bg-[#FF5C99] hover:text-white transition duration-300" 
                whileHover={{ scale: 1.1 }}
                data-hover="true"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-hand text-xl text-gray-800 dark:text-cream mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Collections
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-hand text-xl text-gray-800 dark:text-cream mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-hand text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] transition" 
                  data-hover="true"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              &copy; {new Date().getFullYear()} Sketch & Stitch. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mb-4 md:mb-0 text-sm">
              <span className="text-[#FF5C99] dark:text-[#FF87B7] font-medium">#rishiicreates</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400 italic">made with a lot of coffee ☕</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] text-sm" 
              data-hover="true"
            >
              Privacy
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] text-sm" 
              data-hover="true"
            >
              Terms
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-400 hover:text-[#FF5C99] dark:hover:text-[#FF87B7] text-sm" 
              data-hover="true"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

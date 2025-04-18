import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Menu, ShoppingBag, X, User, Heart } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { handleAnchorClick } = useSmoothScroll();
  
  // Detect scroll direction to show/hide navbar
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if scrolling up or down
    const scrollingDown = latest > lastScrollY;
    const scrollAmount = Math.abs(latest - lastScrollY);
    
    // Only trigger hide/show for significant scroll amounts (prevents flickering)
    if (scrollAmount > 10) {
      setIsVisible(!scrollingDown || latest < 50);
    }
    
    // Set scrolled state for styling
    setIsScrolled(latest > 20);
    setLastScrollY(latest);
  });

  return (
    <>
      {/* Top Announcement Bar - Fixed position to avoid layout shifts */}
      <div className="bg-black text-white text-center py-2 text-sm w-full top-0 left-0 right-0 m-0 z-40">
        Free shipping on all orders over $75
      </div>
      
      {/* Main Navigation */}
      <motion.nav 
        className={`${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'} 
          sticky top-0 z-50 transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left - Mobile Menu & Search */}
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                className="hover:text-orange-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            
            {/* Center - Brand Logo */}
            <div className="flex-1 flex justify-center">
              <a href="#" className="text-xl md:text-2xl font-bold">
                BEST MADE CO.
              </a>
            </div>
            
            {/* Right - Account & Cart */}
            <div className="flex items-center space-x-5">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex space-x-6">
                <a 
                  href="#" 
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
                <a 
                  href="#collection" 
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                  onClick={(e) => handleAnchorClick(e, { offset: 80, duration: 800 })}
                >
                  Collection
                </a>
                <a 
                  href="#about" 
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                  onClick={(e) => handleAnchorClick(e, { offset: 80, duration: 800 })}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                  onClick={(e) => handleAnchorClick(e, { offset: 80, duration: 800 })}
                >
                  Contact
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="hidden md:block hover:text-orange-500 transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <button className="hidden md:block hover:text-orange-500 transition-colors relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">3</span>
                </button>
                <button className="hover:text-orange-500 transition-colors relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              className="absolute top-full left-0 w-full bg-white shadow-md p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto flex">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 text-white px-4 rounded-r-md hover:bg-orange-600 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button 
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-white h-full w-3/4 max-w-sm shadow-xl"
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 300,
                  opacity: { duration: 0.2 }
                }}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <span className="font-bold text-lg">Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <motion.div 
                  className="py-4"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.1
                      }
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1
                      }
                    }
                  }}
                >
                  {[
                    { href: "#", label: "Home", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }},
                    { href: "#collection", label: "Collection", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                      handleAnchorClick(e, { offset: 80, duration: 800 });
                      setIsMobileMenuOpen(false);
                    }},
                    { href: "#about", label: "About", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                      handleAnchorClick(e, { offset: 80, duration: 800 });
                      setIsMobileMenuOpen(false);
                    }},
                    { href: "#contact", label: "Contact", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                      handleAnchorClick(e, { offset: 80, duration: 800 });
                      setIsMobileMenuOpen(false);
                    }},
                    { href: "#", label: "Account", onClick: () => setIsMobileMenuOpen(false) },
                    { href: "#", label: "Wishlist", onClick: () => setIsMobileMenuOpen(false) }
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={item.onClick}
                      variants={{
                        open: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24
                          }
                        },
                        closed: { 
                          opacity: 0, 
                          y: 20,
                          transition: {
                            duration: 0.2
                          }
                        }
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;

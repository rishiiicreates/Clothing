import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CustomCursor from "./components/CustomCursor";
import { useTheme } from "./context/ThemeContext";
import usePageTransition from "./hooks/usePageTransition";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function Router() {
  const [location] = useLocation();
  const { handleAnchorClick } = useSmoothScroll();
  const [isHome] = useRoute("/");
  
  // Use simplified page transitions
  const { 
    PageTransition, 
    transitionType, 
    setTransitionType,
    transitionDuration,
  } = usePageTransition('fade', 0.4);
  
  // Change transition effect on route change
  useEffect(() => {
    // Alternate between fade and slide transitions
    setTransitionType(location === '/' ? 'fade' : 'slide');
  }, [location, setTransitionType]);
  
  // Handle smooth scrolling for all anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        // Create a proper React event from the DOM event
        const reactEvent = {
          currentTarget: anchor,
          preventDefault: () => {},
        } as React.MouseEvent<HTMLAnchorElement>;
        
        handleAnchorClick(reactEvent, {
          offset: 80, // Account for sticky header
          duration: 800,
          easing: (t) => 1 - Math.pow(1 - t, 4) // Ease out quartic
        });
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleAnchorClick]);
  
  return (
    <PageTransition 
      location={location} 
      transitionType={transitionType} 
      duration={transitionDuration}
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  const { theme } = useTheme();
  const [cursorVisible, setCursorVisible] = useState(false);
  
  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      setCursorVisible(true);
      // Hide default cursor
      document.documentElement.classList.add('custom-cursor');
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${theme === 'dark' ? 'dark' : ''} m-0 p-0 overflow-x-hidden`}>
        {cursorVisible && <CustomCursor />}
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;

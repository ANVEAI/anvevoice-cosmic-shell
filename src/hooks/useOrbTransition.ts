import { useState, useEffect } from 'react';

export const useOrbTransition = () => {
  const [isCentered, setIsCentered] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      
      if (scrolled && isCentered) {
        setIsCentered(false);
        setHasScrolled(true);
      } else if (window.scrollY === 0 && !isCentered) {
        setIsCentered(true);
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCentered]);

  const triggerScroll = () => {
    window.scrollTo({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
    setTimeout(() => {
      setIsCentered(false);
      setHasScrolled(true);
    }, 800);
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsCentered(true);
      setHasScrolled(false);
    }, 800);
  };

  return { isCentered, hasScrolled, triggerScroll, goToTop };
};

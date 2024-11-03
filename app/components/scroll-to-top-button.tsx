'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

import { Button } from '@/app/components/common';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <Button
          title="Scroll to top"
          variant="secondary"
          onClick={scrollToTop}
          className="size-12 rounded-full bg-my-secondary-500 p-3 text-my-neutral-100 shadow-none transition duration-300 hover:bg-my-secondary-700 hover:text-my-neutral-100"
        >
          <ChevronUp strokeWidth={3} />
        </Button>
      )}
    </div>
  );
}

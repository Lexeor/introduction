import { type RefObject, useEffect, useState } from 'react';

interface UseScrollTrackingOptions {
  scrollRef: RefObject<any>;
  sectionsRef: RefObject<(HTMLElement | null)[]>;
  enabled?: boolean;
}

export const useScrollTracking = ({
  scrollRef,
  sectionsRef,
  enabled = true,
}: UseScrollTrackingOptions) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const sections = sectionsRef.current;
      const osInstance = scrollRef.current?.osInstance();
      const viewport = osInstance?.elements().viewport;

      if (!sections?.length || !viewport) return;

      const scrollTop = viewport.scrollTop;
      const viewportHeight = viewport.clientHeight;
      const viewportCenter = scrollTop + viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionCenter = sectionTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    // Wait for OverlayScrollbars to initialize
    const timer = setInterval(() => {
      const osInstance = scrollRef.current?.osInstance();
      const viewport = osInstance?.elements().viewport;

      if (viewport) {
        clearInterval(timer);
        handleScroll(); // Initial calculation
        viewport.addEventListener('scroll', handleScroll, { passive: true });
      }
    }, 50);

    return () => {
      clearInterval(timer);
      const osInstance = scrollRef.current?.osInstance();
      const viewport = osInstance?.elements().viewport;
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
    };
  }, [enabled, scrollRef, sectionsRef]);

  return activeIndex;
};
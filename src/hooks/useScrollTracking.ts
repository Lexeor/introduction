import { type RefObject, useEffect, useState } from 'react';

interface UseScrollTrackingOptions {
  scrollRef: RefObject<HTMLDivElement | null>;
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

    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = sectionsRef.current;
      if (!sections?.length) return;

      const scrollTop = container.scrollTop;
      const viewportCenter = scrollTop + container.clientHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        if (!section) return;
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, scrollRef, sectionsRef]);

  return activeIndex;
};

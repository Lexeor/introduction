import { type RefObject, useCallback } from 'react';

export const useSmoothScroll = (
  sectionsRef: RefObject<(HTMLElement | null)[]>,
) => {
  const scrollToSection = useCallback(
    (index: number) => {
      const target = sectionsRef.current?.[index];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [sectionsRef],
  );

  return scrollToSection;
};
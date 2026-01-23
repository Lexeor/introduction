import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

type ParallaxSlideProps = {
  imageUrl: string;
};

const ParallaxSlide: FC<PropsWithChildren<ParallaxSlideProps>> = ({ imageUrl, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Progress value from 0 (bottom of screen) to 1 (top of screen)
  const progress = useMotionValue(0.5);

  // Smooth out the progress for a premium feel
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to vertical offset
  // When scrolling DOWN, progress goes from 0 to 1.
  // We want the image to move UP slightly relative to the container.
  // So we transform progress [0, 1] to y ["8%", "-8%"]
  const y = useTransform(smoothProgress, [0, 1], ['8%', '-8%']);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility progress: 0 when just entered from bottom, 1 when just leaving at top
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, scrollProgress));

      progress.set(clamped);
    };

    // Listen to scroll events on window with capture: true 
    // This allows catching scroll events from custom containers like OverlayScrollbars
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [progress]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      {/* Base parallax background */}
      <motion.div
        className="absolute inset-x-0 -top-[20%] h-[140%] z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
          willChange: 'transform',
        }}
      />

      {/* Backdrop blur + soft dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Content */}
      <div className="relative z-30 w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSlide;


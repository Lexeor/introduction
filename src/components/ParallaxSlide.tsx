import { type FC, type PropsWithChildren, useEffect, useRef, useState } from 'react';

type ParallaxSlideProps = {
  imageUrl: string;
  activeIndex: number;
  slideIndex: number;
};

const ParallaxSlide: FC<PropsWithChildren<ParallaxSlideProps>> = ({
  imageUrl,
  activeIndex,
  slideIndex,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateParallax = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Прогресс видимости слайда: от 0 (вне экрана) до ~1 (на экране)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

        // Более заметный обратный параллакс
        const offset = (progress - 0.5) * 500 * 1.2;
        setParallaxOffset(offset);
      }

      if (Math.abs(activeIndex - slideIndex) <= 1) {
        animationFrameRef.current = requestAnimationFrame(updateParallax);
      }
    };

    const shouldAnimate = Math.abs(activeIndex - slideIndex) <= 1;
    if (shouldAnimate) {
      animationFrameRef.current = requestAnimationFrame(updateParallax);
    } else {
      setParallaxOffset(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeIndex, slideIndex]);

  return (
    <div ref={containerRef} className="h-screen relative overflow-hidden">
      {/* Base parallax background */}
      <div
        className="absolute inset-0 w-full h-[150%] -z-20"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      />

      {/* Backdrop-filter layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          willChange: 'backdrop-filter',
        }}
      />

      {/* Additional bg */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-6 px-8 z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSlide;


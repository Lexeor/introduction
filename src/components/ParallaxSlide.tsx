import { type FC, type PropsWithChildren, useEffect, useRef, useState } from 'react';

type ParallaxSlideProps = {
  imageUrl: string;
};

const ParallaxSlide: FC<PropsWithChildren<ParallaxSlideProps>> = ({ imageUrl, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Прогресс видимости слайда: от 0 (вне экрана) до 1 (на экране)
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Обратный параллакс
      const offset = (clamped - 0.5) * 400;
      setParallaxOffset(offset);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Base parallax background */}
      <div
        className="absolute inset-0 w-full h-[140%] z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      />

      {/* Backdrop blur + soft dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-30">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSlide;


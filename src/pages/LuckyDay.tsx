import { motion, useScroll, useTransform } from 'framer-motion';
import { type FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LuckyDayProps {
  scrollRef: any;
}

const LuckyDay: FC<LuckyDayProps> = ({ scrollRef }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const getViewport = () => {
      const osInstance = scrollRef.current?.osInstance();
      const el = osInstance?.elements().viewport;
      if (el) {
        setViewport(el);
        return true;
      }
      return false;
    };

    if (!getViewport()) {
      const timer = setInterval(() => {
        if (getViewport()) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [scrollRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: viewport ? { current: viewport } : undefined,
    offset: ['start end', 'end start'],
  });

  // Сужаем диапазоны, чтобы текст жил только в центре своего слайда
  const opacity = useTransform(scrollYProgress, [0.35, 0.48, 0.52, 0.65], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0.92, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [40, 0, -40]);
  const blur = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
  );

  return (
    <div ref={containerRef} className="h-screen w-full relative">
      <motion.div
        style={{
          opacity,
          scale,
          y,
          filter: blur,
          willChange: 'transform, opacity, filter',
        }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 z-0 pointer-events-none"
      >
        <div className="max-w-5xl">
          <h1
            className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-[1.1] text-primary-500  tracking-[-2.46px]">
            <span
              className="absolute font-light -top-[0.8em] text-3xl md:text-3xl lg:text-5xl text-white block  tracking-[-1.46px] sm:inline drop-shadow-[0_0_20px_rgba(27,131,83,0.4)]">
              {t('luckyDay.title')}
            </span>
            <span
              className="absolute font-light -bottom-[1em] right-0 text-2xl md:text-4xl lg:text-5xl mt-6 block text-white/90 tracking-[-1.46px]">
            {t('luckyDay.experience')}
            </span>
            <span
              className="absolute -bottom-[2em] right-0 text-2xl md:text-4xl lg:text-5xl mt-6 block">
                {t('luckyDay.years')}
            </span>
            {t('luckyDay.role')}
          </h1>
          <br />
        </div>
      </motion.div>
    </div>
  );
};

export default LuckyDay;
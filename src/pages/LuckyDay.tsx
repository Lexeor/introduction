import { motion, useScroll, useTransform } from 'framer-motion';
import { type FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LuckyDayProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const LuckyDay: FC<LuckyDayProps> = ({ scrollRef }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.9, 1, 1.1]);
  const y = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [60, 0, -60]);

  return (
    <div ref={containerRef} className="h-screen w-full relative">
      <motion.div
        style={{ opacity, scale, y }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 z-0 pointer-events-none"
      >
        <div className="max-w-7xl">
          <h1
            className="relative text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-center leading-[1] text-primary-500 tracking-[-0.04em]">
            <span
              className="absolute font-caveat font-light -top-[0.8em] left-0 text-3xl md:text-3xl lg:text-6xl xl:text-7xl text-white block tracking-[-0.02em] sm:inline drop-shadow-[0_0_20px_rgba(27,131,83,0.4)]">
              {t('luckyDay.title')}
            </span>
            <span
              className="absolute font-caveat font-light -bottom-[0.9em] right-0 text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-6 block text-white/90 tracking-[-0.02em]">
              {t('luckyDay.experience')}
            </span>
            <span
              className="absolute -bottom-[1.8em] right-0 text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-6 block">
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

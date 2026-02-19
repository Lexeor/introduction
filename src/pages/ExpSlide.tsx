import Container from '@/components/Container';
import WorkTimeline from '@/components/experimental/WorkTimeline.tsx';
import Multilingual from '@/components/Multilingual.tsx';
import PanelBorders from '@/components/PanelBorders.tsx';
import { motion } from 'motion/react';
import { type FC } from 'react';

interface FinalProps {
  scrollToSection?: (index: number) => void;
}

const ExpSlide: FC<FinalProps> = ({ scrollToSection }) => {
  return (
    <Container className="relative min-h-[calc(100vh+4rem)] w-full flex items-center justify-center py-10 grainy">
      <PanelBorders
        onTopClick={() => scrollToSection?.(4)}
        onBottomClick={() => scrollToSection?.(4)}
      />

      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[36px] md:text-[36px] lg:text-[48px] font-light"
          >
            <Multilingual translationKey="final.title" align="left" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
            className="font-caveat font-light select-none -mb-2"
          >
            <Multilingual
              inline
              translationKey="final.tagline"
              align="center"
              className="font-caveat font-light text-[28px] sm:text-[36px] md:text-[36px]"
            />
            <Multilingual
              translationKey="final.taglineAccent"
              align="center"
              className="text-primary-500 font-caveat font-light text-[28px] sm:text-[36px] md:text-[36px] -mt-4 md:-mt-6"
            />
          </motion.div>
        </div>

        <WorkTimeline />
      </div>
    </Container>
  );
};

export default ExpSlide;

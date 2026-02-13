import Container from '@/components/Container';
import FlippingCard, { FloatingElement } from '@/components/experimental/FlippingCard';
import IconPlaceholder from '@/components/IconPlaceholder';
import InlineSvg from '@/components/InlineSvg';
import Multilingual from '@/components/Multilingual.tsx';
import PanelBorders from '@/components/PanelBorders.tsx';
import { RefreshCwIcon } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useEffect, useMemo, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutMeSlideProps {
  scrollToSection?: (index: number) => void;
}

const AboutMeSlide: FC<AboutMeSlideProps> = ({ scrollToSection }) => {
  const { i18n } = useTranslation();
  const [visibleBlocks, setVisibleBlocks] = useState(0);

  const skillCategories = useMemo(() => [
    {
      title: i18n.t('skill.core'),
      items: [
        {
          name: 'JavaScript',
          icon: <InlineSvg name="tech/javascript" />,
        },
        { name: 'TypeScript', icon: <InlineSvg name="tech/typescript" /> },
      ],
    },
    {
      title: i18n.t('skill.frameworks'),
      items: [
        { name: 'React', icon: <InlineSvg name="tech/react" /> },
        { name: 'Next.js', icon: <InlineSvg name="tech/nextjs" /> },
        { name: 'Remix', icon: <InlineSvg name="tech/remix" /> },
      ],
    },
    {
      title: i18n.t('skill.states'),
      items: [
        { name: 'Zustand', icon: <InlineSvg name="tech/zustand" /> },
        { name: 'MobX', icon: <InlineSvg name="tech/mobx" /> },
        { name: 'Redux Toolkit', icon: <InlineSvg name="tech/redux" /> },
      ],
    },
    {
      title: i18n.t('skill.styling'),
      items: [
        { name: 'Tailwind CSS', icon: <InlineSvg name="tech/tailwind" /> },
        { name: 'CSS Modules', icon: <InlineSvg name="tech/css" /> },
        { name: 'CSS-in-JS', icon: <InlineSvg name="tech/styled" className="w-6" /> },
        { name: 'Framer/Motion', icon: <InlineSvg name="tech/motion" className="w-10" /> },
      ],
    },
    {
      title: i18n.t('skill.tools'),
      items: [
        { name: 'Git', icon: <InlineSvg name="tech/git" /> },
        { name: 'Vite', icon: <InlineSvg name="tech/vite" className="w-6" /> },
        { name: 'Webpack', icon: <InlineSvg name="tech/webpack" className="w-6" /> },
        { name: 'Jest', icon: <InlineSvg name="tech/jest" className="w-6" /> },
        { name: 'Playwright', icon: <InlineSvg name="tech/playwright" className="w-6" /> },
      ],
    },
    {
      title: i18n.t('skill.api'),
      items: [
        { name: 'REST', icon: <InlineSvg name="tech/api" /> },
        { name: 'WebSockets', icon: <InlineSvg name="tech/websocket" className="w-6" /> },
      ],
    },
  ], [i18n.language]);

  const achievements = useMemo(() => [
    {
      id: 'problem_solving',
      accent: '#3b82f6',
    },
    {
      id: 'learning',
      accent: '#10b981',
    },
    {
      id: 'quality',
      accent: '#8b5cf6',
    },
    {
      id: 'user_focus',
      accent: '#f59e0b',
    },
    {
      id: 'reliability',
      accent: '#ec4899',
    },
  ], []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleBlocks(1), 300),
      setTimeout(() => setVisibleBlocks(2), 2300),
      setTimeout(() => setVisibleBlocks(3), 4300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const blockVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const skillItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Container className="relative min-h-[calc(100vh+4rem)] w-full flex items-center justify-center py-20">
      <PanelBorders
        onTopClick={() => scrollToSection?.(2)}
        onBottomClick={() => scrollToSection?.(2)}
      />

      <div className="w-full flex flex-col gap-16 lg:gap-24 px-4">
        <div className="grid grid-cols-1 gap-12 lg:gap-20">
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate={visibleBlocks >= 2 ? 'visible' : 'hidden'}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-[36px] md:text-[36px] lg:text-[48px] font-light"
              >
                <Multilingual translationKey="skills" align="left" />
              </motion.h1>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
              {skillCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial="hidden"
                  animate={visibleBlocks >= 2 ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.2 + catIndex * 0.1 },
                    },
                  }}
                >
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={skillItemVariants}
                        className="group flex items-center gap-3 py-1 cursor-default"
                      >
                        <div
                          className="p-1 text-white/60 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all group-hover:bg-white/10 group-hover:text-white">
                          <IconPlaceholder
                            label={skill.icon}
                            className="text-white/60 group-hover:text-white/90 transition-colors"
                          />
                        </div>
                        <span
                          className="text-sm md:text-base font-light text-white/70 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={blockVariants}
          initial="hidden"
          animate={visibleBlocks >= 3 ? 'visible' : 'hidden'}
          className="w-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[36px] md:text-[36px] lg:text-[48px] font-light"
            >
              <Multilingual translationKey="approach" align="left" />
            </motion.h1>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
            {achievements.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FlippingCard
                  frontSide={{
                    node: (
                      <>
                        <FloatingElement depth={30} className="text-xl font-medium text-white align-top w-full">
                          <Multilingual translationKey={`achievements.${card.id}.title`} align="left" />
                        </FloatingElement>
                        <FloatingElement depth={60} className="absolute left-4 bottom-4">
                          <RefreshCwIcon size={64} strokeWidth={2.5} className="text-white opacity-20" />
                        </FloatingElement>
                      </>
                    ),
                    style: 'bg-primary-500/80 border border-white/20 justify-start',
                  }}
                  backSide={{
                    node: (
                      <>
                        <FloatingElement depth={30}
                          className="text-sm md:text-base leading-5 tracking-tight font-light text-white align-top w-full">
                          <Multilingual translationKey={`achievements.${card.id}.description`} align="left" />
                        </FloatingElement>
                        <FloatingElement depth={60} className="absolute right-4 bottom-4">
                          <RefreshCwIcon size={64} strokeWidth={2.5} className="text-white opacity-20" />
                        </FloatingElement>
                      </>
                    ),
                    style: 'bg-background-500/20 border border-white/20',
                  }}
                  className="w-full h-48"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutMeSlide;
import Container from '@/components/Container';
import IconPlaceholder from '@/components/IconPlaceholder';
import InlineSvg from '@/components/InlineSvg';
import { t } from 'i18next';
import { motion, type Variants } from 'motion/react';
import { type FC, useEffect, useState } from 'react';


const skillCategories = [
  {
    title: 'Core',
    items: [
      {
        name: 'JavaScript',
        icon: <InlineSvg name="tech/javascript" />,
      },
      { name: 'TypeScript', icon: <InlineSvg name="/tech/typescript" /> },
    ],
  },
  {
    title: 'Фреймворки',
    items: [
      { name: 'React', icon: <InlineSvg name="/tech/react" /> },
      { name: 'Next.js', icon: <InlineSvg name="/tech/nextjs" /> },
      { name: 'Remix', icon: <InlineSvg name="/tech/remix" /> },
    ],
  },
  {
    title: 'Стейт',
    items: [
      { name: 'Zustand', icon: <InlineSvg name="/tech/zustand" /> },
      { name: 'MobX', icon: <InlineSvg name="/tech/mobx" /> },
      { name: 'Redux Toolkit', icon: <InlineSvg name="/tech/redux" /> },
    ],
  },
  {
    title: 'Styling',
    items: [
      { name: 'Tailwind CSS', icon: <InlineSvg name="/tech/tailwind" /> },
      { name: 'CSS Modules', icon: <InlineSvg name="/tech/css" /> },
      { name: 'CSS-in-JS', icon: 'Js' },
      { name: 'Framer/Motion', icon: <InlineSvg name="/tech/motion" className="w-10" /> },
    ],
  },
  {
    title: 'Инструменты',
    items: [
      { name: 'Git', icon: <InlineSvg name="/tech/git" /> },
      { name: 'Vite', icon: <InlineSvg name="/tech/vite" /> },
      { name: 'Webpack', icon: <InlineSvg name="/tech/webpack" /> },
    ],
  },
  {
    title: 'API',
    items: [
      { name: 'REST', icon: <InlineSvg name="/tech/api" /> },
      { name: 'WebSockets', icon: <InlineSvg name="/tech/websocket" /> },
    ],
  },
];

const achievements = [
  {
    title: 'Компонентная архитектура',
    description: 'Проектирую масштабируемые и переиспользуемые UI-компоненты с чистым API',
    accent: '#3b82f6',
  },
  {
    title: 'Производительность',
    description: 'Оптимизация рендеринга, code-splitting, ленивая загрузка для быстрых приложений',
    accent: '#10b981',
  },
  {
    title: 'Современный стек',
    description: 'TypeScript, React 18+, хуки, серверные компоненты, современный CSS',
    accent: '#8b5cf6',
  },
  {
    title: 'Адаптивный дизайн',
    description: 'Mobile-first подход, fluid typography, гибкие layouts для любых устройств',
    accent: '#f59e0b',
  },
  {
    title: 'Анимации и UX',
    description: 'Плавные переходы, микроинтеракции, skeleton-загрузки для отзывчивого интерфейса',
    accent: '#ec4899',
  },
];

interface CardStackProps {
  cards: typeof achievements;
}

const CardStack: FC<CardStackProps> = ({ cards }) => {
  const [stack, setStack] = useState(cards.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStack((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top];
      });
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-72 h-44">
      {stack.slice(0, 4).map((cardIndex, stackPosition) => {
        const card = cards[cardIndex];
        const isTop = stackPosition === 0;
        const offset = stackPosition * 6;
        const scale = 1 - stackPosition * 0.05;
        const zIndex = stack.length - stackPosition;

        return (
          <motion.div
            key={cardIndex}
            layout
            className="absolute inset-0 p-5 rounded-2xl border border-white/10 backdrop-blur-sm select-none"
            style={{
              background: `linear-gradient(135deg, ${card.accent}15 0%, rgba(0,0,0,0.4) 100%)`,
              zIndex,
            }}
            initial={false}
            animate={{
              y: offset,
              scale,
              rotate: stackPosition * -1.5,
              opacity: 1 - stackPosition * 0.2,
              x: isTop && isAnimating ? 200 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            onClick={isTop ? handleNext : undefined}
            whileHover={isTop ? { scale: 1.03, y: -4 } : undefined}
            whileTap={isTop ? { scale: 0.98 } : undefined}
          >
            <div
              className="w-6 h-1 rounded-full mb-3"
              style={{ backgroundColor: card.accent }}
            />
            <h3 className="text-base font-medium text-white mb-2">
              {card.title}
            </h3>
            <p className="text-xs font-light text-white/80 leading-relaxed line-clamp-3">
              {card.description}
            </p>
            {isTop && (
              <div className="absolute bottom-3 right-3 text-[10px] text-white/30">
                tap to next
              </div>
            )}
          </motion.div>
        );
      })}

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${stack[0] === index ? 'bg-white/80 scale-125' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LinearAchievements: FC<CardStackProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
          className="p-5 rounded-2xl border border-white/10 backdrop-blur-sm transition-colors flex flex-col h-full"
          style={{
            background: `linear-gradient(135deg, ${card.accent}10 0%, rgba(0,0,0,0.2) 100%)`,
          }}
        >
          <div
            className="w-8 h-1 rounded-full mb-4 shrink-0"
            style={{ backgroundColor: card.accent }}
          />
          <h3 className="text-sm font-medium text-white mb-3">
            {card.title}
          </h3>
          <p className="text-[11px] font-light text-white/60 leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const AboutMeSlide = () => {
  const [visibleBlocks, setVisibleBlocks] = useState(0);

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
    <Container className="min-h-screen w-full flex items-center justify-center py-20">
      <div className="w-full max-w-6xl flex flex-col gap-16 lg:gap-24 px-4 mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            className="flex flex-col justify-center lg:border-r lg:border-white/10 lg:pr-12"
            variants={blockVariants}
            initial="hidden"
            animate={visibleBlocks >= 1 ? 'visible' : 'hidden'}
          >
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute left-3 -top-4 md:-top-2 text-xl text-white/80 tracking-wider">
                  {t`frontend.oneup`}
                </div>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white">
                  React
                </h1>
                <span className="absolute -right-2  text-xl text-white/80 tracking-wider">
                  developer
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-xl font-thin text-white leading-none">
                with
              </span>
              <span className="text-8xl md:text-9xl lg:text-[10rem] font-thin text-white leading-none">
                4
              </span>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extralight text-white/70">года</span>
                <span className="text-lg font-light text-white/80">опыта</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8 text-sm font-light text-white/80">
              <span className="px-3 py-1 rounded-full border border-white/10">JavaScript / TypeScript</span>
            </div>
          </motion.div>

          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate={visibleBlocks >= 2 ? 'visible' : 'hidden'}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white/80 tracking-wide">Навыки</h2>
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
            <h2 className="text-2xl font-light text-white/80 tracking-wide">Подход</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="lg:hidden flex justify-center">
            <CardStack cards={achievements} />
          </div>
          <div className="hidden lg:block">
            <LinearAchievements cards={achievements} />
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutMeSlide;
import { motion, type Variants } from 'motion/react';
import { type FC, type SVGProps, useEffect, useState } from 'react';
import Container from '../components/Container';

const IconPlaceholder: FC<SVGProps<SVGSVGElement> & { label?: string }> = ({ label, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="4" strokeDasharray="4 2" />
    <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">
      {label?.slice(0, 2).toUpperCase()}
    </text>
  </svg>
);

const skillCategories = [
  {
    title: 'Языки',
    items: [
      { name: 'JavaScript', icon: 'JS' },
      { name: 'TypeScript', icon: 'TS' },
    ],
  },
  {
    title: 'Фреймворки',
    items: [
      { name: 'React', icon: 'Re' },
      { name: 'Next.js', icon: 'Nx' },
    ],
  },
  {
    title: 'Стейт',
    items: [
      { name: 'Redux Toolkit', icon: 'Rd' },
      { name: 'Zustand', icon: 'Zu' },
      { name: 'MobX', icon: 'Mx' },
    ],
  },
  {
    title: 'Стили',
    items: [
      { name: 'Tailwind CSS', icon: 'Tw' },
      { name: 'CSS Modules', icon: 'Cs' },
      { name: 'Styled', icon: 'Sc' },
    ],
  },
  {
    title: 'Инструменты',
    items: [
      { name: 'Git', icon: 'Gi' },
      { name: 'Vite', icon: 'Vi' },
      { name: 'Webpack', icon: 'Wp' },
    ],
  },
  {
    title: 'API',
    items: [
      { name: 'REST', icon: 'Rs' },
      { name: 'GraphQL', icon: 'Gq' },
      { name: 'WebSocket', icon: 'Ws' },
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
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              stack[0] === index ? 'bg-white/80 scale-125' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
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
    <Container className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-2">
        <motion.div
          className="flex flex-col justify-center lg:border-r lg:border-white/10 lg:pr-12"
          variants={blockVariants}
          initial="hidden"
          animate={visibleBlocks >= 1 ? 'visible' : 'hidden'}
        >
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-white">
                React
              </h1>
              <span className="absolute -right-6 font-mono text-white/80 tracking-wider">
                developer
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
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

        <div className="flex flex-col gap-8 lg:gap-10">
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate={visibleBlocks >= 2 ? 'visible' : 'hidden'}
          >
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-xl font-light text-white/80 tracking-wide">Навыки</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
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
                  <h3 className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-2">
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={skillItemVariants}
                        className="group flex items-center gap-2 py-1 cursor-default"
                      >
                        <div
                          className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/25 transition-colors">
                          <IconPlaceholder
                            label={skill.icon}
                            className="w-3 h-3 text-white/80 group-hover:text-white/80 transition-colors"
                          />
                        </div>
                        <span className="text-xs font-light text-white/80 group-hover:text-white/80 transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate={visibleBlocks >= 3 ? 'visible' : 'hidden'}
          >
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-xl font-light text-white/80 tracking-wide">Подход</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <CardStack cards={achievements} />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSlide;
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useState } from 'react';
import IconPlaceholder from './IconPlaceholder';

interface TechStackProps {
  stack: Project['stack'];
  hovered?: boolean;
  className?: string;
}

const TechStack: FC<TechStackProps> = ({ stack, hovered, className }) => {
  const [source, target] = useSingleton();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <>
      <Tippy
        singleton={source}
        moveTransition="transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)"
        placement="top"
        offset={[0, 10]}
        arrow={false}
        animation={false}
        onTrigger={(instance) => {
          const name = instance.reference.getAttribute('data-tech-name');
          if (name) setActiveItem(name);
        }}
        onHide={() => setActiveItem(null)}
        render={(attrs) => (
          <div {...attrs} className="z-[1000] pointer-events-none">
            {activeItem && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 5 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-background-200/90 rounded-xl px-3 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeItem}
                    initial={{ x: 15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -15, opacity: 0 }}
                    transition={{
                      x: { duration: 0.3, ease: 'easeOut' },
                      opacity: { duration: 0.2 },
                    }}
                    className="text-[11px] text-white/90 font-medium tracking-wide whitespace-nowrap"
                  >
                    {activeItem}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
      />

      <div className={cn('flex flex-row', className)}>
        {stack.map((item, i) => (
          <Tippy
            key={item.name}
            singleton={target}
          >
            <div
              data-tech-name={item.name}
              onMouseEnter={() => setActiveItem(item.name)}
              className={cn(
                '-mx-0.5 p-1.5 w-10 h-10 rounded-xl bg-panel border border-white/10',
                'flex items-center justify-center transition-all duration-300',
                'hover:border-white/40 hover:bg-white/10 hover:scale-110 relative',
                hovered && 'border-white/20 bg-panel',
              )}
              style={{ zIndex: 100 + i }}
            >
              <IconPlaceholder
                label={item.icon}
                className={cn(
                  'transition-colors duration-300',
                  hovered ? 'text-white/90' : 'text-white/40',
                )}
              />
            </div>
          </Tippy>
        ))}
      </div>
    </>
  );
};

export default TechStack;
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ExpandedProjectCardProps {
  project: Project;
  onClose(): void;
}

const ExpandedProjectCard: FC<ExpandedProjectCardProps> = ({ project, onClose }) => {
  const [showFloatingTitle, setShowFloatingTitle] = useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    // Wait for OverlayScrollbars to initialize
    const timer = setInterval(() => {
      const osInstance = scrollRef.current?.osInstance();
      const viewport = osInstance?.elements().viewport;

      if (viewport) {
        clearInterval(timer);

        const handleScroll = () => {
          setShowFloatingTitle(viewport.scrollTop > 20);
        };

        viewport.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
          viewport.removeEventListener('scroll', handleScroll);
        };
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return createPortal(
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      />

      {/* Expanded card container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-none">
        <motion.div
          layout
          layoutId={`card-container-${project.id}`}
          className={cn(
            'relative flex flex-col rounded-3xl overflow-hidden pointer-events-auto',
            'bg-background-50 w-full h-full max-w-5xl max-h-[90vh]',
            'md:max-h-[85vh]',
          )}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Close button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.25 }}
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 z-20',
              'w-10 h-10 rounded-full',
              'bg-background-500/80 backdrop-blur-sm',
              'flex items-center justify-center',
              'hover:bg-background-400 transition-colors',
              'cursor-pointer',
            )}
          >
            <X className="w-5 h-5 text-text-500" />
          </motion.div>

          {/* Image section */}
          <motion.div
            layout
            layoutId={`card-image-container-${project.id}`}
            className="relative overflow-hidden shrink-0"
            style={{ height: '40vh', minHeight: '250px' }}
          >
            {/* Live demo button */}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'absolute bottom-10 left-4',
                  'px-4 py-1 rounded-full',
                  'bg-primary-500 text-white',
                  'hover:bg-primary-600 transition-colors',
                  'font-medium text-center flex-1 md:flex-none z-22',
                )}
              >
                It's alive!
                <span
                  className="absolute inset-0 scale-x-108 scale-y-121 inline-flex h-full w-full animate-pulse rounded-full bg-primary-500 opacity-0 -z-1"></span>
              </a>
            )}

            <motion.img
              layoutId={`card-image-${project.id}`}
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay on image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-background-50/80 to-transparent"
            />

            {/* Floating Title Overlay */}
            <AnimatePresence>
              {showFloatingTitle && (
                <motion.div
                  initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-10"
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center px-6 drop-shadow-2xl">
                    {project.title}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content section */}
          <motion.div
            layout
            layoutId={`card-content-${project.id}`}
            className={cn(
              'relative -mt-6 z-10 flex-1',
              'flex flex-col rounded-3xl',
              'bg-background-100 overflow-hidden',
            )}
          >
            <OverlayScrollbarsComponent
              ref={scrollRef}
              defer
              className="flex-1"
              options={{
                scrollbars: {
                  autoHide: 'scroll',
                  theme: 'os-theme-dark',
                },
              }}
            >
              <div className="p-6">
                {/* Текст появляется после завершения layout-анимации */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                >
                  <h2 className="text-3xl md:text-4xl font-[400] mb-2">
                    {project.title}
                  </h2>

                  <h3 className="text-lg text-text-400 mb-6 leading-5.5">
                    {project.subtitle}
                  </h3>
                </motion.div>

                {/* Extended description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex-1 space-y-8"
                >
                  {project.description && (
                    <div>
                      {typeof project.description === 'string' ? (
                        <p className="text-text-300 leading-5.5 text-lg">{project.description}</p>
                      ) : (
                        project.description
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.goal && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-500/50">Goal</h4>
                        <div className="text-text-300 leading-5.5">
                          {typeof project.goal === 'string' ? <p>{project.goal}</p> : project.goal}
                        </div>
                      </div>
                    )}

                    {project.solution && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-500/50">Solution</h4>
                        <div className="text-text-300 leading-5.5">
                          {typeof project.solution === 'string' ? <p>{project.solution}</p> : project.solution}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Section */}
                  <div className="pt-6 border-t border-background-200/50">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-text-500/50 mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <div
                          key={item.name}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-xl',
                            'bg-background-200/50 text-text-400',
                            'hover:bg-background-200 transition-colors select-none',
                          )}
                        >
                          <div className="w-6 h-6">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </OverlayScrollbarsComponent>
          </motion.div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
};

export default ExpandedProjectCard;
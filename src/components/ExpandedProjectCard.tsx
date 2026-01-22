import { X } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC } from 'react';
import type { Project } from '../data/projects';
import { cn } from '../lib/utils';

interface ExpandedProjectCardProps {
  project: Project;
  onClose(): void;
}

const ExpandedProjectCard: FC<ExpandedProjectCardProps> = ({ project, onClose }) => {
  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Expanded card container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-none">
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
          </motion.div>

          {/* Content section */}
          <motion.div
            layout
            layoutId={`card-content-${project.id}`}
            className={cn(
              'relative -mt-6 z-10 flex-1',
              'flex flex-col rounded-3xl p-6',
              'bg-background-100 overflow-y-auto',
            )}
          >
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

              <h3 className="text-lg text-text-400 mb-6">
                {project.subtitle}
              </h3>
            </motion.div>

            {/* Extended description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex-1"
            >
              {project.description ? (
                typeof project.description === 'string' ? (
                  <p className="text-text-300 leading-relaxed">{project.description}</p>
                ) : (
                  project.description
                )
              ) : (
                <div className="space-y-4">
                  <p className="text-text-300 leading-relaxed">
                    This is a detailed description of the {project.title} project.
                    Here you can add more information about the technologies used,
                    challenges faced, and solutions implemented.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-background-200 text-text-400 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex gap-3 mt-6 pt-4 border-t border-background-200"
            >
              <button
                className={cn(
                  'px-6 py-3 rounded-xl',
                  'bg-primary-500 text-white',
                  'hover:bg-primary-600 transition-colors',
                  'font-medium',
                )}
              >
                View Live
              </button>
              <button
                className={cn(
                  'px-6 py-3 rounded-xl',
                  'bg-background-200 text-text-500',
                  'hover:bg-background-300 transition-colors',
                  'font-medium',
                )}
              >
                Source Code
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ExpandedProjectCard;
import { motion } from 'motion/react';
import { type FC, useState } from 'react';
import type { Project } from '../data/projects';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick(): void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex flex-col rounded-3xl cursor-pointer overflow-hidden',
        'transition-colors duration-600',
        hovered && !isSelected ? 'bg-background-100' : 'bg-background-50',
        isSelected && 'pointer-events-none',
      )}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <motion.div
        layout
        layoutId={`card-image-container-${project.id}`}
        className="relative overflow-hidden"
        style={{ minHeight: '12rem' }}
      >
        <motion.img
          layoutId={`card-image-${project.id}`}
          src={project.thumbnail}
          alt={project.title}
          className={cn(
            'w-full h-full object-cover',
            !isSelected && 'transition-transform duration-600',
            hovered && !isSelected ? 'scale-105' : 'scale-100',
          )}
        />
      </motion.div>

      <motion.div
        layout
        layoutId={`card-content-${project.id}`}
        className={cn(
          'relative -mt-6 z-10',
          'flex flex-col gap-2 grow',
          'rounded-3xl p-2!',
          !isSelected && 'transition-all duration-600',
          hovered && !isSelected ? 'bg-primary-500 -mt-10' : 'bg-background-100',
          isSelected && 'bg-background-100 -mt-6',
        )}
      >
        {/* Текст быстро скрывается при выборе карточки */}
        <motion.div
          initial={false}
          animate={{ opacity: isSelected ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="w-full p-4 pb-0 font-[400] mb-2">
            {project.title}
          </h2>
          <h3 className="w-full p-4 pt-0 text-[18px] text-white/60">
            {project.subtitle}
          </h3>
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {project.keyPoints.map((point) => (
              <span
                key={point}
                className={cn(
                  'px-3 py-1 rounded-full text-[12px] font-medium transition-colors duration-600',
                  hovered && !isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                )}
              >
                {point}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
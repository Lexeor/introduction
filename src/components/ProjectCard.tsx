import { type FC, useState } from 'react';
import { cn } from '../lib/utils';
import type { Project } from '../pages/ProjectsSlide';

interface ProjectCardProps {
  project: Project;
  onClick?(): void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl w-full min-h-10 cursor-pointer overflow-hidden',
        'transition-colors duration-600',
        hovered ? 'bg-background-100' : 'bg-background-50',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative min-h-48 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-600',
            hovered ? 'scale-105' : 'scale-100',
          )}
        />
      </div>

      <div
        className={cn(
          'relative -mt-6 z-10',
          'flex flex-col gap-2 grow',
          'rounded-3xl p-2!',
          'transition-all duration-600',
          hovered ? 'bg-primary-500 -mt-10' : 'bg-background-100',
        )}
      >
        <h2 className="w-full p-4 pb-0 font-[400]">
          {project.title}
        </h2>
        <h3 className="w-full p-4 pt-0">
          {project.subtitle}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;
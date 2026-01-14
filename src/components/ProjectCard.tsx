import { type FC, useState } from 'react';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  title?: string;
  subtitle?: string;
  onClick?(): void;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, subtitle, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn('bg-[#222222] rounded-3xl w-full min-h-10 transition-colors duration-600 cursor-pointer',
      hovered ? 'bg-background-100' : 'bg-background-50',
    )}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={onClick}>
      <div className="min-h-48">

      </div>
      <div className={cn('flex flex-col gap-2', 'bg-[#2d2d2d] rounded-3xl p-2! transition-colors duration-600',
        hovered ? 'bg-primary-500' : 'bg-background-100',
      )}>
        <h2 className="w-full p-4 pb-0 font-[400]">
          {title}
        </h2>
        <h3 className="w-full p-4 pt-0">
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;
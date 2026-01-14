import { type FC, useState } from 'react';
import { cn } from '../lib/utils';

interface ProjectCardProps {

}

const ProjectCard: FC<ProjectCardProps> = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn('bg-[#222222] rounded-3xl w-full min-h-10 transition-colors duration-600',
      hovered ? 'bg-background-200' : 'bg-background-50',
    )}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
      <div className="h-12">

      </div>
      <div className={cn('bg-[#2d2d2d] rounded-3xl p-2! transition-colors duration-600',
        hovered ? 'bg-primary-500' : 'bg-background-100',
      )}>
        123
      </div>
    </div>
  );
};

export default ProjectCard;
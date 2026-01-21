import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/Container';
import ProjectCard from '../components/ProjectCard';

interface ProjectsSlideProps {
  onOpenProject: (projectId: string) => void;
}

export interface Project {
  title: string;
  subtitle: string;
  thumbnail: string;
  description?: string | ReactNode;
}

const projects = [
  {
    title: 'Kvarum',
    subtitle: 'Scheduling application for lectors and listeners to stay in touch',
    thumbnail: '/images/kvarum-thumb.jpg',
  },
  {
    title: 'Bus Tracker',
    subtitle: 'Platform for bus drivers to track their routes',
    thumbnail: '/images/bus-tracker-thumb.jpg',
  },
  {
    title: 'Craftistry',
    subtitle: 'Platform for artisans to sell their products',
    thumbnail: '/images/craftistry-thumb.jpg',
  },
];

const ProjectsSlide: FC<ProjectsSlideProps> = ({ onOpenProject }) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-2 w-full">
      <Container>
        <h1 className="text-[48px] md:text-[48px] mt-12 mb-6">
          {t('projects.title')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard project={projects[0]}
                       onClick={() => onOpenProject('configurator')} />
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSlide;



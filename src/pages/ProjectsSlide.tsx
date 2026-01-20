import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/Container';
import ProjectCard from '../components/ProjectCard';

interface ProjectsSlideProps {
  onOpenProject: (projectId: string) => void;
}

const ProjectsSlide: FC<ProjectsSlideProps> = ({ onOpenProject }) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-2 w-full">
      <Container>
        <h1 className="text-[48px] md:text-[48px] mt-12 mb-6">
          {t('projects.title')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard title="Kvarum" subtitle="Scheduling application for lectors and listeners to stay in touch"
                       onClick={() => onOpenProject('configurator')} />
          <ProjectCard title="Craftistry" subtitle="Platform for crafters to present and sell their production" />
          <ProjectCard title="Apartment Configurator Widget"
                       subtitle="React widget for apartment configuration using SVG files" />
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSlide;



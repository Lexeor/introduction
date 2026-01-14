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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectCard title="Kvarum" subtitle="Test project for debug" onClick={() => onOpenProject('configurator')} />
          <ProjectCard />
          <ProjectCard />
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSlide;



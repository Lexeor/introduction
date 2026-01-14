import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';

const ProjectsSlide: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col gap-2 w-full">
      <h1 className="text-[48px]! md:text-[72px]! font-bold! mt-12! mb-6!">
        {t('projects.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4!">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
};

export default ProjectsSlide;



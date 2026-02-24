import Container from '@/components/Container';
import ExpandedProjectCard from '@/components/ExpandedProjectCard';
import InlineSvg from '@/components/InlineSvg';
import Multilingual from '@/components/Multilingual';
import ProjectCard from '@/components/ProjectCard';
import { type Project, projects } from '@/data/projects';
import { useUIStore } from '@/store/useUIStore';
import { t } from 'i18next';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { type FC, memo, useCallback, useEffect, useState } from 'react';


const ProjectsHeader: FC<{ onTriggerLoading: () => void }> = memo(({ onTriggerLoading }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-24 w-full gap-4 relative z-10 mt-12">
    <motion.h1
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-[36px] md:text-[36px] lg:text-[48px] font-light"
    >
      <Multilingual translationKey="projects.title" />
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      onClick={onTriggerLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-primary-500 hover:border-primary-500 transition-colors text-sm font-medium select-none cursor-pointer"
    >
      <InlineSvg name="refresh" className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      {t('loading.reloadProjects')}
    </motion.div>
  </div>
));

const ProjectGrid: FC = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-12">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onSelect={handleSelectProject}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ExpandedProjectCard
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
});

const ProjectsSlide: FC = () => {
  const triggerLoading = useUIStore((state) => state.triggerLoading);

  return (
    <section className="relative flex flex-col gap-2 w-full min-h-screen">
      <Container className="flex flex-col gap-2 justify-center items-center min-h-screen relative overflow-hidden">
        <ProjectsHeader onTriggerLoading={triggerLoading} />
        <ProjectGrid />
      </Container>
    </section>
  );
};

export default ProjectsSlide;

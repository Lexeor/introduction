import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';
import Container from '../components/Container';
import ExpandedProjectCard from '../components/ExpandedProjectCard';
import Multilingual from '../components/Multilingual';
import ParticlesBackground from '../components/ParticlesBackground';
import ProjectCard from '../components/ProjectCard';
import { type Project, projects } from '../data/projects.tsx';

interface ProjectsSlideProps {
  scrollRef?: React.RefObject<any>;
}

const ProjectsSlide: FC<ProjectsSlideProps> = ({ scrollRef }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock scroll when project is expanded
  useEffect(() => {
    if (selectedProject) {
      // Lock OverlayScrollbars if available
      const osInstance = scrollRef?.current?.osInstance();
      if (osInstance) {
        osInstance.options({ overflow: { y: 'hidden' } });
      }
      // Also lock body scroll as fallback
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock OverlayScrollbars
      const osInstance = scrollRef?.current?.osInstance();
      if (osInstance) {
        osInstance.options({ overflow: { y: 'scroll' } });
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, scrollRef]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <section className="flex flex-col gap-2 w-full min-h-screen">
      <Container className="flex flex-col gap-2 justify-center items-center min-h-screen relative overflow-hidden">
        <ParticlesBackground
          id="projects-particles"
          active
          className="z-0"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[36px] md:text-[36px] lg:text-[48px] mb-12 lg:mb-24 relative font-light z-10 mt-12 w-full"
        >
          <Multilingual translationKey="projects.title" />
        </motion.h1>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-12"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onClick={() => handleSelectProject(project)}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedProject && (
              <ExpandedProjectCard
                project={selectedProject}
                onClose={handleCloseProject}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Container>
    </section>
  );
};

export default ProjectsSlide;
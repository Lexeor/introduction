import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/Container';
import ExpandedProjectCard from '../components/ExpandedProjectCard';
import ProjectCard from '../components/ProjectCard';

interface ProjectsSlideProps {
  scrollRef?: React.RefObject<any>;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  description?: string | ReactNode;
}

const projects: Project[] = [
  {
    id: 'kvarum',
    title: 'Kvarum',
    subtitle: 'Scheduling application for lectors and listeners to stay in touch',
    thumbnail: '/images/kvarum-thumb.jpg',
    description: 'A comprehensive scheduling platform that connects educators with their audience. Built with real-time synchronization, calendar integration, and notification systems.',
  },
  {
    id: 'bus-tracker',
    title: 'Bus Tracker',
    subtitle: 'Platform for bus drivers to track their routes',
    thumbnail: '/images/bus-tracker-thumb.jpg',
    description: 'Real-time GPS tracking solution for public transportation. Features include route optimization, delay predictions, and passenger information displays.',
  },
  {
    id: 'craftistry',
    title: 'Craftistry',
    subtitle: 'Platform for artisans to sell their products',
    thumbnail: '/images/craftistry-thumb.jpg',
    description: 'E-commerce marketplace tailored for handmade goods. Includes custom storefront builder, secure payments, and inventory management.',
  },
];

const ProjectsSlide: FC<ProjectsSlideProps> = ({ scrollRef }) => {
  const { t } = useTranslation();
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
    <section className="flex flex-col gap-2 w-full">
      <Container>
        <h1 className="text-[48px] md:text-[48px] mb-12">
          {t('projects.title')}
        </h1>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
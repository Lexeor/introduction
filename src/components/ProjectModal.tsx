import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  projectId: string;
  onClose: () => void;
}

const projects = {
  kvarum: {
    title: 'Kvarum App',
    description: 'Event management application with calendar functionality',
    tech: ['React', 'TypeScript', 'Calendar API'],
    image: 'url-to-image',
    link: 'https://kvarum.app',
  },
  configurator: {
    title: 'Apartment Configurator',
    description: 'Interactive SVG-based widget for apartment configuration',
    tech: ['React', 'TypeScript', 'SVG'],
    image: 'url-to-image',
    link: '#',
  },
};

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const project = projects[projectId as keyof typeof projects];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) {
    onClose();
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - фиксированный */}
        <div className="flex justify-between items-start p-8 pb-4 border-b">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content - с кастомным скроллом */}
        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: 'scroll',
              autoHideDelay: 1000,
            },
          }}
          className="max-h-[calc(90vh-100px)]"
        >
          <div className="p-8 pt-4 space-y-4">
            <p className="text-lg text-gray-700">{project.description}</p>

            <div>
              <h3 className="font-semibold mb-2">Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Project
              </a>
            )}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}
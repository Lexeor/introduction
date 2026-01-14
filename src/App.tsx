import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Menu from './components/Menu';
import ParallaxSlide from './components/ParallaxSlide';
import ProjectModal from './components/ProjectModal';
import ContactSlide from './pages/ContactSlide.tsx';
import GreetingsSlide from './pages/GreetingsSlide';
import ProjectsSlide from './pages/ProjectsSlide';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Инициализируем сразу из localStorage
  const [isInitialLanguageSelected, setIsInitialLanguageSelected] = useState(() => {
    return localStorage.getItem('i18nextUserSelected') === 'true';
  });
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef<any>(null);

  const projectId = searchParams.get('project');

  const handleOpenProject = (id: string) => {
    setSearchParams({ project: id });
  };

  const handleCloseProject = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleLanguageSelected = () => {
      setIsInitialLanguageSelected(true);
    };

    const checkLanguageSelection = () => {
      const userSelected = localStorage.getItem('i18nextUserSelected');
      setIsInitialLanguageSelected(userSelected === 'true');
    };

    window.addEventListener('languageSelected', handleLanguageSelected);
    window.addEventListener('storage', checkLanguageSelection);

    return () => {
      window.removeEventListener('languageSelected', handleLanguageSelected);
      window.removeEventListener('storage', checkLanguageSelection);
    };
  }, []);

  // Обновляем скролл при изменении isInitialLanguageSelected
  useEffect(() => {
    const osInstance = scrollRef.current?.osInstance();
    if (osInstance) {
      osInstance.options({
        overflow: {
          x: 'hidden',
          y: isInitialLanguageSelected ? 'scroll' : 'hidden',
        },
      });
    }
  }, [isInitialLanguageSelected]);

  const handleMenuItemClick = (index: number) => {
    const target = sectionsRef.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsRef.current;
      if (!sections.length) return;

      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const osInstance = scrollRef.current?.osInstance();
    const viewport = osInstance?.elements().viewport;

    if (viewport) {
      handleScroll();
      viewport.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        viewport.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <OverlayScrollbarsComponent
      ref={scrollRef}
      defer
      options={{
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 800,
          theme: 'os-theme-dark',
        },
        overflow: {
          x: 'hidden',
          // Устанавливаем начальное значение из state
          y: isInitialLanguageSelected ? 'scroll' : 'hidden',
        },
      }}
      className="h-screen"
    >
      <div className="bg-background-500 w-full min-h-screen">
        <Menu activeIndex={activeIndex} onItemClick={handleMenuItemClick} isVisible={isInitialLanguageSelected} />
        <main className="w-full">
          <section
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current[0] = el;
            }}
          >
            <GreetingsSlide />
          </section>

          <section
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current[1] = el;
            }}
          >
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl">Слайд 2</h2>
                <p className="text-secondary">Продолжайте прокручивать</p>
              </div>
            </ParallaxSlide>
          </section>

          <section
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current[2] = el;
            }}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <ProjectsSlide onOpenProject={handleOpenProject} />
            </div>
          </section>

          <section
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current[3] = el;
            }}
          >
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <ContactSlide />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-500 to-transparent w-full text-center">
                <div className="p-2">
                  © 2026
                </div>
              </div>
            </ParallaxSlide>
          </section>
        </main>

        {projectId && (
          <ProjectModal
            projectId={projectId}
            onClose={handleCloseProject}
          />
        )}
      </div>
    </OverlayScrollbarsComponent>
  );
}

export default App;
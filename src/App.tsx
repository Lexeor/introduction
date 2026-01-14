import { useEffect, useRef, useState } from 'react';
import Menu from './components/Menu';
import ParallaxSlide from './components/ParallaxSlide';
import GreetingsSlide from './pages/GreetingsSlide';
import ProjectsSlide from './pages/ProjectsSlide';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check if user has selected a language
    const checkLanguageSelection = () => {
      const userSelected = localStorage.getItem('i18nextUserSelected');
      setIsMenuVisible(userSelected === 'true');
    };

    // Check on mount
    checkLanguageSelection();

    // Listen for custom event when language is selected
    const handleLanguageSelected = () => {
      setIsMenuVisible(true);
    };

    window.addEventListener('languageSelected', handleLanguageSelected);
    // Also listen for storage changes (in case language is changed in another tab)
    window.addEventListener('storage', checkLanguageSelection);

    return () => {
      window.removeEventListener('languageSelected', handleLanguageSelected);
      window.removeEventListener('storage', checkLanguageSelection);
    };
  }, []);

  const handleMenuItemClick = (index: number) => {
    const target = sectionsRef.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const checkLanguageSelection = () => {
      const userSelected = localStorage.getItem('i18nextUserSelected');
      const menuVisible = userSelected === 'true';
      setIsMenuVisible(menuVisible);
    };

    checkLanguageSelection();

    const handleLanguageSelected = () => {
      setIsMenuVisible(true);
    };

    window.addEventListener('languageSelected', handleLanguageSelected);
    window.addEventListener('storage', checkLanguageSelection);

    return () => {
      window.removeEventListener('languageSelected', handleLanguageSelected);
      window.removeEventListener('storage', checkLanguageSelection);
    };
  }, []);

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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background-500 w-full min-h-screen">
      <Menu activeIndex={activeIndex} onItemClick={handleMenuItemClick} isVisible={isMenuVisible} />
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
          <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <ProjectsSlide />
          </div>
        </section>

        <section
          ref={(el: HTMLDivElement | null) => {
            sectionsRef.current[3] = el;
          }}
        >
          <ParallaxSlide
            imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl">Слайд 4</h2>
              <p className="text-secondary">Последний слайд</p>
            </div>
          </ParallaxSlide>
        </section>
      </main>
    </div>
  );
}

export default App;

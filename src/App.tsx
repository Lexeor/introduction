import LoadingScreen from '@/components/experimental/LoadingScreen.tsx';
import Menu from '@/components/Menu';
import ParallaxSlide from '@/components/ParallaxSlide';
import { useLanguageSelection } from '@/hooks/useLanguageSelection';
import { useOverlayScrollbarsOptions } from '@/hooks/useOverlayScrollbarsOptions';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import AboutMeSlide from '@/pages/AboutMeSlide';
import ContactSlide from '@/pages/ContactSlide';
import Footer from '@/pages/Footer.tsx';
import GreetingsSlide from '@/pages/GreetingsSlide';
import LuckyDay from '@/pages/LuckyDay.tsx';
import ProjectsSlide from '@/pages/ProjectsSlide';
import { useUIStore } from '@/store/useUIStore';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useRef } from 'react';
import { Toaster } from 'sonner';

function App() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollRef = useRef<any>(null);
  const { isGlobalLoading, isLanguageSelected } = useUIStore();
  useLanguageSelection(); // Initializing event listeners
  const scrollToSection = useSmoothScroll(sectionsRef);
  const activeIndex = useScrollTracking({
    scrollRef,
    sectionsRef,
    enabled: isLanguageSelected,
  });

  const isScrollEnabled = isLanguageSelected && !isGlobalLoading;

  useOverlayScrollbarsOptions({
    scrollRef,
    enabled: isScrollEnabled,
  });

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

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
          y: isScrollEnabled ? 'scroll' : 'hidden',
        },
      }}
      className="h-screen"
    >
      <div className="relative bg-background-500 w-full min-h-screen">
        <LoadingScreen />
        <Menu
          activeIndex={activeIndex}
          onItemClick={scrollToSection}
          isVisible={isLanguageSelected}
        />
        <Toaster position="bottom-center" theme="dark" closeButton />
        <main className="w-full">
          <section ref={setSectionRef(0)}>
            <GreetingsSlide
              scrollToSection={scrollToSection}
            />
          </section>

          <section ref={setSectionRef(1)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1700403984116-022e98f2ebe0?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <LuckyDay scrollRef={scrollRef} />
            </ParallaxSlide>
          </section>

          <section ref={setSectionRef(2)}>
            <AboutMeSlide scrollToSection={scrollToSection} />
          </section>

          <section ref={setSectionRef(3)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1700403984116-022e98f2ebe0?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <div className="flex flex-col items-center justify-center gap-4">
                <ProjectsSlide scrollRef={scrollRef} />
              </div>
            </ParallaxSlide>
          </section>

          <section ref={setSectionRef(4)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <ContactSlide />
              <Footer />
            </ParallaxSlide>
          </section>
        </main>
      </div>
    </OverlayScrollbarsComponent>
  );
}

export default App;
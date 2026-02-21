import LoadingScreen from '@/components/experimental/LoadingScreen.tsx';
import Menu from '@/components/Menu';
import ParallaxSlide from '@/components/ParallaxSlide';
import { useLanguageSelection } from '@/hooks/useLanguageSelection';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import AboutMeSlide from '@/pages/AboutMeSlide';
import ContactSlide from '@/pages/ContactSlide';
import ExpSlide from '@/pages/ExpSlide.tsx';
import Footer from '@/pages/Footer.tsx';
import GreetingsSlide from '@/pages/GreetingsSlide';
import LuckyDay from '@/pages/LuckyDay.tsx';
import ProjectsSlide from '@/pages/ProjectsSlide';
import { useUIStore } from '@/store/useUIStore';
import { useRef } from 'react';
import { Toaster } from 'sonner';

function App() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isGlobalLoading, isLanguageSelected } = useUIStore();
  useLanguageSelection();
  const scrollToSection = useSmoothScroll(sectionsRef);
  const activeIndex = useScrollTracking({
    scrollRef,
    sectionsRef,
    enabled: isLanguageSelected,
  });

  const isScrollEnabled = isLanguageSelected && !isGlobalLoading;

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

  return (
    <div
      ref={scrollRef}
      className={`h-screen overflow-x-hidden ${isScrollEnabled ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
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
            <ExpSlide scrollToSection={scrollToSection} />
          </section>

          <section ref={setSectionRef(5)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <ContactSlide />
              <Footer />
            </ParallaxSlide>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

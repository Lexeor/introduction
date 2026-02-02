import Menu from '@/components/Menu';
import ParallaxSlide from '@/components/ParallaxSlide';
import { useLanguageSelection } from '@/hooks/useLanguageSelection';
import { useOverlayScrollbarsOptions } from '@/hooks/useOverlayScrollbarsOptions';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import AboutMeSlide from '@/pages/AboutMeSlide';
import ContactSlide from '@/pages/ContactSlide';
import GreetingsSlide from '@/pages/GreetingsSlide';
import ProjectsSlide from '@/pages/ProjectsSlide';
import { motion } from 'framer-motion';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useRef } from 'react';
import { Toaster } from 'sonner';

function App() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollRef = useRef<any>(null);

  const isLanguageSelected = useLanguageSelection();
  const scrollToSection = useSmoothScroll(sectionsRef);
  const activeIndex = useScrollTracking({
    scrollRef,
    sectionsRef,
    enabled: isLanguageSelected,
  });

  useOverlayScrollbarsOptions({
    scrollRef,
    enabled: isLanguageSelected,
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
          y: isLanguageSelected ? 'scroll' : 'hidden',
        },
      }}
      className="h-screen"
    >
      <div className="bg-background-500 w-full min-h-screen">
        <Menu
          activeIndex={activeIndex}
          onItemClick={scrollToSection}
          isVisible={isLanguageSelected}
        />
        <Toaster position="bottom-center" theme="dark" closeButton />
        <main className="w-full">
          <section ref={setSectionRef(0)}>
            <GreetingsSlide
              isInitialLanguageSelected={isLanguageSelected}
              moveToNextSlide={scrollToSection}
            />
          </section>

          <section ref={setSectionRef(1)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <AboutMeSlide />
            </ParallaxSlide>
          </section>

          <section ref={setSectionRef(2)}>
            <div className="flex flex-col items-center justify-center gap-4">
              <ProjectsSlide scrollRef={scrollRef} />
            </div>
          </section>

          <section ref={setSectionRef(3)}>
            <ParallaxSlide
              imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <ContactSlide />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-500 to-transparent w-full text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 90,
                    delay: 1,
                    mass: 0.8,
                  }}
                  className="p-2 text-xs sm:text-sm text-text-400">Designed and developed by Alexander Tarasov © 2026
                </motion.div>
              </div>
            </ParallaxSlide>
          </section>
        </main>
      </div>
    </OverlayScrollbarsComponent>
  );
}

export default App;
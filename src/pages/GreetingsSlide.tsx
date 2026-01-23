import { ArrowDownIcon } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Container from '../components/Container';
import LanguageSelectionToast from '../components/LanguageSelectionToast';
import MaskedText from '../components/MaskedText';
import Multilingual from '../components/Multilingual';
import ParticlesBackground from '../components/ParticlesBackground';
import { cn } from '../lib/utils';

interface GreetingsSlideProps {
  isInitialLanguageSelected?: boolean;
  moveToNextSlide(index: number): void;
  children?: ReactNode;
}

const GreetingsSlide: FC<GreetingsSlideProps> = ({ isInitialLanguageSelected, moveToNextSlide }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isInitialLanguageSelected) {
      toast.custom(() => <LanguageSelectionToast />, {
        duration: Infinity,
        position: 'bottom-center',
        id: 'language-selection-toast',
      });
    } else {
      toast.dismiss('language-selection-toast');
    }
  }, [isInitialLanguageSelected]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container className="min-h-screen flex flex-col items-center justify-center gap-2 relative overflow-hidden">
      <ParticlesBackground
        id="greeting-particles"
        active={isVisible}
        className="z-0"
      />
      <div className="flex-grow flex flex-col items-center justify-end w-full relative z-10">
        <Multilingual as="h2" translationKey="greeting"
                      className="mb-2 text-[24px] sm:text-[32px] md:text-[32px] lg:text-[48px] font-light" />
        <Multilingual as="h2" translationKey="frontend.intro"
                      className="mb-8 text-[24px] sm:text-[32px] md:text-[32px] lg:text-[48px] font-light" />

        <div className="flex flex-col items-center min-h-[200px] justify-center text-center w-full">

          <div className="flex flex-col items-center animate-in fade-in duration-1000 w-full overflow-hidden">
            <MaskedText
              text={t('frontend.mask')}
              className="text-[16vw] leading-[0.8]"
            />
            <span className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.3em] uppercase text-text-500">
              {t('frontend.developer')}
            </span>
          </div>
        </div>
      </div>

      <div className={cn('flex-grow h-full flex flex-col items-center w-full relative z-10',
        isInitialLanguageSelected ? 'justify-center' : 'justify-start')}>
        {isInitialLanguageSelected && (
          <button
            className="h-full flex items-center justify-center motion-safe:animate-bounce mt-10"
            onClick={() => moveToNextSlide(1)}
          >
            <ArrowDownIcon strokeWidth={1}
                           className="border-1 border-text-500 rounded-full p-1 w-12 h-12 opacity-50 hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>
    </Container>
  );
};

export default GreetingsSlide;
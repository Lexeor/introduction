import { ArrowDownIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import Container from '../components/Container';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Multilingual from '../components/Multilingual';
import { cn } from '../lib/utils';

interface GreetingsSlideProps {
  isInitialLanguageSelected?: boolean;
  moveToNextSlide(index: number): void;
  children?: ReactNode;
}

const GreetingsSlide: FC<GreetingsSlideProps> = ({ isInitialLanguageSelected, moveToNextSlide }) => {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center gap-2">
      <div className="flex-grow flex flex-col items-center justify-end">
        <Multilingual as="h2" translationKey="greeting" className="mb-4" />
        <Multilingual as="h3" translationKey="frontend.pre" className="mb-6" />
        <Multilingual as="h1" translationKey="frontend.dev" className="text-primary-500 font-[600]!" />
      </div>

      <div className={cn('flex-grow h-full flex flex-col items-center',
        isInitialLanguageSelected ? 'justify-center' : 'justify-start')}>
        {!isInitialLanguageSelected ? <>
          <Multilingual as="h3" translationKey="selectLanguage" className="mt-8 max-w-[500px]" />
          <LanguageSwitcher />
        </> : (
          <button className="h-full flex items-center justify-center" onClick={() => moveToNextSlide(1)}>
            <ArrowDownIcon strokeWidth={1} className="border-1 border-text-500 rounded-full p-1 w-12 h-12" />
          </button>
        )}
      </div>
    </Container>
  );
};

export default GreetingsSlide;
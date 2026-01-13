import type { FC, ReactNode } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher.tsx';
import Multilingual from '../components/Multilingual.tsx';
import enTranslations from '../i18n/locales/en.json';
import ruTranslations from '../i18n/locales/ru.json';

interface GreetingsSlideProps {
  children?: ReactNode;
}

const GreetingsSlide: FC<GreetingsSlideProps> = () => {
  // Get all language versions of the greeting
  const greetingValues = [
    enTranslations.greeting,
    ruTranslations.greeting,
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Multilingual values={greetingValues} className="text-[72px] max-w-[200px]" />
      <LanguageSwitcher />
    </div>
  );
};

export default GreetingsSlide;

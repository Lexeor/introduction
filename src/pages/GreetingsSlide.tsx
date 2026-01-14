import type { FC, ReactNode } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher.tsx';
import Multilingual from '../components/Multilingual.tsx';

interface GreetingsSlideProps {
  children?: ReactNode;
}

const GreetingsSlide: FC<GreetingsSlideProps> = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <Multilingual as="h4" translationKey="greeting" className="text-[16px]" />
      <Multilingual as="h2" translationKey="frontend.pre" className="text-[18px]" />
      <Multilingual as="h1" translationKey="frontend.dev" className="text-[42px]" />
      <LanguageSwitcher />
    </div>
  );
};

export default GreetingsSlide;

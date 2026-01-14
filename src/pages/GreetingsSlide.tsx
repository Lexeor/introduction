import type { FC, ReactNode } from 'react';
import Container from '../components/Container';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Multilingual from '../components/Multilingual';

interface GreetingsSlideProps {
  children?: ReactNode;
}

const GreetingsSlide: FC<GreetingsSlideProps> = () => {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Multilingual as="h4" translationKey="greeting" className="text-[16px]" />
      <Multilingual as="h2" translationKey="frontend.pre" className="text-[18px]" />
      <Multilingual as="h1" translationKey="frontend.dev" className="text-[42px] text-primary-500" />
      <LanguageSwitcher />
    </Container>
  );
};

export default GreetingsSlide;

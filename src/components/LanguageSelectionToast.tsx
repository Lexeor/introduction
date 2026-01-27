import { LanguagesIcon } from 'lucide-react';
import type { FC } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Multilingual from '@/components/Multilingual';

const LanguageSelectionToast: FC = () => {
  return (
    <div
      className="relative min-h-64 bg-green-900/30 p-6 rounded-2xl font-light shadow-xl flex flex-col items-center justify-between gap-4 min-w-[300px] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      <LanguagesIcon size={164} strokeWidth={2.5} className="absolute -top-2 -left-2 opacity-3" />
      <Multilingual as="h3" translationKey="selectLanguage" className="text-xl" />
      <LanguageSwitcher />
    </div>
  );
};

export default LanguageSelectionToast;

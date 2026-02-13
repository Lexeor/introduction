import { LANGUAGES } from '@/i18n/languages';
import { motion } from 'motion/react';
import { type FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextUserSelected', 'true');
    window.dispatchEvent(new CustomEvent('languageSelected'));
    toast.dismiss('language-selection-toast');
  };

  console.log('\x1b[31m%s\x1b[0m', 'LANGUAGES', LANGUAGES);

  return (
    <div className="flex gap-2 p-2">
      {LANGUAGES.map((lang) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="flex flex-col gap-1 items-center relative px-3! py-1! rounded! text-sm font-medium transition-colors bg-panel! cursor-pointer"
        >
          <ReactCountryFlag countryCode={lang.countryCode} svg
                            className="w-12! h-12!" />
          {lang.label}
        </motion.div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;


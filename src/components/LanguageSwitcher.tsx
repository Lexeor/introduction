import { motion } from 'motion/react';
import { type FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextUserSelected', 'true');
    window.dispatchEvent(new CustomEvent('languageSelected'));
    toast.dismiss('language-selection-toast');
  };

  return (
    <div className="flex gap-2 p-2">
      {languages.map((lang) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="flex flex-col gap-1 items-center relative px-3! py-1! rounded! text-sm font-medium transition-colors bg-panel! cursor-pointer"
        >
          <ReactCountryFlag countryCode={lang.code === 'en' ? 'GB' : lang.code} svg
                            className="w-12! h-12!" />
          {lang.label}
        </motion.div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;


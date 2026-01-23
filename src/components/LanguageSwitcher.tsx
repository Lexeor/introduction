import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Mark that user has explicitly selected a language
    localStorage.setItem('i18nextUserSelected', 'true');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageSelected'));
    // Dismiss language selection toast
    toast.dismiss('language-selection-toast');
  };

  return (
    <div className="flex gap-2 p-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="px-3! py-1! rounded! text-sm font-medium transition-colors bg-panel! cursor-pointer!"
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;


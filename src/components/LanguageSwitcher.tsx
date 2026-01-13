import { useTranslation } from 'react-i18next';
import { type FC } from 'react';

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
  };

  return (
    <div className="flex gap-2 p-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            i18n.language === lang.code
              ? 'bg-panel-item text-foreground'
              : 'bg-panel text-foreground/70 hover:bg-panel-item'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;


import { useEffect, useState } from 'react';

const LANGUAGE_SELECTED_KEY = 'i18nextUserSelected';

export const useLanguageSelection = () => {
  const [isLanguageSelected, setIsLanguageSelected] = useState(() => {
    return localStorage.getItem(LANGUAGE_SELECTED_KEY) === 'true';
  });

  useEffect(() => {
    const handleLanguageSelected = () => {
      setIsLanguageSelected(true);
    };

    const handleStorageChange = () => {
      const userSelected = localStorage.getItem(LANGUAGE_SELECTED_KEY);
      setIsLanguageSelected(userSelected === 'true');
    };

    window.addEventListener('languageSelected', handleLanguageSelected);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languageSelected', handleLanguageSelected);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isLanguageSelected;
};
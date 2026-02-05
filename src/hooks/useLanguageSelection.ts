import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

const LANGUAGE_SELECTED_KEY = 'i18nextUserSelected';

export const useLanguageSelection = () => {
  const setIsLanguageSelected = useUIStore((state) => state.setIsLanguageSelected);
  const isLanguageSelected = useUIStore((state) => state.isLanguageSelected);

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
  }, [setIsLanguageSelected]);

  return isLanguageSelected;
};
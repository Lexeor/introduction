import { AnimatePresence, motion } from 'motion/react';
import { type ElementType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languageOrder = ['en', 'ru']; // Match the order in LanguageSwitcher

interface MultilingualProps<T extends ElementType = 'span'> {
  translationKey: string;
  interval?: number;
  selectedLanguage?: number;
  align?: 'left' | 'center' | 'right';
  as?: T;
  className?: string;
}

const Multilingual = <T extends ElementType = 'span'>({
  translationKey,
  interval = 5000,
  selectedLanguage,
  align = 'center',
  as,
  className,
}: MultilingualProps<T>) => {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasSavedLanguage, setHasSavedLanguage] = useState<boolean>(false);

  // Check if language was explicitly selected by user (not just auto-detected)
  useEffect(() => {
    const checkUserSelectedLanguage = () => {
      const userSelected = localStorage.getItem('i18nextUserSelected');
      setHasSavedLanguage(userSelected === 'true');
    };
    
    // Check on mount and when language changes
    checkUserSelectedLanguage();
    
    // Also listen for storage changes (in case language is changed in another tab)
    window.addEventListener('storage', checkUserSelectedLanguage);
    
    return () => {
      window.removeEventListener('storage', checkUserSelectedLanguage);
    };
  }, [i18n.language]);

  // Build translations for all configured languages based on the provided key
  const values = languageOrder.map((lng) => {
    const fixedT = i18n.getFixedT(lng);
    return fixedT(translationKey);
  });

  useEffect(() => {
    // If language is saved in localStorage, don't auto-switch
    // If selectedLanguage is explicitly provided, use it
    if (hasSavedLanguage || selectedLanguage !== undefined || values.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, interval);

    return () => clearInterval(timer);
  }, [values.length, interval, selectedLanguage, hasSavedLanguage]);

  if (values.length === 0) {
    return null;
  }

  // Determine which index to display
  // If language is saved, find the index matching current language
  let displayIndex: number;
  if (hasSavedLanguage && selectedLanguage === undefined) {
    // Find the index that matches the current language
    // Extract base language code (e.g., "en" from "en-US")
    const baseLanguage = i18n.language.split('-')[0].toLowerCase();
    const currentLangIndex = languageOrder.indexOf(baseLanguage);
    displayIndex = currentLangIndex >= 0 && currentLangIndex < values.length ? currentLangIndex : 0;
  } else if (selectedLanguage !== undefined) {
    displayIndex = selectedLanguage;
  } else {
    displayIndex = currentIndex;
  }

  // Validate index
  const safeDisplayIndex: number = displayIndex >= 0 && displayIndex < values.length ? displayIndex : 0;

  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  const Element = (as ?? 'span') as ElementType;

  return (
    <div className={`relative block min-h-[1.2em] w-full ${alignClass} ${className ?? ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={hasSavedLanguage ? `saved-${safeDisplayIndex}` : selectedLanguage !== undefined ? `selected-${safeDisplayIndex}` : `auto-${safeDisplayIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
        >
          <Element>{values[safeDisplayIndex]}</Element>
        </motion.div>
      </AnimatePresence>
      {/* Invisible element to maintain layout space */}
      <span className="invisible">
        <Element>{values[safeDisplayIndex]}</Element>
      </span>
    </div>
  );
};

export default Multilingual;

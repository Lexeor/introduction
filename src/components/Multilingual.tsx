import { AnimatePresence, motion } from 'motion/react';
import { type ElementType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languageOrder = ['en', 'ru'];

interface MultilingualProps<T extends ElementType = 'span'> {
  translationKey: string;
  interval?: number;
  selectedLanguage?: number;
  align?: 'left' | 'center' | 'right';
  as?: T;
  className?: string;
  inline?: boolean;
  elemId?: string;
  onClick?(): void;
}

const Multilingual = <T extends ElementType = 'span'>({
  translationKey,
  interval = 5000,
  selectedLanguage,
  align = 'center',
  as,
  className,
  inline = false,
  elemId,
  onClick,
}: MultilingualProps<T>) => {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasSavedLanguage, setHasSavedLanguage] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSelectedLanguage = () => {
      const userSelected = localStorage.getItem('i18nextUserSelected');
      setHasSavedLanguage(userSelected === 'true');
    };
    checkUserSelectedLanguage();
    window.addEventListener('storage', checkUserSelectedLanguage);
    return () => window.removeEventListener('storage', checkUserSelectedLanguage);
  }, [i18n.language]);

  const values = languageOrder.map((lng) => {
    const fixedT = i18n.getFixedT(lng);
    return fixedT(translationKey);
  });

  useEffect(() => {
    if (hasSavedLanguage || selectedLanguage !== undefined || values.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, interval);
    return () => clearInterval(timer);
  }, [values.length, interval, selectedLanguage, hasSavedLanguage]);

  if (values.length === 0) return null;

  let targetIndex: number;
  if (hasSavedLanguage && selectedLanguage === undefined) {
    const baseLanguage = i18n.language.split('-')[0].toLowerCase();
    const currentLangIndex = languageOrder.indexOf(baseLanguage);
    targetIndex = currentLangIndex >= 0 && currentLangIndex < values.length ? currentLangIndex : 0;
  } else if (selectedLanguage !== undefined) {
    targetIndex = selectedLanguage;
  } else {
    targetIndex = currentIndex;
  }

  const safeTargetIndex = targetIndex >= 0 && targetIndex < values.length ? targetIndex : 0;

  const [ghostIndex, setGhostIndex] = useState(safeTargetIndex);
  const [renderIndex, setRenderIndex] = useState<number | null>(safeTargetIndex);

  useEffect(() => {
    if (safeTargetIndex !== renderIndex && renderIndex !== null) {
      setRenderIndex(null);
    } else if (renderIndex === null && safeTargetIndex === ghostIndex) {
      setRenderIndex(safeTargetIndex);
    }
  }, [safeTargetIndex, renderIndex, ghostIndex]);

  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
  const Element = (as ?? 'span') as ElementType;

  return (
    <motion.div
      id={elemId}
      layout
      onLayoutAnimationComplete={() => {
        setTimeout(() => {
          if (renderIndex === null) {
            setRenderIndex(safeTargetIndex);
          }
        }, 50);
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`relative ${inline ? 'inline-block' : 'block w-full'} min-h-[1.2em] overflow-hidden ${alignClass} ${className ?? ''}`}
      onClick={onClick}
    >
      <div className="invisible pointer-events-none select-none px-0.5" aria-hidden="true">
        <Element className={className}>{values[ghostIndex]}</Element>
      </div>

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (ghostIndex === safeTargetIndex) {
            setRenderIndex(safeTargetIndex);
          } else {
            setGhostIndex(safeTargetIndex);
          }
        }}
      >
        {renderIndex !== null && (
          <motion.div
            key={renderIndex}
            layout="position"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute inset-0 flex items-center ${justifyClass} whitespace-pre-wrap`}
          >
            <Element className={className}>{values[renderIndex]}</Element>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Multilingual;

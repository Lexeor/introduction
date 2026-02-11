import MenuItem from '@/components/MenuItem';
import { Contact2Icon, FileTextIcon, FolderOpenDotIcon, HandshakeIcon, StarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { type FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface MenuProps {
  activeIndex: number;
  onItemClick: (index: number) => void;
  isVisible: boolean;
}

const Menu: FC<MenuProps> = ({ activeIndex, onItemClick, isVisible }) => {
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
    <motion.div
      className="fixed left-0 top-0 h-screen md:p-2 flex flex-col gap-2 justify-center z-50 bg-transparent pointer-events-none"
      initial={{ x: '-100%' }}
      animate={{ x: isVisible ? '0px' : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div
        className="bg-black/30 backdrop-blur-lg flex flex-col gap-0 md:gap-2 rounded-r-xl rounded-l-none md:rounded-xl p-1 pointer-events-auto">
        <MenuItem isActive={activeIndex === 0} onClick={() => onItemClick(0)}>
          <HandshakeIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 1} onClick={() => onItemClick(1)}>
          <StarIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 2} onClick={() => onItemClick(2)}>
          <FileTextIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 3} onClick={() => onItemClick(3)}>
          <FolderOpenDotIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 4} onClick={() => onItemClick(4)}>
          <Contact2Icon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
      </div>

      <div
        className="bg-black/30 backdrop-blur-lg flex flex-col gap-0 md:gap-2 rounded-r-xl rounded-l-none md:rounded-xl p-1 pointer-events-auto">
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            isActive={i18n.language === lang.code}
            onClick={() => changeLanguage(lang.code)}
            showChildrenOnMobile={true}
          >
            <ReactCountryFlag
              countryCode={lang.code === 'en' ? 'GB' : lang.code}
              svg
              className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </MenuItem>
        ))}
      </div>
    </motion.div>
  );
};

export default Menu;
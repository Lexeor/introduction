import InlineSvg from '@/components/InlineSvg.tsx';
import MenuItem from '@/components/MenuItem';
import { LANGUAGES } from '@/i18n/languages';
import Tippy, { useSingleton } from '@tippyjs/react';
import { motion } from 'motion/react';
import { type FC, useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import 'tippy.js/dist/tippy.css';

interface MenuProps {
  activeIndex: number;
  onItemClick: (index: number) => void;
  isVisible: boolean;
}

const HiIcon = (props: any) => <InlineSvg name="hi" {...props} />;
const BioIcon = (props: any) => <InlineSvg name="skills" {...props} />;
const ProjectsIcon = (props: any) => <InlineSvg name="projects" {...props} />;
const ContactsIcon = (props: any) => <InlineSvg name="contacts" {...props} />;
const StarIcon = (props: any) => <InlineSvg name="star" {...props} />;

const Menu: FC<MenuProps> = ({ activeIndex, onItemClick, isVisible }) => {
  const { t, i18n } = useTranslation();
  const [source, target] = useSingleton();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextUserSelected', 'true');
    window.dispatchEvent(new CustomEvent('languageSelected'));
    toast.dismiss('language-selection-toast');
  };

  const menuItems = useMemo(() => [
    {
      icon: HiIcon,
      label: t('menu.intro'),
      onClick: () => onItemClick(0),
      isActive: activeIndex === 0,
    },
    { icon: StarIcon, label: t('menu.bio'), onClick: () => onItemClick(1), isActive: activeIndex === 1 },
    { icon: BioIcon, label: t('menu.skills'), onClick: () => onItemClick(2), isActive: activeIndex === 2 },
    { icon: ProjectsIcon, label: t('menu.projects'), onClick: () => onItemClick(3), isActive: activeIndex === 3 },
    { icon: ContactsIcon, label: t('menu.contact'), onClick: () => onItemClick(4), isActive: activeIndex === 4 },
  ], [activeIndex, onItemClick, t]);

  return (
    <>
      <Tippy
        singleton={source}
        moveTransition="transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)"
        placement="right"
        offset={[0, 10]}
        arrow={false}
        animation={false}
        hideOnClick={false}
        touch={false}
        popperOptions={{
          strategy: 'fixed',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left', 'bottom', 'top'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
                tether: false,
              },
            },
          ],
        }}
        onTrigger={(instance) => {
          const content = instance.reference.getAttribute('data-tooltip');
          if (content) setActiveTooltip(content);
        }}
        onHide={() => setActiveTooltip(null)}
        render={(attrs) => (
          <div {...attrs} className="z-[9999] pointer-events-none">
            {activeTooltip && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, x: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -10 }}
                transition={{
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                  opacity: { duration: 0.2 },
                  x: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="bg-background-200/90 rounded-xl px-3 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl border border-white/10"
              >
                <span className="text-xs text-white/90 font-medium tracking-wide whitespace-nowrap block">
                  {activeTooltip}
                </span>
              </motion.div>
            )}
          </div>
        )}
      />

      <motion.div
        className="fixed left-0 top-0 h-screen md:p-2 flex flex-col gap-2 justify-center z-50 bg-transparent pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: isVisible ? '0px' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          className="bg-black/30 backdrop-blur-lg flex flex-col gap-0 md:gap-2 rounded-r-xl rounded-l-none md:rounded-xl p-1 pointer-events-auto">
          {menuItems.map((item, i) => (
            <Tippy key={i} singleton={target}>
              <div
                data-tooltip={item.label}
                onMouseEnter={() => setActiveTooltip(item.label)}
              >
                <MenuItem isActive={item.isActive} onClick={item.onClick}>
                  <item.icon className="h-5 md:h-6" strokeWidth={1} />
                </MenuItem>
              </div>
            </Tippy>
          ))}
        </div>

        <div
          className="bg-black/30 backdrop-blur-lg flex flex-col gap-0 md:gap-2 rounded-r-xl rounded-l-none md:rounded-xl p-1 pointer-events-auto">
          {LANGUAGES.map((lang) => (
            <Tippy key={lang.code} singleton={target}>
              <div
                data-tooltip={lang.label}
                onMouseEnter={() => setActiveTooltip(lang.label)}
              >
                <MenuItem
                  isActive={i18n.language === lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  showChildrenOnMobile={true}
                >
                  <ReactCountryFlag
                    countryCode={lang.countryCode}
                    svg
                    className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                </MenuItem>
              </div>
            </Tippy>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Menu;
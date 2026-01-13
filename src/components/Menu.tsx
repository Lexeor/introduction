import { Contact2Icon, FileTextIcon, HandshakeIcon, UserIcon } from 'lucide-react';
import { type FC } from 'react';
import MenuItem from './MenuItem';

interface MenuProps {
  activeIndex: number;
  onItemClick: (index: number) => void;
}

const Menu: FC<MenuProps> = ({ activeIndex, onItemClick }) => {
  return (
    <div className="fixed left-0 top-0 h-screen p-2 flex flex-col gap-2 justify-center z-50">
      <div className="bg-panel rounded-xl p-2">
        <MenuItem isActive={activeIndex === 0} onClick={() => onItemClick(0)}>
          <HandshakeIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 1} onClick={() => onItemClick(1)}>
          <UserIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 2} onClick={() => onItemClick(2)}>
          <FileTextIcon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
        <MenuItem isActive={activeIndex === 3} onClick={() => onItemClick(3)}>
          <Contact2Icon className="h-5 md:h-6 lg:h-8" strokeWidth={1} />
        </MenuItem>
      </div>
    </div>
  );
};

export default Menu;
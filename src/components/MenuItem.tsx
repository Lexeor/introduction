import { type FC, type PropsWithChildren } from 'react';

interface MenuItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ children, isActive = false, onClick }) => {
  return (
    <div
      className={`rounded-lg w-8 h-8 md:w-10 md:h-10 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer transition-colors duration-400 ${
        isActive ? 'bg-panel-item-active' : 'bg-panel-item'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
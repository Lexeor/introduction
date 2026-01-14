import { type FC, type PropsWithChildren } from 'react';

interface MenuItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ children, isActive = false, onClick }) => {
  return (
    <div
      className="w-5 h-5 md:w-10 md:h-10 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Mobile */}
      <div
        className={`md:hidden rounded-full transition-all duration-300 m-1 ${
          isActive ? 'w-3 h-3 bg-panel-item-active ring-1 ring-white/20' : 'w-1.5 h-1.5 bg-white/25 ring-1 ring-white/30'
        }`}
      />

      {/* Desktop */}
      <div
        className={`hidden md:flex rounded-lg w-10 h-10 lg:h-12 lg:w-12 items-center justify-center transition-colors duration-400 ${
          isActive ? 'bg-primary-500' : 'bg-panel-item'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItem;
import React from 'react';
import { asset } from '@/lib/assets';

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, className = '', ...props }) => {
  const iconPath = asset(`/icons/${name}.svg`);

  return (
    // @ts-expect-error Known and intended
    <img
      src={iconPath}
      alt={`${name} icon`}
      className={className}
      {...props}
    />
  );
};

export default SvgIcon;
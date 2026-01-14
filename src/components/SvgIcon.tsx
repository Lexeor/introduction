import React from 'react';

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, className = '', ...props }) => {
  const iconPath = `/icons/${name}.svg`;

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
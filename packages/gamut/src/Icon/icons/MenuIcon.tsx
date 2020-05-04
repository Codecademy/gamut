import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const MenuIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <g fillRule="nonzero">
        <path d="M20 11v2H4v-2zM20 17v2H4v-2zM20 5v2H4V5z" />
      </g>
    </svg>
  );
};

MenuIcon.defaultProps = defaultIconProps;

export default MenuIcon;

import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export default function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <g fillRule="nonzero">
        <path d="M20 11v2H4v-2zM20 17v2H4v-2zM20 5v2H4V5z" />
      </g>
    </svg>
  );
}

MenuIcon.defaultProps = defaultIconProps;

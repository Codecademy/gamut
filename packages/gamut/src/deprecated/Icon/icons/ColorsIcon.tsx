import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ColorsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Colors Icon</title>
      <path d="M8 14A5 5 0 1 0 8 4a5 5 0 0 0 0 10zm0 1A6 6 0 1 1 8 3a6 6 0 0 1 0 12z" />
      <path d="M16 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
      <path d="M12 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
    </svg>
  );
};

ColorsIcon.defaultProps = defaultIconProps;

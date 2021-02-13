import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ChevronRightIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Chevron Right Icon</title>
      <path d="M13.94 12.06L6.645 4.769l1.415-1.414 8.707 8.707-8.707 8.707-1.415-1.414z" />
    </svg>
  );
};

ChevronRightIcon.defaultProps = defaultIconProps;

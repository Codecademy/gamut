import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ChevronLeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Chevron Left Icon</title>
      <path d="M9.475 12.06l7.293 7.294-1.414 1.414-8.708-8.707 8.708-8.707 1.414 1.414z" />
    </svg>
  );
};

ChevronLeftIcon.defaultProps = defaultIconProps;

export default ChevronLeftIcon;

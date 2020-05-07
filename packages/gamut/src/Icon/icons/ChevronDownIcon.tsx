import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ChevronDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Chevron Down Icon</title>
      <path d="M20.293 7.293l1.414 1.414L12 18.414 2.293 8.707l1.414-1.414L12 15.586z" />
    </svg>
  );
};

ChevronDownIcon.defaultProps = defaultIconProps;

export default ChevronDownIcon;

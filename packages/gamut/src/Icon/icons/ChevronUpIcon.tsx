import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ChevronUpIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Chevron Up Icon</title>
      <path d="M20.293 18.414L21.707 17 12 7.293 2.293 17l1.414 1.414L12 10.121z" />
    </svg>
  );
};

ChevronUpIcon.defaultProps = defaultIconProps;

export default ChevronUpIcon;

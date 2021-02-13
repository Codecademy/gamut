import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const CheckmarkIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Checkmark Icon</title>
      <path
        d="m18 2-12 12-5.5-5.5 1.41-1.41 4.09 4.08 10.59-10.58z"
        transform="translate(3 5)"
      />
    </svg>
  );
};

CheckmarkIcon.defaultProps = defaultIconProps;

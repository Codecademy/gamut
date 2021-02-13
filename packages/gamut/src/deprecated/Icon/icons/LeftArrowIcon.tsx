import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const LeftArrowIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg transform="rotate(180)" {...props}>
      <title>Left Arrow Icon</title>
      <path
        d="M4 10.92v2h12l-5.5 5.5 1.42 1.42 7.92-7.92L11.92 4 10.5 5.42l5.5 5.5z"
        fillRule="nonzero"
      />
    </svg>
  );
};

LeftArrowIcon.defaultProps = defaultIconProps;

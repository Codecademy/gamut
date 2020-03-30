import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const PracticeIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Practice Icon</title>
      <g transform="rotate(-45 19.071 9.485)" fillRule="evenodd">
        <path d="M9 4.667h7.111v3.556H9z" />
        <rect x="17" width="4" height="12" rx="1" />
        <rect x="4" width="4" height="12" rx="1" />
        <rect x="22" y="2" width="3" height="8" rx="1" />
        <rect y="2" width="3" height="8" rx="1" />
      </g>
    </svg>
  );
};

PracticeIcon.defaultProps = defaultIconProps;

export default PracticeIcon;

import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const TDDIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>TDD Icon</title>
      <g transform="translate(7 3)">
        <rect
          fill="none"
          stroke="currentColor"
          x=".5"
          y=".5"
          width="9"
          height="17"
          rx="1"
        />
        <path d="M3.968 12.337l1.642 1.642a.26.26 0 0 0 .369-.37l-1.642-1.641a.26.26 0 0 0-.37.369z" />
        <path d="M5.979 12.337l-1.642 1.642a.26.26 0 0 1-.37-.37l1.643-1.641a.26.26 0 0 1 .369.369z" />
        <path d="M5 15.935a2.935 2.935 0 1 1 0-5.87 2.935 2.935 0 0 1 0 5.87zm0-.652a2.283 2.283 0 1 0 0-4.566 2.283 2.283 0 0 0 0 4.566z" />
        <path d="M5 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM3.966 4.744a.273.273 0 1 0-.386.386l.964.964c.107.106.28.106.386 0L6.513 4.51a.273.273 0 1 0-.386-.386l-1.39 1.39-.771-.771z" />
      </g>
    </svg>
  );
};

TDDIcon.defaultProps = defaultIconProps;

export default TDDIcon;

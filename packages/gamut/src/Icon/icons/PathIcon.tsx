import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const PathIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Path Icon</title>
      <g fill="none" fillRule="evenodd">
        <path stroke="currentColor" d="M5 21h7v-6M12 9V3h7" />
        <circle stroke="currentColor" strokeWidth="2" cx="12" cy="12" r="2" />
        <circle stroke="currentColor" strokeWidth="2" cx="3" cy="21" r="2" />
        <circle stroke="currentColor" strokeWidth="2" cx="21" cy="3" r="2" />
      </g>
    </svg>
  );
};

PathIcon.defaultProps = defaultIconProps;

export default PathIcon;

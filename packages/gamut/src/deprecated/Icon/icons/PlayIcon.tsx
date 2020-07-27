import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const PlayIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Play Icon</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="m15 10-8 5v-10z"
          fill="currentColor"
          transform="translate(2 2)"
        />
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" />
      </g>
    </svg>
  );
};

PlayIcon.defaultProps = defaultIconProps;

export default PlayIcon;

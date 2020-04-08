import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const MatplotLibIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>MatplotLib Icon</title>
      <g transform="translate(2 2)" fill="none">
        <g fill="currentColor">
          <path d="M14.143 18.437c1.446-.64 2.936-2.183 3.857-3.437l-8-5 4.143 8.437zM4.703 8c-.408.916-.701 1.06-.703 2-.002 1.213.408 1.963 1 3l5-3-5.297-2zM15 7.272c-.639-.988-1.24-1.741-2.268-2.272L10 10l5-2.728z" />
          <path d="M7 15c.95.693 1.85.873 3 1v-6l-3 5zM10 1c-2.345 0-4.398.546-6 2l6 7V1z" />
        </g>
        <g stroke="currentColor">
          <circle cx="10" cy="10" r="9.5" />
          <circle cx="10" cy="10" r="7.5" />
          <circle cx="10" cy="10" r="5.5" />
          <circle cx="10" cy="10" r="3.5" />
        </g>
      </g>
    </svg>
  );
};

MatplotLibIcon.defaultProps = defaultIconProps;

export default MatplotLibIcon;

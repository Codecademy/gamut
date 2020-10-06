import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const MaintenanceIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Maintenance Icon</title>
      <g transform="translate(2 2)">
        <circle cx="10" cy="10" r="10" />
        <path
          d="M8.5 4v3H8V5.157a5.772 5.772 0 0 0-.975.458A5.763 5.763 0 0 0 4.254 10h11.463c.018.166.03.333.033.5a5.762 5.762 0 0 0-2.92-4.948 5.772 5.772 0 0 0-.83-.38V7h-.5V4h-1.268v1.5h-.5V4H8.5zm7.25 6.5H3.5c-.277 0-.5.223-.5.5v.5c0 .277.223.5.5.5h13c.277 0 .5-.223.5-.5V11c0-.277-.223-.5-.5-.5h-.75zm-5.768-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          fill="#FFF"
        />
      </g>
    </svg>
  );
};

MaintenanceIcon.defaultProps = defaultIconProps;

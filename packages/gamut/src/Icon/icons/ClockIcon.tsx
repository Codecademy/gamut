import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ClockIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Clock Icon</title>
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-18a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10-5.53 0-10-4.5-10-10C2 6.477 6.477 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
    </svg>
  );
};

ClockIcon.defaultProps = defaultIconProps;

export default ClockIcon;

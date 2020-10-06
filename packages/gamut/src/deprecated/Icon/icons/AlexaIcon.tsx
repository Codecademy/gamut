import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const AlexaIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Alexa Icon</title>
      <path d="M10.704 19.674c.089.517.086 1.248-.009 2.193 1.673-.837 3.079-1.702 4.22-2.598A7.703 7.703 0 0 0 12.1 4.4a7.7 7.7 0 0 0-1.396 15.274zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
};

AlexaIcon.defaultProps = defaultIconProps;

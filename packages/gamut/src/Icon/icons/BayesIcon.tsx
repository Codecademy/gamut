import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const BayesIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Bayes Icon</title>
      <g transform="translate(3 2)" fillRule="evenodd">
        <circle cx="1.5" cy="9.5" r="1.5" />
        <path
          d="M1.714 9.565L16.5 1.5M10.5 14.5l5.238-1.891"
          stroke="currentColor"
          strokeWidth=".774"
          strokeLinecap="square"
        />
        <circle cx="10.5" cy="14.5" r="1.5" />
        <circle cx="16.5" cy="1.5" r="1.5" />
        <circle cx="10.5" cy="4.5" r="1.5" />
        <circle cx="16.5" cy="7.5" r="1.5" />
        <circle cx="16.5" cy="12.5" r="1.5" />
        <circle cx="16.5" cy="18.5" r="1.5" />
        <path
          d="M2 10l14.786 8.935M10.5 4.5l6.286 3.435"
          stroke="currentColor"
          strokeWidth=".774"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

BayesIcon.defaultProps = defaultIconProps;

export default BayesIcon;

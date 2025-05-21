import * as React from 'react';

import { IllustrationProps } from './types';

export const Heart: React.FC<IllustrationProps> = ({
  'aria-hidden': ariaHidden,
  className,
  height,
  width,
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 48 48"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Heart Icon</title>
    <circle cx="24" cy="24" fill="white" r="23.5" stroke="black" />
    <path
      d="M24.0007 33.2032L16.0107 24.8698C15.3085 24.1682 14.845 23.2632 14.686 22.2833C14.527 21.3034 14.6806 20.2984 15.1249 19.4107V19.4107C15.4599 18.7408 15.9494 18.1601 16.5529 17.7164C17.1563 17.2727 17.8566 16.9788 18.5959 16.8589C19.3353 16.7389 20.0926 16.7964 20.8054 17.0265C21.5181 17.2566 22.1661 17.6527 22.6957 18.1823L24.0007 19.4865L25.3057 18.1823C25.8354 17.6527 26.4833 17.2566 27.1961 17.0265C27.9089 16.7964 28.6662 16.7389 29.4055 16.8589C30.1449 16.9788 30.8451 17.2727 31.4486 17.7164C32.0521 18.1601 32.5415 18.7408 32.8766 19.4107C33.3203 20.298 33.4736 21.3025 33.3147 22.2818C33.1559 23.2612 32.693 24.1657 31.9916 24.8673L24.0007 33.2032Z"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

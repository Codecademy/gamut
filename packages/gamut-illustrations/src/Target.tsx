import * as React from 'react';

import { IllustrationProps } from './types';

export const Target: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 135 97"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Target</title>
    <path
      d="M6.93 24.844L48 1.133l41.07 23.711v47.423L48 95.978 6.93 72.267V24.844z"
      fill="#FFF0E5"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      d="M24.537 35.009L48 21.462 71.463 35.01v27.093L48 75.65 24.537 62.102V35.01z"
      fill="#FFF0E5"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      d="M40.11 44.891l7.325-4.229 7.325 4.23v8.457l-7.325 4.23-7.325-4.23v-8.458z"
      fill="#FFF0E5"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M56.792 37.243l5.09 14.758-11.902-4.163 6.812-10.595z"
      fill="#FFF0E5"
      fillRule="evenodd"
      stroke="#10162F"
    />
    <path
      d="M59.88 44.511l71.705-24.657M125.648 21.64l3.24-6.64M121.289 23.09l3.24-6.639M116.931 24.541l3.24-6.639M125.76 21.778l6.648 3.24M121.402 23.591l6.647 3.24M117.043 25.042l6.648 3.24"
      stroke="#10162F"
      strokeLinecap="square"
    />
  </svg>
);

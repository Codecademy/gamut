import * as React from 'react';

import { IllustrationProps } from './types';

export const PracticeProject: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 96 96"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70.151 88.173 47.795 8 25.44 88.173"
      stroke="#10162F"
      strokeLinecap="square"
      strokeLinejoin="bevel"
    />
    <path
      d="M47.795 31.909v56.264"
      stroke="#10162F"
      strokeLinecap="square"
      strokeMiterlimit="10"
    />
    <path
      d="M74.538 74.614v-55.17H21v55.17h53.538Z"
      fill="#66C4FF"
      stroke="#10162F"
      strokeLinecap="square"
      strokeMiterlimit="10"
    />
    <path
      d="M67.314 67.342V26.695h-39.09v40.647h39.09Z"
      fill="#66C4FF"
      stroke="#10162F"
      strokeLinecap="square"
      strokeMiterlimit="10"
    />
    <path
      d="m40.99 42.34 4.467 4.562-4.834 4.667 4.702 4.771 4.808-4.667 4.834-4.64L50.5 42.47l-.237-.235-4.466-4.563-4.807 4.667Z"
      stroke="#10162F"
      strokeLinecap="square"
      strokeMiterlimit="10"
    />
  </svg>
);

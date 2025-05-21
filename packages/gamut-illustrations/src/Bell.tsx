import * as React from 'react';

import { IllustrationProps } from './types';

export const Bell: React.FC<IllustrationProps> = ({
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
    <title>Bell Icon</title>
    <circle cx="24" cy="24" fill="white" r="23.5" stroke="#10162F" />
    <path
      d="M22.3334 32.125C22.4392 32.4856 22.659 32.8022 22.9598 33.0274C23.2607 33.2526 23.6263 33.3743 24.0021 33.3743C24.3779 33.3743 24.7436 33.2526 25.0444 33.0274C25.3452 32.8022 25.565 32.4856 25.6709 32.125"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M24 16.5V14.625"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M24 16.5C25.6576 16.5 27.2473 17.1585 28.4194 18.3306C29.5915 19.5027 30.25 21.0924 30.25 22.75C30.25 28.6217 31.5 29.625 31.5 29.625H16.5C16.5 29.625 17.75 28.0283 17.75 22.75C17.75 21.0924 18.4085 19.5027 19.5806 18.3306C20.7527 17.1585 22.3424 16.5 24 16.5V16.5Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

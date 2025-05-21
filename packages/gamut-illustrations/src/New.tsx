import * as React from 'react';

import { IllustrationProps } from './types';

export const New: React.FC<IllustrationProps> = ({
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
    <title>New Icon</title>
    <circle cx="24" cy="24" fill="white" r="23.5" stroke="#10162F" />
    <path
      d="M16.875 27.5V21.25L19.375 27.5V21.25"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M24.375 27.5H23.125C22.7935 27.5 22.4755 27.3683 22.2411 27.1339C22.0067 26.8995 21.875 26.5815 21.875 26.25V22.5C21.875 22.1685 22.0067 21.8505 22.2411 21.6161C22.4755 21.3817 22.7935 21.25 23.125 21.25H24.375"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M21.875 25H24.375"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M26.875 21.25V22.9308C26.8748 23.8849 27.0569 24.8302 27.4117 25.7158L28.125 27.5L29.375 23.125L30.625 27.5L31.3383 25.7158C31.6927 24.8301 31.8749 23.8849 31.875 22.9308V21.25"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M33.75 30V32.5C33.75 32.8315 33.6183 33.1495 33.3839 33.3839C33.1495 33.6183 32.8315 33.75 32.5 33.75H16.25C15.9185 33.75 15.6005 33.6183 15.3661 33.3839C15.1317 33.1495 15 32.8315 15 32.5V30"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M15 18.75V16.25C15 15.9185 15.1317 15.6005 15.3661 15.3661C15.6005 15.1317 15.9185 15 16.25 15H32.5C32.8315 15 33.1495 15.1317 33.3839 15.3661C33.6183 15.6005 33.75 15.9185 33.75 16.25V18.75"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

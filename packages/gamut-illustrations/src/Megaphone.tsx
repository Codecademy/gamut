import * as React from 'react';

import { IllustrationProps } from './types';

export const Megaphone: React.FC<IllustrationProps> = ({
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
    <title>Megaphone Icon</title>
    <circle cx="24" cy="24" fill="white" r="23.5" stroke="#10162F" />
    <path
      d="M19.625 26.7083H17.75C16.9212 26.7083 16.1263 26.3791 15.5403 25.793C14.9542 25.207 14.625 24.4121 14.625 23.5833C14.625 22.7545 14.9542 21.9597 15.5403 21.3736C16.1263 20.7876 16.9212 20.4583 17.75 20.4583H19.625V26.7083Z"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M19.625 26.7083C23.2926 26.7086 26.8781 27.7942 29.93 29.8283L30.875 30.4583V16.7083L29.93 17.3383C26.8781 19.3724 23.2926 20.458 19.625 20.4583V26.7083Z"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M33.375 22.3333V24.8333"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M19.625 26.7083C19.6245 27.5266 19.7904 28.3364 20.1128 29.0886C20.4351 29.8407 20.9071 30.5194 21.5 31.0833"
      stroke="#10162F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

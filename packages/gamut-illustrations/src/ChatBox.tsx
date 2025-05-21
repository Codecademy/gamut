import * as React from 'react';

import { IllustrationProps } from './types';

export const ChatBox: React.FC<IllustrationProps> = ({
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
    <title>ChatBox Icon</title>
    <circle cx="24" cy="24" fill="white" r="23.5" stroke="black" />
    <path
      d="M32.125 30.625H23.375L18.375 34.375V30.625H15.875C15.5435 30.625 15.2255 30.4933 14.9911 30.2589C14.7567 30.0245 14.625 29.7065 14.625 29.375V16.875C14.625 16.5435 14.7567 16.2255 14.9911 15.9911C15.2255 15.7567 15.5435 15.625 15.875 15.625H32.125C32.4565 15.625 32.7745 15.7567 33.0089 15.9911C33.2433 16.2255 33.375 16.5435 33.375 16.875V29.375C33.375 29.7065 33.2433 30.0245 33.0089 30.2589C32.7745 30.4933 32.4565 30.625 32.125 30.625Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M18.375 21.25H29.625"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M18.375 25H27.125"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

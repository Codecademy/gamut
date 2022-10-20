import * as React from 'react';

import { IllustrationProps } from './types';

export const Envelope: React.FC<IllustrationProps> = ({
  'aria-hidden': ariaHidden,
  className,
  height,
  width,
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Envelope Icon</title>
    <circle cx="24" cy="24" r="23.5" fill="white" stroke="black" />
    <path
      d="M15.25 17.9585H32.75V30.4585H15.25V17.9585Z"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.4682 18.417L25.6815 23.637C25.1996 24.0077 24.6087 24.2087 24.0007 24.2087C23.3927 24.2087 22.8018 24.0077 22.3199 23.637L15.5332 18.417"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

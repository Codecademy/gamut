import * as React from 'react';

import { IllustrationProps } from './types';

export const TinyBlocks: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 26 26"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 1h-8v8h8zM25 9h-8v8h8zM25 17h-8v8h8zM17 9H9v8h8zM17 17H9v8h8zM9 17H1v8h8z"
      fill="#66C4FF"
      stroke="#10162F"
    />
  </svg>
);

import * as React from 'react';

import { IllustrationProps } from './types';

export const PortfolioProject: React.FC<IllustrationProps> = ({
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
      d="M57.005 76.209H16.701L38.917 41.22h40.278L57.005 76.21Z"
      fill="#FFF5FF"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M48.207 64.844H7l22.861-35.876h41.207L48.207 64.844Z"
      fill="#F966FF"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M75.17 47.712c7.596 0 13.754-6.427 13.754-14.356S82.766 19 75.17 19c-7.596 0-13.753 6.427-13.753 14.356s6.157 14.356 13.753 14.356Z"
      fill="#FFF5FF"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M75.17 28.212V38.5M80.073 33.358h-9.83"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
  </svg>
);

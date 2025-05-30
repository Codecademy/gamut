import * as React from 'react';

import { IllustrationProps } from './types';

export const Maze: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 201 162"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M189.814 26.65H1.355v127.058h188.459V26.65Z"
      fill="#66C4FF"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M1.12 77.31H35.34v18.2h-15.38M52.913 93.623v18.83H18.231v17.268M18.23 153.708v-7.044h17.336v-16.943h17.347v23.987M35.566 153.708h34.065M104.393 95.51H69.631v34.211h17.381v-18.043h51.648v35.491M104.146 78.163V43.65H87.641v34.514H52.6V60.906H18.23V26.65h34.368M35.33 43.649H52.6"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M121.751 43.649V95.51h16.909v33.166M121.752 147.17v-18.494h-17.606v25.032M87.136 143.586h17.01"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M189.836 61.142V43.705l-33.671-.056v17.437h17.257V95.51h-17.864V78.67H138.66v-52.02H69.631v34.257M155.558 129.721v-18.043h34.278V95.51M189.814 129.721h-16.246v23.987"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M200.151 1H20.691L1.12 26.65h188.458L200.151 1ZM200.15 1.023V128.16l-10.314 25.548V26.571L200.15 1.023Z"
      fill="#F5FCFF"
      stroke="#10172F"
      strokeLinejoin="bevel"
    />
    <path d="M200.15 1.022V1" stroke="#231F20" strokeLinejoin="bevel" />
    <path
      d="M58.935 94.387H1.355v59.355h57.58V94.387Z"
      fill="#F5FCFF"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M29.769 161V87.118l29.166 7.235v59.355L29.77 161Z"
      fill="#F5FCFF"
      stroke="#10172F"
      strokeLinejoin="bevel"
    />
    <path
      d="M29.78 87.118h-2.899V161h2.899V87.118Z"
      fill="#10172F"
      stroke="#231F20"
      strokeMiterlimit="10"
    />
    <path
      d="M147.649 78.669h-8.989V42.874a8.46 8.46 0 0 0-8.46-8.45 8.45 8.45 0 0 0-8.449 8.45v44.244a8.451 8.451 0 0 0 8.449 8.448h8.46v33.818a8.45 8.45 0 0 0 8.449 8.449 8.43 8.43 0 0 0 5.978-2.471 8.434 8.434 0 0 0 2.471-5.978V86.578a7.852 7.852 0 0 0-2.303-5.606 7.864 7.864 0 0 0-5.606-2.303Z"
      fill="#1557FF"
      stroke="#10172F"
      strokeMiterlimit="10"
    />
    <path
      d="M38.858 61.086a8.718 8.718 0 1 0 0-17.437 8.718 8.718 0 0 0 0 17.437Z"
      fill="#10172F"
      stroke="#231F20"
      strokeMiterlimit="10"
    />
  </svg>
);

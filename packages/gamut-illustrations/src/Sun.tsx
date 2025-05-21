import * as React from 'react';

import { IllustrationProps } from './types';

export const Sun: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 80 60"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Sun Illustration</title>
    <rect fill="white" height="60" width="80" />
    <circle
      cx="40.0598"
      cy="30.2034"
      fill="url(#pattern0)"
      r="9.15061"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <line
      stroke="#10162F"
      x1="40.5002"
      x2="40.5002"
      y1="0.718262"
      y2="16.986"
    />
    <line
      stroke="#10162F"
      x1="40.5002"
      x2="40.5002"
      y1="43.0145"
      y2="59.2822"
    />
    <line
      stroke="#10162F"
      x1="69.2822"
      x2="53.0145"
      y1="30.5004"
      y2="30.5004"
    />
    <line
      stroke="#10162F"
      x1="26.9861"
      x2="10.7183"
      y1="30.5004"
      y2="30.5004"
    />
    <line
      stroke="#10162F"
      x1="25.7924"
      x2="33.9263"
      y1="4.39104"
      y2="18.4793"
    />
    <line
      stroke="#10162F"
      x1="46.9403"
      x2="55.0742"
      y1="41.0206"
      y2="55.1089"
    />
    <line stroke="#10162F" x1="65.6091" x2="51.5208" y1="15.7921" y2="23.926" />
    <line stroke="#10162F" x1="28.9795" x2="14.8912" y1="36.9402" y2="45.074" />
    <line
      stroke="#10162F"
      x1="14.8911"
      x2="28.9794"
      y1="14.9258"
      y2="23.0597"
    />
    <line stroke="#10162F" x1="51.5208" x2="65.609" y1="36.0742" y2="44.2081" />
    <line
      stroke="#10162F"
      x1="55.0741"
      x2="46.9402"
      y1="4.89114"
      y2="18.9794"
    />
    <line stroke="#10162F" x1="33.9259" x2="25.7921" y1="41.5207" y2="55.609" />
    <defs>
      <pattern
        height="3.49703"
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="3.49703"
      >
        <use transform="scale(0.0546411)" xlinkHref="#image0" />
      </pattern>
      <image
        height="64"
        id="image0"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACkSURBVHgB7dcxEsIwDAVR6f53Boo/FNBkPEkYrN3Xye3+xlVVz/pEu/XmEqgsr3AJVJZXuAQqyytcApXlFS6ByvIKl0BleYVLoLK8wiVQWV5BK/8oheWh+vuBVh67BMsXVB/cuPKYJVj+4B6rF29c+bFLsPziPUafvHHlxyzB8ifvbfXFN678tkuw/MX3NvrmG1d+myVY/ub7b/WPb1z5sb/CJS8ZOf4BH9R+4AAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

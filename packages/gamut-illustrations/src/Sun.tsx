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
    width={width}
    height={height}
    viewBox="0 0 80 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Sun Illustration</title>
    <rect width="80" height="60" fill="white" />
    <circle
      cx="40.0598"
      cy="30.2034"
      r="9.15061"
      fill="url(#pattern0)"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <line
      x1="40.5002"
      y1="0.718262"
      x2="40.5002"
      y2="16.986"
      stroke="#10162F"
    />
    <line
      x1="40.5002"
      y1="43.0145"
      x2="40.5002"
      y2="59.2822"
      stroke="#10162F"
    />
    <line
      x1="69.2822"
      y1="30.5004"
      x2="53.0145"
      y2="30.5004"
      stroke="#10162F"
    />
    <line
      x1="26.9861"
      y1="30.5004"
      x2="10.7183"
      y2="30.5004"
      stroke="#10162F"
    />
    <line
      x1="25.7924"
      y1="4.39104"
      x2="33.9263"
      y2="18.4793"
      stroke="#10162F"
    />
    <line
      x1="46.9403"
      y1="41.0206"
      x2="55.0742"
      y2="55.1089"
      stroke="#10162F"
    />
    <line x1="65.6091" y1="15.7921" x2="51.5208" y2="23.926" stroke="#10162F" />
    <line x1="28.9795" y1="36.9402" x2="14.8912" y2="45.074" stroke="#10162F" />
    <line
      x1="14.8911"
      y1="14.9258"
      x2="28.9794"
      y2="23.0597"
      stroke="#10162F"
    />
    <line x1="51.5208" y1="36.0742" x2="65.609" y2="44.2081" stroke="#10162F" />
    <line
      x1="55.0741"
      y1="4.89114"
      x2="46.9402"
      y2="18.9794"
      stroke="#10162F"
    />
    <line x1="33.9259" y1="41.5207" x2="25.7921" y2="55.609" stroke="#10162F" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="3.49703"
        height="3.49703"
      >
        <use xlinkHref="#image0" transform="scale(0.0546411)" />
      </pattern>
      <image
        id="image0"
        width="64"
        height="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACkSURBVHgB7dcxEsIwDAVR6f53Boo/FNBkPEkYrN3Xye3+xlVVz/pEu/XmEqgsr3AJVJZXuAQqyytcApXlFS6ByvIKl0BleYVLoLK8wiVQWV5BK/8oheWh+vuBVh67BMsXVB/cuPKYJVj+4B6rF29c+bFLsPziPUafvHHlxyzB8ifvbfXFN678tkuw/MX3NvrmG1d+myVY/ub7b/WPb1z5sb/CJS8ZOf4BH9R+4AAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

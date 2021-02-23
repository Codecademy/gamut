import React from 'react';

import { IllustrationProps } from './types';

export const Sun: React.FC<IllustrationProps> = ({
  className,
  height,
  width,
}) => (
  <svg
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 60 60"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <circle
      cx="30.0597"
      cy="30.2035"
      r="9.15061"
      fill="url(#pattern0)"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <line x1="30.5004" y1="0.718262" x2="30.5004" y2="16.986" stroke="black" />
    <line x1="30.5004" y1="43.0145" x2="30.5004" y2="59.2823" stroke="black" />
    <line x1="59.2823" y1="30.5004" x2="43.0146" y2="30.5004" stroke="black" />
    <line x1="16.986" y1="30.5004" x2="0.718267" y2="30.5004" stroke="black" />
    <line x1="15.7923" y1="4.39099" x2="23.9261" y2="18.4793" stroke="black" />
    <line x1="36.9404" y1="41.0206" x2="45.0743" y2="55.1089" stroke="black" />
    <line x1="55.6092" y1="15.7921" x2="41.5209" y2="23.926" stroke="black" />
    <line x1="18.9796" y1="36.9401" x2="4.89132" y2="45.074" stroke="black" />
    <line x1="4.89105" y1="14.9258" x2="18.9793" y2="23.0596" stroke="black" />
    <line x1="41.5208" y1="36.0742" x2="55.609" y2="44.2081" stroke="black" />
    <line x1="45.0741" y1="4.89111" x2="36.9402" y2="18.9794" stroke="black" />
    <line x1="23.9259" y1="41.5208" x2="15.792" y2="55.609" stroke="black" />
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

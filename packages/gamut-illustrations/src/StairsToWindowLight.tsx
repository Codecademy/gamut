import * as React from 'react';

import { IllustrationProps } from './types';

export const StairsToWindowLight: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 148 100"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <mask height="56" id="a" maskUnits="userSpaceOnUse" width="41" x="73" y="6">
      <path
        d="M74.072 60.74c0-.559.023-34.594.069-35.142.41-4.898 2.621-9.46 6.192-12.776A19.08 19.08 0 0 1 93.41 7.7a19.088 19.088 0 0 1 13.03 5.245 19.685 19.685 0 0 1 6.075 12.833c.036.49.054 34.465.054 34.962H74.072Z"
        fill="#fff"
        stroke="#10162F"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </mask>
    <g mask="url(#a)">
      <path d="M69.942 5.063h58.279v68.39H69.942z" fill="#FF8C00" />
      <path
        d="M126.834 69.419c0 16.462-13.16 29.783-29.363 29.783-16.204 0-29.364-13.321-29.364-29.783 0-16.462 13.16-29.783 29.364-29.783 16.203 0 29.363 13.321 29.363 29.783Z"
        fill="#fff"
      />
      <path
        d="M126.834 69.419c0 16.462-13.16 29.783-29.363 29.783-16.204 0-29.364-13.321-29.364-29.783 0-16.462 13.16-29.783 29.364-29.783 16.203 0 29.363 13.321 29.363 29.783Z"
        fill="url(#b)"
      />
      <path
        d="M126.834 69.419c0 16.462-13.16 29.783-29.363 29.783-16.204 0-29.364-13.321-29.364-29.783 0-16.462 13.16-29.783 29.364-29.783 16.203 0 29.363 13.321 29.363 29.783Z"
        stroke="#10162F"
        strokeWidth="2"
      />
      <path
        d="M104.007 32.379c6.151 0 11.137-5.067 11.137-11.317s-4.986-11.317-11.137-11.317c-6.15 0-11.137 5.067-11.137 11.317s4.986 11.317 11.137 11.317Z"
        fill="#F5FCFF"
        stroke="#10162F"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </g>
    <path
      d="M74.072 60.74c0-.559.023-34.594.069-35.142.41-4.898 2.621-9.46 6.192-12.776A19.08 19.08 0 0 1 93.41 7.7a19.088 19.088 0 0 1 13.03 5.245 19.685 19.685 0 0 1 6.075 12.833c.036.49.054 34.465.054 34.962H74.072Z"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M112.488 57.463v37.352H64.204V57.464h48.284Z"
      fill="#F5FCFF"
      stroke="#10162F"
      strokeWidth="2"
    />
    <path
      d="M73.865 82.24v12.575H26.309V82.24h47.556ZM86.253 69.852v11.846H37.97V69.852h48.284ZM97.184 57.463v11.846H48.901V57.463h48.283Z"
      fill="#F5FCFF"
      stroke="#10162F"
      strokeWidth="2"
    />
    <defs>
      <pattern
        height="1.04"
        id="b"
        patternContentUnits="objectBoundingBox"
        width="1.054"
      >
        <use transform="scale(.01647 .01624)" xlinkHref="#c" />
      </pattern>
      <image
        height="64"
        id="c"
        preserveAspectRatio="none"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAChSURBVHgB7dgxDoAwDMXQ5P53BoaIARaE2iJa+23p6j81ImKPK9qtk0ugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLI8VN4faOW3gLJ8QOXDjSuPWYLlH+5l5csbV37ZJVj+5b2MbLxx5ZdZguUb72ll5xtXftolWL7zPY0cfOPKT7MEyw++fys/vnHlsb/DFwf+rf4QcSN+5wAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

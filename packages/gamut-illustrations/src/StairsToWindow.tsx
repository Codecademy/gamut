import * as React from 'react';

import { IllustrationProps } from './types';

export const StairsToWindow: React.FC<IllustrationProps> = ({
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
    <mask
      height="56"
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      width="42"
      x="73"
      y="4"
    >
      <path
        d="M74.5723 58.7399C74.5723 58.1813 74.5954 24.146 74.6405 23.5978C75.0515 18.7 77.2623 14.1389 80.833 10.8224C84.4036 7.5058 89.0723 5.67691 93.9099 5.69967C98.7474 5.72243 103.399 7.59517 106.939 10.9452C110.48 14.2952 112.649 18.8769 113.015 23.7784C113.051 24.2677 113.069 58.2428 113.069 58.7399H74.5723Z"
        fill="white"
        stroke="#10162F"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect
        fill="#FF8C00"
        height="68.39"
        width="58.2788"
        x="70.4423"
        y="3.06299"
      />
      <path
        d="M127.334 67.4187C127.334 83.8806 114.174 97.202 97.9706 97.202C81.7667 97.202 68.6075 83.8806 68.6075 67.4187C68.6075 50.9569 81.7667 37.6355 97.9706 37.6355C114.174 37.6355 127.334 50.9569 127.334 67.4187Z"
        fill="white"
      />
      <path
        d="M127.334 67.4187C127.334 83.8806 114.174 97.202 97.9706 97.202C81.7667 97.202 68.6075 83.8806 68.6075 67.4187C68.6075 50.9569 81.7667 37.6355 97.9706 37.6355C114.174 37.6355 127.334 50.9569 127.334 67.4187Z"
        fill="url(#pattern0)"
      />
      <path
        d="M127.334 67.4187C127.334 83.8806 114.174 97.202 97.9706 97.202C81.7667 97.202 68.6075 83.8806 68.6075 67.4187C68.6075 50.9569 81.7667 37.6355 97.9706 37.6355C114.174 37.6355 127.334 50.9569 127.334 67.4187Z"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M104.507 30.3786C110.658 30.3786 115.644 25.3119 115.644 19.0619C115.644 12.8118 110.658 7.74512 104.507 7.74512C98.3565 7.74512 93.3702 12.8118 93.3702 19.0619C93.3702 25.3119 98.3565 30.3786 104.507 30.3786Z"
        fill="#10162F"
        stroke="white"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </g>
    <path
      d="M74.5723 58.7399C74.5723 58.1813 74.5954 24.146 74.6405 23.5978C75.0515 18.7 77.2623 14.1389 80.833 10.8224C84.4036 7.5058 89.0723 5.67691 93.9099 5.69967C98.7474 5.72243 103.399 7.59517 106.939 10.9452C110.48 14.2952 112.649 18.8769 113.015 23.7784C113.051 24.2677 113.069 58.2428 113.069 58.7399H74.5723Z"
      stroke="white"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M112.988 55.4624L112.988 92.815L64.7043 92.815L64.7043 55.4624L112.988 55.4624Z"
      fill="#10162F"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M74.3644 80.24L74.3644 92.815L26.8092 92.815L26.8092 80.24L74.3644 80.24Z"
      fill="#10162F"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M86.7532 67.8511L86.7532 79.6974L38.4693 79.6974L38.4693 67.8511L86.7532 67.8511Z"
      fill="#10162F"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M97.6844 55.4624L97.6844 67.3087L49.4006 67.3087L49.4006 55.4624L97.6844 55.4624Z"
      fill="#10162F"
      stroke="white"
      strokeWidth="2"
    />
    <defs>
      <pattern
        height="1.03953"
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1.05391"
      >
        <use transform="scale(0.0164674 0.0162426)" xlinkHref="#image0" />
      </pattern>
      <image
        height="64"
        id="image0"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAChSURBVHgB7dgxDoAwDMXQ5P53BoaIARaE2iJa+23p6j81ImKPK9qtk0ugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLI8VN4faOW3gLJ8QOXDjSuPWYLlH+5l5csbV37ZJVj+5b2MbLxx5ZdZguUb72ll5xtXftolWL7zPY0cfOPKT7MEyw++fys/vnHlsb/DFwf+rf4QcSN+5wAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

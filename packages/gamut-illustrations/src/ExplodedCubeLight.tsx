import * as React from 'react';

import { IllustrationProps } from './types';

export const ExplodedCubeLight: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 151 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="#FF8C00"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m83.745 16.214 30.744 17.75.001 35.376-30.745-17.75V16.214Z"
    />
    <path
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m70.343 20.053.002 35.377-30.638 17.686V37.741l30.636-17.688Z"
    />
    <path
      fill="#F5FCFF"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m81.053 65.031 30.674 17.71-30.638 17.687-30.672-17.71 30.636-17.687Z"
    />
    <path
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m70.343 20.053.002 35.377-30.638 17.686V37.741l30.636-17.688Z"
    />
    <path
      fill="#fff"
      d="M94.265 41.637v35.376L63.63 94.7l-.002-35.376 30.638-17.687Z"
    />
    <path
      fill="url(#a)"
      d="M94.265 41.637v35.376L63.63 94.7l-.002-35.376 30.638-17.687Z"
    />
    <path
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M94.265 41.637v35.376L63.63 94.7l-.002-35.376 30.638-17.687Z"
    />
    <path
      fill="#FF8C00"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m32.854 41.557 30.744 17.75v35.376l-30.744-17.75V41.557Z"
    />
    <path
      fill="#F5FCFF"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m73.188 9.435 30.675 17.71L73.225 44.83 42.552 27.122 73.188 9.435Z"
    />
    <defs>
      <pattern
        id="a"
        width="1.045"
        height="1.809"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01632 .02827)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAChSURBVHgB7dgxDoAwDMXQ5P53BoaIARaE2iJa+23p6j81ImKPK9qtk0ugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLI8VN4faOW3gLJ8QOXDjSuPWYLlH+5l5csbV37ZJVj+5b2MbLxx5ZdZguUb72ll5xtXftolWL7zPY0cfOPKT7MEyw++fys/vnHlsb/DFwf+rf4QcSN+5wAAAABJRU5ErkJggg=="
        id="b"
        width="64"
        height="64"
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);

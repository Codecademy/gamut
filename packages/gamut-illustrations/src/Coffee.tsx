import * as React from 'react';

import { IllustrationProps } from './types';

export const Coffee: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 48 73"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Coffee Illustration</title>
    <path
      d="M1 28.124h36v37.05c0 1.578-.777 3.091-2.16 4.207-1.385 1.116-3.261 1.743-5.218 1.743H8.378c-1.957 0-3.834-.627-5.217-1.743C1.777 68.265 1 66.751 1 65.174v-37.05ZM37 51.15h4.055c.65-.002 1.273-.252 1.732-.696a2.331 2.331 0 0 0 .716-1.675V45.22c0-.628-.257-1.23-.716-1.675a2.495 2.495 0 0 0-1.732-.695H37V39h4.79c.684 0 1.362.13 1.994.383a5.223 5.223 0 0 1 1.69 1.091 5.026 5.026 0 0 1 1.13 1.635c.262.612.397 1.267.396 1.929v5.924c0 .662-.134 1.317-.396 1.929a5.026 5.026 0 0 1-1.13 1.635 5.22 5.22 0 0 1-1.69 1.091A5.363 5.363 0 0 1 41.79 55H37v-3.85Z"
      fill="#fff"
      stroke="#10162F"
      strokeWidth="1.5"
    />
    <path d="M22.311 11.876H7.557v15.702h14.754V11.876Z" fill="url(#a)" />
    <path d="M33.754 0H19v14.05h14.754V0Z" fill="url(#b)" />
    <path
      d="M1 62v2.47a7.61 7.61 0 0 0 2.16 5.324A7.303 7.303 0 0 0 8.379 72h21.244a7.303 7.303 0 0 0 5.217-2.206A7.61 7.61 0 0 0 37 64.47V62H1Z"
      fill="#fff"
      stroke="#10162F"
      strokeWidth="1.5"
    />
    <defs>
      <pattern
        height=".509"
        id="a"
        patternContentUnits="objectBoundingBox"
        width=".542"
      >
        <use transform="scale(.06778 .06368)" xlinkHref="#c" />
      </pattern>
      <pattern
        height=".569"
        id="b"
        patternContentUnits="objectBoundingBox"
        width=".542"
      >
        <use transform="scale(.06778 .07118)" xlinkHref="#c" />
      </pattern>
      <image
        height="8"
        id="c"
        width="8"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAeSURBVHgBzc4xAQAAAAEwEVxq6J+OGCzBQDk4MzgV8D0CqU26KA8AAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

import * as React from 'react';

import { IllustrationProps } from './types';

export const MobilePhone: React.FC<IllustrationProps> = ({
  'aria-hidden': ariaHidden,
  className,
  height,
  width,
}) => (
  <svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 108 203"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={ariaHidden}
    class-name={className}
  >
    <g clipPath="url(#a)">
      <rect
        x="1"
        y="1"
        width="105.101"
        height="200.031"
        rx="15"
        fill="#fff"
        stroke="#10162F"
        strokeWidth="2"
      />
      <path fill="#fff" d="M9.519 24.123h88.062v153.783H9.519z" />
      <path fill="url(#b)" d="M9.519 24.123h88.062v153.783H9.519z" />
      <path
        stroke="#10162F"
        strokeWidth="2"
        d="M9.519 24.123h88.062v153.783H9.519z"
      />
      <circle cx="52.942" cy="13.996" r="3.043" fill="#10162F" />
      <path stroke="#10162F" strokeWidth="2" d="M38.946 188.859h29.209" />
      <mask
        id="c"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="10"
        y="23"
        width="87"
        height="154"
      >
        <path
          fill="#10162F"
          stroke="#10162F"
          strokeWidth="2"
          d="M11.954 24.123h83.194v151.349H11.954z"
        />
      </mask>
      <g mask="url(#c)">
        <path
          d="m121.422 44.47-18.731 152.824-123.51-93.89L121.422 44.47Z"
          fill="#F5FFE3"
        />
      </g>
      <path
        fill="#3A10E5"
        stroke="#10162F"
        d="M18.756 34.576h25.775v8.736H18.756z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h107.101v202.031H0z" />
      </clipPath>
      <pattern
        id="b"
        patternContentUnits="objectBoundingBox"
        width=".711"
        height=".411"
      >
        <use xlinkHref="#d" transform="scale(.0111 .00642)" />
      </pattern>
      <image
        id="d"
        width="64"
        height="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbSURBVHgB7dhLDoJAEEXRlhUwMu5C9783wXQqZQyJH6SbUPXumRCY3pcaUMbzdS4v1N7hWIIqysOwBFWUh2EJqigPwxJUUR6GJaiiPAxLUEV5GJagivIwLEEV5WEElzAVFMrLGi+3U30Ozw9q5af5XhR5eTdQXsSyvMIN+FxeZQnvyruMN4Dy1bfyGW/AuvJZl/BreZfhBlC+Wls+ww3YVj7LEv4t7yLeAMpXW8tHvAFty0ddQqvyLsINoHzVunyEG9C3fJQl9CrvjngDKF/1Ln/EG7BvedW/w0sP1usKCOMHPlcAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

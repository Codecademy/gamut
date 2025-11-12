import * as React from 'react';

import { IllustrationProps } from './types';

export const MobilePhone: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 108 203"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#a)">
      <rect
        fill="#fff"
        height="200.031"
        rx="15"
        stroke="#10162F"
        strokeWidth="2"
        width="105.101"
        x="1"
        y="1"
      />
      <path d="M9.519 24.123h88.062v153.783H9.519z" fill="#fff" />
      <path d="M9.519 24.123h88.062v153.783H9.519z" fill="url(#b)" />
      <path
        d="M9.519 24.123h88.062v153.783H9.519z"
        stroke="#10162F"
        strokeWidth="2"
      />
      <circle cx="52.942" cy="13.996" fill="#10162F" r="3.043" />
      <path d="M38.946 188.859h29.209" stroke="#10162F" strokeWidth="2" />
      <mask
        height="154"
        id="c"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        width="87"
        x="10"
        y="23"
      >
        <path
          d="M11.954 24.123h83.194v151.349H11.954z"
          fill="#10162F"
          stroke="#10162F"
          strokeWidth="2"
        />
      </mask>
      <g mask="url(#c)">
        <path
          d="m121.422 44.47-18.731 152.824-123.51-93.89L121.422 44.47Z"
          fill="#F5FFE3"
        />
      </g>
      <path
        d="M18.756 34.576h25.775v8.736H18.756z"
        fill="#3A10E5"
        stroke="#10162F"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h107.101v202.031H0z" fill="#fff" />
      </clipPath>
      <pattern
        height=".411"
        id="b"
        patternContentUnits="objectBoundingBox"
        width=".711"
      >
        <use transform="scale(.0111 .00642)" xlinkHref="#d" />
      </pattern>
      <image
        height="64"
        id="d"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbSURBVHgB7dhLDoJAEEXRlhUwMu5C9783wXQqZQyJH6SbUPXumRCY3pcaUMbzdS4v1N7hWIIqysOwBFWUh2EJqigPwxJUUR6GJaiiPAxLUEV5GJagivIwLEEV5WEElzAVFMrLGi+3U30Ozw9q5af5XhR5eTdQXsSyvMIN+FxeZQnvyruMN4Dy1bfyGW/AuvJZl/BreZfhBlC+Wls+ww3YVj7LEv4t7yLeAMpXW8tHvAFty0ddQqvyLsINoHzVunyEG9C3fJQl9CrvjngDKF/1Ln/EG7BvedW/w0sP1usKCOMHPlcAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

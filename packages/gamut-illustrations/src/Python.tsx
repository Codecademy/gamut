import * as React from 'react';

import { IllustrationProps } from './types';

export const Python: React.FC<IllustrationProps> = ({
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
    viewBox="0 0 80 80"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Python Illustration</title>
    <path
      d="M40 57.5h-.5v5h18V66s0 0 0 0c0 7.456-6.044 13.5-13.5 13.5h-8c-7.456 0-13.5-6.044-13.5-13.5v-5.972h0V54l.004-.292v-.004c.154-6.117 5.086-11.048 11.205-11.2h.003L34 42.5H36.794h-.001H46.005l.315-.003h.005c8.853-.171 15.999-7.315 16.172-16.169v-.004l.003-.32V22.5H66c7.456 0 13.5 6.044 13.5 13.5v8c0 7.456-6.044 13.5-13.5 13.5H40zm0-40H22.5V14C22.5 6.544 28.544.5 36 .5h8C51.456.5 57.5 6.544 57.5 14v12l-.004.293v.003c-.154 6.117-5.087 11.048-11.205 11.2h-.003L46 37.5H33.995l-.315.003h-.005c-8.853.171-15.999 7.315-16.172 16.169v.004l-.003.32V57.5H14C6.544 57.5.5 51.456.5 44v-8c0-7.456 6.044-13.5 13.5-13.5h26.5v-5H40zm8 49a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-17-60a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
      fill="#FFF2FF"
      stroke="#10162F"
    />
  </svg>
);

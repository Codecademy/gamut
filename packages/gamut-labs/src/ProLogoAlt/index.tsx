import { colors } from '@codecademy/gamut-styles';
import * as React from 'react';

export type ProLogoAltProps = {
  ariaLabel?: string;
  backgroundColor?: keyof typeof colors;
  textColor?: keyof typeof colors;
  width?: number;
};

export const ProLogoAlt: React.FC<ProLogoAltProps> = ({
  ariaLabel = 'Codecademy Pro Logo',
  backgroundColor = 'yellow',
  textColor = 'black',
  width = 50,
}) => (
  <svg
    width={width}
    viewBox="0 0 95 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={ariaLabel}
  >
    <g fill={colors[backgroundColor]} fillRule="evenodd">
      <path
        d="m0 0h74v40h-74zm78 34h17v6h-17z"
        fill={colors[backgroundColor]}
      />
      <path
        d="m13.971 23.67v6.82h-3.971v-20.145h6.82c4.749 0 7.253 2.965 7.253 6.62 0 3.625-2.504 6.705-7.253 6.705zm2.245-9.871h-2.245v6.446h2.245c2.187 0 3.77-1.036 3.77-3.28 0-2.245-1.583-3.166-3.77-3.166zm21.518 16.691-4.46-7.741h-2.821v7.741h-4v-20.145h7.568c4.404 0 6.994 2.62 6.994 6.13 0 1.9-.777 4.317-3.828 5.526l5.151 8.49h-4.604zm-.72-13.986c0-1.784-1.295-2.705-3.51-2.705h-3.051v5.468h3.05c2.216 0 3.511-1.036 3.511-2.763zm16.453-6.504c5.843 0 10.533 4.346 10.533 10.418s-4.69 10.417-10.533 10.417c-5.842 0-10.533-4.345-10.533-10.417s4.691-10.418 10.533-10.418zm0 17.152c3.799 0 6.36-2.878 6.36-6.734 0-3.857-2.561-6.734-6.36-6.734s-6.36 2.877-6.36 6.734c0 3.856 2.561 6.734 6.36 6.734z"
        fill={colors[textColor]}
      />
    </g>
  </svg>
);

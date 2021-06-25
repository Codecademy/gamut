import {
  ColorModes,
  styledOptions,
  system,
  useCurrentMode,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { SVGProps } from 'react';

export type ProLabelProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof logoStyles> &
  StyleProps<typeof placementVariants> &
  StyleProps<typeof modeVariants> & {
    mode?: ColorModes;
    height?: number;
  };

const logoStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

const placementVariants = variant({
  prop: 'placement',
  variants: {
    inline: {
      verticalAlign: 'text-bottom',
    },
  },
});

const modeVariants = variant({
  prop: 'mode',
  variants: {
    light: { bg: 'navy', textColor: 'beige' },
    dark: { bg: 'beige', textColor: 'navy' },
  },
});

const Svg = styled(
  'svg',
  styledOptions<'svg', 'placement'>(['placement'])
)<ProLabelProps>(placementVariants, modeVariants, logoStyles);

export const ProLabel: React.FC<React.ComponentProps<typeof Svg>> = ({
  mode,
  height = 16,
  ...props
}) => {
  const active = useCurrentMode(mode);
  return (
    <Svg
      {...props}
      height={height}
      mode={active}
      viewBox="0 0 30 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Pro only</title>
      <path
        fill="currentColor"
        d="M5.81612 3.19989C6.81478 3.19989 7.57545 3.47522 8.09812 4.02589C8.62078 4.56722 8.88212 5.28589 8.88212 6.18189C8.88212 7.07789 8.62078 7.80122 8.09812 8.35189C7.57545 8.89322 6.81478 9.16389 5.81612 9.16389H3.94012V12.9999H2.12012V3.19989H5.81612ZM5.74612 7.48389C6.15678 7.48389 6.47412 7.37656 6.69812 7.16189C6.92212 6.94722 7.03412 6.62056 7.03412 6.18189C7.03412 5.74322 6.92212 5.41656 6.69812 5.20189C6.47412 4.98722 6.15678 4.87989 5.74612 4.87989H3.94012V7.48389H5.74612Z"
      />
      <path
        fill="currentColor"
        d="M14.0436 3.19989C14.9956 3.19989 15.7283 3.45656 16.2416 3.96989C16.7643 4.47389 17.0256 5.14589 17.0256 5.98589C17.0256 6.63922 16.867 7.19922 16.5496 7.66589C16.2323 8.12322 15.7796 8.44056 15.1916 8.61789L17.9076 12.9999H15.8776L13.2456 8.77189H12.2936V12.9999H10.4736V3.19989H14.0436ZM14.0576 7.09189C14.4123 7.09189 14.6923 7.00322 14.8976 6.82589C15.103 6.64856 15.2056 6.36856 15.2056 5.98589C15.2056 5.60322 15.103 5.32322 14.8976 5.14589C14.6923 4.96856 14.4123 4.87989 14.0576 4.87989H12.2936V7.09189H14.0576Z"
      />
      <path
        fill="currentColor"
        d="M22.7387 13.1119C21.8894 13.1119 21.1147 12.9252 20.4147 12.5519C19.7147 12.1786 19.1547 11.6186 18.7347 10.8719C18.3241 10.1159 18.1187 9.19189 18.1187 8.09989C18.1187 7.00789 18.3241 6.08856 18.7347 5.34189C19.1547 4.58589 19.7147 4.02122 20.4147 3.64789C21.1147 3.27456 21.8894 3.08789 22.7387 3.08789C23.5881 3.08789 24.3627 3.27456 25.0627 3.64789C25.7627 4.02122 26.3181 4.58589 26.7287 5.34189C27.1487 6.08856 27.3587 7.00789 27.3587 8.09989C27.3587 9.19189 27.1487 10.1159 26.7287 10.8719C26.3181 11.6186 25.7627 12.1786 25.0627 12.5519C24.3627 12.9252 23.5881 13.1119 22.7387 13.1119ZM22.7387 11.4319C23.2521 11.4319 23.7141 11.3152 24.1247 11.0819C24.5447 10.8392 24.8807 10.4706 25.1327 9.97589C25.3847 9.47189 25.5107 8.84656 25.5107 8.09989C25.5107 7.35322 25.3847 6.73256 25.1327 6.23789C24.8807 5.73389 24.5447 5.36522 24.1247 5.13189C23.7141 4.88922 23.2521 4.76789 22.7387 4.76789C22.2254 4.76789 21.7587 4.88922 21.3387 5.13189C20.9281 5.36522 20.5967 5.73389 20.3447 6.23789C20.0927 6.73256 19.9667 7.35322 19.9667 8.09989C19.9667 8.84656 20.0927 9.47189 20.3447 9.97589C20.5967 10.4706 20.9281 10.8392 21.3387 11.0819C21.7587 11.3152 22.2254 11.4319 22.7387 11.4319Z"
      />
    </Svg>
  );
};

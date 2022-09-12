import { StarFilledIcon } from '@codecademy/gamut-icons';
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
  base: { textColor: 'background-current' },
  variants: {
    light: { bg: 'navy' },
    dark: { bg: 'beige' },
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
    <StarFilledIcon
      {...props}
      height={height}
      mode={active}
      viewBox="0 0 30 16"
      xmlns="http://www.w3.org/2000/svg"
      title="Pro Only"
    />
  );
};

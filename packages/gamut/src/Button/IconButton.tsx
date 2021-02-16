import { GamutIconProps } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { SIZE_UNITS, SizedButtonProps } from './shared';
import { TextButton, TextButtonInner } from './TextButton';

export type IconButtonProps = SizedButtonProps & {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
};

const ICON_SIZES = {
  small: 12,
  normal: 24,
} as const;

const IconButtonOuter = styled(TextButton)(({ size }) => {
  if (!size) return '';
  const iconSize = ICON_SIZES[size];
  const { height, border } = SIZE_UNITS[size];
  const padding = pxRem((height - border * 2 - iconSize) / 2);
  const dimensions = pxRem(height);

  return css`
    ${TextButtonInner} {
      height: ${dimensions};
      width: ${dimensions};
      padding: ${padding};
    }
  `;
});

export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, ...props }) => (
  <IconButtonOuter {...props}>
    <Icon size={ICON_SIZES[props.size || 'normal']} />
  </IconButtonOuter>
);

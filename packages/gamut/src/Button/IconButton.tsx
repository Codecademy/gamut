import { GamutIconProps } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { BORDER_WIDTH, SIZE_UNITS, SizedButtonProps } from './shared';
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
  const { height } = SIZE_UNITS[size];
  const padding = `${(height - BORDER_WIDTH * 2 - iconSize) / 2}px`;
  const dimensions = `${height}px`;

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

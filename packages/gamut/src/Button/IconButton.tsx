import { GamutIconProps } from '@codecademy/gamut-icons';
import { pxRem, styled } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import React from 'react';

import { SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

export type IconButtonProps = SizedButtonProps & {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
};

const ICON_SIZES = {
  normal: 24,
  small: 16,
};

const IconWrapper = styled.div<Pick<SizedButtonProps, 'size'>>(
  ({ size = 'normal' }) => {
    const dimensions = pxRem(ICON_SIZES[size]);

    return css`
      display: inline-flex;
      width: ${dimensions};
      height: ${dimensions};
      margin: 0 -1px;
      align-items: center;

      > svg {
        width: ${dimensions};
        height: ${dimensions};
      }
    `;
  }
);

export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, size = 'normal', ...props }) => {
  return (
    <TextButton size={size} {...props}>
      <IconWrapper size={size}>
        <Icon aria-hidden />
      </IconWrapper>
    </TextButton>
  );
};

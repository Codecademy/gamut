import { GamutIconProps } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { config, SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

const ICON_SIZES = {
  normal: 24,
  small: 16,
};

const IconWrapper = styled(
  'div',
  config
)<SizedButtonProps>(({ size }) => {
  const dimensions = pxRem(ICON_SIZES[size || 'normal']);

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
});

export type IconButtonProps = SizedButtonProps &
  ComponentProps<typeof TextButton> & {
    children?: never;
    icon: React.ComponentType<GamutIconProps>;
  };

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ icon: Icon, size = 'normal', ...props }, ref) => {
    return (
      <TextButton size={size} {...props} ref={ref}>
        <IconWrapper size={size}>
          <Icon aria-hidden />
        </IconWrapper>
      </TextButton>
    );
  }
);

import { GamutIconProps } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { config, SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

const IconWrapper = styled(
  'div',
  config
)(
  system.variant({
    prop: 'size',
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      margin: '0 -1px',
      '> svg': {
        width: 1,
        height: 1,
      },
    },
    variants: {
      normal: { width: 24, height: 24 },
      small: { width: 16, height: 16 },
    },
  })
);

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

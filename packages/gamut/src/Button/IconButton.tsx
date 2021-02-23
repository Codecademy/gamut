import { GamutIconProps } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

export type IconButtonProps = SizedButtonProps & {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
};

const IconWrapper = styled.div`
  display: inline-flex;
  height: 100%;
  width: 100%;
  margin: 0 -1px;
  align-items: center;
`;

export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, size, ...props }) => {
  return (
    <TextButton size={size} {...props}>
      <IconWrapper>
        <Icon size={size === 'small' ? 16 : 24} aria-hidden />
      </IconWrapper>
    </TextButton>
  );
};

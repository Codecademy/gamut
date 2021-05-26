import { VisualTheme } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

const modes = {
  dark: {
    shadowColor: colors.green,
  },
  light: {
    shadowColor: colors.lightGreen,
  },
};

const Image = styled.img();

const AvatarContainer = styled.div<{ mode: VisualTheme }>`
  position: relative;
  display: table;

  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    transform: scale(0.92);
    transform-origin: bottom right;
    height: 100%;
    width: 100%;
    background-color: ${({ mode }) => modes[mode].shadowColor};
  }

  ${Image} {
    position: relative;
    border-radius: 50%;
    height: auto;
    width: 100%;
    max-width: 118px;
    min-width: 77px;
    transform: scale(0.92);
    transform-origin: top left;
  }
`;

export type AvatarImageProps =
  | { alt: string; 'aria-labelledby'?: never }
  | { alt?: never; 'aria-labelledby': string };

export type AvatarBaseProps = {
  /**
   * path to image asset
   */
  src: string;
  /**
   * chooses color of drop shadow
   */
  mode?: VisualTheme;
};

export type AvatarProps = AvatarBaseProps & AvatarImageProps;

export const Avatar: React.FC<AvatarProps> = ({
  mode = 'light',
  ...avatarImageProps
}) => (
  <AvatarContainer mode={mode} data-testid="avatar-container">
    <Image width="118px" height="118px" {...avatarImageProps} />
  </AvatarContainer>
);

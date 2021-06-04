import { VisualTheme } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
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

const defaultAvatarSize = '118px';

const AvatarContainer = styled.div<{
  mode: VisualTheme;
  disableDropshadow?: boolean;
}>`
  position: relative;
  display: table;

  ${({ disableDropshadow, mode }) =>
    !disableDropshadow &&
    css`
      &::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        transform: scale(0.92);
        transform-origin: bottom right;
        height: 100%;
        width: 100%;
        background-color: ${modes[mode].shadowColor};
      }
    `}

  ${Image} {
    position: relative;
    border-radius: 50%;
    object-fit: cover;

    ${({ disableDropshadow }) =>
      !disableDropshadow &&
      css`
        transform: scale(0.92);
        transform-origin: top left;
      `}
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

  /**
   * Disables the drop shadow entirely.
   */
  disableDropshadow?: boolean;

  /**
   * Overrides styles on the Avatar container.
   */
  className?: string;
};

export type AvatarProps = AvatarBaseProps & AvatarImageProps;

export const Avatar: React.FC<AvatarProps> = ({
  mode = 'light',
  disableDropshadow,
  className,
  ...avatarImageProps
}) => (
  <AvatarContainer
    className={className}
    mode={mode}
    disableDropshadow={disableDropshadow}
    data-testid="avatar-container"
  >
    <Image
      width={defaultAvatarSize}
      height={defaultAvatarSize}
      {...avatarImageProps}
    />
  </AvatarContainer>
);

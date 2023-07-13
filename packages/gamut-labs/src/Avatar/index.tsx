import { VisualTheme } from '@codecademy/gamut';
import { styledOptions, system, theme } from '@codecademy/gamut-styles';
import { ResponsiveProp } from '@codecademy/variance';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

const Image = styled('img', styledOptions<'img'>())(system.layout);

const AvatarContainer = styled.div<{
  mode?: VisualTheme;
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
        background-color: ${mode
          ? mode === 'light'
            ? theme.colors.lightGreen
            : theme.colors.green
          : theme.colors['feedback-success']};
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
   * Disables the drop shadow entirely.
   */
  disableDropshadow?: boolean;

  /**
   * Size of the Avatar.
   */
  size?: ResponsiveProp<24 | 32 | 40 | 48 | 64 | 118>;

  /**
   * Overrides styles on the Avatar container.
   */
  className?: string;

  /**
   * @deprecated
   * This will be determined automatically by the theme moving forward.
   * Supplying it will determine the color of drop shadow.
   */
  mode?: VisualTheme;
};

export type AvatarProps = AvatarBaseProps & AvatarImageProps;

export const Avatar: React.FC<AvatarProps> = ({
  mode,
  disableDropshadow,
  size = 118,
  className,
  ...avatarImageProps
}) => (
  <AvatarContainer
    className={className}
    mode={mode}
    disableDropshadow={disableDropshadow}
    data-testid="avatar-container"
  >
    <Image dimensions={size} {...avatarImageProps} />
  </AvatarContainer>
);

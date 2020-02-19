import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '../../../gamut/src/theming/VisualTheme';

type AvatarImageProps =
  | {
      alt: string;
      'aria-labelledby'?: never;
    }
  | { alt?: never; 'aria-labelledby': string };

export type AvatarBaseProps = {
  src: string;
  size?: 'regular' | 'large';
  theme?: VisualTheme;
};

type AvatarProps = AvatarBaseProps & AvatarImageProps;

export const Avatar: React.FC<AvatarProps> = ({
  size = 'regular',
  theme = VisualTheme.LightMode,
  ...avatarImageProps
}) => {
  return (
    <div
      className={cx(
        s.container,
        s[`${size}Container`],
        theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={cx(s.image, s[`${size}Image`])} {...avatarImageProps} />
    </div>
  );
};

export default Avatar;

import React, { HTMLAttributes } from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '../../../gamut/src/theming/VisualTheme';

export type AvatarProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  size?: 'regular' | 'large';
  theme: VisualTheme;
};

export function Avatar({
  size = 'regular',
  alt,
  theme = VisualTheme.LightMode,
  ...imageProps
}: AvatarProps) {
  return (
    <div
      className={cx(
        s.container,
        s[`${size}Container`],
        theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer
      )}
    >
      <img
        className={cx(s.image, s[`${size}Image`])}
        {...imageProps}
        alt={alt}
      />
    </div>
  );
}

export default Avatar;

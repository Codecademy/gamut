import React, { HTMLAttributes } from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '../../../gamut/src/theming/VisualTheme';

export type AvatarProps = {
  src: string;
  label: string;
  size?: 'regular' | 'large';
  theme?: VisualTheme;
  imageProps?: HTMLAttributes<HTMLImageElement>;
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'regular',
  label,
  theme = VisualTheme.LightMode,
  ...imageProps
}) => (
  <div
    className={cx(
      s.container,
      s[`${size}Container`],
      theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer
    )}
    aria-labelledby={label}
  >
    <img
      className={cx(s.image, s[`${size}Image`])}
      {...imageProps}
      alt={label}
    />
  </div>
);

export default Avatar;

import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '../../../gamut/src/theming/VisualTheme';

type imageProps =
  | {
      alt: string;
      'aria-labelledby'?: never;
    }
  | { alt?: never; 'aria-labelledby': string };

export type baseProps = {
  src: string;
  size?: 'regular' | 'large';
  theme?: VisualTheme;
};

type AvatarProps = baseProps & imageProps;

export const Avatar: React.FC<AvatarProps> = ({
  size = 'regular',
  theme = VisualTheme.LightMode,
  ...imageProps
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
      <img className={cx(s.image, s[`${size}Image`])} {...imageProps} />
    </div>
  );
};

<Avatar
  src="https://content.codecademy.com/courses/free/boba.svg"
  alt="testy"
  size={'regular'}
  theme={VisualTheme.LightMode}
/>;

export default Avatar;

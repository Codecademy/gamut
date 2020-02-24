import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '@codecademy/gamut';

type AvatarImageProps =
  | {
      alt: string;
      'aria-labelledby'?: never;
    }
  | { alt?: never; 'aria-labelledby': string };

type AvatarBaseProps = {
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
      {/*  The current rules for alt-text don't allow images with aria-labelledby to have no alt. So, we need to disable the rule for that line. https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/411#issue-306995775 */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={cx(s.image, s[`${size}Image`])} {...avatarImageProps} />
    </div>
  );
};

export default Avatar;

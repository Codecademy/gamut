import React from 'react';
import styles from './styles.module.scss';
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
  theme?: VisualTheme;
  className?: string; // useful if avatar size needs to be overridden
};

type AvatarProps = AvatarBaseProps & AvatarImageProps;

export const Avatar: React.FC<AvatarProps> = ({
  theme = VisualTheme.LightMode,
  className,
  ...avatarImageProps
}) => {
  return (
    <div
      className={cx(
        styles.container,
        className,
        theme === VisualTheme.DarkMode
          ? styles.darkContainer
          : styles.lightContainer
      )}
    >
      {/*  The current rules for alt-text don't allow images with aria-labelledby to have no alt. So, we need to disable the rule for that line. https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/411#issue-306995775 */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...avatarImageProps} />
    </div>
  );
};

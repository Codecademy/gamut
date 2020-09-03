import cx from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { Button, ButtonProps } from '../Button';
import { CloseIcon } from '@codecademy/gamut-icons';

export enum BannerStyle {
  BorderBottom = 'border-bottom',
  FullWidth = 'full-width',
}

export type BannerProps = {
  classNames?: {
    /**
     * Class name for the container element.
     */
    container?: string;
    /**
     * Class name for the content wrapper
     */
    content?: string;
  };
  /** Visual variations for banners */
  displayStyle?: BannerStyle;
  /**
   * Whether or not the banner should be visible.
   */
  isClosed?: boolean;
  /**
   * Callback called when the user closes the banner.
   */
  onClose: ButtonProps['onClick'];
  /**
   * An icon or jsx element to be displayed to the left of the content.
   */
  icon?: React.ReactNode;
};

const BANNER_CLASSES = {
  [BannerStyle.BorderBottom]: styles.containerBordered,
  [BannerStyle.FullWidth]: styles.containerFullWidth,
};

export const Banner: React.FC<BannerProps> = ({
  children,
  classNames = {},
  displayStyle = BannerStyle.FullWidth,
  isClosed = false,
  onClose,
  icon,
}) => {
  if (isClosed) {
    return null;
  }

  return (
    <div
      className={cx(
        styles.container,
        classNames.container,
        BANNER_CLASSES[displayStyle]
      )}
    >
      {icon && <div data-testid="icon-id">{icon}</div>}
      <div className={cx(styles.content, classNames.content)}>{children}</div>
      <Button onClick={onClose} className={styles.closeButton}>
        <CloseIcon aria-label="dismiss" />
      </Button>
    </div>
  );
};

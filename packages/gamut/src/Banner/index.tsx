import cx from 'classnames';
import React, { MouseEvent } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import CloseIcon from '../Icon/icons/CloseIcon';

export enum BannerStyle {
  BorderBottom = 'border-bottom',
  FullWidth = 'full-width',
}

export type BannerProps = {
  classNames?: {
    container?: string;
    content?: string;
  };
  displayStyle?: BannerStyle;
  isClosed?: boolean;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
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

export default Banner;

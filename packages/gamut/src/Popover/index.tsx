import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';
import { Overlay } from '../Overlay';

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether clicking on the screen outside of the container should close the Popover
   */
  clickOutsideCloses?: boolean;
  /**
   * Whether clicking the escape key should close the Popover
   */
  escapeCloses?: boolean;
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the Popover, or by clicking the escape key
   */
  onRequestClose: () => void;
  isOpen?: boolean;

  align?: 'left' | 'right';
  fixed?: boolean;
  offset: number;
  onOutsideClick?: () => void;
  position: 'above' | 'below';
  targetRect?: DOMRect;
  showBeak?: boolean;
};

export const Popover: React.FC<PopoverProps> = ({
  className,
  children,
  clickOutsideCloses = true,
  escapeCloses = true,
  onRequestClose,
  isOpen,
  onOutsideClick,
  showBeak,
  position,
  targetRect,
  offset,
  align,
}) => {
  if (!isOpen) return null;

  const style = () => {
    if (!targetRect) return {};

    const positions = {
      above: Math.round(targetRect.top - offset),
      below: Math.round(targetRect.top + targetRect.height + offset),
    };
    return {
      top: positions[position],
      left:
        align === 'right'
          ? Math.round(targetRect.right)
          : Math.round(targetRect.left),
    };
  };

  const classes = cx(styles.popover, styles[`${position}-${align}`], className);

  return (
    <Overlay
      isOpen={!!isOpen}
      onRequestClose={onOutsideClick}
      escapeCloses
      className={styles.overlay1}
      fixedPositioning={false}
    >
      <div>
        {isOpen && <div className={styles.overlay} />}
        <div className={classes} style={style()}>
          {children}
          {showBeak && (
            <div className={cx(styles.beak, styles[`${position}-beak`])} />
          )}
        </div>
      </div>
    </Overlay>
  );
};

export default Popover;

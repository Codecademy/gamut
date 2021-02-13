import { ArrowRightIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

interface CardButtonProps {
  icon?: ReactNode;
  title: string;
  action?: () => void;
  withArrow?: boolean;
  className?: string;
}

export function CardButton(props: CardButtonProps) {
  return (
    <button
      className={cx(styles.buttonContainer, props.className)}
      onClick={props.action}
      type="button"
    >
      {props.icon ? props.icon : <div />}
      <div className={styles.displayHorizontal}>
        <div className={styles.buttonTitle}>{props.title}</div>
        {props.withArrow && (
          <div className={styles.buttonArrow}>
            <ArrowRightIcon size={22} />
          </div>
        )}
      </div>
    </button>
  );
}

import React, { ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../../Icon';
import styles from './styles.scss';

interface CardButtonProps {
  icon?: ReactNode;
  title: string;
  action?: () => void;
  withArrow?: boolean;
  className?: string;
}

function CardButton(props: CardButtonProps) {
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
            <Icon name="rightArrow" size={22} />
          </div>
        )}
      </div>
    </button>
  );
}

export default CardButton;

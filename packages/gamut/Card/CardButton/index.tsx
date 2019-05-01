import React from 'react';
import Icon from '../../Icon';
import styles from './styles.scss';
import { CardButton as CardButtonType } from '../types';

function CardButton(props: CardButtonType) {
  return (
    <button className={styles.buttonContainer} onClick={props.action}>
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

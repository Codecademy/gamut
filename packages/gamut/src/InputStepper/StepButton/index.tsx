import {
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

import { ButtonDeprecated } from '../../ButtonDeprecated';
import styles from './styles.module.scss';

export interface StepButtonProps {
  onClick: () => void;
  type: 'up' | 'down';
  labelledBy: string;
}

export const StepButton: React.FC<StepButtonProps> = ({
  type,
  onClick,
  labelledBy,
}) => {
  const ariaLabel = type === 'up' ? 'add one' : 'subtract one';
  const id = 'stepbtn-' + type;

  return (
    <ButtonDeprecated
      theme="brand-dark-blue"
      flat
      type="button"
      onClick={onClick}
      className={styles.stepButton}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={`${labelledBy} ${id}`}
    >
      {type === 'up' ? (
        <ArrowChevronUpIcon className={styles.stepperUp} />
      ) : (
        <ArrowChevronDownIcon className={styles.stepperDown} />
      )}
    </ButtonDeprecated>
  );
};

import React from 'react';

import {
  ArrowChevronUpIcon,
  ArrowChevronDownIcon,
} from '@codecademy/gamut-icons';
import { Button } from '../../Button';
import styles from './styles.module.scss';

export interface StepButtonProps {
  onClick: () => void;
  type: 'up' | 'down';
  labelledBy: string;
}

/**
 * render the step button within the input stepper
 */
const StepButton: React.FC<StepButtonProps> = ({
  type,
  onClick,
  labelledBy,
}) => {
  const ariaLabel = type === 'up' ? 'add one' : 'subtract one';
  const id = 'stepbtn-' + type;

  return (
    <Button
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
    </Button>
  );
};

export default StepButton;

/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';

import {
  ArrowChevronUpIcon,
  ArrowChevronDownIcon,
} from '@codecademy/gamut-icons';
import { Button } from '../../Button';
import { stepperButtonStyles, stepperButtonIconStyles } from './styles';

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
    <Button
      theme="brand-dark-blue"
      flat
      type="button"
      onClick={onClick}
      css={stepperButtonStyles}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={`${labelledBy} ${id}`}
    >
      {type === 'up' ? (
        <ArrowChevronUpIcon css={stepperButtonIconStyles} />
      ) : (
        <ArrowChevronDownIcon css={stepperButtonIconStyles} />
      )}
    </Button>
  );
};

/** @jsx jsx */

import React, { useEffect } from 'react';
import { jsx } from '@emotion/core';
import StepButton from './StepButton';
import {
  stepperStyles,
  inputStyles,
  columnStyles,
  labelStyles,
} from './styles';

export type InputStepperButtonTargets =
  | 'increase_selection'
  | 'decrease_selection';

export type InputStepperProps = {
  /** Label to show beneath the numeric value */
  label: string;

  /** Value to assign the numeric field */
  value: number;

  /** Maximum value allowed */
  max?: number;

  /** Minimum value allowed */
  min?: number;

  /** Action to perform when the value of this field has changed */
  onChange: (val: number) => void;

  /**
   * Label to use for accessibility purposes; will be read on the label, the
   * input field itself, and the stepper buttons via aria-labelledby
   */
  ariaLabel: string;

  /** Tracking callback to run when the step buttons are clicked */
  onStepperButtonClick?: (target: InputStepperButtonTargets) => void;

  /** Any additional styling that should be applied to the stepper */
  className?: string;
};

/**
 * Renders a numeric step input with an embedded label and a custom set of step buttons
 */
export const InputStepper: React.FC<InputStepperProps> = ({
  label,
  value,
  max = 999,
  min = 0,
  onChange,
  ariaLabel,
  onStepperButtonClick,
  className,
}) => {
  const normalize = (value: number) => {
    if (max && value > max) {
      return max;
    }
    if (value < min) {
      return min;
    }
    return value;
  };

  const calculateWidthFromMax = () => {
    if (max < 10) {
      return 'mini';
    }
    if (max > 99) {
      return 'long';
    }
    return 'standard';
  };

  const increment = (incrementAmount: 1 | -1) => {
    const incrementedValue = normalize(value + incrementAmount);
    if (onStepperButtonClick) {
      onStepperButtonClick(
        incrementAmount > 0 ? 'increase_selection' : 'decrease_selection'
      );
    }
    onChange(incrementedValue);
  };

  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value || `${min}`;
    const normalizedValue = normalize(parseInt(rawValue));
    if (normalizedValue === value) {
      return;
    }
    onChange(normalizedValue);
  };

  // ensure that the value comes in normalized & update the state
  // to reflect the normalized value. Taking a timeout approach so as
  // to avoid kicking off re-render while already mid-render
  const normalizedValue = normalize(value);
  useEffect(() => {
    if (normalizedValue !== value) {
      window.setTimeout(() => onChange(normalizedValue), 0);
    }
  });

  const inputId = 'inputStepper';
  const labelId = 'inputStepperLabel';
  const inputWidthClass = calculateWidthFromMax();

  return (
    <div className={className} css={stepperStyles}>
      <div css={columnStyles}>
        {/** render the actual input field */}
        <input
          css={inputStyles(inputWidthClass)}
          type="number"
          max={max}
          min={min}
          value={normalizedValue}
          name={inputId}
          id={inputId}
          aria-live="polite"
          aria-labelledby={`${labelId} ${inputId}`}
          aria-label={`current value of ${value}`}
          onChange={onChangeEvent}
        />

        {/* render the label for the input field */}
        <label
          id={labelId}
          css={labelStyles}
          aria-label={ariaLabel}
          htmlFor={inputId}
        >
          {label}
        </label>
      </div>

      {/** step up and step down buttons */}
      <div css={columnStyles}>
        <StepButton
          onClick={() => increment(1)}
          type="up"
          labelledBy={`${labelId} ${inputId}`}
        />
        <StepButton
          onClick={() => increment(-1)}
          type="down"
          labelledBy={`${labelId} ${inputId}`}
        />
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import StepButton from './StepButton';
import { colors, fontFamily } from '@codecademy/gamut-styles';

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

  const calculateWidthFromMax = (): number => {
    if (max < 10) {
      return 4.5;
    }
    if (max > 99) {
      return 8;
    }
    return 5;
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

  return (
    <StyledStepper className={className}>
      <StyledColumn>
        {/** render the actual input field */}
        <StyledInput
          size={calculateWidthFromMax()}
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
        <StyledLabel id={labelId} aria-label={ariaLabel} htmlFor={inputId}>
          {label}
        </StyledLabel>
      </StyledColumn>

      {/** step up and step down buttons */}
      <StyledColumn>
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
      </StyledColumn>
    </StyledStepper>
  );
};
export default InputStepper;

const StyledStepper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${fontFamily.base};
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & + & {
    margin-left: 0.7rem;
  }
`;

const StyledInput = styled.input<{ size: number }>`
  border: 2px solid ${colors.gray[200]};
  border-radius: 4px;
  outline: none;
  font-size: 1.65rem;
  padding: 0.2rem 1.5rem 1rem;
  text-align: center;
  font-family: ${fontFamily.heading};
  max-width: ${(p) => p.size}rem;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledLabel = styled.label`
  margin-top: -1.8rem;
  text-align: center;
  font-size: 0.9rem;
  font-family: ${fontFamily.base};
  padding-bottom: 0.35rem;
  color: ${colors.gray[800]};
`;

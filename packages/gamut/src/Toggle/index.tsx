import { css, screenReaderOnly } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';
import { HiddenText } from '../HiddenText';

export type ToggleSizes = keyof typeof sizes;
export type ToggleVariants = typeof colors[number];

export type LabelProps = {
  disabled?: boolean;
  variant?: ToggleVariants;
};

export type ToggleProps = {
  /** The state of the checkbox input (this can be out of sync with the input's value if not passed) */
  checked: boolean;
  /** Called when the input value has changed */
  onChange: (event?: React.FormEvent<HTMLInputElement>) => void;
  /** An aria-label used for accessibility and control, unique to the page */
  label?: string;
  /** Changes the dimensions of the element for using the component outside of a form context */
  size?: ToggleSizes;
  disabled?: boolean;
  className?: string;
};

const sizes = {
  medium: {
    height: '30px',
    width: '60px',
  },
  small: {
    height: '18px',
    width: '36px',
  },
};

const ToggleTrack = styled(Box)(
  css({
    transition: 'background-color 0.2s ease',

    '&:after': {
      content: '""',
      transition: 'opacity 0.2s ease',
      opacity: 0,
      borderRadius: 'inherit',
      position: 'absolute',
      width: 'calc(100% + 8px)',
      height: 'calc(100% + 8px)',
      top: '-4px',
      left: '-4px',
      borderColor: 'inherit',
      borderStyle: 'solid',
      borderWidth: 2,
    },
  })
);

const Circle = styled(Box)(
  css({
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  })
);

const ToggleInput = styled.input(screenReaderOnly);

const ToggleLabel = styled.label<LabelProps>`
  display: inline-block;
  cursor: pointer;
  border: 0;
  padding: 0;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.75;
  }

  ${ToggleInput}:focus-visible + ${ToggleTrack} {
    &:after {
      opacity: 1;
    }
  }
`;

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  className,
  onChange,
  label,
  disabled,
  size = 'medium',
}) => {
  const checkedColor = checked ? 'primary' : 'gray-600';
  const sizeStyles = sizes[size];

  return (
    <ToggleLabel className={className} htmlFor={label} disabled={disabled}>
      <HiddenText>{label}</HiddenText>
      <ToggleInput
        type="checkbox"
        checked={checked}
        id={label}
        disabled={disabled}
        onChange={onChange}
      />
      <ToggleTrack
        {...sizeStyles}
        borderColor="primary"
        bg={checkedColor}
        borderRadius="99rem"
        position="relative"
      >
        <Circle
          width="40%"
          borderRadius="50%"
          bg="white"
          position="absolute"
          top="10%"
          bottom="10%"
          left={checked ? '55%' : '5%'}
        />
      </ToggleTrack>
    </ToggleLabel>
  );
};

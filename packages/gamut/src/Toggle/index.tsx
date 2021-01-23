import { screenReaderOnly } from '@codecademy/gamut-styles';
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
  checked?: boolean;
  className?: string;
  onChange?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
  variant?: ToggleVariants;
  size?: ToggleSizes;
};

const sizes = {
  medium: {
    height: '30px',
    width: '60px',
  },
  small: {
    height: '16px',
    width: '32px',
  },
};

const colors = ['blue', 'hyper'] as const;

const ToggleTrack = styled(Box)`
  transition: background-color 0.2s ease;

  &:after {
    content: '';
    transition: opacity 0.2s ease;
    opacity: 0;
    border-radius: inherit;
    position: absolute;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    top: -4px;
    left: -4px;
    border-color: inherit;
    border-style: solid;
    border-width: 2px;
  }

  ${Box} {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

const ToggleInput = styled.input(screenReaderOnly);

const ToggleLabel = styled.label<LabelProps>`
  display: inline-block;
  cursor: pointer;
  border: 0;
  padding: 0;

  &[disabled] {
    cursor: auto;
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
  variant = 'blue',
  size = 'medium',
}) => {
  const activeColor = variant;
  const checkedColor = checked ? variant : 'gray-500';
  const sizeStyles = sizes[size];

  return (
    <ToggleLabel
      className={className}
      aria-label={label}
      htmlFor={label}
      variant={variant}
      disabled={disabled}
    >
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
        borderColor={activeColor}
        backgroundColor={checkedColor}
        borderRadius="99rem"
        position="relative"
      >
        <Box
          width="40%"
          borderRadius="50%"
          backgroundColor="white"
          position="absolute"
          top="10%"
          bottom="10%"
          left={checked ? '55%' : '5%'}
        />
      </ToggleTrack>
    </ToggleLabel>
  );
};

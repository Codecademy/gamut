import { screenReaderOnly } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { Component } from 'react';

import { Box } from '../Box';
import { HiddenText } from '../HiddenText';

export type ToggleSizes = keyof typeof sizes;
export type ToggleVariants = keyof typeof colors;

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

const colors = {
  'gray-blue': 'blue-500',
  purple: 'hyper',
} as const;

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

    ${ToggleTrack} {
      opacity: 0.75;
    }
  }

  ${ToggleInput}:focus-visible + ${ToggleTrack} {
    &:after {
      opacity: 1;
    }
  }
`;

export class Toggle extends Component<ToggleProps, {}> {
  render() {
    const {
      checked,
      className,
      onChange,
      label,
      disabled,
      variant = 'gray-blue',
      size = 'medium',
    } = this.props;
    const activeColor = colors[variant];
    const checkedColor = checked ? activeColor : 'gray-500';
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
  }
}

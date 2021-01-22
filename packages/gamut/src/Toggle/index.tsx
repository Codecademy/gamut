import { color, screenReaderOnly } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { Component } from 'react';

import { Box } from '../Box';
import { HiddenText } from '../HiddenText';

export type ToggleProps = {
  checked?: boolean;
  className?: string;
  onChange?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
  variant?: keyof typeof colors;
  size?: keyof typeof sizes;
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

const Track = styled(Box)`
  transition: background-color 0.2s ease;

  &:after {
    transition: opacity 0.2s ease;
    opacity: 0;
    content: '';
    border-radius: 99rem;
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

export type LabelProps = {
  disabled?: boolean;
  variant?: keyof typeof colors;
};

const ToggleInput = styled.input(screenReaderOnly);

const ToggleLabel = styled.label<LabelProps>`
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 0;
  padding: 0;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: auto;
      opacity: 0.75;
    `}

  ${ToggleInput}:focus-visible + ${Track} {
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
        <Track
          {...sizeStyles}
          borderColor={activeColor}
          backgroundColor={checkedColor}
          borderRadius="99rem"
          position="relative"
        >
          <Box
            borderRadius="50%"
            backgroundColor="white"
            position="absolute"
            top="10%"
            bottom="10%"
            width="40%"
            left={checked ? '55%' : '5%'}
          />
        </Track>
      </ToggleLabel>
    );
  }
}

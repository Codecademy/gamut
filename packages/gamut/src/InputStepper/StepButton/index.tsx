/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '@codecademy/gamut-styles';

import {
  ArrowChevronUpIcon,
  ArrowChevronDownIcon,
} from '@codecademy/gamut-icons';
import { Button } from '../../Button';

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

  const StyledIconButton = styled(
    type === 'up' ? ArrowChevronUpIcon : ArrowChevronDownIcon
  )`
    width: 1rem;
    height: 1rem;
    margin-top: -3px;
    display: block;
  `;

  return (
    <Button
      theme="brand-dark-blue"
      css={stepperButtonCss}
      flat
      type="button"
      onClick={onClick}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={`${labelledBy} ${id}`}
    >
      <StyledIconButton />
    </Button>
  );
};

export default StepButton;

export const stepperButtonCss = css`
  transform-origin: 50% 50%;
  color: ${colors.gray[700]};
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
  margin-top: 0.3rem;
  height: 2rem;
  min-width: 2rem;
`;

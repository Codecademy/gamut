import { timing } from '@codecademy/gamut-styles';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonProps, modeColorGroups } from './shared';

export const StyledButtonOutline = styled('button', {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== 'mode',
})<ButtonProps>(({ mode = 'light', variant = 'primary' }) => {
  const modeColors = modeColorGroups[mode][variant];

  return css`
    background: none;
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 0 0 transparent;
    color: inherit;
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    font: inherit;
    line-height: normal;
    margin: -1px;
    padding: 1px;
    text-align: center;
    text-decoration: none;
    transition: ${timing.fast} box-shadow;
    vertical-align: middle;
    white-space: nowrap;

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      user-select: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px ${modeColors.background};
    }

    &:hover {
      text-decoration: none;
    }
  `;
});

const linkTag = 'a';
const buttonTag = 'button';

type ButtonOutlineProps = React.ComponentProps<typeof StyledButtonOutline>;

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  as = buttonTag,
  disabled,
  ...props
}) => {
  const buttonProps: Partial<ButtonOutlineProps> = {
    as,
  };
  // Switch to an anchor tag if href is defined and the default component is unchanged
  if (buttonProps.as === buttonTag && props.href) {
    buttonProps.as = linkTag;
  }

  // Sensible defaults based on element tagName
  if (buttonProps.as === buttonTag) {
    buttonProps.type = props.type ?? 'button';
    buttonProps.disabled = disabled;
  } else {
    if (buttonProps.as !== linkTag || !props.href) {
      buttonProps.role = props.role ?? 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  return <StyledButtonOutline {...props} {...buttonProps} />;
};

import isPropValid from '@emotion/is-prop-valid';
import { timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { VisualTheme } from '../theming/VisualTheme';
import { ButtonProps, modeColorGroups } from './shared';

const StyledButtonOutline = styled('button', {
  shouldForwardProp: (prop: any) => isPropValid(prop) && prop !== 'mode',
})<ButtonProps>(({ mode = VisualTheme.LightMode }: ButtonProps) => {
  const modeColors = modeColorGroups[mode];

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
    margin: 0;
    padding: 0;
    text-align: center;
    text-decoration: none;
    transition: ${timing.fast} box-shadow;
    vertical-align: middle;
    white-space: nowrap;

    &:disabled {
      cursor: not-allowed;
      user-select: none;
    }

    &:focus {
      box-shadow: 0 0 0 2px ${modeColors.background};
      outline: none;
    }
  `;
});

export const ButtonOutline: React.FC<React.ComponentProps<
  typeof StyledButtonOutline
>> = ({ as, href, ...props }) => {
  const asComponent = !as && href ? 'a' : as ?? 'button';
  return <StyledButtonOutline as={asComponent} {...props} />;
};

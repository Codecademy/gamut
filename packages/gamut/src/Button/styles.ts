import { timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

import { VisualTheme } from '../theming/VisualTheme';
import { modeColorGroups } from './shared';

export type OutlineProps = {
  mode: VisualTheme;
};

export const buttonOutlineStyles = ({ mode }: OutlineProps) => css`
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

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    user-select: none;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${modeColorGroups[mode].background};
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }
`;

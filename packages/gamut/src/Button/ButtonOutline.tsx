import { timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { ButtonProps, config, modeColorGroups } from './shared';

export type ButtonOutlineProps = ComponentProps<typeof ButtonOutline>;

export const ButtonOutline = styled(
  'button',
  config
)<ButtonProps>(({ mode = 'light', variant = 'primary' }) => {
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
}).withComponent(ButtonBase);

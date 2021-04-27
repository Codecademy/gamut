import { timing } from '@codecademy/gamut-styles';
import { serializeTokens } from '@codecademy/variance';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { buttonColors, ButtonProps, config, modeColorGroups } from './shared';

export type ButtonOutlineProps = ComponentProps<typeof ButtonOutline>;

export const ButtonOutline = styled(
  'button',
  config
)<ButtonProps & { padded?: boolean }>(
  ({ mode = 'light', variant = 'primary', theme, padded = false }) => {
    const { variables } = serializeTokens(
      modeColorGroups[mode][variant],
      'button',
      theme
    );

    const padding = padded ? `1px 1px 5px 5px` : '1px';

    return css`
      ${variables}
      border-radius: 4px;
      box-shadow: 0 0 0 0 transparent;
      display: inline-block;
      margin: -1px;
      padding: ${padding};
      text-align: center;
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
        box-shadow: 0 0 0 2px ${buttonColors.background};
      }

      &:hover {
        text-decoration: none;
      }
    `;
  }
).withComponent(ButtonBase);

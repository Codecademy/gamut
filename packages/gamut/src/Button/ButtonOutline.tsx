import { timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase';
import { VisualTheme } from '../theming/VisualTheme';
import { ButtonProps, modeColorGroups } from './shared';

export const ButtonOutline = styled(ButtonBase)<ButtonProps>(
  ({ mode = VisualTheme.LightMode }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 4px;
      box-shadow: 0 0 0 0 transparent;
      transition: ${timing.fast} box-shadow;

      &:disabled {
        cursor: not-allowed;
        user-select: none;
      }

      &:focus {
        box-shadow: 0 0 0 2px ${modeColors.background};
      }
    `;
  }
);

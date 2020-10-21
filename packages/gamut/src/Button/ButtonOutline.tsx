import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase';
import { ButtonProps, modeColorGroups } from './shared';

export const ButtonOutline = styled(ButtonBase)<ButtonProps>(
  ({ mode = 'light' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 4px;
      box-shadow: 0 0 0 0 transparent;
      transition: 150ms box-shadow;

      &:focus {
        box-shadow: 0 0 0 2px ${modeColors.background};
      }
    `;
  }
);

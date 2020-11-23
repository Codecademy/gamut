import { colors, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { buttonOutlineStyles } from '../Button/styles';
import { VisualTheme } from '../theming/VisualTheme';
import { MenuButtonProps } from './MenuButtonToggle';

export const MenuButton = styled(ReachMenuButton)<MenuButtonProps>`
  ${buttonOutlineStyles({ mode: VisualTheme.LightMode })}

  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing[16]} ${spacing[8]};

  ${({ isExpanded }) => isExpanded && `font-weight: bold;`}

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  &:hover {
    color: ${colors.hyper};
  }
`;

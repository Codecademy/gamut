import { colors, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { MenuButtonProps } from './MenuButtonToggle';

export const MenuButton = styled(ReachMenuButton)<MenuButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing[4]} ${spacing[12]};

  ${({ isExpanded }) => isExpanded && `font-weight: bold;`}

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  &:hover {
    color: ${colors.hyper};
  }
`;

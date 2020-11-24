import { colors, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { MenuButtonProps } from './MenuButtonToggle';

export const MenuButton = styled(ReachMenuButton)<MenuButtonProps>`
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  padding: ${spacing[4]} ${spacing[8]};
  transition: box-shadow 0.1s ease-in-out;

  ${({ isExpanded }) => isExpanded && `font-weight: bold;`}

  &[data-focus-visible-added] {
    box-shadow: 0 0 0 2px ${colors.black};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${colors.hyper};
  }
`;

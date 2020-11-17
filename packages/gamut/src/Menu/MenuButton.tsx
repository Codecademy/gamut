import { spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';

export const MenuButton = styled(ReachMenuButton)`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing[8]} ${spacing[12]};
`;

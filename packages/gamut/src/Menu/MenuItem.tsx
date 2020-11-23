import { spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { MenuItem as ReachMenuItem } from '@reach/menu-button';

import { listItemStyles } from './styles';

export const MenuItem = styled(ReachMenuItem)`
  ${listItemStyles}
`;

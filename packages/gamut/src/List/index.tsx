import styled from '@emotion/styled';

import { Box } from '..';

/**
 * This is currently a workaround until we are able to handle setting `list-style` in a more general way.
 */

export const List = styled(Box)<{ as?: 'ol' | 'ul' }>`
  list-style: none;
`;

List.defaultProps = {
  as: 'ul',
  padding: 0,
  margin: 0,
};

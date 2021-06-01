import styled from '@emotion/styled';

import { IconButton } from '../Button';
import { Card } from '../Card';
import { Overlay } from '../Overlay';

export const StyledModalContainer = styled(Overlay)`
  background-color: rgba(25, 25, 26, 0.7);
  z-index: 15;
`;

export const StyledModalBody = styled(Card)``;

export const StyledCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledCloseButton = styled(IconButton)``;

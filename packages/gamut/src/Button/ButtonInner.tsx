import { fontSize, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const ButtonInner = styled.span`
  display: flex;
  font-size: ${fontSize[16]};
  transition: ${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color;
`;

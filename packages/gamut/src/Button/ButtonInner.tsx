import { fontSize, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

export const ButtonInner = styled('span', {
  shouldForwardProp: (prop: any) => isPropValid(prop) && prop !== 'mode',
})`
  display: flex;
  font-size: ${fontSize[16]};
  transition: ${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color;
`;

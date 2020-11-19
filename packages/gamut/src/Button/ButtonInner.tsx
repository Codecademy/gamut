import { fontSize, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';

export const ButtonInner = styled('span', {
  shouldForwardProp: (prop: any) => isPropValid(prop) && prop !== 'mode',
})(() => {
  return css`
    display: flex;
    font-size: ${fontSize[16]};
    transition: ${timing.fast} background-color, ${timing.fast} box-shadow,
      ${timing.fast} color;
  `;
});

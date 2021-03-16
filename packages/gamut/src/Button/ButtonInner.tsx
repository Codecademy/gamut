import {
  fontSmoothing,
  fontWeight,
  styled,
  timing,
} from '@codecademy/gamut-styles';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';

export const ButtonInner = styled('span', {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !['mode', 'size'].includes(prop),
})(() => {
  return css`
    ${fontSmoothing()}
    display: inline-block;
    border: 2px solid transparent;
    border-radius: 3px;
    font-weight: ${fontWeight.title};
    text-align: center;
    transition: ${timing.fast} background-color, ${timing.fast} box-shadow,
      ${timing.fast} color;

    &:before,
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 100%;
      margin-left: -1px;
      margin-right: -1px;
      vertical-align: middle;
    }

    > * {
      vertical-align: middle;
    }
  `;
});

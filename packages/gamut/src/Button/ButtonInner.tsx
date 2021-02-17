import { fontSmoothing, fontWeight, timing } from '@codecademy/gamut-styles';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonInner = styled('span', {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !['mode', 'size'].includes(prop),
})(() => {
  return css`
    ${fontSmoothing()}
    display: inline-block;
    border: 2px solid transparent;
    border-radius: 3px;
    vertical-align: middle;
    font-weight: ${fontWeight.title};
    transition: ${timing.fast} background-color, ${timing.fast} box-shadow,
      ${timing.fast} color;

    &:before,
    &:after {
      margin-left: -1px;
      width: 1px;
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }

    > * {
      vertical-align: middle;

      &:first-of-type {
        margin-left: -1px;
      }
      &::last-of-type {
        margin-right: -1px;
      }
    }
  `;
});

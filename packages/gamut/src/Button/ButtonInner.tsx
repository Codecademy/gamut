import { fontSmoothing, fontWeight, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { config } from './shared';

export const ButtonInner = styled('span', config)`
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

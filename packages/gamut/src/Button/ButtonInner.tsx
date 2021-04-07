import {
  styledConfig,
  theme,
  themed,
  transitionConcatenator,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const ButtonInner = styled('span', styledConfig(['mode', 'size']))`
  display: inline-block;
  border: 2px solid transparent;
  border-radius: 3px;
  font-weight: ${themed('fontWeight.title')};
  text-align: center;
  transition: ${transitionConcatenator(
    ['background-color', 'box-shadow', 'color'],
    theme.timing.fast,
    'ease'
  )};

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

import styled from '@emotion/styled';
import {
  boxShadow,
  colors,
  fontAccent,
  fontMonospace,
  spacing,
} from '@codecademy/gamut-styles';

export const PropGroupTooltip = styled.ul`
  display: none;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
  padding: ${spacing[8]} ${spacing[12]};
  background-color: ${colors['gray-100']};
  border: 1px solid ${colors['gray-200']};
  list-style: none;
  margin: 0;
  border-radius: 6px;
  ${boxShadow(1)}
`;

export const PropItem = styled.li`
  margin: ${spacing[8]} 0;
  font-size: 11px;
  font-family: ${fontMonospace};
  text-align: center;
  text-transform: none;
  color: ${colors['gray-700']};
`;

export const HeaderColumn = styled.div``;

export const PropGroupTag = styled.span`
  position: relative;
  display: inline-block;
  padding: ${spacing[4]} ${spacing[8]};
  font-size: 11px;
  font-family: ${fontAccent};
  margin: ${spacing[4]};
  margin-top: 0;
  color: ${colors['gray-600']};
  border: 1px solid ${colors['gray-400']};
  border-radius: 4px;
  text-transform: uppercase;
  cursor: help;

  &:first-of-type {
    margin-left: 0;
  }

  &:hover {
    ${PropGroupTooltip} {
      display: block;
    }
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
`;

export const Title = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: ${spacing[8]};
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleLabel = styled.span`
  margin-right: 4px;
  font-size: 14px;
  line-height: 2;
`;

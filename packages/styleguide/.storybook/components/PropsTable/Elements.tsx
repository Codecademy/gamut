import { styled } from '@storybook/theming';
import { boxShadow, spacing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const PropGroupTooltip = styled.ul`
  display: none;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
  padding: ${spacing[8]} ${spacing[12]};
  background-color: ${({ theme }) => theme.color.light};
  border: 1px solid ${({ theme }) => theme.color.medium};
  list-style: none;
  margin: 0;
  border-radius: 6px;
  ${boxShadow(1)}
`;

export const PropItem = styled.li`
  margin: ${spacing[8]} 0;
  font-size: 11px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  text-align: center;
  text-transform: none;
  color: ${({ theme }) => theme.color.dark};
`;

export const HeaderColumn = styled.div``;

export const PropGroupTag = styled.span<{ active?: boolean }>`
  user-select: none;
  position: relative;
  display: inline-block;
  padding: ${spacing[4]} ${spacing[8]};
  font-size: 11px;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: help;

  &:first-of-type {
    margin-left: 0;
  }

  &:hover {
    > * {
      display: block;
    }
  }

  ${({ active, theme }) =>
    active
      ? css`
          color: ${theme.color.secondary};
          border: 1px solid ${theme.color.secondary};
        `
      : css`
          color: ${theme.color.dark};
          border: 1px solid ${theme.color.mediumdark};
        `}
`;

export const Title = styled.p`
  display: inline-block;
  font-weight: 700;
  margin: 0;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ToggleLabel = styled.label`
  margin-right: 4px;
  font-size: 14px;
  line-height: 2;
`;

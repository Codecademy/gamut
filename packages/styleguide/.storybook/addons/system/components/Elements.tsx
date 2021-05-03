import styled from '@emotion/styled';
import { themed, system } from '@codecademy/gamut-styles/src';
import { StyleProps } from '@codecademy/variance';

export const PropGroupTooltip = styled.ul`
  display: none;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
  padding: ${themed('spacing.8')} ${themed('spacing.12')};
  border: 1px solid ${themed('colors.navy')};
  background-color: ${themed('colors.white')};
  list-style: none;
  margin: 0;
  z-index: 5;
`;

export const PropItem = styled.li`
  margin: ${themed('spacing.8')} 0;
  font-size: 11px;
  font-family: ${themed('fontFamily.accent')};
  text-align: center;
  text-transform: none;
  color: ${themed('colors.gray-700')};
`;

const tagVariants = system.variant({
  variants: {
    normal: {
      textColor: 'navy',
      borderColor: 'navy',
    },
    selected: {
      textColor: 'white',
      bg: 'navy',
      borderColor: 'navy',
    },
  },
});

export const PropGroupTag = styled.span<StyleProps<typeof tagVariants>>`
  ${tagVariants}
  user-select: none;
  position: relative;
  display: inline-block;
  padding: ${themed('spacing.4')} ${themed('spacing.8')};
  font-size: 11px;
  font-family: ${themed('fontFamily.accent')};
  border-radius: 4px;
  cursor: help;
  border: 1px solid;

  &:hover {
    & + ul {
      display: block;
    }
  }
`;

export const ToggleLabel = styled.label`
  margin-right: 4px;
  font-size: 16px;
  line-height: 2;
`;

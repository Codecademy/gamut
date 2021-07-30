import styled from '@emotion/styled';
import { themed, variant } from '@codecademy/gamut-styles/src';
import { StyleProps } from '@codecademy/variance';

export const PropGroupTooltip = styled.ul`
  display: none;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  min-width: 80px;
  transform: translate(-50%, 0);
  padding: ${themed('spacing.8')} ${themed('spacing.12')};
  border: ${themed('borders.1')};
  background-color: ${themed('colors.white')};
  list-style: none;
  margin: 0;
  z-index: 5;
`;

export const PropItem = styled.li`
  margin: ${themed('spacing.8')} 0;
  font-size: ${themed('fontSize.14')};
  text-align: center;
  text-transform: none;
  color: ${themed('colors.gray-700')};
`;

const tagVariants = variant({
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
  font-size: ${themed('fontSize.14')};
  font-family: ${themed('fontFamily.base')};
  border-radius: 4px;
  cursor: help;
  border: ${themed('borders.1')};

  &:hover {
    > * {
      display: block;
    }
  }
`;

export const ToggleLabel = styled.label`
  margin-right: 4px;
  font-size: 16px;
  line-height: 2;
`;

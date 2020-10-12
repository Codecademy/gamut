import unthemedStyled, { CreateStyled } from '@emotion/styled';
import { system, ThemedSystem } from '../../src/core';
import { Theme } from '../theme';

const themedSystem = system as ThemedSystem<Theme>;

const pxRem = (value: any) =>
  typeof value === 'number' ? `${value / 16}rem` : value;

export const {
  properties,
  typography,
  layout,
  colors,
  grid,
  flex,
  shadow,
  spacing,
  positioning,
  border,
  background,
  variant,
} = themedSystem({
  typography: {
    fontSize: {
      propName: 'fontSize',
      scale: 'fontSize',
      transformValue: pxRem,
    },
    fontFamily: {
      propName: 'fontFamily',
      scale: 'fontFamily',
    },
    fontWeight: {
      propName: 'fontWeight',
      scale: 'fontWeight',
    },
    lineHeight: {
      propName: 'lineHeight',
      scale: 'lineHeight',
    },
  },
  spacing: {
    margin: {
      propName: 'margin',
      scale: 'space',
      transformValue: pxRem,
    },
    padding: {
      propName: 'padding',
      scale: 'space',
      transformValue: pxRem,
    },
  },
  colors: {
    color: {
      propName: 'color',
      scale: 'textColor',
    },
    borderColor: {
      propName: 'borderColor',
      scale: 'backgroundColor',
    },
    backgroundColor: {
      propName: 'backgroundColor',
      scale: 'backgroundColor',
    },
  },
  border: {
    borderRadius: {
      propName: 'borderRadius',
      scale: 'radii',
      transformValue: pxRem,
    },
    borderWidth: {
      propName: 'borderWidth',
      scale: 'lineWidths',
      transformValue: pxRem,
    },
  },
  grid: {
    columnGap: {
      propName: 'columnGap',
      scale: 'space',
    },
    rowGap: {
      propName: 'rowGap',
      scale: 'space',
    },
  },
});

export const styled = unthemedStyled as CreateStyled<Theme>;

import { system } from '@codecademy/gamut-system';
import { Theme } from './theme';

const {
  variant,
  properties,
  typography,
  grid,
  flex,
  layout,
  positioning,
  background,
  color,
  shadow,
  spacing: space,
  border,
} = system.withTheme<Theme>().create({
  typography: {
    fontSize: {
      propName: 'fontSize',
      scale: 'fontSize',
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
      scale: 'spacing',
    },
    padding: {
      propName: 'padding',
      scale: 'spacing',
    },
  },
  color: {
    textColor: {
      propName: 'textColor',
      scale: 'colors',
    },
    backgroundColor: {
      propName: 'backgroundColor',
      scale: 'colors',
    },
    borderColor: {
      propName: 'borderColor',
      scale: 'colors',
    },
  },
});

export {
  variant,
  properties,
  typography,
  grid,
  flex,
  layout,
  positioning,
  background,
  color,
  shadow,
  space,
  border,
};

import { system } from '@codecademy/gamut-system';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@emotion/react';

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
  grid: {
    columnGap: {
      propName: 'columnGap',
      scale: 'spacing',
    },
    rowGap: {
      propName: 'rowGap',
      scale: 'spacing',
    },
  },
});

const allProps = Object.keys(properties).reduce<string[]>(
  (carry, prop: keyof typeof properties) => {
    return [...carry, ...properties[prop].propNames];
  },
  []
);

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !allProps.includes(prop);

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
  shouldForwardProp,
};

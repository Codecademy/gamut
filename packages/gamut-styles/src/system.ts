import { system } from '@codecademy/gamut-system';

import { Theme } from './theme';

const { css, variant, properties, groups } = system.withTheme<Theme>().create({
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
  margin: {
    propName: 'margin',
    scale: 'spacing',
  },
  padding: {
    propName: 'padding',
    scale: 'spacing',
  },
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
  columnGap: {
    propName: 'columnGap',
    scale: 'spacing',
  },
  rowGap: {
    propName: 'rowGap',
    scale: 'spacing',
  },
});

type GroupProps = typeof groups;
interface Groups extends GroupProps {}

const {
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
}: Groups = groups;

export {
  css,
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

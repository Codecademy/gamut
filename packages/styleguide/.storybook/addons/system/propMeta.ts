import * as system from '@codecademy/gamut-styles/src/system';

const { shouldForwardProp, properties, variant, ...groups } = system;

export const PROP_GROUPS = groups;

export const ALL_PROPS = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

export const PROP_META = {
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
};

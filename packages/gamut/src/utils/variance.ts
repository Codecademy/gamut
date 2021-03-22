import { theme } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import isPropValid from '@emotion/is-prop-valid';

export const props = variance.withTheme(theme);

export const createStyledConfig = (invalidProps: string[]) => ({
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !invalidProps.includes(prop),
});

/** These will be moved to gamut-styles as the replacements for the current
 * gamut system props as they are more performant and support the newest syntax */

export const layout = props.create({
  display: { property: 'display' },
  overflow: { property: 'overflow' },
  overflowX: { property: 'overflowX' },
  overflowY: { property: 'overflowY' },
  visibility: { property: 'visibility' },
  opacity: { property: 'opacity' },
});

export const dimensions = props.create({
  w: { property: 'width' },
  maxW: { property: 'maxWidth' },
  minW: { property: 'minWidth' },
  h: { property: 'height' },
  maxH: { property: 'maxHeight' },
  minH: { property: 'minHeight' },
});

export const padding = props.create({
  p: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
    scale: 'spacing',
  },
  px: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'spacing',
  },
  py: {
    property: 'padding',
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'spacing',
  },
  pt: { property: 'paddingTop', scale: 'spacing' },
  pb: { property: 'paddingBottom', scale: 'spacing' },
  pr: { property: 'paddingRight', scale: 'spacing' },
  pl: { property: 'paddingLeft', scale: 'spacing' },
});

export const margin = props.create({
  m: {
    property: 'margin',
    properties: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
    scale: 'spacing',
  },
  mx: {
    property: 'margin',
    properties: ['marginLeft', 'marginRight'],
    scale: 'spacing',
  },
  my: {
    property: 'margin',
    properties: ['marginTop', 'marginBottom'],
    scale: 'spacing',
  },
  mt: { property: 'marginTop', scale: 'spacing' },
  mb: { property: 'marginBottom', scale: 'spacing' },
  mr: { property: 'marginRight', scale: 'spacing' },
  ml: { property: 'marginLeft', scale: 'spacing' },
});

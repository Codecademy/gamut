import { variance } from '@codecademy/variance';

import * as PROPERTIES from './config';

/**
 * TODO: Export these
 * These are not exported yet, but will be used when gamut-system is deprecated
 */

export const typography = variance.create(PROPERTIES.typography);
export const grid = variance.create(PROPERTIES.grid);
export const flex = variance.create(PROPERTIES.flex);
export const layout = variance.create(PROPERTIES.layout);
export const positioning = variance.create(PROPERTIES.positioning);
export const background = variance.create(PROPERTIES.background);
export const color = variance.create(PROPERTIES.color);
export const shadow = variance.create(PROPERTIES.shadows);
export const space = variance.create(PROPERTIES.space);
export const border = variance.create(PROPERTIES.border);

export const css = variance.createCss(PROPERTIES.all);

export const variant = variance.createVariant(PROPERTIES.all);

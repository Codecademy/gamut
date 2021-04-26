import { createCss, createProps, createVariants } from '@codecademy/variance';

import * as PROPERTIES from './config';

/**
 * TODO: Export these
 * These are not exported yet, but will be used when gamut-system is deprecated
 */

export const typography = createProps(PROPERTIES.typography);
export const grid = createProps(PROPERTIES.grid);
export const flex = createProps(PROPERTIES.flex);
export const layout = createProps(PROPERTIES.layout);
export const positioning = createProps(PROPERTIES.positioning);
export const background = createProps(PROPERTIES.background);
export const color = createProps(PROPERTIES.color);
export const shadow = createProps(PROPERTIES.shadows);
export const space = createProps(PROPERTIES.space);
export const border = createProps(PROPERTIES.border);

export const css = createCss(PROPERTIES.all);

export const variant = createVariants(PROPERTIES.all);

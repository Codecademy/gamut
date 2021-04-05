import { variance } from '@codecademy/variance';

import * as PROPERTIES from './config';

/**
 * These are not exported yet, but will be used when gamut-system is deprecated
 */

export const typographyProps = variance.create(PROPERTIES.typography);
export const gridProps = variance.create(PROPERTIES.grid);
export const flexProps = variance.create(PROPERTIES.flex);
export const layoutProps = variance.create(PROPERTIES.layout);
export const positioningProps = variance.create(PROPERTIES.positioning);
export const backgroundProps = variance.create(PROPERTIES.background);
export const colorProps = variance.create(PROPERTIES.color);
export const shadowProps = variance.create(PROPERTIES.shadows);
export const spaceProps = variance.create(PROPERTIES.space);
export const borderProps = variance.create(PROPERTIES.border);

export const css = variance.createCss(PROPERTIES.all);

/**
 * TODO: Rename variant when we remove gamut-system version
 */
export const varia = variance.createVariant(PROPERTIES.all);

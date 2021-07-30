import { Globals, StandardProperties, VendorProperties } from 'csstype';

type ColorProperties = 'color' | `${string}Color`;

type ColorGlobals = {
  [K in Extract<keyof StandardProperties, ColorProperties>]?:
    | Globals
    | 'currentColor'
    | 'transparent'
    | (string & {});
};

type SizeProperties =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'inset'
  | 'width'
  | 'height'
  | `${string}${'Width' | 'Height'}`;

type SizeGlobals = {
  [K in Extract<keyof StandardProperties, SizeProperties>]?:
    | StandardProperties[K]
    | (number & {});
};

/** This is a placeholder type for CSS properties that may not have any specific global values (outlineOffset).
 * (string & {}) will allow strings but not generalize the union type to just a string if other string literals exist in the union.
 *
 * This ensures that autosuggestions will still work for literal types but still allow any string for certain properties.
 */
export type DefaultCSSPropertyValue = (string & {}) | 0;

export interface PropertyTypes<Overrides = DefaultCSSPropertyValue>
  extends Omit<
      StandardProperties<Overrides>,
      keyof ColorGlobals | keyof SizeGlobals
    >,
    ColorGlobals,
    SizeGlobals {}

export interface VendorPropertyTypes<Overrides = DefaultCSSPropertyValue>
  extends VendorProperties<Overrides> {}

export interface CSSPropertyTypes<Overrides = DefaultCSSPropertyValue>
  extends PropertyTypes<Overrides>,
    VendorPropertyTypes<Overrides> {}

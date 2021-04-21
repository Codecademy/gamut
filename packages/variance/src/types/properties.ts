import { Globals, StandardProperties } from 'csstype';

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

export interface PropertyTypes<Overrides = (string & {}) | 0>
  extends Omit<
      StandardProperties<Overrides>,
      keyof ColorGlobals | keyof SizeGlobals
    >,
    ColorGlobals,
    SizeGlobals {}

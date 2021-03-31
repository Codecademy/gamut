import { Globals, StandardProperties } from 'csstype';

type ColorProperties = {
  [K in keyof StandardProperties as `${K extends 'color' | `${string}Color`
    ? K
    : never}`]:
    | Extract<StandardProperties[K], Globals>
    | 'currentColor'
    | (string & {});
};
export interface PropertyTypes<Overrides = never>
  extends Omit<StandardProperties<Overrides>, keyof ColorProperties>,
    ColorProperties {}

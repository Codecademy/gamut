import { BaseSystemConfig, PropGroups } from '../props';
import {
  AbstractTheme,
  Handler,
  PropertyConfig,
  ThematicProps,
} from './config';
import { PseudoSelectors } from './properties';
import { UnionToIntersection, WeakRecord } from './utils';

export interface CSSObject {
  [key: string]: string | number;
}

/** A collection of Property Groups EG: 'typography' | 'layout' etc.  */
export interface SystemConfig<Theme extends AbstractTheme> {
  [key: string]: PropertyConfig<Theme>;
}

/** Merge a user defined configuration on top of the base configuration to derive defaults correctly */
type MergeConfig<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = BaseSystemConfig & Config;

/**
 * This is an intermediate type to derive other more complex properties from for the system return type.
 * It infers the type signatures of all individual stylefunctions that exist within a property group and
 * all of their possible props/
 */
interface SystemProperties<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> {
  /** All possible property handlers based off the MergedConfiguration  */
  handlers: {
    [Property in keyof MergeConfig<Theme, Config>]: Handler<
      ThematicProps<Theme, MergeConfig<Theme, Config>[Property]>
    >;
  };
  /** All possible prop type signatures  */
  props: {
    [Property in keyof MergeConfig<Theme, Config>]: ThematicProps<
      Theme,
      MergeConfig<Theme, Config>[Property]
    >;
  };
}

/**
 * The union of all possible props in `SystemProperties`
 */
export type AllSystemProps<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = UnionToIntersection<
  SystemProperties<Theme, Config>['props'][keyof SystemProperties<
    Theme,
    Config
  >['props']]
>;

/**
 * The return type for `system`
 * variant: a function to create aliased combinations of all system props.
 * properties: a map of all individual style functions.

 * And a map of all composed handlers from each top level system group.
 */

export interface Variant<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> {
  /** Customizable prop interface */
  <Prop extends Readonly<string>, Keys extends string>(config: {
    prop: Prop;
    variants: Readonly<
      Record<
        Keys,
        AllSystemProps<Theme, Config> &
          PseudoSelectors<AllSystemProps<Theme, Config>>
      >
    >;
  }): (props: WeakRecord<Prop, Keys> & { theme?: Theme }) => CSSObject;
  /** Default `variant` interface */
  <Keys extends string>(
    config: Readonly<
      Record<
        Keys,
        AllSystemProps<Theme, Config> &
          PseudoSelectors<AllSystemProps<Theme, Config>>
      >
    >
  ): (props: WeakRecord<'variant', Keys> & { theme?: Theme }) => CSSObject;
}

export interface CSS<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> {
  (
    props: AllSystemProps<Theme, Config> &
      PseudoSelectors<AllSystemProps<Theme, Config>>
  ): (props?: { theme?: Theme }) => CSSObject;
}
export interface System<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> {
  /** Higher order function for theme aware CSS object */
  css: CSS<Theme, Config>;
  /** Higher order variant function, with two overloads */
  variant: Variant<Theme, Config>;
  /** The intersection of all style properties (regardless of group) */
  propTypes: SystemProperties<Theme, Config>['props'];
  properties: SystemProperties<Theme, Config>['handlers'];
  groups: {
    [Group in keyof PropGroups]: Handler<
      Pick<
        SystemProperties<Theme, Config>['props'],
        PropGroups[Group]
      >[keyof Pick<SystemProperties<Theme, Config>['props'], PropGroups[Group]>]
    >;
  };
}

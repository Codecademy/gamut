import { CSSObject } from '@emotion/core';
import { BaseSystemConfig } from '../props';
import {
  AbstractTheme,
  Handler,
  PropertyConfig,
  ThematicProps,
} from './config';
import { UnionToIntersection, WeakRecord } from './utils';

/** A Group of Property Configurations EG: typography | spacing */
type GroupConfig<Theme extends AbstractTheme> = Record<
  string,
  PropertyConfig<Theme>
>;

/** All Groups / Properties */
export type SystemConfig<Theme extends AbstractTheme> = Record<
  string,
  GroupConfig<Theme>
>;

// Initialize all type derivations and declare return signature
// Intersection of Base and the supplied configuration objects.
type MergeConfig<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = BaseSystemConfig & Config;

// Intermediate type to derive return types from representing all properties and handler
type SystemProperties<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = {
  /** All possible property handlers based off the MergedConfiguration  */
  [PropGroup in keyof MergeConfig<Theme, Config>]: {
    handlers: {
      [Property in keyof MergeConfig<Theme, Config>[PropGroup]]: Handler<
        ThematicProps<Theme, MergeConfig<Theme, Config>[PropGroup][Property]>
      >;
    };
    /** All possible prop type signatures  */
    props: {
      [Property in keyof MergeConfig<Theme, Config>[PropGroup]]: ThematicProps<
        Theme,
        MergeConfig<Theme, Config>[PropGroup][Property]
      >;
    };
  };
};

// Intersection of all possible props
export type AllSystemProps<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = UnionToIntersection<
  {
    [PropGroup in keyof SystemProperties<Theme, Config>]: UnionToIntersection<
      SystemProperties<
        Theme,
        Config
      >[PropGroup]['props'][keyof SystemProperties<
        Theme,
        Config
      >[PropGroup]['props']]
    >;
  }[keyof SystemProperties<Theme, Config>]
>;

export type System<
  Theme extends AbstractTheme,
  Config extends SystemConfig<Theme>
> = {
  variant: {
    /** Customizable PropKey */
    <Prop extends Readonly<string>, Keys extends string>(config: {
      prop: Prop;
      variants: Readonly<Record<Keys, AllSystemProps<Theme, Config>>>;
    }): (props: WeakRecord<Prop, Keys> & { theme?: Theme }) => CSSObject;
    /**  */
    <Keys extends string>(
      config: Readonly<Record<Keys, AllSystemProps<Theme, Config>>>
    ): (props: WeakRecord<'variant', Keys> & { theme?: Theme }) => CSSObject;
  };
  properties: UnionToIntersection<
    SystemProperties<Theme, Config>[keyof SystemProperties<
      Theme,
      Config
    >]['handlers']
  >;
} & {
  [PropGroup in keyof SystemProperties<Theme, Config>]: Handler<
    SystemProperties<Theme, Config>[PropGroup]['props'][keyof SystemProperties<
      Theme,
      Config
    >[PropGroup]['props']]
  >;
};

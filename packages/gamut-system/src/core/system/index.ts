import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';

import * as BaseProps from '../../props';
import { compose } from '../compose';
import { getDefaultPropKey } from '../utils';
import { createResponsiveProperty } from '../createResponsiveProperty';
import { SystemBreakpoints } from '../../types/breakpoints';
import { SystemTheme } from '../../types/theme';
import { DefaultBreakpoints, defaultTheme } from './defaultSystem';
import { SystemGroups } from '../../types/groups';
import { System } from '../../types/system';

export type SystemThemeSettings<Breakpoints extends SystemBreakpoints> = {
  breakpoints: Breakpoints;
  breakpointsOrder?: (keyof Breakpoints)[];
  groups: SystemGroups<Breakpoints>;
};

/**
 * `system` function to create a system given a base theme description.
 */
export type SystemFactory = {
  /**
   * Creates the default system with minimal breakpoints and property groups.
   */
  (): System<DefaultBreakpoints, any>;

  /**
   * Creates a new system with the configured breakpoints and property groups.
   */
  <
    Breakpoints extends SystemBreakpoints,
    Theme extends SystemThemeSettings<Breakpoints>
  >(
    theme: Theme
  ): System<Breakpoints, any>;
};

export const system: SystemFactory = <
  Breakpoints extends SystemBreakpoints,
  ThemeSettings extends SystemThemeSettings<Breakpoints>
>(
  themeSettings?: ThemeSettings
) => {
  if (!themeSettings) {
    return system(defaultTheme);
  }

  const theme: SystemTheme<Breakpoints> = {
    breakpointsOrder: Object.keys(themeSettings.breakpoints),
    ...themeSettings,
  };

  const createdSystem = {
    properties: {},
    propertyGroups: {},
    variant: (variantConfig) => {
      const variants = variantConfig.variants ?? variantConfig;
      const propKey = variantConfig.key ?? 'variant';
      // Collect the props the resulting variant function will be responsible for templating.
      const props = uniq(
        values(variants)
          .reduce((carry, variant) => carry.concat(keys(variant)), [])
          .map((prop: string) => getDefaultPropKey(prop))
      );

      // Pick the correct handlers from the system (closure specific) and create a composite.
      const handlers = pick(createdSystem.properties, props);
      const variantHandler = compose(...values(handlers));

      // Return the variant function
      return (props: any) => {
        const variantProps = variants[props[propKey]] || {};
        return variantHandler({ ...variantProps, theme: props.theme });
      };
    },
  };

  // Merge the the default prop configurations and user defined ones together.
  const propGroups = merge(BaseProps, theme ?? {});

  // Iterate over all the property groups
  entries(propGroups).forEach(([groupKey, groupProps]) => {
    // Create the style functions (handlers) for each of the specified properties.
    const propHandlers = mapValues(groupProps, (prop) =>
      createResponsiveProperty(prop)
    );

    // Create a composed group handler for the group (handles all group properties at once)
    const groupHandler = compose(...values(propHandlers));

    // Add them to the default props group.
    createdSystem.properties = {
      ...createdSystem.properties,
      ...propHandlers,
    };

    // Add the composite group handler to the correct propGroups key
    createdSystem[groupKey] = groupHandler;
  });

  return createdSystem;
};

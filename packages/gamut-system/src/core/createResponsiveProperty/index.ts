import { identity } from 'lodash';

import {
  createResponsiveStyles,
  directionalProperty,
  standardProperty,
} from '../../propTemplates';
import { PropertyConfig, ResponsiveProperty } from '../../types/props';
import { AbstractProps } from '../../types/theme';

const TEMPLATE_GENERATORS = {
  directional: directionalProperty,
  standard: standardProperty,
};

/**
 * Creates a responsive property function that can take in props and return a CSS object.
 */
export const createResponsiveProperty = <
  Config extends PropertyConfig,
  Props extends AbstractProps
>(
  config: Config
): ResponsiveProperty<Props> => {
  // Prop configs may choose between standard style templates and the fancy directional properties.
  // We assume no transformations will be done on the values by default (identity).
  const {
    boundProps = [],
    computeValue = identity,
    propName,
    type = 'standard',
  } = config;

  // These are all the possible prop names that this function could possibly be responsible for.
  // When we generate styles, these are the possible outputs.
  const propNames = [propName, ...boundProps];

  // Use the requested template generator to create the style template function.
  // This is the *inner* function that takes in a single props description and produces CSS.
  const styleTemplate = TEMPLATE_GENERATORS[type]({
    ...config,
    computeValue,
    propName,
  });

  // Create a responsive property for the prop names and template,
  // which will be a function that takes in an object of prop descriptions and returns CSS.
  // We also assign the prop names and the original template as members (for composition later).
  return Object.assign(createResponsiveStyles<Props>(styleTemplate), {
    propNames,
    styleTemplate,
  });
};

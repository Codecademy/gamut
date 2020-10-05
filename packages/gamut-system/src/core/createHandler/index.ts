import {
  PropertyConfig,
  AbstractTheme,
  ThematicProps,
  Handler,
  StyleTemplate,
  TransformValue,
} from '../../types/system';
import { identity } from 'lodash';
import {
  standardProperty,
  directionalProperty,
  responsiveProperty,
} from '../../propTemplates';

const TEMPLATES = {
  standard: standardProperty,
  directional: directionalProperty,
};

export const createHandler = <
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>,
  Props extends ThematicProps<Theme, Config>
>(
  config: Config
): Handler<Props> => {
  // Initialize the config defaults
  // By default, we use the direct standard identity: no extra prop manipulations
  const {
    propName,
    altProps = [], // todo: rename to something else? boundProps?
    computeValue = identity,
    type = 'standard',
  } = config;

  // Find the correct template function for the type ('standard' or 'identity')
  const templateFunction = TEMPLATES[type];

  // Create the style template function for the relative props
  // This is the function that takes in prop descriptions and produces valid CSS
  const styleFunction = templateFunction<
    Props,
    Config & { computeValue: TransformValue }
  >({
    ...config,
    propName,
    computeValue,
  });

  // These are all the possible prop names that this function could possibly be responsible for
  // When we generate styles, these are the possible outputs
  const propNames: any[] = [propName, ...altProps];

  // This is a composable object containing the style generator function under the prop name
  // By composable, we mean we can merge a bunch of these objects together
  // TODO: mash -> monster mash -> pun potential for describing the output as a frankenstein
  // TODO: mention it's a one-to-many of propName to propNames (boundProps?)
  const templateFns = {
    [propName]: styleFunction,
  } as Partial<Record<keyof Props, StyleTemplate<Props>>>;

  // Create a responsive property for those propNames / templates
  // We use those prop names and the template function to inform the responsive property of how to generate them given an input
  // TODO CORRECT: The returned function will take in user defined props (for the prop name),
  // TODO CORRECT: and returns a function that takes in user props to output CSS
  const handler = responsiveProperty<Theme, Props>({
    propNames,
    templateFns,
  }) as Handler<Props>;

  // Make the handlers propNames and functions accessible on the function reference (for compose)
  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

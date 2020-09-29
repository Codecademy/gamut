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
  const {
    propName,
    altProps = [],
    computeValue = identity,
    type = 'standard',
  } = config;

  // Find the correct template function
  const templateFunction = TEMPLATES[type];

  // Create the style template function for the relative props
  const styleFunction = templateFunction<
    Props,
    Config & { computeValue: TransformValue }
  >({
    ...config,
    propName,
    computeValue,
  });

  const propNames: any[] = [propName, ...altProps];
  const templateFns = {
    [propName]: styleFunction,
  } as Partial<Record<keyof Props, StyleTemplate<Props>>>;

  // Create a responsive property for those propNames / templates
  const handler = responsiveProperty<Theme, Props>({
    propNames,
    templateFns,
  });

  // Make the handlers propNames and functions accessible on the function reference (for compose)
  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

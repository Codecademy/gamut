import { identity } from 'lodash';
import {
  createStandardStyleTemplate,
  createDirectionalStyleTemplate,
  createResponsiveStyleTemplate,
} from '../../styleTemplates';
import {
  AbstractTheme,
  Handler,
  PropertyConfig,
  StyleTemplate,
  ThematicProps,
} from '../../types/system';

const STYLE_TEMPLATE_GENERATORS = {
  directional: createDirectionalStyleTemplate,
  standard: createStandardStyleTemplate,
};

export const createHandler = <
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>,
  Props extends ThematicProps<Theme, Config>
>(
  config: Config
): Handler<Props> => {
  // Prop configs may choose between standard style templates and the fancy directional properties.
  // By default, we assume no value transformations ("identity") and standard templates.
  const {
    computeValue = identity,
    dependentProps = [],
    propName,
    type = 'standard',
  } = config;

  // These are all the possible prop names that this function could be responsible for.
  // These will be passed to style functions to indicate which props should be computed.
  const propNames = [propName, ...dependentProps] as Exclude<
    keyof Props,
    'theme'
  >[];

  // Use the requested template generator to create the style template function.
  // This is the *inner* function that takes in a single prop description and produces CSS.
  const styleTemplate: StyleTemplate<Props> = STYLE_TEMPLATE_GENERATORS[type]({
    ...config,
    propName,
    computeValue,
  });

  // Create a container to place composed style templates in.
  // This only contains our one requested style template to start, but might be added to later,
  // if compose combines this with other templates.
  const styleTemplates = {
    [propName]: styleTemplate,
  } as Partial<Record<keyof Props, StyleTemplate<Props>>>;

  // Using our style templates, create a responsive property for the prop names and template,
  // which will be a function that takes in an object of prop descriptions and returns valid CSS.
  // We also assign the prop names and original template as members (for composition later).
  return Object.assign(
    createResponsiveStyleTemplate<Props>({ propNames, styleTemplates }),
    { propNames, styleTemplates }
  );
};

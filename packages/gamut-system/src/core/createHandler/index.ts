import {
  ThematicConfig,
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
  Config extends ThematicConfig<Theme>,
  Props extends ThematicProps<Theme, Config>
>(
  config: Config
): Handler<Props> => {
  const {
    propName,
    altProps = [],
    computeValue = identity,
    type = 'standard',
  } = config;
  const templateFunction = TEMPLATES[type];

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

  const handler = responsiveProperty<Theme, Props>({
    propNames,
    templateFns,
  });

  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

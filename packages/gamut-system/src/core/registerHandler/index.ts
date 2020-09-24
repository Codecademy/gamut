import {
  ThematicConfig,
  AbstractTheme,
  ThematicProps,
  AbstractProps,
  Handler,
  HandlerConfig,
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

/**
 *
 * @param handlerConfig
 */
export const createHandler = <
  Theme extends AbstractTheme,
  Props extends AbstractProps
>({
  propName,
  altProps = [],
  templateFn,
}: HandlerConfig<Props>): Handler<Props> => {
  const propNames = [propName, ...altProps];
  const templateFns = {
    [propName]: templateFn,
  } as Partial<Record<keyof Props, StyleTemplate<Props>>>;

  const handler: Handler<Props> = responsiveProperty<Theme, Props>({
    propNames,
    templateFns,
  });

  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

export const registerHandler = <
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
  const propConfig = {
    propName,
    altProps,
    templateFn: styleFunction,
  };

  const systemHandler = createHandler(propConfig as any) as any;
  return systemHandler as Handler<Props>;
};

import {
  ThematicConfig,
  AbstractTheme,
  ThematicProps,
  AbstractProps,
  Handler,
  HandlerConfig,
  StyleTemplate,
} from '../../types';
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
export const createHandler = <T extends AbstractProps>({
  propName,
  altProps = [],
  templateFn,
}: HandlerConfig<T>): Handler<T> => {
  const propNames = [propName, ...altProps];
  const templateFns = {
    [propName]: templateFn,
  } as Partial<Record<keyof T, StyleTemplate<T>>>;

  const handler: Handler<T> = responsiveProperty<T>({ propNames, templateFns });

  handler.propNames = propNames;
  handler.templateFns = templateFns;

  return handler;
};

export const registerHandler = <
  T extends AbstractTheme,
  C extends ThematicConfig<T>,
  P extends ThematicProps<T, C>
>(
  config: C
): Handler<P> => {
  const {
    propName,
    altProps = [],
    computeValue = identity,
    type = 'standard',
  } = config;
  const templateFunction = TEMPLATES[type];

  const styleFunction = templateFunction<P, C>(propName, computeValue);
  const propConfig = {
    propName,
    altProps,
    templateFn: styleFunction,
  };

  const systemHandler = createHandler(propConfig as any) as any;
  return systemHandler as Handler<P>;
};

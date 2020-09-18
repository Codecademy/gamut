import {
  AbstractTheme,
  ThematicProps,
  AbstractProps,
  Handler,
  HandlerConfig,
  StyleTemplate,
  ThematicPropConfig,
} from '../../types';
import { identity } from 'lodash';
import {
  standardProperty,
  directionalProperty,
  responsiveProperty,
} from '../../propTemplates';
import { compose } from '../compose';

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
  C extends ThematicPropConfig<T>,
  P extends ThematicProps<T, C>
>({
  propName,
  altProps,
  computeValue,
  type,
}: C): Handler<P> => {
  const config: Required<Omit<ThematicPropConfig<T>, 'scale'>> = {
    propName,
    altProps: altProps ?? [],
    computeValue: computeValue ?? identity,
    type: type ?? 'standard',
  };

  const templateFunction = TEMPLATES[config.type];

  let systemHandler: Handler<P>;
  if (typeof propName === 'string') {
    const styleFunction = templateFunction<typeof config, P>(config);
    const propConfig = {
      propName,
      altProps,
      templateFn: styleFunction,
    };

    systemHandler = createHandler<P>(propConfig);
  } else {
    const composite: Handler<AbstractProps>[] = [];
    propName.forEach((propKey) => {
      const individualConfig = {
        ...config,
        propName: propKey,
      };
      const styleFunction = templateFunction<typeof individualConfig, P>(
        individualConfig
      );
      const propConfig = {
        propName: propKey,
        templateFn: styleFunction,
      };
      const propHandler = createHandler<P>(propConfig);

      composite.push(propHandler as Handler<AbstractProps>);
    });

    systemHandler = compose(...composite);
  }

  return systemHandler;
};

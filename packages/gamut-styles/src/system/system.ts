import {
  ThematicConfig,
  ThematicProps,
  Handler,
  AbstractTheme,
  StyleTemplate,
  AbstractProps,
  UnionToIntersection,
  HandlerConfig,
} from './types';

import { responsiveProperty } from './templateStyles';
import { get } from 'lodash';
import { PropAlias, typeMap } from './constants';

export function createHandler<T extends AbstractProps>({
  propName,
  altProps = [],
  templateFn,
}: HandlerConfig<T>): Handler<T> {
  const propNames = [propName, ...altProps];
  const templateFns = {
    [propName]: templateFn,
  } as Partial<Record<keyof T, StyleTemplate<T>>>;

  const handler: Handler<T> = responsiveProperty<T>({ propNames, templateFns });
  handler.propNames = propNames;
  handler.templateFns = templateFns;
  return handler;
}

export function compose<
  T extends Handler<AbstractProps>[],
  P extends AbstractProps & UnionToIntersection<Parameters<T[number]>[0]>
>(...handlers: T) {
  let propNames: (keyof P)[] = [];
  let templateFns = {} as Partial<Record<keyof P, StyleTemplate<P>>>;

  handlers.forEach((handler) => {
    if (handler.propNames) {
      propNames = propNames.concat(handler.propNames);
    }
    if (handler.templateFns) {
      templateFns = { ...templateFns, ...handler.templateFns };
    }
  });

  const config = {
    propNames,
    templateFns,
  };

  const composedHandler: Handler<P> = responsiveProperty<P>(config);

  composedHandler.propNames = propNames;
  composedHandler.templateFns = templateFns;

  return composedHandler;
}

export const createSystem = <T extends AbstractTheme>(theme: T) => {
  const systemConfig: {
    props: Partial<Record<PropAlias, Handler<AbstractProps>>>;
  } = {
    props: {},
  };

  const registerProp = <T extends AbstractProps>(
    propKey: PropAlias,
    handler: Handler<T>
  ) => {
    systemConfig.props = {
      ...systemConfig.props,
      [propKey]: handler,
    };
  };

  const registerHandler = <
    K extends ThematicConfig<T>,
    P extends ThematicProps<T, K>
  >(
    config: K
  ) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<P, K>(propName, computeValue);
      const propConfig = {
        propName,
        altProps: get(config, 'altProps'),
        templateFn: styleFunction,
      };

      systemHandler = createHandler<P>(propConfig);
      registerProp(propName, systemHandler);
    } else {
      const composite: Handler<AbstractProps>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<P, K>(propKey, computeValue);
        const propConfig = {
          propName: propKey,
          templateFn: styleFunction,
        };
        const propHandler = createHandler<P>(propConfig);
        registerProp(propKey, propHandler);

        composite.push(propHandler as Handler<AbstractProps>);
      });

      systemHandler = compose(...composite);
    }

    return systemHandler;
  };

  return { registerHandler, systemConfig };
};

export const { registerHandler, systemConfig } = createSystem({});

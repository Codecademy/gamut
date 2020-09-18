import {
  AbstractProps,
  Handler,
  UnionToIntersection,
  StyleTemplate,
  HandlerProps,
} from '../../types';
import { responsiveProperty } from '../../propTemplates';

export const compose = <
  T extends Handler<AbstractProps>[],
  P extends Partial<UnionToIntersection<HandlerProps<T[number]>>>
>(
  ...handlers: T
) => {
  let propNames: (keyof HandlerProps<T[number]>)[] = [];
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
};

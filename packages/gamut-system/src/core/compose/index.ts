import {
  AbstractProps,
  Handler,
  UnionToIntersection,
  StyleTemplate,
} from '../../types/system';
import { responsiveProperty } from '../../propTemplates';

export const compose = <
  Handlers extends Handler<AbstractProps>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
) => {
  let propNames: (keyof Parameters<Handlers[number]>[0])[] = [];
  let templateFns = {} as Partial<Record<keyof Props, StyleTemplate<Props>>>;

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

  const composedHandler: Handler<Props> = responsiveProperty<Props>(config);

  composedHandler.propNames = propNames;
  composedHandler.templateFns = templateFns;

  return composedHandler;
};

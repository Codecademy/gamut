import { hasIn } from 'lodash';

import { createResponsiveStyleTemplate } from '../templates';
import { AbstractProps, Handler } from '../types/config';
import { UnionToIntersection } from '../types/utils';

export const compose = <
  Handlers extends Handler<AbstractProps>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
) => {
  const config = {
    propNames: [],
    styleTemplates: {},
  } as {
    propNames: Handler<Props>['propNames'];
    styleTemplates: Handler<Props>['styleTemplates'];
  };

  const isHandler = (handler: unknown): handler is Handler<Props> => {
    if (hasIn(handler, 'propNames') && hasIn(handler, 'styleTemplates')) {
      return true;
    }
    return false;
  };

  handlers.forEach((handler) => {
    if (isHandler(handler)) {
      config.propNames = config.propNames.concat(handler.propNames);
      config.styleTemplates = Object.assign(
        config.styleTemplates,
        handler.styleTemplates
      );
    }
  });

  // Ignore the original prop-to-style-template logic from each of the handlers;
  // instead, we create a new responsive property responsible for all of them.
  // We again make propNames and functions accessible for later composition.
  return Object.assign(createResponsiveStyleTemplate(config), config);
};

import { createResponsiveStyleTemplate } from '../../styleTemplates';
import { AbstractProps, Handler } from '../../types/config';
import { UnionToIntersection } from '../../types/utils';

export const compose = <
  Handlers extends Handler<AbstractProps>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
): Handler<Props> => {
  // Mash the handlers into a Frankensteinian conglomeration of each of their prop names and style templates.
  const config = handlers.reduce<any>(
    (accum, handler) => {
      return {
        propNames: [...accum.propNames, ...handler.propNames],
        styleTemplates: { ...accum.styleTemplates, ...handler.styleTemplates },
      };
    },
    {
      propNames: [],
      styleTemplates: {},
    }
  );

  // Ignore the original prop-to-style-template logic from each of the handlers;
  // instead, we create a new responsive property responsible for all of them.
  // We again make propNames and functions accessible for later composition.
  const templateFn = createResponsiveStyleTemplate<Props>(config);
  const handler = Object.assign(templateFn, config);

  return handler;
};

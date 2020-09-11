import { Handler, HandlerConfig, StyleTemplate, AbstractProps } from './types';
import { responsiveProperty } from './templateStyles';

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

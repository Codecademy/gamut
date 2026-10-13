import { DataAttributes } from './types';

/*
 * Splits `data-*` entries off a props object from everything else. `data-*`
 * attributes are identity/targeting hooks (Pendo selectors, QA scripts) and
 * belong on whichever node also carries `id`, which is not always the same
 * node that receives style props and `aria-*`. Components that render more
 * than one DOM node - a wrapper plus a semantic element - use this to route
 * each half to the right place instead of spreading everything onto one node.
 */
export const splitDataAttributes = <T extends Record<string, unknown>>(
  props: T
): [DataAttributes, Omit<T, `data-${string}`>] => {
  const dataAttrs: DataAttributes = {};
  const rest = {} as Omit<T, `data-${string}`>;

  Object.keys(props).forEach((key) => {
    if (key.startsWith('data-')) {
      dataAttrs[key as `data-${string}`] = props[key] as
        | string
        | number
        | boolean
        | undefined;
    } else {
      (rest as Record<string, unknown>)[key] = props[key];
    }
  });

  return [dataAttrs, rest];
};

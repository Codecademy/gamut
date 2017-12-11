import invariant from 'invariant';
import { isPlainObject, omit, without } from 'lodash';

/**
 * omitProps
 *
 * removes a provided array of props from a props object,
 * leaving necessary props like children intact
 */
export default function omitProps(initialPropsToOmit, props) {
  let propsToOmit = isPlainObject(initialPropsToOmit)
    ? Object.keys(initialPropsToOmit)
    : initialPropsToOmit;

  invariant(Array.isArray(propsToOmit), 'omitProps first argument should be an Array');

  return omit(props, without(propsToOmit, 'children', 'className'));
}

import invariant from 'invariant';
import { isPlainObject, omit, without, AnyKindOfDictionary } from 'lodash';

export type RemoveFrom<TContainer, TRemoved> = {
  [P in keyof TContainer]: P extends keyof TRemoved ? never : TContainer[P];
};

/**
 * omitProps
 *
 * removes a provided array of props from a props object,
 * leaving necessary props like children intact
 */
export function omitProps<TOmittedProps extends {}, TProps extends {}>(
  initialPropsToOmit: TOmittedProps | (keyof TOmittedProps)[],
  props: TProps
): RemoveFrom<TOmittedProps, TProps> {
  const propsToOmit = isPlainObject(initialPropsToOmit)
    ? Object.keys(initialPropsToOmit)
    : (initialPropsToOmit as string[]);

  invariant(
    Array.isArray(propsToOmit),
    'omitProps first argument should be an Array'
  );

  // allow all data-* props, mainly used for testing libraries
  const dataProps = propsToOmit.filter((p) => p.match(/^data-.*/));

  return omit(
    (props as unknown) as AnyKindOfDictionary,
    without(propsToOmit, 'children', 'className', ...dataProps)
  ) as RemoveFrom<TOmittedProps, TProps>;
}

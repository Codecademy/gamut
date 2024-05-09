import invariant from 'invariant';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';
import without from 'lodash/without';

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
  const dataProps = propsToOmit.filter((p) => /^data-.*/.exec(p));

  return omit(
    (props as unknown) as Record<string | number, unknown>,
    without(propsToOmit, 'children', 'className', ...dataProps)
  ) as RemoveFrom<TOmittedProps, TProps>;
}

import { PopoverProps } from './types';

/**
 * Mirrors horizontal `left` / `right` in RTL when `useLogicalProperties` is enabled
 * (Popover `align` / `beak` resolution). `Popover` passes `isRtl` from
 * `useElementDir(targetRef)` and document `dir` (see `Popover` implementation).
 * @param side - The horizontal side to resolve.
 * @param isRtl - Whether the element is in an RTL context.
 * @param useLogicalProperties - Whether logical properties are enabled.
 * @returns The resolved horizontal side.
 * WARNING : Do not use this function to swap elements that use css logical properties. They will get double-mirrored.
 */
export const resolveHorizontalSideForRtl = ({
  side,
  isRtl,
  useLogicalProperties,
}: {
  side: 'left' | 'right';
  isRtl: boolean;
  useLogicalProperties: boolean | undefined;
}): 'left' | 'right' => {
  if (!useLogicalProperties) return side;
  return isRtl ? (side === 'left' ? 'right' : 'left') : side;
};

const offsets = {
  primary: 20,
  secondary: 15,
};

export const getDefaultOffset = ({
  axis,
  position,
  variant = 'primary',
}: Pick<PopoverProps, 'position' | 'variant'> & {
  axis: 'horizontal' | 'vertical';
}) => {
  let newPosition = 0;
  if (position === 'center' && axis === 'horizontal' && variant) {
    newPosition = offsets[variant];
  } else if (position !== 'center' && axis === 'vertical' && variant) {
    newPosition = offsets[variant];
  }
  return newPosition;
};

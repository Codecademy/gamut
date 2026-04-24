import { PopoverProps } from './types';

/**
 * Mirrors horizontal `left` / `right` in RTL when `useLogicalProperties` is enabled
 * (Popover `align` / `beak` resolution).
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

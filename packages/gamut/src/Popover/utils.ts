import { PopoverProps } from './types';

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

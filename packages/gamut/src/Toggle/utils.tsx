import { ToggleInputStyledProps, ToggleProps } from './types';

export const getToggleElementProps = <Props extends ToggleProps>({
  ariaLabel,
  as,
  checked,
  disabled,
  label,
  onChange,
  onClick,
}: Pick<
  Props,
  'ariaLabel' | 'as' | 'checked' | 'disabled' | 'label' | 'onChange' | 'onClick'
>): Omit<ToggleInputStyledProps, 'size' | 'color'> => {
  const sharedProps = {
    'aria-label': ariaLabel,
    as,
    checked,
    id: label || ariaLabel,
    disabled,
  };
  return as === 'input'
    ? {
        ...sharedProps,
        type: 'checkbox',
        onChange,
      }
    : {
        ...sharedProps,
        role: 'switch',
        'aria-checked': checked,
        onClick,
        type: 'button',
      };
};

import { ToggleInputStyledProps, ToggleProps } from './types';

export const getToggleElementProps = <Props extends ToggleProps>({
  ariaLabel,
  as,
  checked,
  disabled,
  inputProps,
  label,
  onChange,
  onClick,
}: Pick<
  Props,
  | 'ariaLabel'
  | 'as'
  | 'checked'
  | 'disabled'
  | 'inputProps'
  | 'label'
  | 'onChange'
  | 'onClick'
>): Omit<ToggleInputStyledProps, 'size' | 'color'> => {
  const id = label && typeof label === 'string' ? label : ariaLabel;
  const sharedProps = {
    'aria-label': ariaLabel,
    as,
    checked,
    id,
    disabled,
  };
  // inputProps spreads first so Toggle's own wiring - checked/id/type/role/
  // aria-checked - always wins over anything a consumer passes in.
  return as === 'input'
    ? {
        ...inputProps,
        ...sharedProps,
        type: 'checkbox',
        onChange,
      }
    : {
        ...inputProps,
        ...sharedProps,
        role: 'switch',
        'aria-checked': checked,
        onClick,
        type: 'button',
      };
};

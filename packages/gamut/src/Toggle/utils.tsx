import { ToggleProps } from './types';

export interface ToggleElementProps
  extends Pick<ToggleProps, 'as' | 'checked' | 'disabled' | 'label'> {
  eventHandler?: ToggleProps['onClick'] | ToggleProps['onChange'];
}

export const getToggleElementProps = ({
  as,
  checked,
  disabled,
  eventHandler,
  label,
}: ToggleElementProps) =>
  as === 'input'
    ? {
        as,
        type: 'checkbox',
        checked,
        id: label,
        disabled,
        onChange: eventHandler,
      }
    : {
        as,
        role: 'switch',
        'aria-checked': checked,
        id: label,
        disabled,
        onClick: eventHandler,
      };

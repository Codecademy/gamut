import { ToggleProps } from './types';

export interface ToggleElementProps
  extends Pick<ToggleProps, 'as' | 'checked' | 'disabled' | 'label'> {
  // we're pretty exhaustively checking this before it gets to this point
  eventHandler?: any;
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
        checked,
        role: 'switch',
        'aria-checked': checked,
        id: label,
        disabled,
        onClick: eventHandler,
      };

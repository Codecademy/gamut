import { ToggleProps } from './types';

export interface ToggleElementProps
  extends Pick<
    ToggleProps,
    'ariaLabel' | 'as' | 'checked' | 'disabled' | 'label'
  > {
  // we're pretty exhaustively checking this before it gets to this point
  eventHandler?: any;
}

export const getToggleElementProps = ({
  ariaLabel,
  as,
  checked,
  disabled,
  eventHandler,
  label,
}: ToggleElementProps) => {
  const sharedProps = {
    'aria-label': ariaLabel,
    as,
    checked,
    id: label || ariaLabel,
    disabled,
  };
  return as === 'input'
    ? { ...sharedProps, type: 'checkbox', onChange: eventHandler }
    : {
        ...sharedProps,
        role: 'switch',
        'aria-checked': checked,
        onClick: eventHandler,
      };
};

// TODO - Pick from ToggleProps
export interface ToggleElementProps {
  as: 'button' | 'input';
  checked: boolean;
  label?: string;
  disabled?: boolean;
  eventHandler: any;
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

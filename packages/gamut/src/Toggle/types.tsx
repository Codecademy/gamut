import * as React from 'react';

import { sizes, ToggleInput, ToggleStyleProps } from './elements';

export type ToggleSizes = keyof typeof sizes;

export interface ToggleBaseProps extends ToggleStyleProps {
  /** If the Toggle element should be a button or an input. Buttons should be used if the toggle immediately kicks off an action, input should be used if the button exists within a form or if a seperate user interaction submits the data of the toggle */
  as?: 'button' | 'input';
  /** The state of the checkbox input (this can be out of sync with the input's value if not passed) */
  checked: boolean;
  /** An aria-label if needed. If you do not label your toggle. you must provide an aria-label. */
  ariaLabel?: string;
  /** If the Toggle is disabled */
  disabled?: boolean;
  /** Called on click. Only to be used when the Toggle is a button */
  onClick?: (event?: React.MouseEvent<MouseEvent>) => void;
  /** Called when the input value has changed. Only to be used when the Toggle is an input */
  onChange?: (event?: React.FormEvent<HTMLInputElement>) => void;
  /** A visible label for your Toggle - we reccommend this */
  label?: React.ReactNode;
  /** Which side of the toggle the label should render */
  labelSide?: 'left' | 'right';
  /** Changes the dimensions of the element for using the component outside of a form context */
  size?: ToggleSizes;
}

export type ToggleInputStyledProps = React.ComponentProps<typeof ToggleInput>;

export type AriaLabeledToggle = ToggleBaseProps & {
  ariaLabel: string;
  label?: never;
};

export type LabeledToggle = ToggleBaseProps & {
  ariaLabel: string;
  label: React.ReactNode;
};

export type StringLabeledToggle = ToggleBaseProps & {
  ariaLabel?: string;
  label: string;
};

export type ToggleLabelProps =
  | AriaLabeledToggle
  | LabeledToggle
  | StringLabeledToggle;

export type ToggleButtonProps = ToggleLabelProps & {
  as: 'button';
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  onChange?: never;
};

export type ToggleInputProps = ToggleLabelProps & {
  as?: 'input';
  onChange?: (event?: React.FormEvent<HTMLInputElement>) => void;
  onClick?: never;
};

export type ToggleProps = ToggleButtonProps | ToggleInputProps;

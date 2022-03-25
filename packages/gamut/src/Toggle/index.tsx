import React from 'react';

import { Text } from '../Typography/Text';
import {
  Circle,
  sizes,
  ToggleInput as ToggleElement,
  ToggleLabel,
  ToggleStyleProps,
  ToggleTrack,
} from './elements';
import { getToggleElementProps } from './utils';

export type ToggleSizes = keyof typeof sizes;

export interface ToggleBaseProps extends ToggleStyleProps {
  /** If the Toggle element should be a button or an input. Buttons should be used if the toggle immediately kicks off an action, input should be used if the button exists within a form of if a seperate user interaction submits the data of the toggle */
  as?: 'button' | 'input';
  /** The state of the checkbox input (this can be out of sync with the input's value if not passed) */
  checked: boolean;
  /** An aria-label if needed. If you do not label your toggle. you must provide an aria-label. */
  ariaLabel?: string;
  /** If the Toggle is disabled */
  disabled?: boolean;
  /** Called when the input value has changed */
  onChange?: (event?: React.FormEvent<HTMLInputElement>) => void;
  /** A visible label for your Toggle - we reccommend this */
  label?: string;
  /** Which side of the toggle the label should render */
  labelSide?: 'left' | 'right';
  /** Changes the dimensions of the element for using the component outside of a form context */
  size?: ToggleSizes;
}

export type AriaLabeledToggle = ToggleBaseProps & {
  ariaLabel: string;
  label?: never;
};

export type LabeledToggle = ToggleBaseProps & {
  ariaLabel?: string;
  label: string;
};

export type ToggleProps = AriaLabeledToggle | LabeledToggle;

export const Toggle: React.FC<ToggleProps> = ({
  as = 'input',
  checked,
  onChange,
  label,
  labelSide = 'right',
  disabled,
  size = 'medium',
  ...rest
}) => {
  const checkedColor = checked ? 'primary' : 'navy-600';
  const toggleProps = getToggleElementProps({
    as,
    checked,
    disabled,
    eventHandler: onChange,
    label,
  });

  return (
    <ToggleLabel
      htmlFor={label}
      disabled={disabled}
      labelRight={labelSide === 'right'}
      {...rest}
    >
      {label && (
        <Text
          ml={labelSide === 'left' ? 0 : 16}
          mr={labelSide === 'right' ? 0 : 16}
        >
          {label}
        </Text>
      )}
      <ToggleElement {...toggleProps}>
        <ToggleTrack
          bg={checkedColor}
          borderColor="primary"
          borderRadius="99rem"
          position="relative"
          size={size}
        >
          <Circle
            width="40%"
            borderRadius="50%"
            bg="white"
            position="absolute"
            top="10%"
            bottom="10%"
            left={checked ? '55%' : '5%'}
          />
        </ToggleTrack>
      </ToggleElement>
    </ToggleLabel>
  );
};

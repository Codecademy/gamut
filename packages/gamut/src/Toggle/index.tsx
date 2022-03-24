import React from 'react';

import { Text } from '../Typography/Text';
import {
  Circle,
  sizes,
  ToggleInput,
  ToggleLabel,
  ToggleStyleProps,
  ToggleTrack,
} from './elements';

export type ToggleSizes = keyof typeof sizes;

export interface ToggleProps extends ToggleStyleProps {
  /** The state of the checkbox input (this can be out of sync with the input's value if not passed) */
  checked: boolean;
  /** If the Toggle is disabled */
  disabled?: boolean;
  /** Called when the input value has changed */
  onChange?: (event?: React.FormEvent<HTMLInputElement>) => void;
  /** A label used for accessibility and control, unique to the page */
  label: string;
  /** A label used for accessibility and control, unique to the page */
  labelSide?: 'left' | 'right';
  /** Changes the dimensions of the element for using the component outside of a form context */
  size?: ToggleSizes;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  labelSide = 'right',
  disabled,
  size = 'medium',
  ...rest
}) => {
  const checkedColor = checked ? 'primary' : 'navy-600';

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
      <ToggleTrack
        bg={checkedColor}
        borderColor="primary"
        borderRadius="99rem"
        position="relative"
        size={size}
      >
        <ToggleInput
          type="checkbox"
          checked={checked}
          id={label}
          disabled={disabled}
          onChange={onChange}
        />
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
    </ToggleLabel>
  );
};

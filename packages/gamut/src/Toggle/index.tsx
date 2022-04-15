import React from 'react';

import { Circle, ToggleInput, ToggleLabel, ToggleTrack } from './elements';
import { ToggleProps } from './types';
import { getToggleElementProps } from './utils';

export const Toggle = <Props extends ToggleProps>({
  ariaLabel,
  as = 'input',
  checked,
  disabled,
  label,
  labelSide = 'right',
  onChange,
  onClick,
  size = 'medium',
  ...rest
}: Props) => {
  const checkedColor = checked ? 'primary' : 'navy-600';
  const isButton = as === 'button';
  const toggleProps = getToggleElementProps<Props>({
    ariaLabel,
    as,
    checked,
    disabled,
    label,
    onChange,
    onClick,
  });

  return (
    <ToggleLabel
      htmlFor={label}
      disabled={disabled}
      labelRight={labelSide === 'right'}
      {...rest}
    >
      {label && <>{label}</>}
      <ToggleTrack
        bg={checkedColor}
        size={size}
        mr={label && labelSide === 'left' ? 0 : 16}
        ml={label && labelSide === 'right' ? 0 : 16}
        {...(isButton && toggleProps)}
      >
        {!isButton && <ToggleInput {...toggleProps} />}
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

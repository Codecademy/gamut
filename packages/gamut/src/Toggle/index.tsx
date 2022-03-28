import React from 'react';

import { Circle, ToggleInput, ToggleLabel, ToggleTrack } from './elements';
import { ToggleProps } from './types';
import { getToggleElementProps } from './utils';

export const Toggle: React.FC<ToggleProps> = ({
  as = 'input',
  checked,
  disabled,
  label,
  labelSide = 'right',
  onChange,
  onClick,
  size = 'medium',
  ...rest
}) => {
  const checkedColor = checked ? 'primary' : 'navy-600';
  const isButton = as === 'button';
  const toggleProps = getToggleElementProps({
    as,
    checked,
    disabled,
    eventHandler: onChange || onClick,
    label,
  });

  return (
    <ToggleLabel
      htmlFor={label}
      disabled={disabled}
      labelRight={labelSide === 'right'}
      {...rest}
    >
      {label && ( // <Text
        //   ml={labelSide === 'left' ? 0 : 16}
        //   mr={labelSide === 'right' ? 0 : 16}
        // >
        <>{label}</>
      )}
      <ToggleTrack
        bg={checkedColor}
        borderColor="primary"
        borderRadius="99rem"
        position="relative"
        size={size}
        mr={labelSide === 'left' ? 0 : 16}
        ml={labelSide === 'right' ? 0 : 16}
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

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
  const checkedColor = checked ? 'primary' : 'text-disabled';
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
      disabled={disabled}
      htmlFor={toggleProps.id}
      labelRight={labelSide === 'right'}
      {...rest}
    >
      {label && <>{label}</>}
      <ToggleTrack
        bg={checkedColor}
        ml={label && labelSide === 'right' ? 0 : 16}
        mr={label && labelSide === 'left' ? 0 : 16}
        size={size}
        {...(isButton && toggleProps)}
      >
        {!isButton && <ToggleInput {...toggleProps} />}
        <Circle
          bg="white"
          borderColor="background"
          borderRadius="full"
          borderStyle="solid"
          borderWidth="1px"
          bottom="10%"
          left={checked ? '55%' : '5%'}
          position="absolute"
          top="10%"
          width="40%"
        />
      </ToggleTrack>
    </ToggleLabel>
  );
};

import React from 'react';

import { useField } from '../../utils';
import { ConnectedFieldProps } from '../types';

export type ConnectedCustomInputProps<T> = ConnectedFieldProps & {
  component: React.ForwardRefExoticComponent<T>;
  disabled?: boolean;
} & T;

export function ConnectedCustomInput<ComponentProps>({
  component: Component,
  disabled,
  name,
  validation,
  ...rest
}: ConnectedCustomInputProps<ComponentProps>) {
  const { isDisabled, register } = useField(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Component
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...(rest as ComponentProps)}
    />
  );
}

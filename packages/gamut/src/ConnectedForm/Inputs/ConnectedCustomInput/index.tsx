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
  ...rest
}: ConnectedCustomInputProps<ComponentProps>) {
  const { isDisabled, ref } = useField({ name, disabled });

  return (
    <Component
      disabled={isDisabled}
      name={name}
      ref={ref}
      {...(rest as ComponentProps)}
    />
  );
}

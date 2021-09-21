import React from 'react';

import { useFieldContext } from '../../utils';
import { ConnectedFieldProps } from '../types';

export type ConnectedCustomInputProps<T> = ConnectedFieldProps & {
  // component: React.ComponentType<T>;
  component: React.ForwardRefExoticComponent<T>;
  disabled?: boolean;
} & T;

export function ConnectedCustomInput<ComponentProps>({
  component: Component,
  // component2: Component2,
  disabled,
  name,
  validation,
  ...rest
}: ConnectedCustomInputProps<ComponentProps>) {
  const { isDisabled, register } = useFieldContext(name);
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

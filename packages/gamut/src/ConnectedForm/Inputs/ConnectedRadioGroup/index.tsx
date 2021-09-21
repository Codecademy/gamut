import React from 'react';

import { RadioGroup } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedRadioGroupProps } from '../types';

export const ConnectedRadioGroup: React.FC<ConnectedRadioGroupProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const { setValue } = useFieldContext(name);

  return (
    <RadioGroup
      htmlForPrefix={name}
      name={name}
      onChange={(event) => {
        const { value } = event.target;
        setValue(name, value);
        onChange?.(event);
      }}
      {...rest}
    />
  );
};

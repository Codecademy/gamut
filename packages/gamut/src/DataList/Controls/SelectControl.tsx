import React from 'react';

import { Checkbox } from '../../Form/Checkbox';
import { Text } from '../../Typography/Text';

export const SelectControl: React.FC<{
  name: string;
  label: string;
  selected?: boolean;
  onSelect?: (id?: any) => void;
}> = ({ selected, onSelect, label, name }) => {
  return (
    <Checkbox
      spacing="tight"
      label={<Text screenreader>{label}</Text>}
      htmlFor={name}
      name={name}
      checked={selected}
      onChange={onSelect}
    />
  );
};

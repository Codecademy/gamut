import * as React from 'react';

import { Checkbox } from '../../Form/inputs/Checkbox';
import { Text } from '../../Typography/Text';
import { RowChange } from '../types';

export const SelectControl: React.FC<{
  disabled?: boolean;
  rowId?: string;
  name: string;
  label: string;
  selected?: boolean;
  onSelect?: RowChange<any>;
}> = ({ disabled, onSelect, rowId, label, selected = false, name }) => {
  return (
    <Checkbox
      aria-label={label}
      checked={selected}
      disabled={disabled}
      htmlFor={name}
      label={<Text screenreader>{label}</Text>}
      name={name}
      spacing="tight"
      onChange={() => onSelect?.({ rowId, toggle: selected })}
    />
  );
};

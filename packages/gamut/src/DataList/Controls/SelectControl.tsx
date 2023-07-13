import * as React from 'react';

import { Checkbox } from '../../Form/Checkbox';
import { Text } from '../../Typography/Text';
import { RowChange } from '..';

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
      disabled={disabled}
      spacing="tight"
      label={<Text screenreader>{label}</Text>}
      aria-label={label}
      htmlFor={name}
      name={name}
      checked={selected}
      onChange={() => onSelect?.({ rowId, toggle: selected })}
    />
  );
};

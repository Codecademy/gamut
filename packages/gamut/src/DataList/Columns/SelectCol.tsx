import React from 'react';

import { Checkbox, ListCol, Text } from '../..';

export const SelectCol: React.FC<{
  id: string;
  selected: boolean;
  onSelect: () => void;
}> = ({ id, selected, onSelect }) => {
  const isHeader = id === 'header';
  const label = isHeader ? 'Select All Rows' : `Select ${id} Row`;
  const htmlId = isHeader ? 'select-all-rows' : `select-${id}-row`;

  return (
    <ListCol size="content">
      <Checkbox
        spacing="tight"
        label={<Text screenreader>{label}</Text>}
        htmlFor={htmlId}
        checked={selected}
        onChange={onSelect}
      />
    </ListCol>
  );
};

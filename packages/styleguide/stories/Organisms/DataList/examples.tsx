import { DataList, DataListProps } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { orderBy } from 'lodash';
import React, { useMemo, useState } from 'react';

const columns = [
  { label: 'Name', key: 'name', size: 'lg', queryType: 'sort', type: 'header' },
  { label: 'Rank', key: 'role', size: 'lg', queryType: 'sort', fill: true },
  { label: 'Ship', key: 'ship', size: 'lg', queryType: 'sort', fill: true },
  {
    label: 'Rank 2',
    key: 'role',
    size: 'lg',
    queryType: 'sort',
    fill: true,
    justify: 'right',
  },
  {
    label: 'Rank 3',
    key: 'role',
    size: 'lg',
    queryType: 'sort',
    fill: true,
    justify: 'right',
  },
  {
    label: 'Rank 4',
    key: 'role',
    size: 'lg',
    queryType: 'sort',
    justify: 'right',
  },
] as const;

const rows = [
  { name: 'Jean Luc Picard', role: 'Captain', ship: 'USS Enterprise' },
  {
    name: 'Wesley Crusher',
    role: 'Deus Ex Machina',
    ship: 'USS Enterprise',
  },
  {
    name: 'Geordie LaForge',
    role: 'Rascal',
    ship: 'USS Enterprise',
  },
  {
    name: 'Data',
    role: 'Scamp',
    ship: 'Accidentally fused with the Enterprise',
  },
  {
    name: 'Tasha Yar',
    role: 'Fond Memory',
    ship: "Yesterday's Enterprise",
  },
  {
    name: 'Beverly Crusher',
    role: 'Medical Officer',
    ship: "Jean Luc's Dreams",
  },
  {
    name: 'William Riker',
    role: 'Numba One',
    ship: 'Pleasure Cruiser',
  },
  {
    name: 'Barclay',
    role: 'Punching Bag',
    ship: 'Titanic (Holodeck)',
  },
  {
    name: 'Worf',
    role: 'Security Officer',
    ship: 'Just another victim of the ambient honorability',
  },
  {
    name: 'Q',
    role: 'Costume Budget Line Item',
    ship: 'USS Moral Quandry',
  },
  {
    name: 'Deanna Troi',
    role: 'Hot Chocolate Enthusiast',
    ship: 'USS Enterprise',
  },
  {
    name: 'Guinan',
    role: "Picking up Deanna's slack",
    ship: 'Saucer Section every few seasons',
  },
] as const;

export const DataListTemplate = (args: DataListProps) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [query, setQuery] = useState<any>({
    sort: {},
  });

  const sortedRows = useMemo(() => {
    const { sort } = query;
    const dimensions = Object.keys(sort);
    const directions = Object.values(sort);
    const nextRows = orderBy(
      rows,
      dimensions.map((key: keyof typeof rows[number]) => ({ [key]: val }) =>
        val.toLowerCase()
      ),
      directions as []
    );
    return nextRows;
  }, [query]);

  return (
    <Background bg="white" maxHeight={500} overflowY="auto">
      <DataList
        {...args}
        idKey="role"
        rows={sortedRows}
        columns={columns}
        selectedRows={selectedRows}
        onRowSelect={setSelectedRows}
        expandedRows={expandedRows}
        onRowExpand={setExpandedRows}
        renderExpanded={({ name }: typeof rows[number]) => (
          <>{name}: This is pretty cool</>
        )}
        query={query}
        onQueryChange={setQuery}
      />
    </Background>
  );
};

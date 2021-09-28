import {
  ColumnConfig,
  DataList,
  DataListProps,
  useLocalQuery,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React, { useState } from 'react';

const cols = [
  { label: 'Name', key: 'name', size: 'lg', queryType: 'sort', type: 'header' },
  { label: 'Rank', key: 'role', size: 'lg', queryType: 'sort' },
  { label: 'Ship', key: 'ship', size: 'xl', queryType: 'filter' },
  {
    label: 'Power',
    key: 'power',
    size: 'xl',
    fill: true,
  },
  {
    label: 'Species',
    key: 'species',
    size: 'lg',
    justify: 'right',
    queryType: 'filter',
  },
] as ColumnConfig<typeof crew[number]>[];

const crew = [
  {
    name: 'Jean Luc Picard',
    role: 'Captain',
    ship: 'USS Enterprise',
    species: 'Human',
    power: 'Monologues',
  },
  {
    name: 'Wesley Crusher',
    role: 'Deus Ex Machina',
    ship: 'USS Enterprise',
    species: 'Mary Sue',
    power: 'Being super preachy',
  },
  {
    name: 'Geordie LaForge',
    role: 'Rascal',
    ship: 'USS Enterprise',
    species: 'Human',
    power: 'Really bad a first dates',
  },
  {
    name: 'Data',
    role: 'Scamp',
    ship: 'USS Enterprise',
    species: 'Android',
    power: 'Annoying existentialism.  Real magnet for zany adventures',
  },
  {
    name: 'Tasha Yar',
    role: 'Fond Memory',
    ship: "Yesterday's Enterprise",
    species: 'Ectoplasm',
    power:
      'Coming back to the show after getting written off as their own clone',
  },
  {
    name: 'Beverly Crusher',
    role: 'Medical Officer',
    ship: "Jean Luc's Dreams",
    species: 'Human',
    power: 'Knowing glances',
  },
  {
    name: 'William Riker',
    role: 'Numba One',
    ship: 'Pleasure Cruiser',
    species: 'Hedonist',
    power: 'Seduction of alien dignataries',
  },
  {
    name: 'Barclay',
    role: 'Punching Bag',
    ship: 'Titanic (Holodeck)',
    species: 'Demigod',
    power: 'Immunity to addiction therapies',
  },
  {
    name: 'Worf',
    role: 'Security Officer',
    ship: 'Just another victim of the ambient honorability',
    species: 'Klingon',
    power: 'Combusts if they act dishonorably',
  },
  {
    name: 'Q',
    role: 'Costume Budget Line Item',
    ship: 'USS Moral Quandry',
    species: 'Q',
    power: 'World class showman',
  },
  {
    name: 'Deanna Troi',
    role: 'Hot Chocolate Enthusiast',
    ship: 'USS Enterprise',
    species: 'Human / Betazoid',
    power: 'Really good at asking the ship for hot chocolate',
  },
  {
    name: 'Guinan',
    role: "Picking up Deanna's slack",
    ship: 'Saucer Section every few seasons',
    species: "Q d'etat",
    power: 'Quantum sensitivity, talk therapy',
  },
];

export const DataListTemplate = (
  args: DataListProps<typeof crew[number], 'name', any, typeof cols>
) => {
  const [selectedRows, setSelectedRows] = useState<
    typeof rows[number][typeof idKey][]
  >([]);
  const [expandedRows, setExpandedRows] = useState<
    typeof rows[number][typeof idKey][]
  >([]);

  const { idKey, query, rows, columns, onQueryChange } = useLocalQuery({
    idKey: 'name',
    rows: crew,
    columns: cols,
  });

  return (
    <Background bg="white" height={600} overflowY="auto">
      <DataList
        {...args}
        id="example"
        idKey={idKey}
        rows={rows}
        columns={columns}
        selectedRows={selectedRows}
        onRowSelect={setSelectedRows}
        expandedRows={expandedRows}
        onRowExpand={setExpandedRows}
        renderExpanded={({ name }: typeof rows[number]) => (
          <>{name}: This is pretty cool</>
        )}
        query={query}
        onQueryChange={onQueryChange}
      />
    </Background>
  );
};

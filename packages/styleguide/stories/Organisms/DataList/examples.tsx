import { ColumnConfig, DataList } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { orderBy, uniq } from 'lodash';
import React, { useMemo, useState } from 'react';

const columns = [
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
] as ColumnConfig<typeof rows[number]>[];

const rows = [
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

export const DataListTemplate = (args: any) => {
  const [selectedRows, setSelectedRows] = useState<
    typeof rows[number]['role'][]
  >([]);
  const [expandedRows, setExpandedRows] = useState<
    typeof rows[number]['role'][]
  >([]);
  const [query, setQuery] = useState<any>({
    sort: {},
    filter: {},
  });

  const columnsWithOptions = useMemo(() => {
    return columns.map((col) => {
      if (col.queryType === 'filter') {
        return {
          ...col,
          options: uniq(rows.map(({ [col.key]: opt }) => opt)),
        };
      }
      return col;
    });
  }, []);

  const sortedRows = useMemo(() => {
    const { sort, filter } = query;
    const filterDimensions = Object.entries(filter);

    const filteredRows = rows.filter((row) => {
      if (filterDimensions.length === 0) return true;
      for (const [key, value] of filterDimensions) {
        if ((value as string[]).length > 0) {
          if (!(value as string[]).includes(row[key as keyof typeof row])) {
            return false;
          }
        }
      }
      return true;
    });

    const dimensions = Object.keys(sort);
    const directions = Object.values(sort);
    const nextRows = orderBy(
      filteredRows,
      dimensions.map((key: keyof typeof rows[number]) => ({ [key]: val }) =>
        val.toLowerCase()
      ),
      directions as []
    );
    return nextRows;
  }, [query]);

  return (
    <Background bg="white" height={600} overflowY="auto">
      <DataList
        idKey="name"
        rows={sortedRows}
        columns={columnsWithOptions}
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

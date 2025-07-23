import {
  Box,
  ColumnConfig,
  DataList,
  DataTable,
  FillButton,
  FlexBox,
  IconButton,
  Menu,
  MenuItem,
  PopoverContainer,
  Text,
  useLocalQuery,
} from '@codecademy/gamut';
import { MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { BlueprintWhite } from '@codecademy/gamut-illustrations';
import uniq from 'lodash/uniq';
import { useCallback, useMemo, useRef, useState } from 'react';

const TestDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  return (
    <Box ref={menuButtonRef} width="fit-content">
      <IconButton
        icon={MiniKebabMenuIcon}
        tip="Show options"
        tipProps={{
          alignment: 'left-center',
          placement: 'floating',
        }}
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
      />

      <PopoverContainer
        isOpen={isOpen}
        skipFocusTrap
        targetRef={menuButtonRef}
        x={-50}
        y={-20}
        onRequestClose={() => setIsOpen(false)}
      >
        <Menu borderRadius="md" spacing="normal" variant="popover">
          <MenuItem onClick={() => setIsOpen(false)}>Edit crew member</MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>Fire crew member</MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            Clone crew member
          </MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            Disipline crew member
          </MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            Arrest crew member
          </MenuItem>
        </Menu>
      </PopoverContainer>
    </Box>
  );
};
export const CustomEmptyState: React.FC = () => (
  <Box as="tbody" height="100%" width="100%">
    <Box
      as="tr"
      bg="paleBlue"
      height="inherit"
      position="absolute"
      width="inherit"
      zIndex={1}
    >
      <FlexBox
        as="th"
        center
        column
        left="calc(50% - 115px)"
        p={16}
        position="sticky"
        top="calc(50% - 100px)"
        width="fit-content"
      >
        <BlueprintWhite aria-hidden width="200px" />
        <Text fontFamily="monospace" mt={16}>
          Nothing to see here!
        </Text>
      </FlexBox>
    </Box>
  </Box>
);
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

const shipFilters = uniq(crew.map(({ ship }) => ship));

export const cols = [
  {
    header: 'Name',
    key: 'name',
    size: 'lg',
    sortable: true,
    type: 'header',
  },
  { header: 'Rank', key: 'role', size: 'lg', sortable: true },
  {
    header: 'Ship',
    key: 'ship',
    size: 'xl',
    sortable: true,
    filters: shipFilters,
  },
  {
    header: 'Power',
    key: 'power',
    size: 'xl',
    fill: true,
    sortable: true,
  },
  {
    header: 'Species',
    key: 'species',
    size: 'lg',
    justify: 'right',
    sortable: true,
    filters: ['Human'],
  },
  {
    header: '',
    key: '',
    size: 'md',
    justify: 'right',
    type: 'control',
    sortable: true,
    render: () => <TestDropdownButton />,
  },
] as ColumnConfig<(typeof crew)[number]>[];

export const createDemoTable =
  (Component: any, overrides = {}) =>
  () => {
    const [selectedRows, setSelectedRows] = useState<
      (typeof crew)[number]['name'][]
    >([]);
    const [expandedRows, setExpandedRows] = useState<
      (typeof crew)[number]['name'][]
    >([]);

    const { idKey, query, rows, onQueryChange } = useLocalQuery({
      idKey: 'name',
      rows: crew,
      columns: cols,
    });

    const allIds = useMemo(() => crew.map(({ [idKey]: id }) => id), [idKey]);

    const onRowSelect = useCallback(
      ({
        type,
        payload: { toggle, rowId },
      }: {
        type: string;
        payload: { toggle: boolean; rowId: string };
      }) => {
        if (type === 'select') {
          return setSelectedRows((prev = []) => {
            return toggle
              ? prev?.filter((id) => id !== rowId)
              : [...prev, rowId];
          });
        }
        if (type === 'select-all') {
          return setSelectedRows(toggle ? [] : allIds);
        }
      },
      [setSelectedRows, allIds]
    );

    const onRowExpand = useCallback(
      ({
        payload: { toggle, rowId },
      }: {
        payload: { toggle: boolean; rowId: string };
      }) => {
        return setExpandedRows((prev = []) => {
          return toggle ? prev?.filter((id) => id !== rowId) : [...prev, rowId];
        });
      },
      []
    );

    const expandedContent = useCallback(
      ({ onCollapse }: { onCollapse: () => void }) => (
        <FlexBox column flex={1}>
          <FlexBox borderTop={1} opacity={0.5} />
          <FlexBox center column gap={16} p={32}>
            <Text variant="title-md">Nothing to see here</Text>
            <FillButton size="small" onClick={onCollapse}>
              Get me out of here!
            </FillButton>
          </FlexBox>
        </FlexBox>
      ),
      []
    );

    return (
      <Component
        columns={cols}
        expanded={expandedRows}
        expandedContent={expandedContent}
        height={500}
        id="example"
        idKey={idKey}
        query={query}
        rows={rows}
        selected={selectedRows}
        onQueryChange={onQueryChange}
        onRowExpand={onRowExpand}
        onRowSelect={onRowSelect}
        {...overrides}
      />
    );
  };

export const DataTableTemplate = createDemoTable(DataTable, {
  onRowSelect: undefined,
  onRowExpand: undefined,
});

export const DataListTemplate = createDemoTable(DataList, {
  scrollable: false,
  height: 'auto',
});

// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  DataTable,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  PopoverContainer,
  Text,
} from '@codecademy/gamut';
import { MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import {
  CustomEmptyState,
  DataTableTemplate,
  DisableContainerQueryExample,
  simpleColumns,
  simpleRows,
} from '../examples';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  args: {
    id: 'crew',
    idKey: 'name',
    query: { sort: { name: 'desc', role: 'asc' } },
    rows: [
      {
        name: 'Jean Luc Picard',
        'a very important role': 'Captain',
        ship: 'USS Enterprise',
        age: '59',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '35',
        homeworld: 'La Barre, France, Earth',
        specialization: 'Command & Diplomacy',
      },
      {
        name: 'Wesley Crusher',
        'a very important role': 'Deus Ex Machina',
        ship: 'USS Enterprise',
        age: '18',
        species: 'Human/Traveler',
        sector: 'Multiple Dimensions',
        status: 'Transcended',
        yearsOfService: '2',
        homeworld: 'Earth',
        specialization: 'Space-Time Manipulation',
      },
      {
        name: 'Geordie LaForge',
        'a very important role': 'Chief Engineer / Rascal',
        ship: 'Borg Cube',
        age: '35',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '15',
        homeworld: 'Mogadishu, Somalia, Earth',
        specialization: 'Engineering & Technology',
      },
      {
        name: 'Data',
        'a very important role': 'Lt. Commander / Scamp',
        ship: 'He is a ship',
        age: '30',
        species: 'Soong-type Android',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '26',
        homeworld: 'Omicron Theta',
        specialization: 'Operations & Analysis',
      },
      {
        name: `Miles Edward O'Brien, 24th Century Man`,
        'a very important role': 'Command Master Chief',
        ship: 'Deep Space 9',
        age: '40',
        species: 'Human',
        sector: 'Bajoran System',
        status: 'Active',
        yearsOfService: '22',
        homeworld: 'Ireland, Earth',
        specialization: 'Engineering & Transporter Operations',
      },
    ],
    columns: [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        sortable: true,
      },
      {
        header: 'Rank',
        key: 'a very important role',
        size: 'lg',
        sortable: true,
      },
      { header: 'Ship', key: 'ship', size: 'lg', sortable: true },
      { header: 'Age', key: 'age', size: 'sm', sortable: true },
      { header: 'Species', key: 'species', size: 'md', sortable: true },
      { header: 'Sector', key: 'sector', size: 'md', sortable: true },
      { header: 'Status', key: 'status', size: 'sm', sortable: true },
      {
        header: 'Years of Service',
        key: 'yearsOfService',
        size: 'sm',
        sortable: true,
      },
      { header: 'Homeworld', key: 'homeworld', size: 'lg', sortable: true },
      {
        header: 'Specialization',
        key: 'specialization',
        size: 'xl',
        sortable: true,
        fill: true,
      },
    ],
    spacing: 'condensed',
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {},
};

export const FullDataTable: Story = {
  render: () => <DataTableTemplate />,
};

export const EmptyState: Story = {
  args: {
    rows: [],
    shadow: true,
    scrollable: true,
    height: '45vh',
    minHeight: '300px',
  },
  render: (args) => <DataTable {...args} />,
};

export const EmptyStateCustom: Story = {
  args: {
    rows: [],
    shadow: true,
    scrollable: true,
    height: '45vh',
    minHeight: '300px',
    emptyMessage: <CustomEmptyState />,
  },
  render: (args) => <DataTable {...args} />,
};

export const LoadingRows: Story = {
  args: { loading: true, shadow: true },
};

export const Scrollable: Story = {
  args: {
    shadow: true,
    scrollable: true,
    height: '400px',
    wrapperWidth: '800px',
  },
};

export const BackgroundColors: Story = {
  args: {},
  render: (args) => (
    <Background bg="paleBlue" p={8}>
      <DataTable {...args} />
    </Background>
  ),
};

const DataTableDisableContainerQueryExample = () => {
  const defaultComponent = (
    <DataTable
      columns={simpleColumns}
      id="default-table-query"
      idKey="name"
      rows={simpleRows}
      spacing="condensed"
    />
  );

  const disabledComponent = (
    <DataTable
      columns={simpleColumns}
      disableContainerQuery
      id="disabled-table-query"
      idKey="name"
      rows={simpleRows}
      spacing="condensed"
    />
  );

  return (
    <DisableContainerQueryExample
      componentName="DataTable"
      defaultComponent={defaultComponent}
      disabledComponent={disabledComponent}
    />
  );
};

export const DisableContainerQuery: Story = {
  args: {},
  render: () => <DataTableDisableContainerQueryExample />,
};

const RowMenu: React.FC<{ rowName: string }> = ({ rowName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <Box display="inline-block" p={8} ref={menuButtonRef}>
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
        alignment="bottom-left"
        allowPageInteraction
        closeOnViewportExit
        isOpen={isOpen}
        offset={0}
        targetRef={menuButtonRef}
        onRequestClose={handleClose}
      >
        <Menu borderRadius="md" spacing="normal" variant="popover">
          <MenuItem onClick={handleClose}>
            <Text truncate="ellipsis" truncateLines={1}>
              Edit {rowName}
            </Text>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Text truncate="ellipsis" truncateLines={1}>
              Delete {rowName}
            </Text>
          </MenuItem>
          <MenuItem onClick={handleOpenModal}>
            <Text truncate="ellipsis" truncateLines={1}>
              Clone {rowName}
            </Text>
          </MenuItem>
        </Menu>
      </PopoverContainer>

      <Dialog
        cancelCta={{
          children: 'Cancel',
          onClick: () => setIsModalOpen(false),
        }}
        confirmCta={{
          children: 'Clone',
          onClick: () => {
            // Handle clone action here
            setIsModalOpen(false);
          },
        }}
        isOpen={isModalOpen}
        size="small"
        title={`Clone ${rowName}`}
        onRequestClose={() => setIsModalOpen(false)}
      >
        Are you sure you want to clone{' '}
        <Text as="span" fontWeight="bold">
          {rowName}{' '}
        </Text>
        ? This action cannot be undone.
      </Dialog>
    </Box>
  );
};

export const WithFloatingMenu: Story = {
  args: {
    id: 'crew-with-menu',
    idKey: 'name',
    query: { sort: { name: 'desc', role: 'asc' } },
    rows: [
      {
        name: 'Jean Luc Picard',
        'a very important role': 'Captain',
        ship: 'USS Enterprise',
        age: '59',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '35',
        homeworld: 'La Barre, France, Earth',
        specialization: 'Command & Diplomacy',
      },
      {
        name: 'Wesley Crusher',
        'a very important role': 'Deus Ex Machina',
        ship: 'USS Enterprise',
        age: '18',
        species: 'Human/Traveler',
        sector: 'Multiple Dimensions',
        status: 'Transcended',
        yearsOfService: '2',
        homeworld: 'Earth',
        specialization: 'Space-Time Manipulation',
      },
      {
        name: 'Geordie LaForge',
        'a very important role': 'Chief Engineer / Rascal',
        ship: 'Borg Cube',
        age: '35',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '15',
        homeworld: 'Mogadishu, Somalia, Earth',
        specialization: 'Engineering & Technology',
      },
      {
        name: 'Data',
        'a very important role': 'Lt. Commander / Scamp',
        ship: 'He is a ship',
        age: '30',
        species: 'Soong-type Android',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '26',
        homeworld: 'Omicron Theta',
        specialization: 'Operations & Analysis',
      },
      {
        name: `Miles Edward O'Brien, 24th Century Man`,
        'a very important role': 'Command Master Chief',
        ship: 'Deep Space 9',
        age: '40',
        species: 'Human',
        sector: 'Bajoran System',
        status: 'Active',
        yearsOfService: '22',
        homeworld: 'Ireland, Earth',
        specialization: 'Engineering & Transporter Operations',
      },
      {
        name: 'William Riker',
        'a very important role': 'Commander',
        ship: 'USS Enterprise',
        age: '32',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '15',
        homeworld: 'Alaska, Earth',
        specialization: 'Command & Diplomacy',
      },
      {
        name: 'Deanna Troi',
        'a very important role': 'Counselor',
        ship: 'USS Enterprise',
        age: '28',
        species: 'Human / Betazoid',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '8',
        homeworld: 'Betazed',
        specialization: 'Psychology & Empathy',
      },
      {
        name: 'Worf',
        'a very important role': 'Security Officer',
        ship: 'USS Enterprise',
        age: '35',
        species: 'Klingon',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '12',
        homeworld: "Qo'noS",
        specialization: 'Security & Combat',
      },
      {
        name: 'Beverly Crusher',
        'a very important role': 'Chief Medical Officer',
        ship: 'USS Enterprise',
        age: '40',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '18',
        homeworld: 'Earth',
        specialization: 'Medicine & Research',
      },
      {
        name: 'Tasha Yar',
        'a very important role': 'Security Chief',
        ship: 'USS Enterprise',
        age: '24',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Deceased',
        yearsOfService: '3',
        homeworld: 'Turkana IV, Earth',
        specialization: 'Security & Tactics',
      },
    ],
    columns: [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        sortable: true,
      },
      {
        header: 'Rank',
        key: 'a very important role',
        size: 'lg',
        sortable: true,
      },
      { header: 'Ship', key: 'ship', size: 'lg', sortable: true },
      { header: 'Age', key: 'age', size: 'sm', sortable: true },
      { header: 'Species', key: 'species', size: 'md', sortable: true },
      { header: 'Sector', key: 'sector', size: 'md', sortable: true },
      { header: 'Status', key: 'status', size: 'sm', sortable: true },
      {
        header: 'Years of Service',
        key: 'yearsOfService',
        size: 'sm',
        sortable: true,
      },
      { header: 'Homeworld', key: 'homeworld', size: 'lg', sortable: true },
      {
        header: 'Specialization',
        key: 'specialization',
        size: 'xl',
        sortable: true,
        fill: true,
      },
      {
        header: 'Actions',
        key: 'name',
        size: 'sm',
        justify: 'right',
        type: 'control',
        render: (row) => <RowMenu rowName={row.name} />,
      },
    ],
    spacing: 'condensed',
    shadow: true,
    scrollable: true,
    height: '400px',
  },
};

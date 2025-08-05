// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DataTable } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { CustomEmptyState, DataTableTemplate } from '../examples';

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
        label: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        sortable: true,
      },
      {
        label: 'Rank',
        key: 'a very important role',
        size: 'lg',
        sortable: true,
      },
      { label: 'Ship', key: 'ship', size: 'lg', sortable: true },
      { label: 'Age', key: 'age', size: 'sm', sortable: true },
      { label: 'Species', key: 'species', size: 'md', sortable: true },
      { label: 'Sector', key: 'sector', size: 'md', sortable: true },
      { label: 'Status', key: 'status', size: 'sm', sortable: true },
      {
        label: 'Years of Service',
        key: 'yearsOfService',
        size: 'sm',
        sortable: true,
      },
      { label: 'Homeworld', key: 'homeworld', size: 'lg', sortable: true },
      {
        label: 'Specialization',
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

export const ShadowTest: Story = {
  args: {
    shadow: true,
    scrollable: true,
    height: 'auto',
    wrapperWidth: '600px',
    columns: [
      { label: 'Name', key: 'name', size: 'xl', type: 'header' },
      { label: 'Rank', key: 'a very important role', size: 'xl' },
      { label: 'Ship', key: 'ship', size: 'xl' },
      { label: 'Age', key: 'age', size: 'xl' },
      { label: 'Species', key: 'species', size: 'xl' },
      { label: 'Sector', key: 'sector', size: 'xl' },
      { label: 'Status', key: 'status', size: 'xl' },
      { label: 'Years of Service', key: 'yearsOfService', size: 'xl' },
      { label: 'Homeworld', key: 'homeworld', size: 'xl' },
      { label: 'Specialization', key: 'specialization', size: 'xl' },
    ],
  },
};

export const DebugShadow: Story = {
  args: {
    shadow: true,
    scrollable: true,
    height: '200px',
    wrapperWidth: '400px',
    spacing: 'condensed',
    columns: [
      {
        label: 'Very Long Column Name 1',
        key: 'name',
        size: 'xl',
        type: 'header',
      },
      {
        label: 'Very Long Column Name 2',
        key: 'a very important role',
        size: 'xl',
      },
      { label: 'Very Long Column Name 3', key: 'ship', size: 'xl' },
      { label: 'Very Long Column Name 4', key: 'age', size: 'xl' },
      { label: 'Very Long Column Name 5', key: 'species', size: 'xl' },
    ],
  },
};

export const Default: Story = {
  args: {},
};

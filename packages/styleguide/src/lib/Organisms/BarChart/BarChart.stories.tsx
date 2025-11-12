import { BarChart, BarChartProps, BarProps } from '@codecademy/gamut';
import {
  CodeIcon,
  ComputerIcon,
  DataScienceIcon,
  WebDevelopmentIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  args: {
    'aria-label': 'Skills experience chart',
    unit: 'XP',
    minRange: 0,
    maxRange: 1500,
    xScale: 500,
    sortBy: 'none',
    order: 'ascending',
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Sample data for stories
const basicBarData: BarProps[] = [
  {
    yLabel: 'Computer Science',
    startingValue: 1200,
    endingValue: 1400,
    icon: ComputerIcon,
  },
  {
    yLabel: 'Web Development',
    startingValue: 800,
    endingValue: 1100,
    icon: WebDevelopmentIcon,
  },
  {
    yLabel: 'Data Science',
    startingValue: 500,
    endingValue: 900,
    icon: DataScienceIcon,
  },
  {
    yLabel: 'Programming',
    startingValue: 300,
    endingValue: 600,
    icon: CodeIcon,
  },
];

const simpleBarData: BarProps[] = [
  {
    yLabel: 'Computer Science',
    startingValue: 1200,
    icon: ComputerIcon,
  },
  {
    yLabel: 'Web Development',
    startingValue: 800,
    icon: WebDevelopmentIcon,
  },
  {
    yLabel: 'Data Science',
    startingValue: 500,
    icon: DataScienceIcon,
  },
];

const interactiveBarData: BarProps[] = [
  {
    yLabel: 'Computer Science',
    startingValue: 1200,
    endingValue: 1400,
    icon: ComputerIcon,
    onClick: () => alert('Computer Science clicked!'),
  },
  {
    yLabel: 'Web Development',
    startingValue: 800,
    endingValue: 1100,
    icon: WebDevelopmentIcon,
    href: 'https://www.codecademy.com/learn/paths/web-development',
  },
  {
    yLabel: 'Data Science',
    startingValue: 500,
    endingValue: 900,
    icon: DataScienceIcon,
    onClick: () => alert('Data Science clicked!'),
  },
];

export const Default: Story = {
  args: {
    barValues: basicBarData,
  },
};

export const WithoutEndingValues: Story = {
  args: {
    barValues: simpleBarData,
  },
};

export const WithoutIcons: Story = {
  args: {
    barValues: basicBarData.map((bar) => ({ ...bar, icon: undefined })),
  },
};

export const InteractiveRows: Story = {
  args: {
    barValues: interactiveBarData,
  },
};

export const SortedByLabel: Story = {
  args: {
    barValues: basicBarData,
    sortBy: 'label',
    order: 'ascending',
  },
};

export const SortedByValue: Story = {
  args: {
    barValues: basicBarData,
    sortBy: 'value',
    order: 'descending',
  },
};

export const CustomColors: Story = {
  args: {
    barValues: basicBarData,
    styleConfig: {
      textColor: 'navy-800',
      foregroundBarColor: 'feedback-warning',
      backgroundBarColor: 'hyper-500',
    },
  },
};

export const LargeDataset: Story = {
  args: {
    barValues: [
      {
        yLabel: 'JavaScript',
        startingValue: 2500,
        endingValue: 3200,
        icon: CodeIcon,
      },
      {
        yLabel: 'Python',
        startingValue: 2000,
        endingValue: 2800,
        icon: CodeIcon,
      },
      {
        yLabel: 'Java',
        startingValue: 1800,
        endingValue: 2400,
        icon: CodeIcon,
      },
      {
        yLabel: 'C++',
        startingValue: 1500,
        endingValue: 2000,
        icon: CodeIcon,
      },
      {
        yLabel: 'Ruby',
        startingValue: 1200,
        endingValue: 1600,
        icon: CodeIcon,
      },
      {
        yLabel: 'Go',
        startingValue: 800,
        endingValue: 1200,
        icon: CodeIcon,
      },
    ],
    maxRange: 4000,
    xScale: 1000,
  },
};

export const DifferentScale: Story = {
  args: {
    barValues: [
      {
        yLabel: 'Beginner',
        startingValue: 50,
        endingValue: 150,
      },
      {
        yLabel: 'Intermediate',
        startingValue: 150,
        endingValue: 300,
      },
      {
        yLabel: 'Advanced',
        startingValue: 300,
        endingValue: 450,
      },
    ],
    minRange: 0,
    maxRange: 500,
    xScale: 100,
  },
};

export const WithAriaLabelledBy: Story = {
  args: {
    'aria-label': undefined,
    'aria-labelledby': 'chart-title',
    barValues: basicBarData,
  },
  render: (args) => (
    <div>
      <h2 id="chart-title">Skills Progress Chart</h2>
      <BarChart {...args} />
    </div>
  ),
};

const ControlledExample: React.FC<BarChartProps> = (props) => {
  const [sortBy, setSortBy] = useState<'label' | 'value' | 'none'>('none');
  const [order, setOrder] = useState<'ascending' | 'descending'>('ascending');

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <div>
          <label htmlFor="sort-by">Sort by: </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'label' | 'value' | 'none')
            }
          >
            <option value="none">None</option>
            <option value="label">Label</option>
            <option value="value">Value</option>
          </select>
        </div>
        <div>
          <label htmlFor="order">Order: </label>
          <select
            id="order"
            value={order}
            onChange={(e) =>
              setOrder(e.target.value as 'ascending' | 'descending')
            }
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
      <BarChart {...props} sortBy={sortBy} order={order} />
    </div>
  );
};

export const Controlled: Story = {
  args: {
    barValues: basicBarData,
  },
  render: (args) => <ControlledExample {...args} />,
};

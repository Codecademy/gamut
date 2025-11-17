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
  argTypes: {
    barValues: {
      description: 'Array of bar data to display',
      control: { type: 'object' },
    },
    sortBy: {
      control: { type: 'select' },
      options: ['none', 'label', 'value'],
    },
    order: {
      control: { type: 'select' },
      options: ['ascending', 'descending'],
    },
    styleConfig: {
      description: 'Custom colors for text and bars',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Reusable bar data fixtures
const createSkillBar = (
  label: string,
  startValue: number,
  endValue: number,
  icon: React.ComponentType<any>
): BarProps => ({
  yLabel: label,
  startingValue: startValue,
  endingValue: endValue,
  icon,
});

const skillBars: BarProps[] = [
  createSkillBar('Computer Science', 1200, 1400, ComputerIcon),
  createSkillBar('Web Development', 800, 1100, WebDevelopmentIcon),
  createSkillBar('Data Science', 500, 900, DataScienceIcon),
  createSkillBar('Programming', 300, 600, CodeIcon),
];

const simpleSkillBars: BarProps[] = [
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

const languageBars: BarProps[] = [
  createSkillBar('JavaScript', 2500, 3200, CodeIcon),
  createSkillBar('Python', 2000, 2800, CodeIcon),
  createSkillBar('Java', 1800, 2400, CodeIcon),
  createSkillBar('C++', 1500, 2000, CodeIcon),
  createSkillBar('Ruby', 1200, 1600, CodeIcon),
  createSkillBar('Go', 800, 1200, CodeIcon),
];

// Template story for common pattern
const BaseTemplate: Story = {
  render: (args) => <BarChart {...args} />,
};

export const Default: Story = {
  ...BaseTemplate,
  args: {
    barValues: skillBars,
  },
};

export const WithoutEndingValues: Story = {
  ...BaseTemplate,
  args: {
    barValues: simpleSkillBars,
  },
};

export const WithoutIcons: Story = {
  ...BaseTemplate,
  args: {
    barValues: skillBars.map(({ icon, ...bar }) => bar),
  },
};

export const InteractiveRows: Story = {
  ...BaseTemplate,
  args: {
    barValues: [
      {
        ...skillBars[0],
        onClick: () => alert('Computer Science clicked!'),
      },
      {
        ...skillBars[1],
        href: 'https://www.codecademy.com/learn/paths/web-development',
      },
      {
        ...skillBars[2],
        onClick: () => alert('Data Science clicked!'),
      },
    ],
  },
};

export const SortedByLabel: Story = {
  ...BaseTemplate,
  args: {
    barValues: skillBars,
    sortBy: 'label',
    order: 'ascending',
  },
};

export const SortedByValue: Story = {
  ...BaseTemplate,
  args: {
    barValues: skillBars,
    sortBy: 'value',
    order: 'descending',
  },
};

export const CustomColors: Story = {
  ...BaseTemplate,
  args: {
    barValues: skillBars,
    styleConfig: {
      textColor: 'navy-800',
      foregroundBarColor: 'feedback-warning',
      backgroundBarColor: 'hyper-500',
    },
  },
};

export const LargeDataset: Story = {
  ...BaseTemplate,
  args: {
    barValues: languageBars,
    maxRange: 4000,
    xScale: 1000,
  },
};

export const DifferentScale: Story = {
  ...BaseTemplate,
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
  render: (args) => (
    <div>
      <h2 id="chart-title">Skills Progress Chart</h2>
      <BarChart {...args} />
    </div>
  ),
  args: {
    'aria-label': undefined,
    'aria-labelledby': 'chart-title',
    barValues: skillBars,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const ControlledExample: React.FC<BarChartProps> = (props) => {
      const [sortBy, setSortBy] = useState<'label' | 'value' | 'none'>('none');
      const [order, setOrder] = useState<'ascending' | 'descending'>(
        'ascending'
      );

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

    return <ControlledExample {...args} />;
  },
  args: {
    barValues: skillBars,
  },
};

import { BarChart, BarProps } from '@codecademy/gamut';
import {
  BookFlipPageIcon,
  CodeIcon,
  DataScienceIcon,
  GameControllerIcon,
  TerminalIcon,
} from '@codecademy/gamut-icons';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  args: {
    'aria-label': 'Skills experience chart',
    minRange: 0,
    maxRange: 2000,
    unit: 'XP',
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const simpleBarData: BarProps[] = [
  { yLabel: 'Python', seriesOneValue: 1500 },
  { yLabel: 'JavaScript', seriesOneValue: 2000 },
  { yLabel: 'HTML/CSS', seriesOneValue: 800 },
  { yLabel: 'SQL', seriesOneValue: 600 },
  { yLabel: 'React', seriesOneValue: 450 },
];

const stackedBarData: BarProps[] = [
  { yLabel: 'Python', seriesOneValue: 200, seriesTwoValue: 1500 },
  {
    yLabel: 'JavaScript',
    icon: TerminalIcon,
    seriesOneValue: 1800,
    seriesTwoValue: 2000,
  },
  { yLabel: 'HTML/CSS', seriesOneValue: 600, seriesTwoValue: 800 },
  { yLabel: 'SQL', seriesOneValue: 550, seriesTwoValue: 600 },
  { yLabel: 'React', seriesOneValue: 300, seriesTwoValue: 450 },
];

const barDataWithIcons: BarProps[] = [
  {
    yLabel: 'Python',
    seriesOneValue: 200,
    seriesTwoValue: 1500,
    icon: CodeIcon,
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 150,
    seriesTwoValue: 2000,
    icon: TerminalIcon,
  },
  {
    yLabel: 'Data Science',
    seriesOneValue: 100,
    seriesTwoValue: 800,
    icon: DataScienceIcon,
  },
  {
    yLabel: 'Game Dev',
    seriesOneValue: 50,
    seriesTwoValue: 600,
    icon: GameControllerIcon,
  },
  {
    yLabel: 'Reading',
    seriesOneValue: 75,
    seriesTwoValue: 450,
    icon: BookFlipPageIcon,
  },
];

/**
 * Default non-stacked bar chart showing single values
 */
export const Default: Story = {
  args: {
    barValues: simpleBarData,
  },
};

/**
 * Stacked bar chart showing progress (seriesOneValue) over total (seriesTwoValue)
 */
export const Stacked: Story = {
  args: {
    barValues: stackedBarData,
  },
};

/**
 * Bar chart with icons next to labels
 */
export const WithIcons: Story = {
  args: {
    barValues: barDataWithIcons,
  },
};

/**
 * Animated bar chart with staggered entrance
 */
export const Animated: Story = {
  args: {
    barValues: stackedBarData,
    animate: true,
  },
};

/**
 * Bar chart sorted by value in descending order
 */
export const SortedByValue: Story = {
  args: {
    barValues: simpleBarData,
    sortBy: 'value',
    order: 'descending',
  },
};

/**
 * Bar chart sorted alphabetically by label
 */
export const SortedByLabel: Story = {
  args: {
    barValues: simpleBarData,
    sortBy: 'label',
    order: 'ascending',
  },
};

/**
 * Interactive bar chart with clickable rows
 */
export const Interactive: Story = {
  args: {
    barValues: simpleBarData.map((bar) => ({
      ...bar,
      onClick: action(`Clicked ${bar.yLabel}`),
      'aria-label': `View ${bar.yLabel} course details`,
    })),
  },
};

/**
 * Interactive bar chart with linked rows
 */
export const WithLinks: Story = {
  args: {
    barValues: simpleBarData.map((bar) => ({
      ...bar,
      href: `#${bar.yLabel.toLowerCase().replace(/\s+/g, '-')}`,
      'aria-label': `Go to ${bar.yLabel} course page`,
    })),
  },
};

/**
 * Bar chart with custom styling
 */
export const CustomStyles: Story = {
  args: {
    barValues: stackedBarData,
    styleConfig: {
      backgroundBarColor: 'text',
      foregroundBarColor: 'primary',
      textColor: 'primary',
      seriesOneLabel: 'feedback-error',
      seriesTwoLabel: 'feedback-success',
    },
  },
};

/**
 * Bar chart with custom xScale interval
 */
export const CustomScale: Story = {
  args: {
    barValues: simpleBarData,
    maxRange: 2000,
    xScale: 250,
  },
};

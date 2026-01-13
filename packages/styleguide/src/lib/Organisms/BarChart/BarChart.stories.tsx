import { BarChart, BarProps, Box } from '@codecademy/gamut';
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
    title: 'Skills experience chart',
    description: 'Chart showing programming language experience levels',
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
    title: 'Skills experience chart',
    description: 'Chart showing programming language experience levels',
  },
};

/**
 * Stacked bar chart showing progress (seriesOneValue) over total (seriesTwoValue)
 */
export const Stacked: Story = {
  args: {
    barValues: stackedBarData,
    title: 'Skills progress chart',
    description: 'Progress toward total goals for each programming language',
  },
};

/**
 * Bar chart with icons next to labels
 */
export const WithIcons: Story = {
  args: {
    barValues: barDataWithIcons,
    title: 'Skills progress with icons',
    description: 'Skills progress with visual icons for each category',
  },
};

/**
 * Animated bar chart with staggered entrance
 */
export const Animated: Story = {
  args: {
    barValues: stackedBarData,
    animate: true,
    title: 'Animated skills chart',
    description: 'Animated chart showing progress with entrance animations',
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
    title: 'Interactive skills chart',
    description: 'Click on any row to view detailed course information',
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
    title: 'Skills chart with links',
    description: 'Each row links to its corresponding course page',
  },
};

/**
 * **Preferred pattern**: Visual title + description. This is the recommended approach for accessibility and user experience.
 */
export const WithVisualTitleAndDescription: Story = {
  args: {
    barValues: simpleBarData,
    title: 'Programming Skills Overview',
    description:
      'Experience points earned across different programming languages',
  },
};

/**
 * Title and description hidden, using aria-labelledby to reference external heading.
 * Use this pattern when the title and description are provided elsewhere in the page structure.
 */
export const WithHiddenTitleAndDescription: Story = {
  render: () => {
    return (
      <BarChart
        barValues={simpleBarData}
        description="Experience points earned across different programming languages"
        hideDescription
        hideTitle
        maxRange={2000}
        minRange={0}
        title="Programming Skills Overview"
        unit="XP"
      />
    );
  },
};

/**
 * Visual description with external title using aria-labelledby.
 * Use this pattern when the title exists elsewhere in the page but you want to show the description.
 */
export const WithExternalTitle: Story = {
  render: () => {
    return (
      <>
        <Box
          as="h2"
          bg="paleBlue"
          border={1}
          borderRadius="lg"
          id="external-chart-title"
          p={16}
          textAlign="right"
        >
          Programming Skills Overview
        </Box>
        <BarChart
          aria-labelledby="external-title"
          barValues={simpleBarData}
          description="Experience points earned across different programming languages"
          hideDescription={false}
          maxRange={2000}
          minRange={0}
          unit="XP"
        />
      </>
    );
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
    title: 'Skills ranked by experience',
    description: 'Skills sorted by experience level from highest to lowest',
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
    title: 'Skills sorted alphabetically',
    description: 'Skills sorted alphabetically by language name',
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
    title: 'Custom styled skills chart',
    description: 'Custom color scheme applied to chart elements',
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
    title: 'Skills chart with custom scale',
    description: 'Custom scale intervals for more granular value display',
  },
};

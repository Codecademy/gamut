import {
  BarChart,
  BarProps,
  Box,
  PartialBarChartTranslations,
} from '@codecademy/gamut';
import {
  BookFlipPageIcon,
  DataScienceIcon,
  TerminalIcon,
} from '@codecademy/gamut-icons';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  args: {
    description: 'Chart showing programming language experience levels',
    maxRange: 2000,
    title: 'Skills experience chart',
    unit: 'XP',
  },
  parameters: {
    docs: {
      description: {
        component:
          'BarChart supports i18n via the `translations` prop. Accessibility keys (`gainedNowAt`, `inLabel`, `inOnly`) may be strings (fragments in the built-in template) or functions that receive scoped context (values, label, unit, locale) and return the full accessibility summary—useful for pluralization, word order, or locale-specific phrasing.',
      },
    },
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

const accessibilityBarData: BarProps[] = [
  { yLabel: 'Python', seriesOneValue: 200, seriesTwoValue: 1500 },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 1800,
    seriesTwoValue: 2000,
    href: '/javascript',
  },
  { yLabel: 'HTML/CSS', seriesOneValue: 600, seriesTwoValue: 800 },
  { yLabel: 'SQL', seriesOneValue: 550, href: '/sql' },
  { yLabel: 'Rust', seriesOneValue: 400 },
  { yLabel: 'React', seriesOneValue: 300, seriesTwoValue: 450 },
];

const accessibilityTranslations: PartialBarChartTranslations = {
  accessibility: {
    gainedNowAt: (ctx) =>
      `${ctx.seriesOneValue} ${ctx.unit} gained — now at ${ctx.seriesTwoValue} ${ctx.unit} in ${ctx.yLabel}`,
    inLabel: (ctx) => `${ctx.value} ${ctx.unit} in ${ctx.yLabel}`,
    inOnly: (ctx) => `${ctx.value} ${ctx.unit}`.trim(),
  },
  locale: 'en',
};

const barDataWithIcons: BarProps[] = [
  {
    yLabel: 'Python',
    seriesOneValue: 200,
    seriesTwoValue: 1500,
    icon: TerminalIcon,
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
    yLabel: 'Backend',
    seriesOneValue: 50,
    seriesTwoValue: 600,
    icon: TerminalIcon,
  },
  {
    yLabel: 'Reading',
    seriesOneValue: 75,
    seriesTwoValue: 450,
    icon: BookFlipPageIcon,
  },
];

export const Default: Story = {
  args: {
    barValues: simpleBarData,
    title: 'Skills experience chart',
    description: 'Chart showing programming language experience levels',
  },
};

export const Stacked: Story = {
  args: {
    barValues: stackedBarData,
    title: 'Skills progress chart',
    description: 'Progress toward total goals for each programming language',
  },
};

export const WithIcons: Story = {
  args: {
    barValues: barDataWithIcons,
    title: 'Skills progress with icons',
    description: 'Skills progress with visual icons for each category',
  },
};

export const Animated: Story = {
  args: {
    barValues: stackedBarData,
    animate: true,
    title: 'Animated skills chart',
    description: 'Animated chart showing progress with entrance animations',
  },
};

export const Interactive: Story = {
  args: {
    barValues: simpleBarData.map((bar) => ({
      ...bar,
      onClick: action(`Clicked ${bar.yLabel}`),
    })),
    title: 'Interactive skills chart',
    description: 'Click on any row to view detailed course information',
  },
};

export const WithLinks: Story = {
  args: {
    barValues: simpleBarData.map((bar) => ({
      ...bar,
      href: `#${bar.yLabel.toLowerCase().replace(/\s+/g, '-')}`,
    })),
    title: 'Skills chart with links',
    description: 'Each row links to its corresponding course page',
  },
};

export const WithVisualTitleAndDescription: Story = {
  args: {
    barValues: simpleBarData,
    title: 'Programming Skills Overview',
    description:
      'Experience points earned across different programming languages',
  },
};

export const WithHiddenTitleAndDescription: Story = {
  render: () => {
    return (
      <BarChart
        barValues={simpleBarData}
        description="Experience points earned across different programming languages"
        hideDescription
        hideTitle
        maxRange={2000}
        title="Programming Skills Overview"
        unit="XP"
      />
    );
  },
};

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
          unit="XP"
        />
      </>
    );
  },
};

export const WithSorting: Story = {
  args: {
    barValues: simpleBarData,
    sortFns: ['alphabetically', 'numerically', 'none'],
    title: 'Skills experience chart',
    description: 'Use the dropdown to sort bars by different criteria',
  },
};

const customSortingBarValues = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    dateAdded: new Date('2023-01-15'),
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    dateAdded: new Date('2023-03-20'),
  },
  {
    yLabel: 'React',
    seriesOneValue: 450,
    dateAdded: new Date('2023-06-10'),
  },
  {
    yLabel: 'TypeScript',
    seriesOneValue: 300,
    dateAdded: new Date('2023-08-05'),
  },
  {
    yLabel: 'SQL',
    seriesOneValue: 600,
    dateAdded: new Date('2023-02-28'),
  },
];

export const WithCustomSorting: Story = {
  args: {
    barValues: customSortingBarValues,
    sortFns: [
      'none',
      {
        label: 'Recently Added',
        value: 'recent',
        sortFn: (bars) => {
          return [...bars].sort((a, b) => {
            // TypeScript infers the type from barValues, so dateAdded is properly typed
            const aDate = a.dateAdded as Date | undefined;
            const bDate = b.dateAdded as Date | undefined;
            if (!aDate && !bDate) return 0;
            if (!aDate) return 1;
            if (!bDate) return -1;
            return bDate.getTime() - aDate.getTime();
          });
        },
      },
      {
        label: 'Oldest First',
        value: 'oldest',
        sortFn: (bars) => {
          return [...bars].sort((a, b) => {
            // TypeScript infers the type from barValues, so dateAdded is properly typed
            const aDate = a.dateAdded as Date | undefined;
            const bDate = b.dateAdded as Date | undefined;
            if (!aDate && !bDate) return 0;
            if (!aDate) return 1;
            if (!bDate) return -1;
            return aDate.getTime() - bDate.getTime();
          });
        },
      },
    ],
    title: 'Skills chart with date sorting',
    description:
      'Custom sort functions can access additional properties on BarProps, such as dates',
  },
};

/**
 * Bar chart with custom styling
 */
export const CustomStyles: Story = {
  args: {
    barValues: stackedBarData,
    styleConfig: {
      seriesTwoBarColor: 'text',
      seriesOneBarColor: 'primary',
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

/**
 * Bar chart with string-based translations (e.g. Spanish).
 * Partial translations are merged with defaults.
 */
export const WithStringTranslations: Story = {
  args: {
    barValues: stackedBarData,
    sortFns: ['alphabetically', 'numerically', 'none'],
    title: 'Gráfico de habilidades',
    description: 'Progreso hacia los objetivos totales por lenguaje',
    unit: 'XP',
    translations: {
      locale: 'es',
      sortLabel: 'Ordenar por:',
      sortOptions: {
        none: 'Ninguno',
        labelAsc: 'Etiqueta (A-Z)',
        labelDesc: 'Etiqueta (Z-A)',
        valueAsc: 'Valor (Bajo-Alto)',
        valueDesc: 'Valor (Alto-Bajo)',
      },
      accessibility: {
        gainedNowAt: 'ganado - ahora en',
        inLabel: 'en',
        inOnly: 'en ',
      },
    },
  },
};

/**
 * Bar chart with function-based accessibility translations.
 * Exercises gainedNowAt (stacked), inLabel (link/button single bar), and inOnly (non-interactive single bar).
 */
export const WithFunctionTranslations: Story = {
  args: {
    barValues: accessibilityBarData,
    description:
      'Custom aria-label summaries via translation functions (stacked, link, and non-interactive bars)',
    title: 'Skills experience (accessibility functions)',
    translations: accessibilityTranslations,
    unit: 'XP',
  },
};

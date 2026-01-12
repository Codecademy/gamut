import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { BarChart } from '..';
import { BarProps } from '../shared/types';

const defaultBarValues = [
  { yLabel: 'Python', seriesOneValue: 100 },
  { yLabel: 'JavaScript', seriesOneValue: 75 },
];

const renderView = setupRtl(BarChart, {
  'aria-label': 'Test chart',
  barValues: defaultBarValues,
  minRange: 0,
  maxRange: 200,
});

describe('BarChart', () => {
  describe('Basic Rendering', () => {
    it('renders a list with the correct number of list items', () => {
      const { view } = renderView();

      view.getByRole('list', { name: 'Test chart' });
      const items = view.getAllByRole('listitem');
      expect(items).toHaveLength(2);
    });

    it('displays y-axis labels for each bar', () => {
      const { view } = renderView();

      const listItems = view.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('Python');
      expect(listItems[1]).toHaveTextContent('JavaScript');
    });

    it('displays values with unit when provided', () => {
      const { view } = renderView({ unit: 'XP' });

      const xp100 = view.getAllByText('100 XP');
      expect(xp100.length).toBeGreaterThan(0);
      const xp75 = view.getAllByText('75 XP');
      expect(xp75.length).toBeGreaterThan(0);
    });
  });

  describe('Stacked vs Non-stacked', () => {
    it('renders only background bar when seriesTwoValue is not provided', () => {
      const { view } = renderView();

      const backgroundBars = view.getAllByTestId('background-bar');
      expect(backgroundBars).toHaveLength(2);

      expect(view.queryAllByTestId('foreground-bar')).toHaveLength(0);
    });

    it('renders both foreground and background bars when seriesTwoValue is provided', () => {
      const stackedBarValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 50, seriesTwoValue: 100 },
        { yLabel: 'JavaScript', seriesOneValue: 25, seriesTwoValue: 75 },
      ];

      const { view } = renderView({ barValues: stackedBarValues });

      const backgroundBars = view.getAllByTestId('background-bar');
      const foregroundBars = view.getAllByTestId('foreground-bar');

      expect(backgroundBars).toHaveLength(2);
      expect(foregroundBars).toHaveLength(2);
    });
  });

  describe('Sorting', () => {
    const unsortedBarValues: BarProps[] = [
      { yLabel: 'Python', seriesOneValue: 50 },
      { yLabel: 'JavaScript', seriesOneValue: 100 },
      { yLabel: 'Ruby', seriesOneValue: 25 },
    ];

    it.each([
      {
        description: 'preserves array order when sortBy is none',
        sortBy: 'none' as const,
        order: undefined,
        expectedOrder: ['Python', 'JavaScript', 'Ruby'],
      },
      {
        description: 'sorts by value ascending',
        sortBy: 'value' as const,
        order: 'ascending' as const,
        expectedOrder: ['Ruby', 'Python', 'JavaScript'],
      },
      {
        description: 'sorts by value descending',
        sortBy: 'value' as const,
        order: 'descending' as const,
        expectedOrder: ['JavaScript', 'Python', 'Ruby'],
      },
      {
        description: 'sorts by label ascending',
        sortBy: 'label' as const,
        order: 'ascending' as const,
        expectedOrder: ['JavaScript', 'Python', 'Ruby'],
      },
    ])('$description', ({ sortBy, order, expectedOrder }) => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortBy,
        ...(order && { order }),
      });

      const items = view.getAllByRole('listitem');
      expectedOrder.forEach((label, index) => {
        expect(items[index]).toHaveTextContent(label);
      });
    });
  });

  describe('Interactivity (Polymorphic Row)', () => {
    it('renders a button when onClick is provided', () => {
      const onClick = jest.fn();
      const barValues: BarProps[] = [
        {
          yLabel: 'Python',
          seriesOneValue: 100,
          onClick,
          'aria-label': 'View Python details',
        },
      ];

      const { view } = renderView({ barValues });

      view.getByRole('button');
    });

    it('calls onClick when button is clicked', async () => {
      const onClick = jest.fn();
      const barValues: BarProps[] = [
        {
          yLabel: 'Python',
          seriesOneValue: 100,
          onClick,
          'aria-label': 'View Python details',
        },
      ];

      const { view } = renderView({ barValues });

      const button = view.getByRole('button', {
        name: 'View Python details',
      });
      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });

    it('renders an anchor when href is provided', () => {
      const barValues: BarProps[] = [
        {
          yLabel: 'Python',
          seriesOneValue: 100,
          href: '/python',
          'aria-label': 'View Python details',
        },
      ];

      const { view } = renderView({ barValues });

      view.getByRole('link', { name: 'View Python details' });
    });

    it('sets correct href on anchor', () => {
      const barValues: BarProps[] = [
        {
          yLabel: 'Python',
          seriesOneValue: 100,
          href: '/python',
          'aria-label': 'View Python details',
        },
      ];

      const { view } = renderView({ barValues });

      const anchor = view.getByRole('link');
      expect(anchor).toHaveAttribute('href', '/python');
      expect(anchor).toHaveAttribute('aria-label', 'View Python details');
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on the list element', () => {
      const { view } = renderView({ 'aria-label': 'Skills chart' });

      view.getByRole('list', { name: 'Skills chart' });
    });
    it('has aria-labelledby on the list element when provided', () => {
      const { view } = renderView({
        'aria-label': undefined,
        'aria-labelledby': 'chart-heading',
      });

      const list = view.getByRole('list');
      expect(list).toHaveAttribute('aria-labelledby', 'chart-heading');
    });
    it('has aria-label on list items with unit', () => {
      const { view } = renderView({ unit: 'XP' });

      view.getByRole('listitem', {
        name: '100 XP in Python category',
      });

      view.getByRole('listitem', {
        name: '75 XP in JavaScript category',
      });
    });

    it('has aria-label on interactive bars for both button/link and listitem', () => {
      const onClick = jest.fn();
      const { view } = renderView({
        unit: 'XP',
        barValues: [
          {
            yLabel: 'Python',
            seriesOneValue: 100,
            onClick,
            'aria-label': 'View Python details',
          },
        ],
      });

      // Button should have the custom aria-label
      const button = view.getByRole('button', { name: 'View Python details' });
      expect(button).toHaveAttribute('aria-label', 'View Python details');

      // Listitem should have the valuesSummary aria-label
      view.getByRole('listitem', {
        name: '100 XP in Python category',
      });
    });
  });
});

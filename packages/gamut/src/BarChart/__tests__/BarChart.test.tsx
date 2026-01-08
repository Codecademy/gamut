import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { BarChart } from '..';
import { BarProps } from '../types';

const defaultBarValues: BarProps[] = [
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
    it('renders a list with the correct aria-label', () => {
      const { view } = renderView();

      const list = view.getByRole('list');
      expect(list).toHaveAttribute('aria-label', 'Test chart');
    });

    it('renders the correct number of list items', () => {
      const { view } = renderView();

      const items = view.getAllByRole('listitem');
      expect(items).toHaveLength(2);
    });

    it('displays y-axis labels for each bar', () => {
      const { view } = renderView();

      view.getByText('Python');
      view.getByText('JavaScript');
    });

    it('displays values with unit when provided', () => {
      const { view } = renderView({ unit: 'XP' });

      view.getByText('100 XP');
      view.getByText('75 XP');
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

    it('preserves array order when sortBy is none', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortBy: 'none',
      });

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Python');
      expect(items[1]).toHaveTextContent('JavaScript');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('sorts by value ascending', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortBy: 'value',
        order: 'ascending',
      });

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Ruby');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('JavaScript');
    });

    it('sorts by value descending', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortBy: 'value',
        order: 'descending',
      });

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('JavaScript');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('sorts by label ascending', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortBy: 'label',
        order: 'ascending',
      });

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('JavaScript');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('Ruby');
    });
  });

  describe('Interactivity (Polymorphic Row)', () => {
    it('renders a button when onClick is provided', () => {
      const onClick = jest.fn();
      const barValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 100, onClick },
      ];

      const { view } = renderView({ barValues });

      view.getByRole('button');
    });

    it('calls onClick when button is clicked', async () => {
      const onClick = jest.fn();
      const barValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 100, onClick },
      ];

      const { view } = renderView({ barValues });

      const button = view.getByRole('button');
      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });

    it('renders an anchor when href is provided', () => {
      const barValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 100, href: '/python' },
      ];

      const { view } = renderView({ barValues });

      view.getByRole('link');
    });

    it('sets correct href on anchor', () => {
      const barValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 100, href: '/python' },
      ];

      const { view } = renderView({ barValues });

      const anchor = view.getByRole('link');
      expect(anchor).toHaveAttribute('href', '/python');
    });
  });

  describe('Accessibility (aria-label)', () => {
    it('has aria-label on the list element', () => {
      const { view } = renderView({ 'aria-label': 'Skills chart' });

      const list = view.getByRole('list');
      expect(list).toHaveAttribute('aria-label', 'Skills chart');
    });
  });

  describe('Accessibility (aria-labelledby)', () => {
    it('has aria-labelledby on the list element when provided', () => {
      const { view } = renderView({
        'aria-label': undefined,
        'aria-labelledby': 'chart-heading',
      });

      const list = view.getByRole('list');
      expect(list).toHaveAttribute('aria-labelledby', 'chart-heading');
    });
  });
});

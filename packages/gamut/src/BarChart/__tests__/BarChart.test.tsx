import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import { HTMLProps } from 'react';

import { ButtonProps } from '../../Button';
import { BarChart } from '..';
import { BarProps } from '../shared/types';

const defaultBarValues = [
  { yLabel: 'Python', seriesOneValue: 100 },
  { yLabel: 'JavaScript', seriesOneValue: 75 },
];

const renderView = setupRtl(BarChart, {
  title: 'Test chart',
  barValues: defaultBarValues,
  description: 'Test chart description',
  minRange: 0,
  maxRange: 200,
});

const createInteractiveBar = ({
  yLabel,
  seriesOneValue,
  ariaLabel,
  href,
  onClick,
}: Pick<BarProps, 'yLabel' | 'seriesOneValue'> & {
  ariaLabel: string;
  href?: HTMLProps<HTMLAnchorElement>['href'];
  onClick?: ButtonProps['onClick'];
}): BarProps => {
  const base = {
    yLabel,
    seriesOneValue,
    'aria-label': ariaLabel,
  };

  if (href) {
    return { ...base, href, ...(onClick && { onClick }) };
  }
  if (onClick) {
    return { ...base, onClick };
  }
  return base;
};

describe('BarChart', () => {
  describe('Basic Rendering', () => {
    it('renders a list with the correct number of list items', () => {
      const { view } = renderView();

      view.getByRole('list');
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

      const listItems = view.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('100 XP');
      expect(listItems[1]).toHaveTextContent('75 XP');
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

  describe('Interactivity', () => {
    const createPythonBar = (
      options: {
        onClick?: ButtonProps['onClick'];
        href?: HTMLProps<HTMLAnchorElement>['href'];
      } = {}
    ): BarProps[] => {
      const base = {
        yLabel: 'Python',
        seriesOneValue: 100,
        'aria-label': 'View Python details',
      };

      if (options.href) {
        return [
          {
            ...base,
            href: options.href,
            ...(options.onClick && { onClick: options.onClick }),
          },
        ];
      }
      if (options.onClick) {
        return [{ ...base, onClick: options.onClick }];
      }
      return [base];
    };

    it('renders a button when onClick is provided', () => {
      const onClick = jest.fn();
      const { view } = renderView({ barValues: createPythonBar({ onClick }) });

      view.getByRole('button', { name: 'View Python details' });
    });

    it('calls onClick when button is clicked', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ barValues: createPythonBar({ onClick }) });

      const button = view.getByRole('button', {
        name: 'View Python details',
      });

      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });

    it('renders an anchor when href is provided', () => {
      const { view } = renderView({
        barValues: createPythonBar({ href: '/python' }),
      });

      const anchor = view.getByRole('link', { name: 'View Python details' });
      expect(anchor).toHaveAttribute('href', '/python');
    });

    it('calls onClick when href and onClick are provided', async () => {
      const onClick = jest.fn();
      const { view } = renderView({
        barValues: createPythonBar({ href: '/python', onClick }),
      });

      const anchor = view.getByRole('link', {
        name: 'View Python details',
      });
      expect(anchor).toHaveAttribute('href', '/python');

      await userEvent.click(anchor);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    describe('Chart-level labeling', () => {
      it('has title for chart labeling', () => {
        const { view } = renderView({ title: 'Skills chart' });

        view.getByText('Skills chart');
        view.getByRole('list', { name: 'Skills chart' });
      });

      it('has aria-labelledby on the list element when provided', () => {
        const { view } = renderView({
          'aria-labelledby': 'chart-heading',
        });

        const heading = document.createElement('h2');
        heading.id = 'chart-heading';
        heading.textContent = 'Chart Heading';
        document.body.appendChild(heading);

        view.getByRole('list', { name: 'Chart Heading' });
      });
    });

    describe('Semantic structure', () => {
      describe('Figure and figcaption', () => {
        it('renders a figure element', () => {
          const { view } = renderView();

          view.getByRole('figure');
        });

        it('renders description in figcaption element', () => {
          const { view } = renderView({
            description: 'This chart shows programming language experience',
          });

          const figcaption = view.getByText(
            'This chart shows programming language experience'
          );
          expect(figcaption.tagName.toLowerCase()).toBe('figcaption');
        });

        it('hides figcaption when hideDescription is true', () => {
          const { view } = renderView({
            description: 'Hidden description',
          });

          view.getByText('Hidden description');
        });
      });

      describe('Title', () => {
        it('renders title as string with default h2 and title-xs variant', () => {
          const { view } = renderView({
            title: 'Programming Skills Chart',
          });

          const title = view.getByRole('heading', {
            name: 'Programming Skills Chart',
          });
          expect(title.tagName.toLowerCase()).toBe('h2');
        });

        it('renders title as object with custom heading level', () => {
          const { view } = renderView({
            title: { as: 'h1', title: 'Skills Overview' },
          });

          const title = view.getByRole('heading', { name: 'Skills Overview' });
          expect(title.tagName.toLowerCase()).toBe('h1');
        });

        it('hides title when hideTitle is true', () => {
          const { view } = renderView({
            title: 'Hidden Title',
            hideTitle: true,
          });
          const title = view.getByText('Hidden Title', { hidden: true } as any);
          expect(title).toHaveAttribute('hidden');
          view.getByRole('list', { name: 'Hidden Title' });
        });
      });
    });

    describe('Row-level labeling', () => {
      it('has aria-label on list items with unit', () => {
        const { view } = renderView({ unit: 'XP' });

        view.getByRole('listitem', {
          name: '100 XP in Python',
        });

        view.getByRole('listitem', {
          name: '75 XP in JavaScript',
        });
      });

      it('has aria-label on interactive bars for both button/link and listitem', () => {
        const onClick = jest.fn();
        const { view } = renderView({
          unit: 'XP',
          barValues: [
            createInteractiveBar({
              yLabel: 'Python',
              seriesOneValue: 100,
              ariaLabel: 'View Python details',
              onClick,
            }),
          ],
        });

        view.getByRole('button', {
          name: 'View Python details',
        });

        view.getByRole('listitem', {
          name: '100 XP in Python',
        });
      });
    });
  });
});

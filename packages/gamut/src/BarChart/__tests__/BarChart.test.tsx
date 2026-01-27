import { TerminalIcon } from '@codecademy/gamut-icons';
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
  href,
  onClick,
}: Pick<BarProps, 'yLabel' | 'seriesOneValue'> & {
  href?: HTMLProps<HTMLAnchorElement>['href'];
  onClick?: ButtonProps['onClick'];
}): BarProps => {
  const base = {
    yLabel,
    seriesOneValue,
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

    it('does not render Select when sortFns is not provided', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
      });

      expect(view.queryByLabelText('Order by:')).not.toBeInTheDocument();
    });

    it('preserves array order by default when sortFns includes none', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['none'],
      });

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Python');
      expect(items[1]).toHaveTextContent('JavaScript');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('sorts by value ascending when numerically is included and selected', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['numerically', 'none'],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'value-asc');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Ruby');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('JavaScript');
    });

    it('sorts by value descending when numerically is included and selected', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['numerically', 'none'],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'value-desc');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('JavaScript');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('sorts by label ascending when alphabetically is included and selected', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['alphabetically', 'none'],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'label-asc');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('JavaScript');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('sorts by label descending when alphabetically is included and selected', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['alphabetically', 'none'],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'label-desc');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Ruby');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('JavaScript');
    });

    it('returns to original order when none is selected', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['numerically', 'none'],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'value-asc');

      let items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Ruby');

      await userEvent.selectOptions(select, 'none');

      items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Python');
      expect(items[1]).toHaveTextContent('JavaScript');
      expect(items[2]).toHaveTextContent('Ruby');
    });

    it('works with custom sort functions', async () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: [
          'none',
          {
            label: 'Reverse Order',
            value: 'reverse',
            sortFn: (bars) => [...bars].reverse(),
          },
        ],
      });

      const select = view.getByLabelText('Order by:');
      await userEvent.selectOptions(select, 'reverse');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Ruby');
      expect(items[1]).toHaveTextContent('JavaScript');
      expect(items[2]).toHaveTextContent('Python');
    });

    it('defaults to first option when none is not included', () => {
      const { view } = renderView({
        barValues: unsortedBarValues,
        sortFns: ['alphabetically'],
      });

      const select = view.getByLabelText('Order by:') as HTMLSelectElement;
      expect(select.value).toBe('label-asc');

      const items = view.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('JavaScript');
      expect(items[1]).toHaveTextContent('Python');
      expect(items[2]).toHaveTextContent('Ruby');
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
      const { view } = renderView({
        barValues: createPythonBar({ onClick }),
        unit: 'XP',
      });

      view.getByRole('button', { name: '100 XP in Python' });
    });

    it('calls onClick when button is clicked', async () => {
      const onClick = jest.fn();
      const { view } = renderView({
        barValues: createPythonBar({ onClick }),
        unit: 'XP',
      });

      const button = view.getByRole('button', {
        name: '100 XP in Python',
      });

      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });

    it('renders an anchor when href is provided', () => {
      const { view } = renderView({
        barValues: createPythonBar({ href: '/python' }),
        unit: 'XP',
      });

      const anchor = view.getByRole('link', { name: '100 XP in Python' });
      expect(anchor).toHaveAttribute('href', '/python');
    });

    it('calls onClick when href and onClick are provided', async () => {
      const onClick = jest.fn();
      const { view } = renderView({
        barValues: createPythonBar({ href: '/python', onClick }),
        unit: 'XP',
      });

      const anchor = view.getByRole('link', {
        name: '100 XP in Python',
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
        view.getByRole('list');
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
            hideDescription: true,
          });

          const figcaption = view.getByText('Hidden description');
          expect(figcaption).toHaveAttribute('hidden');
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
          expect(title.tagName).toBe('h2');
        });

        it('renders title as object with custom heading level', () => {
          const { view } = renderView({
            title: { as: 'h1', title: 'Skills Overview' },
          });

          const title = view.getByRole('heading', { name: 'Skills Overview' });
          expect(title.tagName).toBe('h1');
        });

        it('hides title when hideTitle is true', () => {
          const { view } = renderView({
            title: 'Hidden Title',
            hideTitle: true,
          });
          const title = view.getByText('Hidden Title');
          expect(title).toHaveAttribute('hidden');
        });
      });
    });

    describe('Row-level labeling', () => {
      it('has hidden text in list items with unit for non-interactive bars', () => {
        const { view } = renderView({ unit: 'XP' });

        const listItems = view.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);

        view.getByText('100 XP in ');
        view.getByText('75 XP in ');
      });

      it('has aria-label on interactive bars for button/link and no hidden text in listitem', () => {
        const onClick = jest.fn();
        const { view } = renderView({
          unit: 'XP',
          barValues: [
            createInteractiveBar({
              yLabel: 'Python',
              seriesOneValue: 100,
              onClick,
            }),
          ],
        });

        view.getByRole('button', {
          name: '100 XP in Python',
        });

        const listItem = view.getByRole('listitem');
        const hiddenText = listItem.querySelector(
          '[class*="screenreader"], [style*="position: absolute"]'
        );
        expect(hiddenText).not.toBeInTheDocument();
      });
    });
  });

  describe('Translations', () => {
    it('uses default translations when not provided', () => {
      const { view } = renderView({
        sortFns: ['alphabetically', 'none'],
      });

      expect(view.getByText('Order by:')).toBeInTheDocument();
      expect(view.getByText('None')).toBeInTheDocument();
      expect(view.getByText('Label (A-Z)')).toBeInTheDocument();
    });

    it('uses custom translations when provided', () => {
      const { view } = renderView({
        sortFns: ['alphabetically', 'none'],
        translations: {
          sortLabel: 'Ordenar por:',
          sortOptions: {
            none: 'Ninguno',
            labelAsc: 'Etiqueta (A-Z)',
            labelDesc: 'Etiqueta (Z-A)',
            valueAsc: 'Valor (Bajo-Alto)',
            valueDesc: 'Valor (Alto-Bajo)',
          },
        },
      });

      expect(view.getByText('Ordenar por:')).toBeInTheDocument();
      expect(view.getByText('Ninguno')).toBeInTheDocument();
      expect(view.getByText('Etiqueta (A-Z)')).toBeInTheDocument();
    });

    it('merges partial translations with defaults', () => {
      const { view } = renderView({
        sortFns: ['alphabetically', 'none'],
        translations: {
          sortLabel: 'Sort by:',
        },
      });

      expect(view.getByText('Sort by:')).toBeInTheDocument();
      expect(view.getByText('None')).toBeInTheDocument();
      expect(view.getByText('Label (A-Z)')).toBeInTheDocument();
    });

    it('uses custom locale for number formatting', () => {
      const { view } = renderView({
        barValues: [
          { yLabel: 'Python', seriesOneValue: 1000 },
          { yLabel: 'JavaScript', seriesOneValue: 2000 },
        ],
        translations: {
          locale: 'de-DE',
        },
      });

      const listItems = view.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('Python');
      expect(listItems[1]).toHaveTextContent('JavaScript');
    });

    it('uses custom accessibility translations', () => {
      const { view } = renderView({
        barValues: [
          { yLabel: 'Python', seriesOneValue: 100, seriesTwoValue: 200 },
        ],
        unit: 'XP',
        translations: {
          accessibility: {
            gainedNowAt: 'ganado - ahora en',
            inLabel: 'en',
            inOnly: 'en ',
          },
        },
      });

      const listItem = view.getAllByRole('listitem')[0];
      const hiddenText = listItem.querySelector(
        '[class*="screenreader"], [style*="position: absolute"]'
      );
      expect(hiddenText).toHaveTextContent(/ganado - ahora en/);
    });
  });

  describe('Icons', () => {
    it('renders icons when provided in bar data', () => {
      const barValuesWithIcons: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 100, icon: TerminalIcon },
        { yLabel: 'JavaScript', seriesOneValue: 75 },
      ];

      const { view } = renderView({ barValues: barValuesWithIcons });

      const listItems = view.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);

      const pythonItem = listItems[0];
      const iconInPython = pythonItem.querySelector('svg[role="img"]');
      expect(iconInPython).toBeInTheDocument();

      const javascriptItem = listItems[1];
      const iconInJavascript = javascriptItem.querySelector('svg[role="img"]');
      expect(iconInJavascript).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom textColor to labels', () => {
      const { view } = renderView({
        styleConfig: {
          textColor: 'primary',
        },
      });

      const listItems = view.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('applies custom foregroundBarColor and backgroundBarColor', () => {
      const { view } = renderView({
        styleConfig: {
          foregroundBarColor: 'primary',
          backgroundBarColor: 'text',
        },
      });

      const backgroundBars = view.getAllByTestId('background-bar');
      expect(backgroundBars).toHaveLength(2);
    });

    it('applies custom seriesOneLabel and seriesTwoLabel colors', () => {
      const stackedBarValues: BarProps[] = [
        { yLabel: 'Python', seriesOneValue: 50, seriesTwoValue: 100 },
        { yLabel: 'JavaScript', seriesOneValue: 25, seriesTwoValue: 75 },
      ];

      const { view } = renderView({
        barValues: stackedBarValues,
        styleConfig: {
          seriesOneLabel: 'feedback-error',
          seriesTwoLabel: 'feedback-success',
        },
      });

      const listItems = view.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('uses default styleConfig values when not provided', () => {
      const { view } = renderView();

      const listItems = view.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      const backgroundBars = view.getAllByTestId('background-bar');
      expect(backgroundBars).toHaveLength(2);
    });
  });

  describe('Title Variant', () => {
    it('applies custom variant when provided in title object', () => {
      const { view } = renderView({
        title: {
          as: 'h1',
          title: 'Custom Title',
          variant: 'title-lg',
        },
      });

      const title = view.getByRole('heading', { name: 'Custom Title' });
      expect(title.tagName).toBe('H1');
    });

    it('uses default variant when variant is not provided in title object', () => {
      const { view } = renderView({
        title: {
          as: 'h3',
          title: 'Default Variant Title',
        },
      });

      const title = view.getByRole('heading', {
        name: 'Default Variant Title',
      });
      expect(title.tagName).toBe('H3');
    });

    it('uses default variant when title is a string', () => {
      const { view } = renderView({
        title: 'String Title',
      });

      const title = view.getByRole('heading', { name: 'String Title' });
      expect(title.tagName).toBe('H2');
    });
  });
});

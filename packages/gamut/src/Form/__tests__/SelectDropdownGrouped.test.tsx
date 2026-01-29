import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import {
  groupedOptions,
  groupedOptionsWithIcons,
  groupedOptionsWithTitles,
  openDropdown,
} from '../__fixtures__/utils';
import { SelectDropdown } from '../SelectDropdown';
/** There is a state pollution issue with SelectDropdown and jest which is why these are broken up into their own file.
 *  Ticket to fix: https://skillsoftdev.atlassian.net/browse/GM-1297
 */
jest.mock('@codecademy/gamut-icons', () => ({
  ...jest.requireActual<{}>('@codecademy/gamut-icons'),
  MiniChevronDownIcon: () => (
    <svg>
      <title>Mini Chevron Down Icon</title>
    </svg>
  ),
  ArrowChevronDownIcon: () => (
    <svg>
      <title>Arrow Chevron Down Icon</title>
    </svg>
  ),
  DataTransferVerticalIcon: () => (
    <svg>
      <title>Data Transfer Vertical Icon</title>
    </svg>
  ),
  CalendarIcon: () => (
    <svg>
      <title>Calendar Icon</title>
    </svg>
  ),
  EarthIcon: () => (
    <svg>
      <title>Earth Icon</title>
    </svg>
  ),
}));
const renderView = setupRtl(SelectDropdown, {
  options: groupedOptions,
  name: 'colors',
});

describe('SelectDropdown Grouped Options', () => {
  it('renders grouped options with group labels', async () => {
    const { view } = renderView({ options: groupedOptions });
    await openDropdown(view);
    view.getByText('Fruits');
    view.getByText('Vegetables');
    // Check that options within groups are rendered
    const fruitOptions = ['Apple', 'Banana', 'Orange'];
    const vegetableOptions = ['Carrot', 'Broccoli', 'Spinach'];
    [...fruitOptions, ...vegetableOptions].forEach((option) => {
      view.getByText(option);
    });
  });

  it('allows selection of options from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptions,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('Apple'));
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Apple',
        value: 'apple',
      }),
      expect.objectContaining({
        action: 'select-option',
        option: { label: 'Apple', value: 'apple' },
      })
    );
  });

  it('allows selection of options from different groups', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptions,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('Carrot'));
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Carrot',
        value: 'carrot',
      }),
      expect.objectContaining({
        action: 'select-option',
        option: { label: 'Carrot', value: 'carrot' },
      })
    );
  });

  it('displays the selected value correctly when value is set', () => {
    const { view } = renderView({
      options: groupedOptions,
      value: 'banana',
    });
    view.getByText('Banana');
  });

  it('renders grouped options with icons', async () => {
    const { view } = renderView({ options: groupedOptionsWithIcons });
    await openDropdown(view);
    view.getByText('Data Icons');
    view.getByText('Navigation Icons');
    const iconOptions = [
      'Data Transfer Vertical Icon',
      'Calendar Icon',
      'Earth Icon',
    ];
    iconOptions.forEach((icon) => {
      expect(view.getAllByText(icon)).toHaveLength(2); // title and span
    });
  });

  it('allows selection of options with icons from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptionsWithIcons,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(
        view.getByRole('option', {
          name: /Data Transfer Vertical Icon/,
        })
      );
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Data Transfer Vertical Icon',
        value: 'data-transfer',
        icon: expect.any(Function),
      }),
      expect.objectContaining({
        action: 'select-option',
        option: {
          label: 'Data Transfer Vertical Icon',
          value: 'data-transfer',
          icon: expect.any(Function),
        },
      })
    );
  });

  it('renders grouped options with subtitles', async () => {
    const { view } = renderView({ options: groupedOptionsWithTitles });
    await openDropdown(view);
    view.getByText('Fruits');
    view.getByText('Vegetables');
    const fruitOptionsWithSubtitles = [
      { option: 'Apple', subtitle: 'Red and crunchy' },
      { option: 'Banana', subtitle: 'Yellow and sweet' },
    ];
    const vegetableOptionsWithSubtitles = [
      { option: 'Carrot', subtitle: 'Orange and healthy' },
    ];
    [...fruitOptionsWithSubtitles, ...vegetableOptionsWithSubtitles].forEach(
      ({ option, subtitle }) => {
        view.getByText(option);
        view.getByText(subtitle);
      }
    );
  });

  it('allows selection of options with subtitles from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptionsWithTitles,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('Apple'));
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Apple',
        value: 'apple',
        subtitle: 'Red and crunchy',
      }),
      expect.objectContaining({
        action: 'select-option',
        option: { label: 'Apple', value: 'apple', subtitle: 'Red and crunchy' },
      })
    );
  });

  it('works with multiple selection for grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptions,
      multiple: true,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('Apple'));
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('Carrot'));
    });
    view.getByText('Apple');
    view.getByText('Carrot');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      [
        {
          label: 'Apple',
          value: 'apple',
        },
      ],
      {
        action: 'select-option',
      }
    );
    expect(onChange).toHaveBeenNthCalledWith(
      2,
      [
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Carrot',
          value: 'carrot',
        },
      ],
      {
        action: 'select-option',
      }
    );
  });

  it('handles disabled options in grouped options', async () => {
    const groupedOptionsWithDisabled = [
      {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana', disabled: true },
          { label: 'Orange', value: 'orange' },
        ],
      },
    ];
    const { view } = renderView({ options: groupedOptionsWithDisabled });
    await openDropdown(view);
    const disabledOption = view.getByText('Banana');

    expect(disabledOption.closest('[role="option"]')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});

import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
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

    expect(view.getByText('Fruits')).toBeInTheDocument();
    expect(view.getByText('Vegetables')).toBeInTheDocument();

    // Check that options within groups are rendered
    expect(view.getByText('Apple')).toBeInTheDocument();
    expect(view.getByText('Banana')).toBeInTheDocument();
    expect(view.getByText('Orange')).toBeInTheDocument();
    expect(view.getByText('Carrot')).toBeInTheDocument();
    expect(view.getByText('Broccoli')).toBeInTheDocument();
    expect(view.getByText('Spinach')).toBeInTheDocument();
  });

  it('allows selection of options from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptions,
      onChange,
    });

    await openDropdown(view);

    await act(() => {
      fireEvent.click(view.getByText('Apple'));
      return Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Apple',
        value: 'apple',
      }),
      expect.objectContaining({
        action: 'select-option',
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

    await act(() => {
      fireEvent.click(view.getByText('Carrot'));
      return Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Carrot',
        value: 'carrot',
      }),
      expect.objectContaining({
        action: 'select-option',
      })
    );
  });

  it('displays the selected value correctly when value is set', () => {
    const { view } = renderView({
      options: groupedOptions,
      value: 'banana',
    });

    expect(view.getByText('Banana')).toBeInTheDocument();
  });

  it('renders grouped options with icons', async () => {
    const { view } = renderView({ options: groupedOptionsWithIcons });

    await openDropdown(view);

    expect(view.getByText('Data Icons')).toBeInTheDocument();
    expect(view.getByText('Navigation Icons')).toBeInTheDocument();

    expect(view.getAllByText('Data Transfer Vertical Icon')).toHaveLength(2); // title and span
    expect(view.getAllByText('Calendar Icon')).toHaveLength(2); // title and span
    expect(view.getAllByText('Earth Icon')).toHaveLength(2); // title and span
  });

  it('allows selection of options with icons from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptionsWithIcons,
      onChange,
    });

    await openDropdown(view);

    await act(() => {
      fireEvent.click(
        view.getByRole('option', {
          name: 'Data Transfer Vertical Icon Data Transfer Vertical Icon',
        })
      );
      return Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Data Transfer Vertical Icon',
        value: 'data-transfer',
      }),
      expect.objectContaining({
        action: 'select-option',
      })
    );
  });

  it('renders grouped options with subtitles', async () => {
    const { view } = renderView({ options: groupedOptionsWithTitles });

    await openDropdown(view);

    expect(view.getByText('Fruits')).toBeInTheDocument();
    expect(view.getByText('Vegetables')).toBeInTheDocument();

    expect(view.getByText('Apple')).toBeInTheDocument();
    expect(view.getByText('Red and crunchy')).toBeInTheDocument();
    expect(view.getByText('Banana')).toBeInTheDocument();
    expect(view.getByText('Yellow and sweet')).toBeInTheDocument();
    expect(view.getByText('Carrot')).toBeInTheDocument();
    expect(view.getByText('Orange and healthy')).toBeInTheDocument();
  });

  it('allows selection of options with subtitles from grouped options', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      options: groupedOptionsWithTitles,
      onChange,
    });

    await openDropdown(view);

    await act(() => {
      fireEvent.click(view.getByText('Apple'));
      return Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Apple',
        value: 'apple',
        subtitle: 'Red and crunchy',
      }),
      expect.objectContaining({
        action: 'select-option',
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
    await act(() => {
      fireEvent.click(view.getByText('Apple'));
      return Promise.resolve();
    });

    await openDropdown(view);
    await act(() => {
      fireEvent.click(view.getByText('Carrot'));
      return Promise.resolve();
    });

    expect(view.getByText('Apple')).toBeInTheDocument();
    expect(view.getByText('Carrot')).toBeInTheDocument();

    expect(onChange).toHaveBeenCalledTimes(2);
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
    expect(disabledOption).toBeInTheDocument();
    expect(disabledOption.closest('[role="option"]')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});

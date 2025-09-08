import {
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
} from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react';

import { SelectDropdown } from '../SelectDropdown';

const selectOptions = ['red', 'yellow', 'green'];

const selectOptionsObject = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  teal: 'teal',
  orange: 'orange',
};

const optionsIconsArray = [
  {
    label: 'Data Transfer Vertical Icon',
    value: 'one',
    icon: DataTransferVerticalIcon,
  },
  { label: 'Calendar Icon', value: 'two', icon: CalendarIcon },
  { label: 'Earth Icon', value: 'three', icon: EarthIcon },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

const groupedOptionsWithIcons = [
  {
    label: 'Data Icons',
    options: [
      {
        label: 'Data Transfer Vertical Icon',
        value: 'data-transfer',
        icon: DataTransferVerticalIcon,
      },
      {
        label: 'Calendar Icon',
        value: 'calendar',
        icon: CalendarIcon,
      },
    ],
  },
  {
    label: 'Navigation Icons',
    options: [
      {
        label: 'Earth Icon',
        value: 'earth',
        icon: EarthIcon,
      },
    ],
  },
];

const groupedOptionsWithTitles = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple', subtitle: 'Red and crunchy' },
      { label: 'Banana', value: 'banana', subtitle: 'Yellow and sweet' },
      { label: 'Orange', value: 'orange', subtitle: 'Citrus and juicy' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot', subtitle: 'Orange and healthy' },
      {
        label: 'Broccoli',
        value: 'broccoli',
        subtitle: 'Green and nutritious',
      },
      { label: 'Spinach', value: 'spinach', subtitle: 'Leafy and iron-rich' },
    ],
  },
];

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
  options: selectOptions,
  name: 'colors',
});

const DOWN_ARROW = { keyCode: 40 };

const openDropdown = async (view: ReturnType<typeof renderView>['view']) => {
  await act(() => {
    fireEvent.keyDown(view.getByRole('combobox'), DOWN_ARROW);
    return Promise.resolve();
  });
};

describe('SelectDropdown', () => {
  it('sets the id prop on the select tag', () => {
    const { view } = renderView();

    expect(view.getByRole('combobox')).toHaveAttribute('id', 'colors');
  });

  it.each([
    ['array', selectOptions],
    ['object', selectOptionsObject],
  ])('renders options when options is an %s', async (_, options) => {
    const { view } = renderView({ options });

    await openDropdown(view);

    view.getByText('green');
  });

  it('renders a small dropdown when size is "small"', () => {
    const { view } = renderView({ size: 'small' });
    view.getByTitle('Mini Chevron Down Icon');
  });

  it('renders a medium dropdown when size is "medium"', () => {
    const { view } = renderView({ size: 'medium' });
    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('renders a medium dropdown by default', () => {
    const { view } = renderView();
    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified', async () => {
    const { view } = renderView({ shownOptionsLimit: 4 });

    await openDropdown(view);

    expect(view.getByRole('listbox')).toHaveStyle({ maxHeight: '12rem' });
  });
  it('renders a dropdown with the correct maxHeight when shownOptionsLimit is specified + size is "small"', async () => {
    const { view } = renderView({
      size: 'small',
      shownOptionsLimit: 4,
    });

    await openDropdown(view);

    expect(view.getByRole('listbox')).toHaveStyle({ maxHeight: '8rem' });
  });

  it('renders a dropdown with icons', async () => {
    const { view } = renderView({ options: optionsIconsArray });

    await openDropdown(view);

    optionsIconsArray.forEach((icon) => expect(view.getByTitle(icon.label)));
  });

  it('function passed to onInputChanges is called on input change', async () => {
    const onInputChange = jest.fn();
    const { view } = renderView({ onInputChange });

    await openDropdown(view);

    await act(() => {
      fireEvent.click(view.getByText('red'));
      return Promise.resolve();
    });

    expect(onInputChange).toHaveBeenCalled();
  });

  it('renders selected & multiple items when passed multiple: true', async () => {
    const { view } = renderView({ multiple: true });

    const numSelectedItems = 2;

    const multiple = selectOptions.map(async (opt) => {
      await openDropdown(view);

      const option = await view.findByText(opt);
      await act(() => {
        fireEvent.click(option);
        return Promise.resolve();
      });
    });

    await Promise.all(multiple);

    selectOptions
      .slice(0, numSelectedItems)
      .forEach((value) => view.getByText(value));
  });

  describe('Grouped Options', () => {
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
});

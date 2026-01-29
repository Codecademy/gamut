import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import {
  openDropdown,
  optionsIconsArray,
  optionsWithAbbreviations,
  selectOptions,
  selectOptionsObject,
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
  options: selectOptions,
  name: 'colors',
});

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

  it('displays icon in selected value when option has icon', async () => {
    const { view } = renderView({
      options: optionsIconsArray,
      value: 'one',
    });

    expect(view.getByTitle('Data Transfer Vertical Icon')).toBeInTheDocument();

    const selectedValueContainer = view.getByRole('combobox').closest('div');

    expect(selectedValueContainer).toHaveTextContent(
      'Data Transfer Vertical Icon'
    );
  });

  it('function passed to onInputChanges is called on input change', async () => {
    const onInputChange = jest.fn();
    const { view } = renderView({ onInputChange });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('red'));
    });

    expect(onInputChange).toHaveBeenCalled();
  });

  it('works with multiple selection', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      multiple: true,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('red'));
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('green'));
    });
    view.getByText('red');
    view.getByText('green');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      [
        {
          label: 'red',
          value: 'red',
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
          label: 'red',
          value: 'red',
        },
        {
          label: 'green',
          value: 'green',
        },
      ],
      {
        action: 'select-option',
      }
    );
  });

  it('displays abbreviations in multiselect mode', async () => {
    const onChange = jest.fn();
    const { view } = renderView({
      multiple: true,
      options: optionsWithAbbreviations,
      onChange,
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('United States of America'));
    });
    await openDropdown(view);
    await act(async () => {
      await userEvent.click(view.getByText('United Kingdom'));
    });
    view.getByText('USA');
    view.getByText('UK');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      [
        {
          label: 'United States of America',
          value: 'usa',
          abbreviation: 'USA',
          key: 'usa',
          size: undefined,
        },
      ],
      {
        action: 'select-option',
        option: undefined,
      }
    );
    expect(onChange).toHaveBeenNthCalledWith(
      2,
      [
        {
          label: 'United States of America',
          value: 'usa',
          abbreviation: 'USA',
          key: 'usa',
          size: undefined,
        },
        {
          label: 'United Kingdom',
          value: 'uk',
          abbreviation: 'UK',
          key: 'uk',
          size: undefined,
        },
      ],
      {
        action: 'select-option',
        option: undefined,
      }
    );
  });

  describe('inputProps functionality', () => {
    it('should apply combobox and hidden props in non-searchable mode (default)', () => {
      const { view } = renderView({
        isSearchable: false,
        inputProps: {
          hidden: {
            'data-form-field': 'test-field',
            'data-hidden-attr': 'hidden-value',
          },
          combobox: {
            'data-testid': 'non-searchable-combobox',
            'data-custom-attr': 'custom-value',
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      expect(comboboxInput).toHaveAttribute(
        'data-testid',
        'non-searchable-combobox'
      );
      expect(comboboxInput).toHaveAttribute('data-custom-attr', 'custom-value');

      const hiddenInput = view.container.querySelector(
        'input[type="hidden"][data-form-field="test-field"]'
      );

      expect(hiddenInput).toHaveAttribute('data-form-field', 'test-field');
      expect(hiddenInput).toHaveAttribute('data-hidden-attr', 'hidden-value');
    });

    it('should apply combobox and hidden props in searchable mode', () => {
      const { view } = renderView({
        isSearchable: true,
        inputProps: {
          hidden: {
            'data-form-field': 'searchable-field',
            'data-hidden-attr': 'searchable-hidden-value',
          },
          combobox: {
            'data-testid': 'searchable-combobox',
            'data-custom-attr': 'searchable-custom-value',
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      expect(comboboxInput).toHaveAttribute(
        'data-testid',
        'searchable-combobox'
      );
      expect(comboboxInput).toHaveAttribute(
        'data-custom-attr',
        'searchable-custom-value'
      );

      const hiddenInput = view.container.querySelector(
        'input[type="hidden"][data-form-field="searchable-field"]'
      );

      expect(hiddenInput).toHaveAttribute(
        'data-form-field',
        'searchable-field'
      );
      expect(hiddenInput).toHaveAttribute(
        'data-hidden-attr',
        'searchable-hidden-value'
      );
    });

    it('should work with only combobox props (no hidden props)', () => {
      const { view } = renderView({
        isSearchable: false,
        inputProps: {
          combobox: {
            'data-testid': 'combobox-only',
            'data-aria-label': 'Custom combobox label',
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      expect(comboboxInput).toHaveAttribute('data-testid', 'combobox-only');
      expect(comboboxInput).toHaveAttribute(
        'data-aria-label',
        'Custom combobox label'
      );
    });

    it('should work with only hidden props (no combobox props)', () => {
      const { view } = renderView({
        isSearchable: true,
        inputProps: {
          hidden: {
            'data-form-field': 'hidden-only',
            'data-validation': 'required',
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      // Should not have any combobox-specific attributes
      expect(comboboxInput).not.toHaveAttribute('data-form-field');
      expect(comboboxInput).not.toHaveAttribute('data-validation');

      const hiddenInput = view.container.querySelector(
        'input[type="hidden"][data-form-field="hidden-only"]'
      );

      expect(hiddenInput).toHaveAttribute('data-form-field', 'hidden-only');
      expect(hiddenInput).toHaveAttribute('data-validation', 'required');
    });

    it('should handle multiple data attributes in combobox props', () => {
      const { view } = renderView({
        isSearchable: false,
        inputProps: {
          combobox: {
            'data-testid': 'multi-attr-test',
            'data-cy': 'combobox-element',
            'data-analytics': 'user-interaction',
            'data-tracking': 'form-field',
            'aria-describedby': 'help-text',
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      expect(comboboxInput).toHaveAttribute('data-testid', 'multi-attr-test');
      expect(comboboxInput).toHaveAttribute('data-cy', 'combobox-element');
      expect(comboboxInput).toHaveAttribute(
        'data-analytics',
        'user-interaction'
      );
      expect(comboboxInput).toHaveAttribute('data-tracking', 'form-field');
      expect(comboboxInput).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('should handle boolean and number values in combobox props', () => {
      const { view } = renderView({
        isSearchable: true,
        inputProps: {
          combobox: {
            'data-testid': 'type-test',
            'data-boolean-true': true,
            'data-boolean-false': false,
            'data-number': 42,
            'data-zero': 0,
          },
        },
      });
      const comboboxInput = view.getByRole('combobox');

      expect(comboboxInput).toHaveAttribute('data-testid', 'type-test');
      expect(comboboxInput).toHaveAttribute('data-boolean-true', 'true');
      expect(comboboxInput).toHaveAttribute('data-boolean-false', 'false');
      expect(comboboxInput).toHaveAttribute('data-number', '42');
      expect(comboboxInput).toHaveAttribute('data-zero', '0');
    });
  });
});

import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act, useState } from 'react';

import {
  openDropdown,
  optionsIconsArray,
  optionsWithAbbreviations,
  selectOptions,
  selectOptionsObject,
} from '../__fixtures__/utils';
import { SelectDropdown } from '../SelectDropdown';

const ToggleValidationMessageHarness = () => {
  const [hasCustomMessage, setHasCustomMessage] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setHasCustomMessage(false)}>
        disable custom message
      </button>
      <SelectDropdown
        isSearchable
        name="fruit"
        options={[]}
        validationMessage={
          hasCustomMessage ? 'Enter at least 3 characters.' : undefined
        }
      />
    </>
  );
};

const CreatableMultiHarness = () => {
  const [options, setOptions] = useState(['Apple', 'Banana']);

  return (
    <SelectDropdown
      isCreatable
      multiple
      name="creatable-multi"
      options={options}
      onCreateOption={(inputValue) =>
        setOptions((prev) => [...prev, inputValue])
      }
    />
  );
};

const ControlledCreatableMultiHarness = ({
  onChange,
  onCreateOption,
}: {
  onChange?: jest.Mock;
  onCreateOption?: jest.Mock;
}) => {
  const [options, setOptions] = useState(['Apple', 'Banana']);
  const [value, setValue] = useState<string[]>(['Apple']);

  return (
    <SelectDropdown
      isCreatable
      multiple
      name="controlled-creatable-multi"
      options={options}
      value={value}
      onChange={(selected, meta) => {
        setValue(selected.map((option) => option.value));

        if (meta.action === 'create-option' && meta.option) {
          setOptions((prev) => [...prev, meta.option.value]);
        }

        onChange?.(selected, meta);
      }}
      onCreateOption={onCreateOption}
    />
  );
};

const renderToggleValidationMessage = setupRtl(
  ToggleValidationMessageHarness,
  {}
);
const renderCreatableMulti = setupRtl(CreatableMultiHarness, {});
const renderControlledCreatableMulti = setupRtl(
  ControlledCreatableMultiHarness,
  {}
);

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
  describe('default', () => {
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

      expect(
        view.getByTitle('Data Transfer Vertical Icon')
      ).toBeInTheDocument();
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
        expect(comboboxInput).toHaveAttribute(
          'data-custom-attr',
          'custom-value'
        );

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

    describe('validationMessage', () => {
      afterEach(() => {
        jest.useRealTimers();
      });

      it('renders custom node text in place of the default "No options" state', async () => {
        jest.useFakeTimers();

        const { view } = renderView({
          options: [],
          validationMessage: 'No fruits available',
        });

        await openDropdown(view);

        act(() => {
          jest.advanceTimersByTime(500);
        });

        // Also announced via a standalone live region for screen readers.
        expect(view.getAllByText('No fruits available')).toHaveLength(2);
        expect(view.queryByText('No options')).not.toBeInTheDocument();
      });

      describe('screen reader announcement', () => {
        it('announces the validation message via a standalone live region when there are no options', async () => {
          jest.useFakeTimers();

          const { view } = renderView({
            options: [],
            validationMessage: 'Enter at least 3 characters.',
          });

          await openDropdown(view);

          act(() => {
            jest.advanceTimersByTime(500);
          });

          // Only one status region should have announcement text - react-select's
          // own internal live region stays silent when there are no options, so a
          // duplicate, non-empty announcement here would mean it started firing too.
          const statusRegions = view.getAllByRole('status');
          const announced = statusRegions.filter(
            (region) => region.textContent === 'Enter at least 3 characters.'
          );
          expect(announced).toHaveLength(1);
        });

        it('stays silent once options are present', async () => {
          jest.useFakeTimers();

          const { view } = renderView();

          await openDropdown(view);

          act(() => {
            jest.advanceTimersByTime(500);
          });

          expect(view.getByRole('status', { name: '' })).toBeInTheDocument();
        });

        it('announces react-select\'s default "No options" text when no validationMessage is set', async () => {
          jest.useFakeTimers();

          const { view } = renderView({ options: [] });

          await openDropdown(view);
          view.getByText('No options');

          act(() => {
            jest.advanceTimersByTime(500);
          });

          const statusRegions = view.getAllByRole('status');
          const announced = statusRegions.filter(
            (region) => region.textContent === 'No options'
          );
          expect(announced).toHaveLength(1);
        });

        it('falls back to announcing the default "No options" text if validationMessage is removed', async () => {
          jest.useFakeTimers();

          const { view } = renderToggleValidationMessage();

          await openDropdown(view);

          act(() => {
            jest.advanceTimersByTime(500);
          });

          expect(
            view
              .getAllByRole('status')
              .some(
                (region) =>
                  region.textContent === 'Enter at least 3 characters.'
              )
          ).toBe(true);

          act(() => {
            fireEvent.click(
              view.getByRole('button', { name: 'disable custom message' })
            );
          });
          act(() => {
            jest.advanceTimersByTime(500);
          });

          expect(
            view
              .getAllByRole('status')
              .some((region) => region.textContent === 'No options')
          ).toBe(true);
        });

        it('announces the validation message when react-select filters a non-empty options list down to zero matches', async () => {
          jest.useFakeTimers();

          const { view } = renderView({
            isSearchable: true,
            options: selectOptions,
            validationMessage: 'Enter at least 3 characters.',
          });

          await openDropdown(view);

          act(() => {
            fireEvent.change(view.getByRole('combobox'), {
              target: { value: 'zzz' },
            });
          });

          act(() => {
            jest.advanceTimersByTime(500);
          });

          const statusRegions = view.getAllByRole('status');
          const announced = statusRegions.filter(
            (region) => region.textContent === 'Enter at least 3 characters.'
          );
          expect(announced).toHaveLength(1);
        });

        it('re-announces the same message after the field is left and revisited', async () => {
          jest.useFakeTimers();

          const { view } = renderView({
            isSearchable: true,
            options: selectOptions,
            validationMessage: 'Enter at least 3 characters.',
          });

          const getAnnouncedStatusRegions = () =>
            view
              .getAllByRole('status')
              .filter(
                (region) =>
                  region.textContent === 'Enter at least 3 characters.'
              );

          await openDropdown(view);
          act(() => {
            fireEvent.change(view.getByRole('combobox'), {
              target: { value: 'zz' },
            });
          });
          act(() => {
            jest.advanceTimersByTime(500);
          });

          expect(getAnnouncedStatusRegions()).toHaveLength(1);

          // Leaving the field clears the announcement immediately (not
          // debounced), so a later identical announcement still produces a
          // real DOM mutation for AT live-region behavior to pick up on.
          act(() => {
            fireEvent.focusOut(view.getByRole('combobox'));
          });

          expect(getAnnouncedStatusRegions()).toHaveLength(0);

          await openDropdown(view);
          act(() => {
            fireEvent.change(view.getByRole('combobox'), {
              target: { value: 'zz' },
            });
          });
          act(() => {
            jest.advanceTimersByTime(500);
          });

          expect(getAnnouncedStatusRegions()).toHaveLength(1);
        });

        it('remounts a fresh live-region node for each new announcement, even with different text', async () => {
          jest.useFakeTimers();

          const { view } = renderView({
            isSearchable: true,
            options: ['Apple', 'Banana', 'Cherry'],
            validationMessage: ({ inputValue }: { inputValue: string }) =>
              inputValue ? `${inputValue} is a fruit` : 'No matching fruit',
          });

          const getAnnouncedStatusRegions = (text: string) =>
            view
              .getAllByRole('status')
              .filter((region) => region.textContent === text);

          await openDropdown(view);
          act(() => {
            fireEvent.change(view.getByRole('combobox'), {
              target: { value: 'd' },
            });
          });
          act(() => {
            jest.advanceTimersByTime(500);
          });
          const [firstAnnouncement] = getAnnouncedStatusRegions('d is a fruit');
          expect(firstAnnouncement).toBeInTheDocument();

          act(() => {
            fireEvent.focusOut(view.getByRole('combobox'));
          });

          await openDropdown(view);
          act(() => {
            fireEvent.change(view.getByRole('combobox'), {
              target: { value: 'z' },
            });
          });
          act(() => {
            jest.advanceTimersByTime(500);
          });

          const [secondAnnouncement] =
            getAnnouncedStatusRegions('z is a fruit');
          expect(secondAnnouncement).toBeInTheDocument();
          // Safari/VoiceOver can silently drop a live region's second update
          // when it's just a text mutation on the same node - each new
          // announcement must be a genuinely new DOM element.
          expect(secondAnnouncement).not.toBe(firstAnnouncement);
        });
      });
    });
  });

  describe('isCreatable', () => {
    it('shows the "Add" row when input does not match any existing option', async () => {
      const { view } = renderView({ isCreatable: true });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'purple');
      });

      expect(view.getByText('Add "purple"')).toBeInTheDocument();
    });

    it('does not show the "Add" row when input matches an existing option', async () => {
      const { view } = renderView({ isCreatable: true });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'red');
      });

      expect(view.queryByText('Add "red"')).not.toBeInTheDocument();
    });

    it('fires onCreateOption with the typed value when the "Add" row is selected', async () => {
      const onCreateOption = jest.fn();
      const { view } = renderView({ isCreatable: true, onCreateOption });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'purple');
      });

      await act(async () => {
        await userEvent.click(view.getByText('Add "purple"'));
      });

      expect(onCreateOption).toHaveBeenCalledWith('purple');
    });

    it('fires onChange with create-option when the "Add" row is selected in multi mode', async () => {
      const onChange = jest.fn();
      const { view } = renderView({
        isCreatable: true,
        multiple: true,
        onChange,
      });

      await openDropdown(view);
      await act(async () => {
        await userEvent.click(view.getByText('red'));
      });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'purple');
      });

      await act(async () => {
        await userEvent.click(view.getByText('Add "purple"'));
      });

      expect(onChange).toHaveBeenLastCalledWith(
        [
          { label: 'red', value: 'red' },
          { label: 'purple', value: 'purple', __isNew__: true },
        ],
        expect.objectContaining({
          action: 'create-option',
          option: expect.objectContaining({ value: 'purple' }),
        })
      );
    });

    it('respects a custom formatCreateLabel', async () => {
      const { view } = renderView({
        isCreatable: true,
        formatCreateLabel: (v: string) => `Create tag: "${v}"`,
      });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'purple');
      });

      expect(view.getByText('Create tag: "purple"')).toBeInTheDocument();
    });

    it('hides the "Add" row when isValidNewOption returns false', async () => {
      const { view } = renderView({
        isCreatable: true,
        isValidNewOption: () => false,
      });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'anything');
      });

      expect(view.queryByText('Add "anything"')).not.toBeInTheDocument();
    });

    it('places the "Add" row first when createOptionPosition is "first"', async () => {
      const { view } = renderView({
        isCreatable: true,
        createOptionPosition: 'first',
      });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'e');
      });

      const optionLabels = view
        .getAllByRole('option')
        .map((o) => o.textContent);

      expect(optionLabels[0]).toBe('Add "e"');
    });

    it('places the "Add" row last by default', async () => {
      const { view } = renderView({ isCreatable: true });

      await act(async () => {
        await userEvent.type(view.getByRole('combobox'), 'e');
      });

      const optionLabels = view
        .getAllByRole('option')
        .map((o) => o.textContent);

      expect(optionLabels[optionLabels.length - 1]).toBe('Add "e"');
    });

    it('clears the typed text when the input blurs', async () => {
      const { view } = renderView({ isCreatable: true });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'pur');
      });

      await act(async () => {
        fireEvent.focusOut(combobox);
      });

      expect(combobox).toHaveValue('');
    });

    it('forwards onInputChange to the consumer when the input blurs', async () => {
      const onInputChange = jest.fn();
      const { view } = renderView({ isCreatable: true, onInputChange });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'pur');
      });

      onInputChange.mockClear();

      await act(async () => {
        fireEvent.focusOut(combobox);
      });

      expect(onInputChange).toHaveBeenCalledWith('', {
        action: 'input-blur',
        prevInputValue: 'pur',
      });
    });

    it('clears the typed text after an option is created', async () => {
      const { view } = renderView({ isCreatable: true });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'purple');
      });

      await act(async () => {
        await userEvent.click(view.getByText('Add "purple"'));
      });

      expect(combobox).toHaveValue('');
    });

    it('keeps existing multi selections when a new option is created', async () => {
      const { view } = renderCreatableMulti();

      await openDropdown(view);
      await act(async () => {
        await userEvent.click(view.getByText('Apple'));
      });

      await openDropdown(view);
      await act(async () => {
        await userEvent.click(view.getByText('Banana'));
      });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'Cherry');
      });

      await act(async () => {
        await userEvent.click(view.getByText('Add "Cherry"'));
      });

      expect(view.getByText('Apple')).toBeInTheDocument();
      expect(view.getByText('Banana')).toBeInTheDocument();
      expect(view.getByText('Cherry')).toBeInTheDocument();
    });

    it('keeps controlled multi selections when a new option is created', async () => {
      const onChange = jest.fn();
      const { view } = renderControlledCreatableMulti({ onChange });

      await openDropdown(view);
      await act(async () => {
        await userEvent.click(view.getByText('Banana'));
      });

      const combobox = view.getByRole('combobox');

      await act(async () => {
        await userEvent.type(combobox, 'Cherry');
      });

      await act(async () => {
        await userEvent.click(view.getByText('Add "Cherry"'));
      });

      expect(view.getByText('Apple')).toBeInTheDocument();
      expect(view.getByText('Banana')).toBeInTheDocument();
      expect(view.getByText('Cherry')).toBeInTheDocument();

      expect(onChange).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ value: 'Apple' }),
          expect.objectContaining({ value: 'Banana' }),
          expect.objectContaining({ value: 'Cherry' }),
        ]),
        expect.objectContaining({ action: 'create-option' })
      );
    });

    describe('validationMessage', () => {
      it('supports a function that receives the current input value', async () => {
        const { view } = renderView({
          isCreatable: true,
          isValidNewOption: () => false,
          options: [],
          validationMessage: ({ inputValue }: { inputValue: string }) =>
            `No match for "${inputValue}"`,
        });

        await act(async () => {
          await userEvent.type(view.getByRole('combobox'), 'kiwi');
        });

        expect(view.getByText('No match for "kiwi"')).toBeInTheDocument();
      });
    });
  });
});

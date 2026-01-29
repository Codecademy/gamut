import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queryByAttribute } from '@testing-library/dom';
import { act } from '@testing-library/react';

import {
  stubCheckboxField,
  stubFileField,
  stubHiddenField,
  stubRadioGroupField,
  stubSelectField,
  stubSweetContainerField,
  stubTextareaField,
  stubTextField,
} from '../../__tests__/stubs';
import { GridFormInputGroupTestComponent } from '../__fixtures__/renderers';

const getById = queryByAttribute.bind(null, 'id');
const renderView = setupRtl(GridFormInputGroupTestComponent, {
  setValue: jest.fn(),
  register: jest.fn().mockReturnValue({
    onChange: jest.fn(),
  }),
});

describe('GridFormInputGroup', () => {
  it('renders error text when an error exists', () => {
    const error = 'Oh no!';
    const { view } = renderView({ field: stubCheckboxField, error });
    view.getByText(error);
  });

  it('renders error text when an custom error exists', () => {
    const error = 'Oh no!';
    const { view } = renderView({
      field: { ...stubCheckboxField, customError: error },
    });
    view.getByText(error);
  });

  it('renders a checkbox input when the field type is checkbox', () => {
    const { view } = renderView({
      field: { ...stubCheckboxField, id: 'mycoolid' },
    });
    view.getByRole('checkbox');
  });

  it('renders a custom input when the field type is custom', () => {
    const text = 'Hello, world!';
    const { view } = renderView({
      field: {
        render: () => text,
        name: 'stub-custom',
        size: 6,
        type: 'custom',
      },
    });
    view.getByText(text);
  });

  it('renders a radio group when the field type is radio-group', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid' },
    });

    expect(view.getAllByRole('radio')).toHaveLength(2);

    view.getByRole('radiogroup');
  });

  it('renders a select when the field type is select', () => {
    const { view } = renderView({
      field: { ...stubSelectField, id: 'mycoolid' },
    });
    view.getByRole('combobox');
  });

  it('renders a text input when the field type is text', () => {
    const { view } = renderView({
      field: { ...stubTextField, id: 'mycoolid' },
    });
    view.getByRole('textbox');
  });

  it('renders a file input when the field type is file', () => {
    const { view } = renderView({
      field: { ...stubFileField, id: 'mycoolid' },
    });

    expect(getById(view.container, 'mycoolid')).toHaveAttribute('type', 'file');
  });

  it('renders a textarea when the field type is textarea', () => {
    const { view } = renderView({
      field: { ...stubTextareaField, id: 'mycoolid' },
    });

    expect(view.getByRole('textbox')).toContainHTML('textarea');
  });

  it('invokes onUpdate when the field type is text and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';
    const { view } = renderView({
      field: { ...stubTextField, onUpdate: onUpdateSpy },
    });
    const input = view.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: newVal } });
    });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is textarea and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';
    const { view } = renderView({
      field: { ...stubTextareaField, onUpdate: onUpdateSpy },
    });
    const input = view.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: newVal } });
    });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is select and it gets changed', async () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'bbb';
    const { view } = renderView({
      field: { ...stubSelectField, onUpdate: onUpdateSpy },
    });
    const select = view.getByRole('combobox');
    act(() => {
      fireEvent.change(select, { target: { value: newVal } });
    });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is checkbox and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = true;
    const { view } = renderView({
      field: { ...stubCheckboxField, onUpdate: onUpdateSpy },
    });
    const checkbox = view.getByRole('checkbox');
    act(() => {
      fireEvent.click(checkbox);
    });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is file and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = ['I swear this is a file'];
    const { view } = renderView({
      field: { ...stubFileField, onUpdate: onUpdateSpy },
    });
    const input = view.getByLabelText('Stub File (optional)');
    act(() => {
      fireEvent.change(input, { target: { files: newVal } });
    });

    expect(view.container).toContainHTML('Column');
    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('sets aria-live to assertive if isFirstError flag is on', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: true,
    });
    const error = view.getByRole('alert');

    expect(error).toHaveAttribute('aria-live', 'assertive');
  });

  it('sets aria-live to off if isFirstError flag is off', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: false,
    });
    const error = view.getByRole('status');
    view.container.getElementsByClassName('css-d7900z-Column e1y0e4q30');

    expect(error).toHaveAttribute('aria-live', 'off');
  });

  it('creates column for inputs', () => {
    const { view } = renderView({
      field: { ...stubTextField },
    });

    expect(view.container).toContainHTML('Column');
  });

  it('does not create a column for sweet container inputs', () => {
    const { view } = renderView({
      field: { ...stubSweetContainerField },
    });

    expect(view.container).not.toContainHTML('Column');
  });

  it('does not create a column for hidden inputs', () => {
    const { view } = renderView({
      field: { ...stubHiddenField },
    });

    expect(view.container).not.toContainHTML('Column');
  });
});

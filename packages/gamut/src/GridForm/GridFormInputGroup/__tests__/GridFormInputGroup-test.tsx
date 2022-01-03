import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { FormContext } from '../../__fixtures__/helpers';
import {
  stubCheckboxField,
  stubFileField,
  stubRadioGroupField,
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../../__tests__/stubs';
import { GridFormInputGroup, GridFormInputGroupProps } from '..';

type GridFormInputGroupTestComponentProps = GridFormInputGroupProps & {
  mode?: 'onSubmit' | 'onChange';
};

const GridFormInputGroupTestComponent: React.FC<GridFormInputGroupTestComponentProps> = ({
  field,
  mode = 'onSubmit',
  ...rest
}) => {
  return (
    <FormContext mode={mode}>
      <GridFormInputGroup field={field} {...rest} />
    </FormContext>
  );
};

const renderView = setupRtl(GridFormInputGroupTestComponent, {
  setValue: jest.fn(),
  register: jest.fn(),
});

describe('GridFormInputGroup', () => {
  it('renders error text when an error exists', () => {
    const error = 'Oh no!';

    const { view } = renderView({ field: stubCheckboxField, error });

    expect(view.baseElement.textContent).toContain(error);
  });
  it('renders error text when an custom error exists', () => {
    const error = 'Oh no!';

    const { view } = renderView({
      field: { ...stubCheckboxField, customError: error },
    });

    expect(view.baseElement.textContent).toContain(error);
  });

  it('renders a checkbox input when the field type is checkbox', () => {
    const { view } = renderView({
      field: { ...stubCheckboxField, id: 'mycoolid' },
    });

    expect(view.getByRole('checkbox')).toHaveAttribute('id', 'mycoolid');
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

    expect(view.baseElement.textContent).toEqual(text);
  });

  it('renders a radio group when the field type is radio-group', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid' },
    });

    expect(view.getAllByRole('radio')).toHaveLength(2);
    expect(view.getAllByRole('radio')[0]).toHaveAttribute(
      'id',
      'stub-radio-group-0-mycoolid'
    );
  });

  it('renders a select when the field type is select', () => {
    const { view } = renderView({
      field: { ...stubSelectField, id: 'mycoolid' },
    });

    expect(view.getByRole('combobox')).toHaveAttribute('id', 'mycoolid');
  });

  it('renders a text input when the field type is text', () => {
    const { view } = renderView({
      field: { ...stubTextField, id: 'mycoolid' },
    });

    expect(view.getByRole('textbox')).toHaveAttribute('id', 'mycoolid');
  });

  it('renders a file input when the field type is file', () => {
    const { view } = renderView({
      field: { ...stubFileField, id: 'mycoolid' },
    });

    expect(view.container.querySelector('input[type=file]')).toHaveAttribute(
      'id',
      'mycoolid'
    );
  });

  it('renders a textarea when the field type is textarea', () => {
    const { view } = renderView({
      field: { ...stubTextareaField, id: 'mycoolid' },
    });

    expect(view.getByRole('textbox')).toHaveAttribute('id', 'mycoolid');
  });

  it('invokes onUpdate when the field type is text and it gets changed', () => {
    const onUpdate = jest.fn();
    const newValue = 'foo';

    const { view } = renderView({
      field: { ...stubTextField, onUpdate },
    });

    userEvent.type(view.getByRole('textbox'), newValue);

    expect(onUpdate).toHaveBeenCalledWith(newValue);
  });

  it('invokes onUpdate when the field type is textarea and it gets changed', () => {
    const onUpdate = jest.fn();
    const newValue = 'foo';

    const { view } = renderView({
      field: { ...stubTextareaField, onUpdate },
    });

    userEvent.type(view.getByRole('textbox'), newValue);

    expect(onUpdate).toHaveBeenCalledWith(newValue);
  });

  it('invokes onUpdate when the field type is select and it gets changed', () => {
    const onUpdate = jest.fn();
    const newValue = 'bbb';

    const { view } = renderView({
      field: { ...stubSelectField, onUpdate },
    });

    userEvent.selectOptions(view.getByRole('combobox'), newValue);

    expect(onUpdate).toHaveBeenCalledWith(newValue);
  });

  it('invokes onUpdate when the field type is checkbox and it gets changed', () => {
    const onUpdate = jest.fn();
    const newValue = true;

    const { view } = renderView({
      field: { ...stubCheckboxField, onUpdate },
    });

    userEvent.click(view.getByRole('checkbox'));

    expect(onUpdate).toHaveBeenCalledWith(newValue);
  });

  it('invokes onUpdate when the field type is file and it gets changed', () => {
    const onUpdate = jest.fn();
    const newValue = new File([], 'filename.txt');

    const { view } = renderView({
      field: { ...stubFileField, onUpdate },
    });

    userEvent.upload(
      view.container.querySelector('input[type=file]')!,
      newValue
    );

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        0: expect.objectContaining(newValue),
      })
    );
  });

  it('sets aria-live to assertive if isFirstError flag is on', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: true,
    });

    expect(view.container.querySelector('[aria-live]')).toHaveAttribute(
      'aria-live',
      'assertive'
    );
  });

  it('sets aria-live to off if isFirstError flag is off', () => {
    const { view } = renderView({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: false,
    });

    expect(view.container.querySelector('[aria-live]')).toHaveAttribute(
      'aria-live',
      'off'
    );
  });
});

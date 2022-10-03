import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { act } from 'react-dom/test-utils';

import {
  Checkbox,
  ConnectedForm,
  GenericChildrenType,
  Input,
  useDebouncedField,
  useFormState,
} from '../..';

const mockedSetValue = jest.fn();

jest.mock('react-hook-form', () => {
  const original = jest.requireActual('react-hook-form');

  return {
    ...original,
    useFormContext: () => {
      return {
        ...original.useFormContext(),
        setValue: mockedSetValue,
      };
    },
  };
});

const mockInputKey = 'final-fantasy-vii';
const mockDefaultValue = 'is your tv screen big enough?';
const mockChangeValue =
  'A story of war and friendship. A story of love that can never be.';
const mockChangeKey = 'remake-intergrade';
const mockCheckboxKey = 'episode-inter-mission';

const FormWrapper: React.FC<GenericChildrenType> = ({ children }) => (
  <ConnectedForm
    onSubmit={() => null}
    defaultValues={{
      [mockInputKey]: mockDefaultValue,
      [mockChangeKey]:
        'Final Fantasy VII Remake is a 2020 action role-playing game developed and published by Square Enix.',
      [mockCheckboxKey]: false,
    }}
  >
    {children}
  </ConnectedForm>
);

const TestTextInput: React.FC<{ shouldDirtyOnChange?: boolean }> = ({
  shouldDirtyOnChange,
}) => {
  const { onBlur, onChange, value } = useDebouncedField({
    name: mockInputKey,
    watchUpdateKeyName: mockChangeKey,
    type: 'text',
    shouldDirtyOnChange,
  });
  const { reset } = useFormState();

  const contrivedOnClick = () => {
    reset({
      [mockChangeKey]:
        'It is the first in a planned trilogy of games remaking the 1997 PlayStation game Final Fantasy VII. Set in the dystopian cyberpunk metropolis of Midgar, players control mercenary Cloud Strife.',
      [mockInputKey]: mockChangeValue,
    });
  };

  return (
    <>
      <Input
        name={mockInputKey}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        htmlFor={mockInputKey}
      />
      <button type="button" onClick={contrivedOnClick}>
        Click Me
      </button>
    </>
  );
};

const TestCheckboxInput: React.FC = () => {
  const { onBlur, onChange, value } = useDebouncedField({
    name: mockCheckboxKey,
    type: 'checkbox',
  });

  return (
    <Checkbox
      onChange={onChange}
      onBlur={onBlur}
      checked={Boolean(value)}
      label="Checkbox"
      htmlFor={mockCheckboxKey}
    />
  );
};

const renderView = setupRtl(TestTextInput).options({ wrapper: FormWrapper });
const renderCheckboxView = setupRtl(TestCheckboxInput).options({
  wrapper: FormWrapper,
});

describe('ConnectedForm - useDebouncedField', () => {
  it('should properly receive the default value', () => {
    const { view } = renderView();

    const input = view.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual(mockDefaultValue);
  });

  it('should allow users to change the value', async () => {
    const { view } = renderView();
    const input = view.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: mockChangeValue } });

    expect(input.value).toEqual(mockChangeValue);
  });

  it("should ONLY update the input's value on the form on blur of input", async () => {
    const { view } = renderView({ shouldDirtyOnChange: false });

    const input = view.getByRole('textbox') as HTMLInputElement;

    input.focus();
    expect(mockedSetValue).toHaveBeenCalledTimes(0);
    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
      fireEvent.change(input, { target: { value: 'ti' } });
      fireEvent.change(input, { target: { value: 'tif' } });
      fireEvent.change(input, { target: { value: 'tifa' } });
    });

    // Form has been dirtied by changing input
    input.blur();
    // Now it has finally been called to update the data
    expect(mockedSetValue).toHaveBeenCalledTimes(1);
    expect(mockedSetValue).lastCalledWith(mockInputKey, 'tifa', {
      shouldDirty: true,
    });
  });

  it("doesn't call the dirty function on change if shouldDirtyOnChange is false", async () => {
    const { view } = renderView();

    const input = view.getByRole('textbox') as HTMLInputElement;
    input.focus();
    expect(mockedSetValue).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.change(input, { target: { value: 't' } });
      fireEvent.change(input, { target: { value: 'ti' } });
      fireEvent.change(input, { target: { value: 'tif' } });
      fireEvent.change(input, { target: { value: 'tifa' } });
    });
    // Form has NOT been dirtied by changing input
    expect(mockedSetValue).toHaveBeenCalledTimes(0);

    input.blur();
    expect(mockedSetValue).toHaveBeenCalledTimes(1);
    expect(mockedSetValue).lastCalledWith(mockInputKey, 'tifa', {
      shouldDirty: true,
    });
  });

  it('should update the "initial" value of the input based on a change to the `watchUpdateKeyName` value', async () => {
    const { view } = renderView();
    const input = view.getByRole('textbox') as HTMLInputElement;
    const changeButton = view.getByRole('button');

    expect(input.value).toEqual(mockDefaultValue);

    await act(async () => {
      fireEvent.click(changeButton);
    });

    expect(input.value).toEqual(mockChangeValue);
  });

  it('should allow the form to be re-dirtied after submission', async () => {
    const { view } = renderView({ shouldDirtyOnChange: true });

    const input = view.getByRole('textbox') as HTMLInputElement;
    const changeButton = view.getByRole('button');

    input.focus();
    expect(mockedSetValue).toHaveBeenCalledTimes(0);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'tifa' } });
    });
    // Form has been dirtied by changing input
    expect(mockedSetValue).toHaveBeenCalledTimes(1);
    expect(mockedSetValue).lastCalledWith('', '', { shouldDirty: true });

    input.blur();
    // Now it has finally been called to update the data
    expect(mockedSetValue).toHaveBeenCalledTimes(2);
    expect(mockedSetValue).lastCalledWith(mockInputKey, 'tifa', {
      shouldDirty: false,
    });

    await act(async () => {
      fireEvent.click(changeButton);
    });

    input.focus();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'tifa' } });
    });
    // Form has been dirtied by changing input
    expect(mockedSetValue).toHaveBeenCalledTimes(3);
    expect(mockedSetValue).lastCalledWith('', '', { shouldDirty: true });
  });

  it('can handle non-string values (aka a checkbox)', async () => {
    const { view } = renderCheckboxView();

    const input = view.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);

    // inital value setting
    expect(mockedSetValue).toHaveBeenCalledTimes(0);

    input.focus();

    await act(async () => {
      fireEvent.click(input);
    });

    input.blur();

    expect(mockedSetValue).toHaveBeenLastCalledWith(mockCheckboxKey, true, {
      shouldDirty: true,
    });
    expect(input.checked).toBe(true);
    expect(mockedSetValue).toHaveBeenCalledTimes(1);

    input.focus();

    await act(async () => {
      fireEvent.click(input);
    });

    input.blur();

    expect(mockedSetValue).toHaveBeenLastCalledWith(mockCheckboxKey, false, {
      shouldDirty: true,
    });
    expect(input.checked).toBe(false);
    expect(mockedSetValue).toHaveBeenCalledTimes(2);
  });
});

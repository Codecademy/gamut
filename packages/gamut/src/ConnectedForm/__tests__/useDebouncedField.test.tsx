import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import * as React from 'react';

import { Checkbox, Input } from '../../Form';
import { WithChildrenProp } from '../../utils';
import { ConnectedForm } from '../ConnectedForm';
import { useDebouncedField, useFormState } from '../utils';

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
const FormWrapper: React.FC<WithChildrenProp> = ({ children }) => (
  <ConnectedForm
    defaultValues={{
      [mockInputKey]: mockDefaultValue,
      [mockChangeKey]:
        'Final Fantasy VII Remake is a 2020 action role-playing game developed and published by Square Enix.',
      [mockCheckboxKey]: false,
    }}
    onSubmit={() => null}
  >
    {children}
  </ConnectedForm>
);
const TestTextInput: React.FC<{
  shouldDirtyOnChange?: boolean;
}> = ({ shouldDirtyOnChange }) => {
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
        htmlFor={mockInputKey}
        name={mockInputKey}
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
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
      checked={Boolean(value)}
      htmlFor={mockCheckboxKey}
      label="Checkbox"
      onBlur={onBlur}
      onChange={onChange}
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
    act(() => {
      fireEvent.change(input, { target: { value: mockChangeValue } });
    });

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
    expect(mockedSetValue).toHaveBeenLastCalledWith(mockInputKey, 'tifa', {
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
    expect(mockedSetValue).toHaveBeenLastCalledWith(mockInputKey, 'tifa', {
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
    expect(mockedSetValue).toHaveBeenLastCalledWith('', '', {
      shouldDirty: true,
    });

    input.blur();

    // Now it has finally been called to update the data
    expect(mockedSetValue).toHaveBeenCalledTimes(2);
    expect(mockedSetValue).toHaveBeenLastCalledWith(mockInputKey, 'tifa', {
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
    expect(mockedSetValue).toHaveBeenLastCalledWith('', '', {
      shouldDirty: true,
    });
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

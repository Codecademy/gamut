import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { act } from 'react-dom/test-utils';

// import { useFormContext } from 'react-hook-form';
import { ConnectedForm, Input, SubmitButton, useDebouncedField } from '../..';
import { createPromise } from '../../utils';

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

const api = createPromise<Record<string, string>>();
const onSubmit = async (values: {}) => api.resolve(values);
const mockInputKey = 'final-fantasy-vii';
const mockDefaultValue = 'is your tv screen big enough?';
const mockChangeValue =
  'A story of war and friendship. A story of love that can never be.';

const FormWrapper: React.FC = ({ children }) => (
  <ConnectedForm
    onSubmit={onSubmit}
    defaultValues={{ [mockInputKey]: mockDefaultValue }}
  >
    {children}
  </ConnectedForm>
);

const TestInput = () => {
  const { onBlur, onChange, value } = useDebouncedField({ name: mockInputKey });

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
      <SubmitButton />
    </>
  );
};

const renderView = setupRtl(TestInput).options({ wrapper: FormWrapper });

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
  it('should ONLY update the form on blur of input', async () => {
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
    // Form has been dirtied by changing input
    expect(mockedSetValue).toHaveBeenCalledTimes(1);
    expect(mockedSetValue).lastCalledWith('', '', { shouldDirty: true });

    input.blur();
    // Now it has finally been called to update the data
    expect(mockedSetValue).toHaveBeenCalledTimes(2);
    expect(mockedSetValue).lastCalledWith(mockInputKey, 'tifa');
  });
});

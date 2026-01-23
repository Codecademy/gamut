import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act, waitFor } from '@testing-library/react';
import * as React from 'react';

import { createPromise } from '../../utils';
import { ConnectedForm, ConnectedFormGroup } from '..';
import { ConnectedInput } from '../ConnectedInputs/ConnectedInput';

const mockInputKey = 'email';
const mockDefaultValue = '';
const customErrorMessage = 'Please enter a valid email address';
const customRequiredMessage = 'Email is required';

const TestFormWithCustomValidation: React.FC = () => {
  return (
    <>
      <ConnectedFormGroup
        field={{
          component: ConnectedInput,
          customValidation: {
            required: customRequiredMessage,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: customErrorMessage,
            },
          },
        }}
        label="Email"
        name={mockInputKey}
      />
      <button type="submit">Submit</button>
    </>
  );
};

const TestFormWithBothValidations: React.FC = () => {
  return (
    <>
      <ConnectedFormGroup
        field={{
          component: ConnectedInput,
          customValidation: {
            minLength: {
              value: 5,
              message: 'Email must be at least 5 characters',
            },
          },
        }}
        label="Email"
        name={mockInputKey}
      />
      <button type="submit">Submit</button>
    </>
  );
};

const renderView = setupRtl(ConnectedForm, {
  defaultValues: {
    [mockInputKey]: mockDefaultValue,
  },
  onSubmit: () => null,
  children: <TestFormWithCustomValidation />,
});

const renderViewWithBothValidations = setupRtl(ConnectedForm, {
  defaultValues: {
    [mockInputKey]: mockDefaultValue,
  },
  validationRules: {
    [mockInputKey]: {
      required: 'This field is required from form level',
    },
  },
  onSubmit: () => null,
  children: <TestFormWithBothValidations />,
});

describe('ConnectedForm - useField', () => {
  it('should apply custom validation pattern rules', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({ onSubmit });

    const input = view.getByRole('textbox') as HTMLInputElement;

    // Try to submit with invalid email
    await act(async () => {
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.blur(input);
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    // Should show the custom pattern validation error
    await waitFor(() => {
      expect(view.getByText(customErrorMessage)).toBeInTheDocument();
    });
  });

  it('should validate required fields with custom validation', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({ onSubmit });

    // Try to submit with empty field
    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    // Should show the custom required validation error
    await waitFor(() => {
      expect(view.getByText(customRequiredMessage)).toBeInTheDocument();
    });
  });

  it('should pass validation with valid input', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({ onSubmit });

    const input = view.getByRole('textbox') as HTMLInputElement;

    // Submit with valid email
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.blur(input);
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
      await api.innerPromise;
    });

    const result = await api.innerPromise;

    // Should successfully submit with the correct value
    expect(result).toEqual({ [mockInputKey]: 'test@example.com' });
  });

  it('should merge form-level and custom validations', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderViewWithBothValidations({ onSubmit });

    const input = view.getByRole('textbox') as HTMLInputElement;

    // Try to submit with empty field - should trigger form-level required validation
    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    await waitFor(() => {
      expect(
        view.getByText('This field is required from form level')
      ).toBeInTheDocument();
    });

    // Now test with value that fails custom minLength validation
    await act(async () => {
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.blur(input);
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    await waitFor(() => {
      expect(
        view.getByText('Email must be at least 5 characters')
      ).toBeInTheDocument();
    });

    // Finally test with valid value that passes both validations
    await act(async () => {
      fireEvent.change(input, { target: { value: 'abcdef' } });
      fireEvent.blur(input);
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
      await api.innerPromise;
    });

    const result = await api.innerPromise;

    // Should successfully submit
    expect(result).toEqual({ [mockInputKey]: 'abcdef' });
  });

  it('should set isRequired to true when custom validation includes required', () => {
    const { view } = renderView();

    const input = view.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});

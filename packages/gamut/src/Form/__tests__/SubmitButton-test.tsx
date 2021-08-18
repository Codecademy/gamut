import { setupEnzyme } from '@codecademy/gamut-tests';
import hookform from 'react-hook-form';

import { CTAButton, FillButton } from '../../Button';
import { Spinner } from '../../Spinner';
import { SubmitButton } from '../SubmitButton';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

const mockedHook = hookform.useFormContext as jest.Mock;

interface FormState {
  isValidating?: boolean;
  isValid?: boolean;
  isSubmitting?: boolean;
  isOnChange?: boolean;
}

const mockFormState = ({
  isValidating = false,
  isValid = true,
  isSubmitting = false,
  isOnChange = true,
}: FormState) => {
  mockedHook.mockImplementation(() => ({
    formState: { isSubmitting, isValidating, isValid },
    control: { mode: { isOnChange } },
  }));
};

mockedHook.mockImplementation(() => ({
  formState: { isSubmitting: false, isValidating: false, isValid: false },
  control: { mode: { isOnChange: true } },
}));

const renderWrapper = setupEnzyme(SubmitButton, {});

describe('SubmitButton', () => {
  it('renders as a FillButton by default', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find(FillButton).length).toBe(1);
  });

  it('renders as a CTAButton when configured', () => {
    const { wrapper } = renderWrapper({ as: CTAButton });

    expect(wrapper.find(CTAButton).length).toBe(1);
  });
  it('disables a button if mode is onChange and form is invalid by default', () => {
    mockFormState({ isValid: false });

    const { wrapper } = renderWrapper();
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('does not disable a button if mode is not onChange while form is invalid', () => {
    mockFormState({ isValid: false, isOnChange: false });

    const { wrapper } = renderWrapper();
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it.each([
    [{ isValid: false }, true],
    [{ isValidating: true }, true],
    [{ isSubmitting: true }, true],
  ])('disabled states (%o)', (formState: FormState, expected: boolean) => {
    mockFormState(formState);
    const { wrapper } = renderWrapper({
      disabled: ({ isValidating, isSubmitting, isValid }) =>
        isValidating || isSubmitting || !isValid,
    });
    expect(wrapper.find('button').prop('disabled')).toBe(expected);
  });
  it.each([
    [{}, 0],
    [{ isValidating: true }, 1],
    [{ isSubmitting: true }, 1],
  ])('loading states (%o)', (formState: FormState, expected: number) => {
    mockFormState(formState);
    const { wrapper } = renderWrapper({
      loading: ({ isValidating, isSubmitting }) => isValidating || isSubmitting,
    });
    expect(wrapper.find(Spinner).length).toBe(expected);
  });
});

import { setupRtl } from '@codecademy/gamut-tests';
import hookform, { FormState } from 'react-hook-form';

import { CTAButton, FillButton } from '../../Button';
import { Spinner } from '../../Spinner';
import { SubmitButton } from '../SubmitButton';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

const mockedHook = hookform.useFormContext as jest.Mock;

const mockFormState = ({
  isValidating = false,
  isValid = true,
  isSubmitting = false,
}: FormState<{}>) => {
  mockedHook.mockImplementation(() => ({
    formState: { isSubmitting, isValidating, isValid },
  }));
};

mockedHook.mockImplementation(() => ({
  formState: { isSubmitting: false, isValidating: false, isValid: false },
}));

const renderView = setupRtl(SubmitButton, {});

describe('SubmitButton', () => {
  it('renders as a FillButton by default', () => {
    const { view } = renderView();

    expect(wrapper.find(FillButton).length).toBe(1);
  });

  it('renders as a CTAButton when configured', () => {
    const { view } = renderView({ as: CTAButton });

    expect(wrapper.find(CTAButton).length).toBe(1);
  });

  it.each([
    [{ isValid: false }, true],
    [{ isValidating: true }, true],
    [{ isSubmitting: true }, true],
  ])('disabled states (%o)', (formState: FormState<{}>, expected: boolean) => {
    mockFormState(formState);
    const { view } = renderView({
      disabled: ({ isValidating, isSubmitting, isValid }) =>
        isValidating || isSubmitting || !isValid,
    });
    expect(wrapper.find('button').prop('disabled')).toBe(expected);
  });
  it.each([
    [{}, 0],
    [{ isValidating: true }, 1],
    [{ isSubmitting: true }, 1],
  ])('loading states (%o)', (formState: FormState<{}>, expected: number) => {
    mockFormState(formState);
    const { view } = renderView({
      loading: ({ isValidating, isSubmitting }) => isValidating || isSubmitting,
    });
    expect(wrapper.find(Spinner).length).toBe(expected);
  });
});

import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import hookform, { FormState } from 'react-hook-form';

import { CTAButton } from '../../Button';
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
    const button = view.getByRole('button');
    const borderRadiusSize = theme.borderRadii.md;

    expect(button).toHaveStyle({ borderRadius: borderRadiusSize });
  });

  it('renders as a CTAButton when configured', () => {
    const { view } = renderView({ as: CTAButton });
    const button = view.getByRole('button');
    const borderRadiusSize = theme.borderRadii.md;

    expect(button).toHaveStyle({ borderRadius: borderRadiusSize });
  });

  it.each([
    [{ isValid: false }],
    [{ isValidating: true }],
    [{ isSubmitting: true }],
  ])('disabled states (%o)', (formState: FormState<{}>) => {
    mockFormState(formState);
    const { view } = renderView({
      disabled: ({ isValidating, isSubmitting, isValid }) =>
        isValidating || isSubmitting || !isValid,
    });

    expect(view.getByRole('button')).toBeDisabled();
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

    expect(view.queryAllByTitle('Spinner')).toHaveLength(expected);
  });
});

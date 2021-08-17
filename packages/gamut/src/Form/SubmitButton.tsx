import React, { ComponentType, forwardRef } from 'react';
import { FormState, useFormContext } from 'react-hook-form';

import { ButtonProps, CTAButton } from '../Button';
import { Spinner } from '../Spinner';

type CheckLoading = (
  formState: Pick<FormState<{}>, 'isValidating' | 'isSubmitting'>
) => boolean;

type CheckDisabled = (
  formState: Pick<FormState<{}>, 'isValidating' | 'isSubmitting' | 'isValid'>
) => boolean;

export interface SubmitButtonProps extends Omit<ButtonProps, 'as'> {
  as?: ComponentType<ButtonProps>;
  loading?: CheckLoading | boolean;
  disabled?: CheckDisabled | boolean;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ as: Button = CTAButton, children, disabled, loading, ...rest }, ref) => {
    const {
      formState: { isSubmitting, isValidating, isValid },
      control: { mode },
    } = useFormContext();

    const disableOnInvalid = mode?.isOnChange && !isValid;

    const isLoading =
      typeof loading === 'function'
        ? loading({ isValidating, isSubmitting })
        : loading;

    const content = isLoading ? <Spinner size={16} /> : children;

    const isDisabled =
      typeof disabled === 'function'
        ? disabled({ isValidating, isSubmitting, isValid })
        : disabled || disableOnInvalid;

    return (
      <Button ref={ref} type="submit" disabled={isDisabled} {...rest}>
        {content}
      </Button>
    );
  }
);

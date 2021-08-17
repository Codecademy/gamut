import React, { ComponentType, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { ButtonProps, CTAButton } from '../Button';
import { Spinner } from '../Spinner';

interface SubmitButtonProps extends Omit<ButtonProps, 'as'> {
  as?: ComponentType<ButtonProps>;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ as: Button = CTAButton, children, disabled, ...rest }, ref) => {
    const {
      formState: { isSubmitting },
    } = useFormContext();

    const content = isSubmitting ? <Spinner size={16} /> : children;

    return (
      <Button
        ref={ref}
        type="submit"
        disabled={isSubmitting || disabled}
        {...rest}
      >
        {content}
      </Button>
    );
  }
);

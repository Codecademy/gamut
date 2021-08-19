import React, { ComponentType } from 'react';
import { FormState, useFormContext } from 'react-hook-form';

import { Box, FlexBox } from '../Box';
import { ButtonProps, FillButton } from '../Button';
import { Spinner } from '../Spinner';

export type FormStateCallback = (
  formState: Pick<
    FormState<{}>,
    'isValidating' | 'isSubmitting' | 'isValid' | 'isDirty'
  >
) => boolean;

export interface SubmitButtonProps extends Omit<ButtonProps, 'as'> {
  as?: ComponentType<ButtonProps>;
  loading?: FormStateCallback | boolean;
  disabled?: FormStateCallback | boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  as: Button = FillButton,
  children,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const {
    formState,
    formState: { isSubmitting, isValidating, isDirty },
    control: { mode },
  } = useFormContext();

  const isValid = formState?.isValid ?? true;
  const disableOnInvalid = mode?.isOnChange && !isValid;

  const isLoading =
    typeof loading === 'function'
      ? loading({ isValidating, isSubmitting, isValid, isDirty })
      : loading;

  const isDisabled =
    typeof disabled === 'function'
      ? disabled({ isValidating, isSubmitting, isValid, isDirty })
      : disabled || disableOnInvalid;

  if (isLoading) {
    return (
      <Button
        {...rest}
        type="submit"
        disabled
        aria-label={isLoading ? 'Loading' : undefined}
      >
        {/** This maintains button dimensions while hiding it from screen readers and the page */}
        <Box as="span" opacity={0} aria-hidden>
          {children}
        </Box>
        {isLoading && (
          <FlexBox position="absolute" inset={0} center>
            <Spinner size={16} />
          </FlexBox>
        )}
      </Button>
    );
  }

  return (
    <Button {...rest} type="submit" disabled={isDisabled}>
      {children}
    </Button>
  );
};

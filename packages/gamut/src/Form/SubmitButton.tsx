import React, { ComponentType } from 'react';
import { FormState, useFormContext } from 'react-hook-form';

import { Box, FlexBox } from '../Box';
import { ButtonProps, FillButton } from '../Button';
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

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  as: Button = FillButton,
  children,
  disabled,
  loading,
  ...rest
}) => {
  const {
    formState,
    formState: { isSubmitting, isValidating },
    control: { mode },
  } = useFormContext();
  let isValid = true;

  if (!mode.isOnSubmit) {
    isValid = formState?.isValid;
  }

  const disableOnInvalid = mode?.isOnChange && !isValid;

  const isLoading =
    typeof loading === 'function'
      ? loading({ isValidating, isSubmitting })
      : loading;

  const isDisabled =
    typeof disabled === 'function'
      ? disabled({ isValidating, isSubmitting, isValid })
      : disabled || disableOnInvalid;

  if (isLoading) {
    return (
      <Button
        type="submit"
        disabled={isDisabled || isLoading}
        {...rest}
        aria-label={isLoading ? 'Loading' : undefined}
      >
        {/** This maintains button dimensions while hiding it from screen readers and the page */}
        <Box as="span" opacity={isLoading ? 0 : 1} aria-hidden={isLoading}>
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
    <Button type="submit" disabled={isDisabled || isLoading} {...rest}>
      {children}
    </Button>
  );
};

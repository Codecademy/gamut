import { ComponentType } from 'react';
import * as React from 'react';
import { FormState } from 'react-hook-form';

import { Box, FlexBox } from '../Box';
import { ButtonProps, FillButton } from '../Button';
import { Spinner } from '../Loading/Spinner';
import { useSubmitState } from './utils';

export interface SubmitContextProps {
  loading?: FormStateCallback | boolean;
  disabled?: FormStateCallback | boolean;
}

export type FormStateCallback<Values = {}> = (
  formState: FormState<Values>
) => boolean;

export interface SubmitContextProps {
  loading?: FormStateCallback | boolean;
  disabled?: FormStateCallback | boolean;
}
export interface SubmitButtonProps
  extends Omit<ButtonProps, 'as'>,
    SubmitContextProps {
  as?: ComponentType<ButtonProps>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  as: Button = FillButton,
  children,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const { isLoading, isDisabled } = useSubmitState({ loading, disabled });

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

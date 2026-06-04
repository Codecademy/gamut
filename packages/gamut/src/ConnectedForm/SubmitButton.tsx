import { ComponentType } from 'react';
import * as React from 'react';
import { FieldValues, FormState } from 'react-hook-form';

import { Box, FlexBox } from '../Box';
import { ButtonProps, FillButton } from '../Button';
import { Spinner } from '../Loading/Spinner';
import { Text } from '../Typography';
import { useSubmitState } from './utils';

export interface SubmitContextProps {
  loading?: FormStateCallback<FieldValues> | boolean;
  disabled?: FormStateCallback<FieldValues> | boolean;
}

export type FormStateCallback<Values extends FieldValues = {}> = (
  formState: FormState<Values>
) => boolean;

export interface SubmitContextProps {
  loading?: FormStateCallback<FieldValues> | boolean;
  disabled?: FormStateCallback<FieldValues> | boolean;
}
export type SubmitButtonProps = Omit<ButtonProps, 'as' | 'disabled'> &
  SubmitContextProps & {
    as?: ComponentType<ButtonProps>;
  };

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
        aria-label={isLoading ? 'Loading' : undefined}
        disabled
        type="submit"
      >
        {/** This maintains button dimensions while hiding it from screen readers and the page */}
        <Box aria-hidden as="span" opacity={0}>
          {children}
        </Box>
        {isLoading && (
          <FlexBox center inset={0} position="absolute">
            <Spinner size={16} />
            <Text aria-live="polite" screenreader>
              Loading
            </Text>
          </FlexBox>
        )}
      </Button>
    );
  }

  return (
    <Button {...rest} disabled={isDisabled} type="submit">
      {children}
    </Button>
  );
};

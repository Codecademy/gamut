import { ComponentType } from 'react';
import * as React from 'react';
import { FieldValues, FormState } from 'react-hook-form';

import { Box, FlexBox } from '../Box';
import { ButtonProps, FillButton } from '../Button';
import { HiddenText } from '../HiddenText';
import { Spinner } from '../Loading/Spinner';
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
        {...({
          ...rest,
          'aria-label': isLoading ? 'Loading' : undefined,
          disabled: true,
          type: 'submit',
        } as React.ComponentProps<typeof Button> as any)}
      >
        {/** This maintains button dimensions while hiding it from screen readers and the page */}
        <Box aria-hidden as="span" opacity={0}>
          {children}
        </Box>
        {isLoading && (
          <FlexBox center inset={0} position="absolute">
            <Spinner size={16} />
            <HiddenText aria-live="polite">Loading</HiddenText>
          </FlexBox>
        )}
      </Button>
    );
  }

  return (
    <Button
      {...({
        ...rest,
        disabled: isDisabled,
        type: 'submit',
      } as React.ComponentProps<typeof Button> as any)}
    >
      {children}
    </Button>
  );
};

import { useFormContext } from 'react-hook-form';

export const useIsFieldDisabled = (disabled: boolean) => {
  const { formState } = useFormContext();
  return formState.isSubmitting || disabled;
};

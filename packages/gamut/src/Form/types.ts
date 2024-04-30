import { UnpackNestedValue } from 'react-hook-form';

export type FormValues<T> = {
  [key in keyof T]?: UnpackNestedValue<T[key]>;
};
export { CheckboxPaddingProps } from './inputs/Checkbox';

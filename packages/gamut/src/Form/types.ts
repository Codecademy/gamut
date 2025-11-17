export type FormValues<T> = {
  [key in keyof T]?: T[key];
};

export { CheckboxPaddingProps } from './inputs/Checkbox';

export interface BaseInputProps {
  label?: string;
  error?: boolean;
  /**
   * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
   */
  htmlFor?: string;
  name?: string;
  required?: boolean;
}

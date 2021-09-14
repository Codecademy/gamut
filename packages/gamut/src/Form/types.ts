export type FormValues<T> = {
  [key in keyof T]?: boolean | string | FileList;
};
export { CheckboxPaddingProps } from './Checkbox';

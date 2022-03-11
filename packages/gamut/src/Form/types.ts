export type FormValues<T> = {
  [key in keyof T]?: boolean | string | Pick<FileList, 'item'> | T[key];
};
export { CheckboxPaddingProps } from './Checkbox';

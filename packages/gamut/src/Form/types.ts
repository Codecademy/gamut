export type FormValues<T> = {
  [key in keyof T]?: boolean | string | Pick<FileList, 'item'>;
};
export { CheckboxPaddingProps } from './Checkbox';

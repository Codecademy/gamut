import type { InputWrapperProps } from '../../Form/inputs/Input';

export type DatePickerFieldLabelIds = {
  shellId: string;
  labelledById: string;
};

export type DatePickerFieldProps = Pick<
  InputWrapperProps,
  'disabled' | 'error' | 'form' | 'size'
>;

export const createDatePickerShellId = (uid: string) =>
  `datepicker-input-${uid.replace(/:/g, '')}`;

export const createDatePickerFieldIds = (
  inputUid: string,
  labelUid: string
): DatePickerFieldLabelIds => ({
  shellId: createDatePickerShellId(inputUid),
  labelledById: `datepicker-label-${labelUid.replace(/:/g, '')}`,
});

import { forwardRef, useId } from 'react';

import { Box, FlexBox } from '../../Box';
import { FormGroup } from '../../Form/elements/FormGroup';
import { FormGroupLabel } from '../../Form/elements/FormGroupLabel';
import type { InputWrapperProps } from '../../Form/inputs/Input';
import { DATE_PICKER_FIELD_WIDTH } from '../constants';
import { useDatePicker } from '../DatePickerContext';
import {
  createDatePickerFieldIds,
  createDatePickerShellId,
} from '../utils/fieldIds';
import { DatePickerInputShell } from './DatePickerInputShell';
import { DatePickerDescription } from './elements';

export { DatePickerDescription } from './elements';

export type DatePickerInputProps = Omit<
  InputWrapperProps,
  'className' | 'type' | 'icon' | 'value' | 'onChange' | 'color'
> & {
  /** In range mode: which part of the range this input edits. Omit for single-date or combined display. */
  rangePart?: 'start' | 'end';
  /** Description to display between the label and the input. */
  description?: string;
};

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      disabled,
      error,
      form,
      label,
      name,
      rangePart,
      size = 'base',
      description,
      ...rest
    },
    ref
  ) => {
    const context = useDatePicker();

    if (context === null) {
      throw new Error(
        'DatePickerInput must be used inside a DatePicker (it reads shared state from context).'
      );
    }

    const { translations } = context;
    const labelUid = useId();
    const inputUid = useId();
    const shellProps = { disabled, error, form, size, ...rest };

    if (rangePart) {
      const shellId = createDatePickerShellId(inputUid);
      const defaultLabel =
        rangePart === 'end'
          ? translations.endDateLabel
          : translations.startDateLabel;

      return (
        <FormGroup
          alignItems="flex-start"
          id={shellId}
          isSoloField
          label={label ?? defaultLabel}
          mb={0}
          pb={0}
          spacing="tight"
          width="fit-content"
        >
          {description ? (
            <DatePickerDescription aria-live="assertive">
              {description}
            </DatePickerDescription>
          ) : null}
          <DatePickerInputShell
            {...shellProps}
            labelledById={shellId}
            name={name}
            rangePart={rangePart}
            ref={ref}
            shellId={shellId}
          />
        </FormGroup>
      );
    }

    const fieldIds = createDatePickerFieldIds(inputUid, labelUid);

    return (
      <Box width="fit-content">
        <Box id={fieldIds.labelledById} width={DATE_PICKER_FIELD_WIDTH}>
          <FormGroupLabel htmlFor={fieldIds.shellId} isSoloField>
            {label ?? translations.dateLabel}
          </FormGroupLabel>
        </Box>
        {description ? (
          <DatePickerDescription aria-live="assertive">
            {description}
          </DatePickerDescription>
        ) : null}
        <FlexBox ref={ref}>
          <DatePickerInputShell
            {...shellProps}
            labelledById={fieldIds.labelledById}
            name={name ?? 'datePickerInput'}
            shellId={fieldIds.shellId}
          />
        </FlexBox>
      </Box>
    );
  }
);

import { MiniArrowLeftIcon, MiniArrowRightIcon } from '@codecademy/gamut-icons';
import { useElementDir } from '@codecademy/gamut-styles';
import { forwardRef, useId, useMemo } from 'react';

import { Box, FlexBox } from '../../../Box';
import { FormGroupLabel } from '../../../Form/elements/FormGroupLabel';
import {
  DATE_PICKER_FIELD_WIDTH,
  DATE_PICKER_RANGE_ARROW_WIDTH,
} from '../../constants';
import { useDatePicker } from '../../DatePickerContext';
import { createDatePickerFieldIds } from '../../utils/fieldIds';
import type { DatePickerInputShellProps } from '../DatePickerInputShell';
import { DatePickerInputShell } from '../DatePickerInputShell';
import { DatePickerDescription } from '../elements';

export type DatePickerRangeInputWrapperProps = Omit<
  DatePickerInputShellProps,
  'labelledById' | 'shellId' | 'rangePart'
> & {
  description?: string;
};

export const DatePickerRangeInputWrapper = forwardRef<
  HTMLDivElement,
  DatePickerRangeInputWrapperProps
>(({ description, size = 'base', ...shellProps }, ref) => {
  const { translations } = useDatePicker();
  const isRtl = useElementDir() === 'rtl';
  const columnGap = size === 'small' ? 4 : 8;

  const startUid = useId();
  const endUid = useId();

  const startField = useMemo(
    () => ({
      fieldIds: createDatePickerFieldIds(startUid, startUid),
      label: translations.startDateLabel,
      name: 'datePickerInputStart' as const,
    }),
    [startUid, translations.startDateLabel]
  );

  const endField = useMemo(
    () => ({
      fieldIds: createDatePickerFieldIds(endUid, endUid),
      label: translations.endDateLabel,
      name: 'datePickerInputEnd' as const,
    }),
    [endUid, translations.endDateLabel]
  );

  return (
    <Box width="fit-content">
      <FlexBox columnGap={columnGap}>
        <Box
          id={startField.fieldIds.labelledById}
          width={DATE_PICKER_FIELD_WIDTH}
        >
          <FormGroupLabel htmlFor={startField.fieldIds.shellId} isSoloField>
            {startField.label}
          </FormGroupLabel>
        </Box>
        <Box flexShrink={0} width={DATE_PICKER_RANGE_ARROW_WIDTH} />
        <Box
          id={endField.fieldIds.labelledById}
          width={DATE_PICKER_FIELD_WIDTH}
        >
          <FormGroupLabel htmlFor={endField.fieldIds.shellId} isSoloField>
            {endField.label}
          </FormGroupLabel>
        </Box>
      </FlexBox>
      {description ? (
        <DatePickerDescription aria-live="assertive">
          {description}
        </DatePickerDescription>
      ) : null}
      <FlexBox alignItems="center" columnGap={columnGap} ref={ref}>
        <DatePickerInputShell
          {...shellProps}
          labelledById={startField.fieldIds.labelledById}
          name={startField.name}
          rangePart="start"
          shellId={startField.fieldIds.shellId}
          size={size}
        />
        <FlexBox center flexShrink={0} width={DATE_PICKER_RANGE_ARROW_WIDTH}>
          {isRtl ? <MiniArrowLeftIcon /> : <MiniArrowRightIcon />}
        </FlexBox>
        <DatePickerInputShell
          {...shellProps}
          labelledById={endField.fieldIds.labelledById}
          name={endField.name}
          rangePart="end"
          shellId={endField.fieldIds.shellId}
          size={size}
        />
      </FlexBox>
    </Box>
  );
});

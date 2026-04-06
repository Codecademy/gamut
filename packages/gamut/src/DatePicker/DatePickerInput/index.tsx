import { MiniCalendarIcon } from '@codecademy/gamut-icons';
import {
  type FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../../Box';
import { FormGroup } from '../../Form/elements/FormGroup';
import type { InputWrapperProps } from '../../Form/inputs/Input';
import { useDatePicker } from '../DatePickerContext';
import { SegmentedShell } from './elements';
import {
  type SegmentValues,
  DatePickerInputSegment,
  getDateSegmentsFromDate,
  normalizeSegmentValues,
  parseSegmentsToDate,
  SegmentLiteral,
} from './Segment';
import {
  formatDateISO8601DateOnly,
  getDateFieldOrder,
  getDateFormatLayout,
} from './utils';

/**
 * Props for DatePickerInput. When used inside DatePicker, only overrides (e.g. placeholder, label).
 * In range mode, use rangePart to bind to start or end date. When outside DatePicker, pass value, onChange, etc.
 */
export type DatePickerInputProps = Omit<
  InputWrapperProps,
  'className' | 'type' | 'icon' | 'value' | 'onChange' | 'color'
> & {
  /** In range mode: which part of the range this input edits. Omit for single-date or combined display. */
  rangePart?: 'start' | 'end';
};

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    { disabled, error, form, label, name, rangePart, size = 'base', ...rest },
    ref
  ) => {
    const context = useDatePicker();

    if (context == null) {
      throw new Error(
        'DatePickerInput must be used inside a DatePicker (it reads shared state from context).'
      );
    }

    const {
      mode,
      startOrSelectedDate,
      setSelection,
      openCalendar,
      focusCalendarGrid,
      locale,
      isCalendarOpen,
      translations,
    } = context;

    const isRange = mode === 'range';
    const endDate = isRange ? context.endDate : null;

    const inputID = useId();
    const inputId = `datepicker-input-${inputID.replace(/:/g, '')}`;

    const { layout, fieldOrder } = useMemo(() => {
      const layout = getDateFormatLayout(locale);
      return { layout, fieldOrder: getDateFieldOrder(layout) };
    }, [locale]);
    const firstField = fieldOrder[0];
    const firstFieldId = `${inputId}-${firstField}`;

    const defaultLabel = !isRange
      ? translations.dateLabel
      : rangePart === 'end'
      ? translations.endDateLabel
      : translations.startDateLabel;

    const boundDate =
      isRange && rangePart === 'end' ? endDate : startOrSelectedDate;
    const segmentsFromBound = useCallback(
      () => getDateSegmentsFromDate(boundDate),
      [boundDate]
    );
    const [segments, setSegments] = useState<SegmentValues>(segmentsFromBound);

    const parsedForHidden = parseSegmentsToDate(segments);
    const hiddenValue = parsedForHidden
      ? formatDateISO8601DateOnly(parsedForHidden)
      : '';

    const isInputFocusedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const setShellRef = useCallback(
      (el: HTMLDivElement | null) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref != null) ref.current = el;
      },
      [ref]
    );

    useEffect(() => {
      if (!isInputFocusedRef.current) {
        setSegments(segmentsFromBound());
      }
    }, [segmentsFromBound]);

    const commitParsedDate = useCallback(
      (parsed: Date) => {
        if (isRange && rangePart) {
          if (rangePart === 'start') setSelection(parsed, endDate);
          else setSelection(startOrSelectedDate, parsed);
        } else setSelection(parsed);
      },
      [isRange, rangePart, setSelection, endDate, startOrSelectedDate]
    );


    const clearSelection = useCallback(() => {
      if (isRange && rangePart) {
        if (rangePart === 'start') setSelection(null, endDate);
        else setSelection(startOrSelectedDate, null);
      } else setSelection(null);
    }, [isRange, rangePart, setSelection, endDate, startOrSelectedDate]);

    const applySegments = useCallback(
      (next: SegmentValues) => {
        const parsed = parseSegmentsToDate(next);
        if (parsed) commitParsedDate(parsed);
        else if (!next.month && !next.day && !next.year) clearSelection();
      },
      [clearSelection, commitParsedDate]
    );

    const handleContainerBlur = (e: FocusEvent<HTMLDivElement>) => {
      if (containerRef.current?.contains(e.relatedTarget as Node)) return;
      isInputFocusedRef.current = false;
      setSegments((prev) => {
        const normalized = normalizeSegmentValues(prev);
        const parsed = parseSegmentsToDate(normalized);
        if (parsed) {
          commitParsedDate(parsed);
          return normalized;
        }
        if (!normalized.month && !normalized.day && !normalized.year) {
          clearSelection();
          return getDateSegmentsFromDate(null);
        }
        return segmentsFromBound();
      });
    };

    const handleContainerFocus = () => {
      isInputFocusedRef.current = true;
    };

    const handleSegmentFocus = () => {
      handleContainerFocus();
      if (isRange && rangePart) context.setActiveRangePart(rangePart);
    };

    const handleOpenCalendar = () => {
      if (!disabled) openCalendar({ moveFocusIntoCalendar: false });
    };

    const focusOrOpenCalendarGrid = () => {
      if (isCalendarOpen) focusCalendarGrid();
      else openCalendar({ moveFocusIntoCalendar: true });
    };

    return (
      <FormGroup
        htmlFor={firstFieldId}
        isSoloField
        label={label ?? defaultLabel}
        mb={0}
        pb={0}
        spacing="tight"
        width="fit-content"
      >
        <SegmentedShell
          inputSize={size === 'small' ? 'small' : 'base'}
          ref={setShellRef}
          role="group"
          variant={error ? 'error' : undefined}
          width="113px"
          onBlur={handleContainerBlur}
          onFocus={handleContainerFocus}
          {...rest}
        >
          <FlexBox alignItems="center" justifyContent="center">
            {layout.map((item, index) => {
              if (item.kind === 'literal') {
                return (
                  <SegmentLiteral
                    aria-hidden
                    // eslint-disable-next-line react/no-array-index-key
                    key={`literal-${item.text}-${index}`}
                  >
                    {`${item.text}`}
                  </SegmentLiteral>
                );
              }
              const idx = fieldOrder.indexOf(item.field);
              const prevField = idx > 0 ? fieldOrder[idx - 1] : null;
              const nextField =
                idx < fieldOrder.length - 1 ? fieldOrder[idx + 1] : null;

              return (
                <DatePickerInputSegment
                  applySegments={applySegments}
                  disabled={Boolean(disabled)}
                  error={Boolean(error)}
                  field={item.field}
                  focusOrOpenCalendarGrid={focusOrOpenCalendarGrid}
                  handleOnClick={handleOpenCalendar}
                  handleOnFocus={handleSegmentFocus}
                  key={item.field}
                  nextField={nextField}
                  prevField={prevField}
                  segments={segments}
                  setSegments={setSegments}
                />
              );
            })}
          </FlexBox>
          <input
            aria-hidden
            form={form}
            name={name}
            tabIndex={-1}
            type="hidden"
            value={hiddenValue}
          />
          <FlexBox
            alignItems="center"
            justifyContent="center"
            pl={16}
            pr={8}
            role="presentation"
            onClick={handleOpenCalendar}
          >
            <MiniCalendarIcon aria-hidden size={16} />
          </FlexBox>
        </SegmentedShell>
      </FormGroup>
    );
  }
);

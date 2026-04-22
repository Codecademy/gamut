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
import { isSameDay } from '../DatePickerCalendar/Calendar/utils/dateGrid';
import { handleDateSelectRange } from '../DatePickerCalendar/utils/dateSelect';
import { useDatePicker } from '../DatePickerContext';
import { SegmentedShell } from './elements';
import { DatePickerInputSegment } from './Segment';
import { SegmentLiteral } from './Segment/elements';
import {
  type SegmentValues,
  getDateSegmentsFromDate,
  normalizeSegmentValues,
  parseSegmentsToDate,
} from './Segment/utils';
import {
  type DatePartKind,
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

    if (context === null) {
      throw new Error(
        'DatePickerInput must be used inside a DatePicker (it reads shared state from context).'
      );
    }

    const {
      mode,
      openCalendar,
      focusCalendar,
      locale,
      isCalendarOpen,
      translations,
      shouldDisableDate,
    } = context;

    const isRange = mode === 'range';
    const endDate = isRange ? context.endDate : null;
    const date = isRange ? context.startDate : context.selectedDate;

    const inputID = useId();
    const inputId = `datepicker-input-${inputID.replace(/:/g, '')}`;

    const { layout, fieldOrder } = useMemo(() => {
      const layout = getDateFormatLayout(locale);
      return { layout, fieldOrder: getDateFieldOrder(layout) };
    }, [locale]);

    const defaultLabel = !isRange
      ? translations.dateLabel
      : rangePart === 'end'
      ? translations.endDateLabel
      : translations.startDateLabel;

    const boundDate = isRange && rangePart === 'end' ? endDate : date;
    const segmentsFromBound = useMemo(
      () => getDateSegmentsFromDate(boundDate),
      [boundDate]
    );
    const [segments, setSegments] = useState<SegmentValues>(segmentsFromBound);

    const parsedForHidden = parseSegmentsToDate(segments);
    const hiddenValue = parsedForHidden
      ? formatDateISO8601DateOnly(parsedForHidden)
      : '';

    /** True only while a segment spinbutton is focused — avoids clobbering partial typing. Icon/shell-only focus must not set this or calendar picks won't sync to segments. */
    const isInputFocusedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const segmentElRefs = useRef<
      Partial<Record<DatePartKind, HTMLSpanElement | null>>
    >({});

    const assignSegmentRef = useCallback(
      (field: DatePartKind, el: HTMLSpanElement | null) => {
        segmentElRefs.current[field] = el;
      },
      [segmentElRefs]
    );

    const onSiblingSegmentFocus = useCallback(
      (field: DatePartKind) => {
        segmentElRefs.current[field]?.focus();
      },
      [segmentElRefs]
    );

    const shellRef = useCallback(
      (el: HTMLDivElement | null) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref != null) ref.current = el;
      },
      [ref]
    );

    useEffect(() => {
      if (!isInputFocusedRef.current) {
        setSegments(segmentsFromBound);
      }
    }, [segmentsFromBound]);

    const commitParsedDate = useCallback(
      (parsed: Date) => {
        if (!isRange) {
          context.onSelection(parsed);
        }
        if (isRange && rangePart) {
          handleDateSelectRange({
            date: parsed,
            activeRangePart: rangePart,
            startDate: date,
            endDate,
            onRangeSelection: context.onRangeSelection,
            shouldDisableDate,
          });
        }
      },
      [isRange, rangePart, context, endDate, date, shouldDisableDate]
    );

    const clearSelection = useCallback(() => {
      if (!isRange) {
        context.onSelection(null);
      }
      if (isRange && rangePart) {
        if (rangePart === 'start') context.onRangeSelection(null, endDate);
        else context.onRangeSelection(date, null);
      }
    }, [isRange, rangePart, context, endDate, date]);

    const onSegmentChange = useCallback(
      (next: SegmentValues) => {
        const parsed = parseSegmentsToDate(next);
        if (parsed) commitParsedDate(parsed);
        else if (!next.month && !next.day && !next.year) clearSelection();
      },
      [clearSelection, commitParsedDate]
    );

    const onContainerBlur = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        isInputFocusedRef.current = false;
        setSegments((prev) => {
          const normalized = normalizeSegmentValues(prev);
          const parsed = parseSegmentsToDate(normalized);
          if (parsed) {
            const sameAsBound = isSameDay(parsed, boundDate);
            if (isCalendarOpen && !sameAsBound) {
              queueMicrotask(() => {
                commitParsedDate(parsed);
              });
            }
            return normalized;
          }
          if (!normalized.month && !normalized.day && !normalized.year) {
            queueMicrotask(() => {
              clearSelection();
            });
            return getDateSegmentsFromDate(null);
          }
          return segmentsFromBound;
        });
      },
      [
        containerRef,
        boundDate,
        segmentsFromBound,
        clearSelection,
        commitParsedDate,
        isCalendarOpen,
      ]
    );

    const setActiveRangePartForField = useCallback(() => {
      if (isRange && rangePart) context.setActiveRangePart(rangePart);
    }, [isRange, rangePart, context]);

    const onSegmentFocus = useCallback(() => {
      isInputFocusedRef.current = true;
      setActiveRangePartForField();
    }, [isInputFocusedRef, setActiveRangePartForField]);

    /** Focus entered the shell (segment, icon, etc.). Range targeting only — does not mark segment editing. */
    const onShellFocus = useCallback(() => {
      setActiveRangePartForField();
    }, [setActiveRangePartForField]);

    /** Pointer activation on the shell (bubbles from segments/icon). Ensures range targeting even if focus order differs from click. */
    const onShellClick = useCallback(() => {
      if (disabled) return;
      setActiveRangePartForField();
      openCalendar();
    }, [disabled, setActiveRangePartForField, openCalendar]);

    const onSegmentAltArrowDown = useCallback(() => {
      if (!isCalendarOpen) openCalendar();
      focusCalendar();
    }, [isCalendarOpen, openCalendar, focusCalendar]);

    return (
      <FormGroup
        htmlFor={inputId}
        isSoloField
        label={label ?? defaultLabel}
        mb={0}
        pb={0}
        spacing="tight"
        width="fit-content"
      >
        <SegmentedShell
          id={inputId}
          inputSize={size}
          ref={shellRef}
          role="group"
          variant={error ? 'error' : 'default'}
          width="113px"
          onBlur={onContainerBlur}
          onClick={onShellClick}
          onFocus={onShellFocus}
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
                  applySegments={onSegmentChange}
                  assignSegmentRef={assignSegmentRef}
                  disabled={!!disabled}
                  error={!!error}
                  field={item.field}
                  key={item.field}
                  nextField={nextField}
                  prevField={prevField}
                  segments={segments}
                  setSegments={setSegments}
                  onAltArrowDown={onSegmentAltArrowDown}
                  onFocus={onSegmentFocus}
                  onSiblingFocus={onSiblingSegmentFocus}
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
          >
            <MiniCalendarIcon aria-hidden size={16} />
          </FlexBox>
        </SegmentedShell>
      </FormGroup>
    );
  }
);

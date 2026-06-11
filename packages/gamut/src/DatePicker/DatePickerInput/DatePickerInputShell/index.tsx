import { MiniCalendarIcon } from '@codecademy/gamut-icons';
import {
  type FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../../../Box';
import { IconButton } from '../../../Button';
import type { InputWrapperProps } from '../../../Form/inputs/Input';
import { isSameDay } from '../../DatePickerCalendar/Calendar/utils/dateGrid';
import { handleDateSelectRange } from '../../DatePickerCalendar/utils/dateSelect';
import { useDatePicker } from '../../DatePickerContext';
import { DatePickerInputSegment } from '../Segment';
import { SegmentLiteral } from '../Segment/elements';
import {
  getDateSegmentsFromDate,
  normalizeSegmentValues,
  parseSegmentsToDate,
  type SegmentValues,
} from '../Segment/utils';
import { SegmentedShell } from './elements';
import {
  type DatePartKind,
  formatDateISO8601DateOnly,
  getDateFieldOrder,
  getDateFormatLayout,
} from './utils';

export type DatePickerInputShellProps = Omit<
  InputWrapperProps,
  'className' | 'type' | 'icon' | 'value' | 'onChange' | 'color' | 'label'
> & {
  labelledById: string;
  rangePart?: 'start' | 'end';
  shellId: string;
};

export const DatePickerInputShell = forwardRef<
  HTMLDivElement,
  DatePickerInputShellProps
>(
  (
    {
      disabled,
      error,
      form,
      labelledById,
      name,
      rangePart,
      shellId,
      size = 'base',
      ...rest
    },
    ref
  ) => {
    const context = useDatePicker();

    const {
      mode,
      openCalendar,
      focusCalendar,
      locale,
      isCalendarOpen,
      disableDate,
      translations,
    } = context;

    const isRange = mode === 'range';
    const endDate = isRange ? context.endDate : null;
    const date = isRange ? context.startDate : context.selectedDate;

    const buttonRef = useRef<HTMLButtonElement>(null);

    const { layout, fieldOrder } = useMemo(() => {
      const layout = getDateFormatLayout(locale);
      return { layout, fieldOrder: getDateFieldOrder(layout) };
    }, [locale]);

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

    const isInputFocusedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const segmentElRefs = useRef<
      Partial<Record<DatePartKind, HTMLSpanElement | null>>
    >({});

    const assignSegmentRef = useCallback(
      (field: DatePartKind, el: HTMLSpanElement | null) => {
        segmentElRefs.current[field] = el;
      },
      []
    );

    const onSiblingSegmentFocus = useCallback((field: DatePartKind) => {
      segmentElRefs.current[field]?.focus();
    }, []);

    const shellRef = useCallback(
      (el: HTMLDivElement | null) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref !== null) ref.current = el;
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
            disableDate,
          });
        }
      },
      [isRange, rangePart, context, endDate, date, disableDate]
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
    }, [setActiveRangePartForField]);

    const onShellFocus = useCallback(() => {
      setActiveRangePartForField();
    }, [setActiveRangePartForField]);

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
      <SegmentedShell
        aria-labelledby={labelledById}
        id={shellId}
        inputSize={size}
        ref={shellRef}
        role="group"
        variant={error ? 'error' : 'default'}
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
          name={name ?? 'datePickerInput'}
          tabIndex={-1}
          type="hidden"
          value={hiddenValue}
        />
        <IconButton
          mx={4}
          icon={MiniCalendarIcon}
          size="small"
          tip={translations.openCalendarLabel}
          ref={buttonRef}
          onClick={() => buttonRef.current?.blur()}
        />
      </SegmentedShell>
    );
  }
);

import { MiniCalendarIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
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
import { IconButton } from '../../Button';
import { FormError } from '../../Form/elements/FormError';
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
import { validateSegments } from './utils/validation';

/* FormError's `absolute` variant takes the message out of layout flow (anchored
   to FormGroup's position: relative container), so the input never changes height:
   the range-mode arrow stays aligned and no space is reserved when there's no error. */
const AbsoluteFormError = styled(FormError)(
  css({
    // max-content keeps the message on one line rather than wrapping into the
    // narrow input width.
    width: 'max-content',
    // The `absolute` variant anchors at top: calc(100% - 8px), which overlaps the
    // bottom of the input. Nudge it down below the input with a small gap.
    mt: 12,
  })
);

export type DatePickerInputProps = Omit<
  InputWrapperProps,
  'className' | 'type' | 'icon' | 'value' | 'onChange' | 'color' | 'error'
> & {
  /** In range mode: which part of the range this input edits. Omit for single-date or combined display. */
  rangePart?: 'start' | 'end';
  /** Error message to display. String for specific error, undefined for no error. */
  error?: string;
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
      disableDate,
      setHasError,
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
    const [inputError, setInputError] = useState<string>('');

    const parsedForHidden = parseSegmentsToDate(segments);
    const hiddenValue = parsedForHidden
      ? formatDateISO8601DateOnly(parsedForHidden)
      : '';

    const isInputFocusedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
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
        const validationResult = validateSegments(
          next,
          translations,
          disableDate
        );
        if (validationResult.isValid) {
          setInputError('');
          setHasError(false);
          commitParsedDate(validationResult.date);
        } else if (!next.month && !next.day && !next.year) {
          setInputError('');
          setHasError(false);
          clearSelection();
        } else if (validationResult.errorMessage) {
          setInputError(validationResult.errorMessage);
          setHasError(true);
        }
      },
      [clearSelection, commitParsedDate, translations, disableDate, setHasError]
    );

    const onContainerBlur = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        isInputFocusedRef.current = false;
        setSegments((prev) => {
          // Check if all segments are empty
          if (!prev.month && !prev.day && !prev.year) {
            setInputError('');
            setHasError(false);
            queueMicrotask(() => {
              clearSelection();
            });
            return getDateSegmentsFromDate(null);
          }

          // Validate raw input (without normalizing/clamping)
          const validationResult = validateSegments(
            prev,
            translations,
            disableDate
          );

          if (validationResult.isValid) {
            // Valid complete date - normalize and commit
            setInputError('');
            setHasError(false);
            const normalized = normalizeSegmentValues(prev);
            const sameAsBound = isSameDay(validationResult.date, boundDate);
            if (isCalendarOpen && !sameAsBound) {
              queueMicrotask(() => {
                commitParsedDate(validationResult.date);
              });
            }
            return normalized;
          }

          // Incomplete entry on blur - show the incomplete-date error
          if (!validationResult.errorMessage) {
            setInputError(translations.invalidDateIncomplete);
            setHasError(true);
            return prev; // Keep incomplete input visible so user can correct it
          }

          // Invalid complete entry - show error and keep invalid input visible
          setInputError(validationResult.errorMessage);
          setHasError(true);
          return prev;
        });
      },
      [
        containerRef,
        boundDate,
        segmentsFromBound,
        clearSelection,
        commitParsedDate,
        isCalendarOpen,
        translations,
        disableDate,
        setHasError,
      ]
    );

    const setActiveRangePartForField = useCallback(() => {
      if (isRange && rangePart) context.setActiveRangePart(rangePart);
    }, [isRange, rangePart, context]);

    const onSegmentFocus = useCallback(() => {
      isInputFocusedRef.current = true;
      setActiveRangePartForField();
    }, [isInputFocusedRef, setActiveRangePartForField]);

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
      <FormGroup
        id={inputId}
        isSoloField
        label={label ?? defaultLabel}
        mb={0}
        pb={0}
        spacing="tight"
        width="fit-content"
      >
        <SegmentedShell
          aria-invalid={!!inputError}
          aria-labelledby={inputId}
          inputSize={size}
          ref={shellRef}
          role="group"
          variant={inputError ? 'error' : 'default'}
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
                  error={!!inputError}
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
        {inputError && (
          <AbsoluteFormError aria-live="polite" role="alert" variant="absolute">
            {inputError}
          </AbsoluteFormError>
        )}
      </FormGroup>
    );
  }
);

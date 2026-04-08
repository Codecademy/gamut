import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useId,
  useRef,
} from 'react';

import type { DatePartKind } from '../utils';
import { Segment } from './elements';
import {
  appendSegmentDigit,
  getSegmentSpinBounds,
  parseSegmentNumericString,
  segmentMaxLength,
  segmentPlaceholder,
  SegmentValues,
  spinSegment,
} from './segmentUtils';

export type DatePickerInputSegmentProps = {
  field: DatePartKind;
  segments: SegmentValues;
  disabled: boolean;
  error: boolean;
  handleOnFocus: () => void;
  focusOrOpenCalendarGrid: () => void;
  setSegments: Dispatch<SetStateAction<SegmentValues>>;
  prevField: DatePartKind | null;
  nextField: DatePartKind | null;
  applySegments: (next: SegmentValues) => void;
};

/**
 * Editable date unit (`role="spinbutton"`). Focus with Tab; type digits or use Arrow up/down.
 */
export const DatePickerInputSegment: React.FC<DatePickerInputSegmentProps> = ({
  field,
  segments,
  disabled,
  error,
  handleOnFocus,
  focusOrOpenCalendarGrid,
  setSegments,
  prevField,
  nextField,
  applySegments,
}) => {
  const { min, max } = getSegmentSpinBounds(field, segments);
  const n = parseSegmentNumericString(segments[field]);
  const ariaValue = segments[field].length > 0 && n != null ? n : undefined;
  const display =
    segments[field].length > 0 ? segments[field] : segmentPlaceholder(field);
  const inputID = useId();
  const inputId = `datepicker-input-${inputID.replace(/:/g, '')}`;
  const segmentRefs = useRef<
    Partial<Record<DatePartKind, HTMLSpanElement | null>>
  >({});

  const focusField = useCallback((field: DatePartKind) => {
    segmentRefs.current[field]?.focus();
  }, []);

  const handleSegmentKeyDown = useCallback(
    (field: DatePartKind) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;

      if (e.altKey && (e.key === 'ArrowDown' || e.key === 'Down')) {
        e.preventDefault();
        focusOrOpenCalendarGrid();
        return;
      }

      if (e.key === 'ArrowLeft') {
        if (prevField) {
          e.preventDefault();
          focusField(prevField);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        if (nextField) {
          e.preventDefault();
          focusField(nextField);
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSegments((prev) => {
          const next = {
            ...prev,
            [field]: spinSegment(field, prev, 1),
          };
          applySegments(next);
          return next;
        });
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSegments((prev) => {
          const next = {
            ...prev,
            [field]: spinSegment(field, prev, -1),
          };
          applySegments(next);
          return next;
        });
        return;
      }

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        setSegments((prev) => {
          if (prev[field].length > 0) {
            const next = {
              ...prev,
              [field]: prev[field].slice(0, -1),
            };
            applySegments(next);
            return next;
          }
          if (prevField) {
            queueMicrotask(() => focusField(prevField));
          }
          return prev;
        });
        return;
      }

      // if the key is a single digit and is a number, append the digit to the segment
      if (e.key.length === 1 && /^\d$/.test(e.key)) {
        e.preventDefault();
        setSegments((prev) => {
          const next = {
            ...prev,
            [field]: appendSegmentDigit(field, prev[field], e.key),
          };
          applySegments(next);
          const maxLen = segmentMaxLength(field);
          if (next[field].length >= maxLen && nextField) {
            queueMicrotask(() => focusField(nextField));
          }
          return next;
        });
      }
    },
    [
      disabled,
      focusOrOpenCalendarGrid,
      prevField,
      focusField,
      nextField,
      setSegments,
      applySegments,
    ]
  );

  return (
    <Segment
      aria-disabled={disabled}
      aria-invalid={error}
      aria-label={field}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={ariaValue}
      aria-valuetext={display}
      data-segment={field}
      default={segments[field].length === 0}
      field={field}
      id={`${inputId}-${field}`}
      ref={(el) => {
        segmentRefs.current[field] = el;
      }}
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      onFocus={handleOnFocus}
      onKeyDown={handleSegmentKeyDown(field)}
    >
      {display}
    </Segment>
  );
};

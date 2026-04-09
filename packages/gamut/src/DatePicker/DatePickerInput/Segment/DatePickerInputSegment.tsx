import { type Dispatch, type SetStateAction, useCallback, useId } from 'react';

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

export type AssignSegmentRef = (
  field: DatePartKind,
  el: HTMLSpanElement | null
) => void;

export type DatePickerInputSegmentProps = {
  field: DatePartKind;
  segments: SegmentValues;
  disabled: boolean;
  error: boolean;
  handleOnFocus: () => void;
  focusOrOpenCalendarGrid: () => void;
  /** Focus a sibling segment; must use refs registered via `assignSegmentRef` (owned by parent). */
  focusSegmentField: (field: DatePartKind) => void;
  assignSegmentRef: AssignSegmentRef;
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
  focusSegmentField,
  assignSegmentRef,
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
          focusSegmentField(prevField);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        if (nextField) {
          e.preventDefault();
          focusSegmentField(nextField);
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
            queueMicrotask(() => focusSegmentField(prevField));
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
            queueMicrotask(() => focusSegmentField(nextField));
          }
          return next;
        });
      }
    },
    [
      disabled,
      focusOrOpenCalendarGrid,
      prevField,
      focusSegmentField,
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
      ref={(el) => assignSegmentRef(field, el)}
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      onFocus={handleOnFocus}
      onKeyDown={handleSegmentKeyDown(field)}
    >
      {display}
    </Segment>
  );
};

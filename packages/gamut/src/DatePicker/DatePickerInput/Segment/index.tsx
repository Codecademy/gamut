import { type Dispatch, type SetStateAction, useCallback, useId } from 'react';

import type { DatePartKind } from '../utils';
import { Segment } from './elements';
import {
  appendSegmentDigit,
  getSegmentPlaceholder,
  getSegmentSpinBounds,
  parseSegmentNumericString,
  segmentMaxLength,
  SegmentValues,
  spinSegment,
} from './utils';

export type AssignSegmentRef = (
  field: DatePartKind,
  el: HTMLSpanElement | null
) => void;

export type DatePickerInputSegmentProps = {
  field: DatePartKind;
  segments: SegmentValues;
  disabled: boolean;
  error: boolean;
  onFocus: () => void;
  onAltArrowDown: () => void;
  /** Focus a sibling segment; must use refs registered via `assignSegmentRef` (owned by parent). */
  onSiblingFocus: (field: DatePartKind) => void;
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
  onFocus,
  onAltArrowDown,
  onSiblingFocus,
  assignSegmentRef,
  setSegments,
  prevField,
  nextField,
  applySegments,
}) => {
  const { min, max } = getSegmentSpinBounds({ field, segments });
  const numericValue = parseSegmentNumericString(segments[field]);
  const ariaValue =
    segments[field].length > 0 && numericValue != null
      ? numericValue
      : undefined;
  const display =
    segments[field].length > 0 ? segments[field] : getSegmentPlaceholder(field);
  const inputID = useId();
  const inputId = `datepicker-input-${inputID.replace(/:/g, '')}`;

  const onKeyDown = useCallback(
    (field: DatePartKind) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;

      if (e.altKey && (e.key === 'ArrowDown' || e.key === 'Down')) {
        e.preventDefault();
        e.stopPropagation();
        onAltArrowDown();
        return;
      }

      if (e.key === 'ArrowLeft') {
        if (prevField) {
          e.preventDefault();
          onSiblingFocus(prevField);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        if (nextField) {
          e.preventDefault();
          onSiblingFocus(nextField);
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSegments((prev) => {
          const next = {
            ...prev,
            [field]: spinSegment({ field, segments: prev, delta: 1 }),
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
            [field]: spinSegment({ field, segments: prev, delta: -1 }),
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
            queueMicrotask(() => onSiblingFocus(prevField));
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
            [field]: appendSegmentDigit({
              field,
              prev: prev[field],
              digit: e.key,
            }),
          };
          applySegments(next);
          const maxLen = segmentMaxLength(field);
          if (next[field].length >= maxLen && nextField) {
            queueMicrotask(() => onSiblingFocus(nextField));
          }
          return next;
        });
      }
    },
    [
      disabled,
      onAltArrowDown,
      prevField,
      onSiblingFocus,
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
      id={`${inputId}-${field}`}
      isEmpty={segments[field].length === 0}
      isYear={field === 'year'}
      ref={(el) => assignSegmentRef(field, el)}
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      onFocus={onFocus}
      onKeyDown={onKeyDown(field)}
    >
      {display}
    </Segment>
  );
};

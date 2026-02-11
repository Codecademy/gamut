/**
 * React 19 / Emotion type compatibility polyfills.
 *
 * REMOVE THIS FILE when Emotion 12 (and/or @types/react) fully support React 19
 * (e.g. optional onResize, nullable refs). Until then, these module augmentations
 * keep Gamut and its consumers type-checking with both React 18 and 19.
 *
 * Contents:
 * - HTMLAttributes: onResize / onResizeCapture optional (React 19 added them as required)
 * - RefAttributes: ref accepts LegacyRef<T | null> (useRef(null) gives RefObject<T | null>)
 */

import type { SyntheticEvent } from 'react';
import type React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    onResize?: (event: SyntheticEvent<T>) => void;
    onResizeCapture?: (event: SyntheticEvent<T>) => void;
  }

  interface RefAttributes<T> {
    /** Explicit union so RefObject<T | null> from useRef(initial) is accepted (React 19 / strict refs). */
    ref?:
      | React.RefObject<T | null>
      | React.RefCallback<T | null>
      | null
      | undefined;
  }
}

/**
 * Not in this file (must stay in component code until upstream fixes):
 * - forwardRef<T | null> and ref prop overrides (ButtonBaseRef, etc.) – component API
 * - Union-narrowing ref casts in Anchor and ButtonBase (ref can be anchor|button) – implementation detail
 * - Button union (onAnimationStart) casts in SubmitButton/GridFormButtons – union typing
 * - Optional href on ButtonProps – Gamut API choice for link-style buttons
 */

/** Cleanup when Emotion 12 / @types/react support React 19: see packages/gamut/docs/EMOTION_12_CLEANUP.md */

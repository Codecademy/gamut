/**
 * React 19 / Emotion type compatibility polyfills.
 *
 * REMOVE THIS FILE when @emotion/styled and @types/react fully support React 19
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
    ref?: React.LegacyRef<T | null> | undefined;
  }
}

/**
 * Not in this file (must stay in component code until upstream fixes):
 * - forwardRef<T | null> and ref prop overrides (ButtonBaseRef, etc.) – component API
 * - Casts when passing ref to DOM (ref as LegacyRef<T>) – implementation detail
 * - Button union (onAnimationStart) casts in SubmitButton/GridFormButtons – union typing
 * - Optional href on ButtonProps – Gamut API choice for link-style buttons
 */

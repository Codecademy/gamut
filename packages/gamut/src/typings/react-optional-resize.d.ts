/**
 * Makes onResize and onResizeCapture optional on DOM attributes.
 * React 19 added these to HTMLAttributes; without this augmentation they can
 * be required and break every component that forwards div/anchor/etc. props.
 * One central fix keeps Gamut compatible with both React 18 and 19.
 */
import type { SyntheticEvent } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    onResize?: (event: SyntheticEvent<T>) => void;
    onResizeCapture?: (event: SyntheticEvent<T>) => void;
  }
}

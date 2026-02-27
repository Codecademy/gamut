import { GamutIconProps } from '@codecademy/gamut-icons';
import type { ComponentProps, ElementType } from 'react';

export interface WithChildrenProp {
  children?: React.ReactNode | React.ReactNode[];
}

export type IconComponentType = { icon: React.ComponentType<GamutIconProps> };

/**
 * Optional scroll event handlers (React 19+).
 * Explicitly optional so consumers on React 18 don't get type errors
 * when Gamut is built with React 19 types.
 */
export interface OptionalScrollProps {
  onScrollEnd?: (event: React.UIEvent<HTMLElement>) => void;
  onScrollEndCapture?: (event: React.UIEvent<HTMLElement>) => void;
}

/** Makes onScrollEnd/onScrollEndCapture optional when merging with React 19 DOM types. */
export type WithOptionalScrollProps<T> = Omit<
  T,
  'onScrollEnd' | 'onScrollEndCapture'
> &
  OptionalScrollProps;

/**
 * Component props compatible with React 18 consumers when Gamut is built with React 19 types.
 * Use instead of ComponentProps for DOM-based components so onScrollEnd/onScrollEndCapture
 * stay optional. Downstream types that extend or reference these props get the same compatibility.
 */
export type CompatibleComponentProps<T extends ElementType> =
  WithOptionalScrollProps<ComponentProps<T>>;

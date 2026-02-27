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

/**
 * Ref type compatible with React 18 and 19.
 * In React 18 @types/react, Ref<T> does not include RefObject<T | null>, so useRef<T | null>(null)
 * can cause TS2322. Using this type in component ref props avoids that without patching @types/react.
 */
export type CompatibleRef<T> =
  | React.RefCallback<T>
  | React.RefObject<T>
  | React.RefObject<T | null>
  | null;

/**
 * RefAttributes with ref typed as CompatibleRef so React 18 consumers can pass
 * useRef<Element | null>(null) without type errors. Use with ForwardRefExoticComponent.
 */
export type CompatibleRefAttributes<R> = Omit<React.RefAttributes<R>, 'ref'> & {
  ref?: CompatibleRef<R>;
};

/**
 * Props type for a styled layout/DOM component with React 18–compatible scroll and ref.
 * Use with asCompatibleForwardRefComponent so call sites don’t need casts.
 */
export type CompatibleStyledComponentProps<
  C extends React.ComponentType<unknown>,
  R extends HTMLElement
> = WithOptionalScrollProps<React.ComponentProps<C>> &
  CompatibleRefAttributes<R>;

/**
 * Treats a styled component (Emotion StyledComponent) as a ForwardRefExoticComponent
 * with compatible props. Emotion’s type doesn’t extend React’s ForwardRefExoticComponent,
 * so this centralizes the type assertion instead of repeating it in each file.
 */
export function asCompatibleForwardRefComponent<P extends CompatibleRefAttributes<HTMLElement>>(
  component: React.ComponentType<P>
): React.ForwardRefExoticComponent<P> {
  return component as unknown as React.ForwardRefExoticComponent<P>;
}

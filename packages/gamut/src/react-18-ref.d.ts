import 'react';

declare module 'react' {
  export type Ref<T> =
    | import('react').RefCallback<T>
    | import('react').RefObject<T>
    | import('react').RefObject<T | null>
    | null;
  export type LegacyRef<T> = Ref<T>;
}

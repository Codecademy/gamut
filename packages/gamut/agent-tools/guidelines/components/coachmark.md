# Coachmark

**Storybook:** [Molecules / Coachmark](https://gamut.codecademy.com/?path=/docs-molecules-coachmark--docs)

## Popovers: `outline` and `CheckerDense` by default

Pass `outline: true` and `pattern: CheckerDense` (from `@codecademy/gamut-patterns`) via `popoverProps` unless explicitly overridden.

```tsx
import { Coachmark } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';

<Coachmark
  popoverProps={{
    outline: true,
    pattern: CheckerDense,
  }}
>
  {/* ... */}
</Coachmark>;
```

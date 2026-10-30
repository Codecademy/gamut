# Coachmark

## Popovers must use `outline` and `CheckerDense` pattern by default

Always pass `outline: true` and `pattern: CheckerDense` (from `@codecademy/gamut-patterns`) via `popoverProps` unless explicitly overridden.

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

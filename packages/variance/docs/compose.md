# Composition

There may be instances where you would like to combine properties for ease of sharing or performance to batch their computations. To make this easy we've added a compose function to combine returned style functions into a single one with the intersection of all of their props.

By default system will return a few groups of composed or group functions `typography`, `layout`, `spacing`,`border`, `background`, `color`, `flexbox`,`grid`.

However, we expose a `compose` function to combine any style function as necessary.

```tsx
import { variance } from '@codecademy/variance';
import { fontSize, letterSpacing } from '@codecademy/gamut-styles';

const boxProps = variance.compose(letterSpacing, fontSize);

const Box = styled.div(boxProps);
```

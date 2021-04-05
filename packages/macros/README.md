# `@codecademy/macros`

Simple babel utility macros.

## Usage

### `title.macro`

This is used to derive the correct story hierarchy from the file path ensuring the file system and storybook hierarchy will be identical.

```tsx
// stories/Atoms/Button.stories.mdx
import title from '@codecademy/macros/lib/title.macro';

console.log(title); // Atoms/Button
```

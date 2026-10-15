# Documentation in code

Prop JSDoc, code comments, and naming inside component source files.

Documenting in the source file creates a single source of truth that stays in sync with the implementation. Prop JSDoc in particular has two audiences beyond the reader of the file: TypeScript surfaces it on hover in the editor, and Storybook renders it into the props table that `<Controls />` produces on the component's doc page. Writing it is part of documenting the component, not a separate chore.

## Prop JSDoc

Use `/** */` blocks on the props type:

```tsx
export type ButtonProps = {
  /**
   * The visual style variant of the button.
   */
  variant: 'primary' | 'secondary';

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
};
```

Guidelines:

- Write full sentences, with a period.
- Start a boolean description with "Whether": "Whether the button is disabled."
- Describe what the prop controls, not its type — TypeScript already prints the type into the table. `variant: 'primary' | 'secondary'` needs "The visual style variant of the button", not "A string that is either primary or secondary".
- Say what a value means when the name does not: if `tipAlignment` defaults to `bottom-center`, note the default.
- Optionality shows up in the table from `?`, so there is no need to write "Optional."
- Use discretion about whether a prop needs a comment. When unsure, include one — a self-evident comment costs a line, while a missing one on a subtle prop costs the reader a trip to the source.

A comment that restates the prop name adds nothing:

```tsx
// ❌ Says only what the name already says
/**
 * The onClick handler.
 */
onClick?: () => void;

// ✅ Says when it fires and what it receives
/**
 * Called when the user dismisses the alert. Receives no arguments; the parent
 * owns the alert's visibility.
 */
onClose?: () => void;
```

## Code comments

Comments explain _why_ code exists, not _what_ it does. Names handle the "what". Reserve comments for decisions a reader would otherwise have to reverse-engineer.

**Worth a comment**

Complex logic — the algorithm or the reason for it:

```tsx
// Use binary search for O(log n) performance on sorted arrays
const index = binarySearch(sortedArray, target);
```

Business or spec constraints — the requirement behind the line:

```tsx
// Per WCAG 2.2, focus must return to trigger element on close
previousFocusRef.current?.focus();
```

Workarounds — what is being worked around, and when it can go:

```tsx
// Safari doesn't support :focus-visible, fallback to :focus
// TODO: Remove when Safari 15+ is minimum supported version
```

Non-obvious decisions — why the strange-looking thing is correct:

```tsx
// Delay state update to avoid race condition with async validation
setTimeout(() => setIsValid(true), 0);
```

**Not worth a comment**

Self-explanatory code, where a good name already carries the meaning:

```tsx
// ❌ Bad: Comment restates the code
// Set loading to true
setIsLoading(true);

// ✅ Good: Code is self-documenting
setIsLoading(true);
```

Commented-out code — delete it. Git tracks history, and a commented block leaves the next reader guessing whether it is a work in progress or debris:

```tsx
// ❌ Bad: Dead code clutters the file
// const oldImplementation = () => { ... };
```

**Style**

- `//` for single-line comments, with a space after the slashes.
- `/** */` for JSDoc on exports — functions, types, and components.
- Complete sentences with proper punctuation.
- Update the comment when the code changes. A stale comment is more harmful than none, because it is trusted.

## Naming

Clear names remove the need for most comments, so naming is the first documentation decision in a file.

**Variables and constants**

- `camelCase`: `userName`, `isLoading`, `itemCount`
- Names that reveal purpose: `filteredResults`, not `arr`
- Booleans take an `is`, `has`, `should`, or `can` prefix: `isVisible`, `hasError`, `shouldRender`
- `SCREAMING_SNAKE_CASE` for true constants: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`
- Plurals for arrays and collections: `users`, `menuItems`
- Single letters only in short loops or mathematical operations

**Functions and methods**

- `camelCase`, starting with a verb that names the action: `get`, `set`, `fetch`, `handle`, `render`, `calculate`
- Event handlers take a `handle` prefix: `handleSubmit`, `handleClickOutside`
- Functions returning a boolean read as a question: `isValidEmail`, `canAccessResource`, `hasPermission`
- Concise but descriptive: `fetchUserProfile`, not `getUserProfileDataFromAPI`

**Components**

- `PascalCase`: `Button`, `UserProfile`, `NavigationMenu`
- The folder matches the component name, and the file inside matches it too: `Button/Button.tsx`, `UserProfile/UserProfile.tsx`
- Names that indicate purpose: `SkipToContent`, `RadialProgress`, `Toggle`
- Avoid `Component`, `Container`, or `Wrapper` without further context — they describe the shape of the code rather than what it does

---
title: Contributing to Gamut
description: How to propose, build, and document changes to Gamut.
---

## Prework

We track planned work for Gamut components in the [Gamut Board](https://skillsoftdev.atlassian.net/jira/software/projects/GM/boards/784) on JIRA.

- If there's a ticket there you want to take on, send a Slack message to `#gamut-team` or come to Gamut Office Hours to talk it through.
- If the work you'd like to do isn't captured in a JIRA ticket, talk to us first and we'll help create one.
- To request work be done, discuss it with us on Slack or during Gamut Office Hours.
- To pitch a change to the design system, attend Gamut Crit, come to Gamut Office Hours, or message `#gamut-team`.

## Writing components

### Component structure

Create your component as an `index.tsx` file in a PascalCase-named folder within its package directory — for example, `packages/gamut/src/ProgressBar/index.tsx`. Consider saving this shape as an editor snippet:

```tsx
import React from 'react';

export type MyComponentProps = {
  /* ... */
};

export const MyComponent: React.FC<MyComponentProps> = (
  {
    /* ... */
  }
) => {
  // ...
};
```

### Naming conventions

Clear, descriptive names reduce the need for comments and make code self-documenting.

**Variables and constants**

- Use `camelCase`: `userName`, `isLoading`, `itemCount`.
- Use names that reveal purpose: `filteredResults`, not `arr`.
- Prefix booleans with `is`, `has`, `should`, or `can`: `isVisible`, `hasError`, `shouldRender`.
- Use `SCREAMING_SNAKE_CASE` for true constants: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`.
- Avoid single-letter names, except in short loops or math.
- Use plural names for arrays and collections: `users`, `menuItems`.

**Functions and methods**

- Use `camelCase`, starting with a verb that describes the action: `get`, `set`, `fetch`, `handle`, `render`, `calculate`.
- Prefix event handlers with `handle`: `handleSubmit`, `handleClickOutside`.
- Phrase a boolean-returning function as a question: `isValidEmail`, `canAccessResource`, `hasPermission`.
- Keep names concise but descriptive: `fetchUserProfile`, not `getUserProfileDataFromAPI`.

**Components**

- Use `PascalCase`: `Button`, `UserProfile`, `NavigationMenu`.
- Name the folder to match the component, and the file inside it to match the folder: `Button/Button.tsx`.
- Use names that indicate purpose — `SkipToContent`, `RadialProgress`, `Toggle` — and avoid generic ones like `Component`, `Container`, or `Wrapper` without further context.

### Code comments

Comments should explain _why_ code exists, not _what_ it does — well-named variables and functions already handle the "what." Reserve comments for non-obvious decisions, complex logic, and important context:

```tsx
// Use binary search for O(log n) performance on sorted arrays
const index = binarySearch(sortedArray, target);

// Per WCAG 2.2, focus must return to the trigger element on close
previousFocusRef.current?.focus();

// Safari doesn't support :focus-visible, fallback to :focus
// TODO: Remove when Safari 15+ is the minimum supported version

// Delay state update to avoid a race condition with async validation
setTimeout(() => setIsValid(true), 0);
```

Skip a comment when the code is already self-explanatory:

```tsx
// Avoid: the comment only restates the code
// Set loading to true
setIsLoading(true);

// Prefer: the code is already self-documenting
setIsLoading(true);
```

Delete commented-out code instead of leaving it in place — git already tracks its history.

**Style:** use `//` for single-line comments, with a space after the slashes; use `/** */` JSDoc comments on exports (functions, types, components); write complete sentences with proper punctuation; keep comments up to date as the code changes.

### Props documentation

Add a [JSDoc](https://jsdoc.app/) comment to a prop unless it's widespread and self-documenting, like `onClick`. These comments show up in TypeScript on hover, and in the props table of the component's Storybook story:

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

- Write full sentences.
- Start a boolean's description with "Whether".
- Document which props are required versus optional, and include type information.
- Use your judgment on borderline cases — when unsure, include the comment.

### Unit tests

Add unit tests in a `__tests__/MyComponent-test.tsx` file within the component's directory, using `setupRtl` from `gamut-tests`. Unit test all component logic, with the exception of class names on components that already contain other tested logic.

## Writing stories

Every component needs Storybook stories demonstrating its use, in a `.stories.tsx` file alongside a `.mdx` documentation file. This structure is the source every component page's `StoryEmbed`s pull from, so both files need to stay accurate.

### File structure and naming

The folder structure mirrors both Gamut's atomic-design tiers and the generated Storybook hierarchy. Find the right folder under `packages/styleguide/src/lib` (`Atoms`, `Molecules`, `Organisms`, and so on), then create a new folder containing `ComponentName.stories.tsx` and `ComponentName.mdx` — plus any example or utility files the stories need.

- Non-component files with more than one word use a space and sentence case: `General principles.mdx`.
- Component-related files use the component's own `PascalCase` name: `RadialProgress.mdx`.

### Writing the `.mdx` documentation file

A component's `.mdx` file combines its interactive stories with written documentation, usage guidance, and metadata. A good one has four parts:

1. **General information** — set in the file's `parameters` object: `title` (the component's name, used for linking), `subtitle` (what it does and when to reach for it), `source` (its package and a GitHub link), `status` (`current`, `updating`, `deprecated`, or `static`), and `design` (a Figma link).
2. **Flagship story and props** — a single default story showing the component's baseline state, with `sourceState="shown"` on its `Canvas` so the code is visible, and a connected props table right below it.
3. **Variation stories** — a subsection per meaningful behavior or configuration, each showing one variation with a short description and any variant-specific guidance.
4. **Usage instructions** — when to use the component (and when not to), plus any guidelines a reader should follow.

### Writing the `.stories.tsx` code file

Use concrete, realistic example values instead of placeholders like `foo`/`bar` — a boolean controlling a modal should be named `isModalOpen`, not `isBar`, so the example reads like something a consumer would actually write.

Don't abstract a story's rendering into a separate helper component just to stay DRY — Storybook's "Show code" button can't see through that abstraction, so a reader who wants to copy the example gets an unhelpful stub instead of working code:

```tsx
// Avoid: hides the real code behind an abstraction
export const Default: Story = {
  render: (args) => <InfoTipExample {...args} />,
};

// Prefer: the actual code a reader can copy and use
export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text>
      <InfoTip {...args} />
    </FlexBox>
  ),
};
```

### Group overview pages

When a folder holds more than one related component or story, add an `About.mdx` file as its landing page — for example, the Icons folder's `About.mdx` links out to its Mini and Regular sub-pages. Give it a clear overview of what the folder contains and how its components relate, organized by importance or usage frequency, and keep it concise — it's an entry point, not detailed documentation.

## Formatting

**Numbers and units**

- Use numerals for all numbers, with commas for thousands (1,000).
- Use standard units — `px`, `rem`, `em`, `%`.
- In prose, put a space between a number and its unit ("16 pixels"); in code, don't ("16px").

**Lists**

- Bulleted lists are for unordered items — keep them in parallel structure, and end each item with a period only if it's a complete sentence.
- Numbered lists are for sequential steps or prioritized items — start each item with a capital letter.

**Code blocks**

- Use triple backticks with a language identifier (` ```tsx `, ` ```javascript `, ` ```css `).
- Include comments for complex examples, and keep examples concise and focused.

**Headings**

- Start at the second level (`##`) — the first level is set automatically from the page's title.
- Don't skip a heading level; it breaks the reading order.

**Whitespace**

- Separate sections with a blank line, and never stack multiple consecutive blank lines.
- Indent code consistently — 2 spaces for TypeScript/TSX, with tabs set to 2 spaces if you use them.

## Linking

**Internal links**

In Storybook's own `.mdx` files, use the `LinkTo` component with an `id` matching the target story's id:

```tsx
import { LinkTo } from '~styleguide/blocks';

<LinkTo id="Atoms/Animations/About">Animation</LinkTo>;
```

- Link text describes the destination, not the action — "See the Stories page," not "Click here."
- Make link text meaningful out of context: "the Stories page," not "click here."
- Link a component's name to its documentation.
- Verify the link actually works.
- Use at least 2–3 words, so the link is easy to click.
- Give each link unique text when more than one appears on the same page.

**External links**

Use a plain Markdown link for something like an external tool or reference — most renderers already open these in a new tab:

```markdown
[GitHub Repository](https://github.com/Codecademy/gamut)
```

For more control over the link itself — for example, inside a component that needs an `Anchor` — pass `target="_blank"` together with `rel="noreferrer"` for security, but don't force that behavior unless it's actually needed; a reader can already choose to open a link in a new tab themselves.

## Referencing code

**Code in text**

- Use backticks for inline code: props, CSS properties, component names, prop values (`onClick`, `flex-direction`, `Box`, `true`).
- Use backticks for file and package names too: `Button.tsx`, `package.json`, `@codecademy/gamut`.
- Refer to a component as "the `Box` component" on first mention, then "the component" afterward.
- Keep a component name singular even when referring to several instances — "these `Box` components," not "these `Boxes`."

**Code samples**

Include the necessary imports, use realistic and working examples, add comments for complex logic, keep each example focused on one concept, and use TypeScript types:

```tsx
import { StrokeButton } from '@codecademy/gamut';

export const SimpleButtonExample: React.FC = () => (
  <StrokeButton variant="primary">Click me</StrokeButton>
);
```

**Command-line syntax**

Use shell (`sh`) syntax highlighting, skip the prompt symbol (`$`), and put one command per block unless several are directly related:

```bash
yarn add @codecademy/gamut-kit
```

**File paths**

Use backticks for file paths (`packages/gamut/src/Button/index.tsx`); use a relative path when the context already makes it clear (`./types.ts`), and a workspace-root path when it doesn't. Say "in the `ComponentName.mdx` file" for a code location, rather than a bare path.

**UI element references**

- Bold a UI label: **Next**, **Back**, **Close**.
- Describe where an element is: "Click the **Theme Switcher** (paintbrush icon)."
- Use sentence case: "the **Show code** button."
- Prefer device-agnostic language — "click," not a touch- or mouse-specific verb.
- Avoid directional language like "the form on the right" or "the section above" — say "the following form" or "the previous section" instead.

## Pull requests

Fill out the pull request template, including links to the corresponding design file and JIRA ticket.

:::tip
Use a [draft PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests) to run CI jobs without requesting review — that still deploys a Netlify preview and publishes alpha package versions to npm.
:::

### Publishing updates with breaking changes

If your PR has breaking changes affecting at least one downstream repository — for example, `codecademy-engineering/mono`:

1. Before merging, open PRs in those downstream repositories using your PR's published alpha package versions.
2. Verify those PRs work as expected and get them signed off normally.
3. Merge your Gamut PR.
4. Once the new Gamut package publishes, update the downstream PRs to use it.
5. Merge and deploy those PRs as soon as possible.

If a breaking change might affect other users beyond those you've already coordinated with, mention it in `#frontend` too.

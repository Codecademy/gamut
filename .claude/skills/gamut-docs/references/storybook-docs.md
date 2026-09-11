# Storybook docs: `.mdx`, `.stories.tsx`, and About pages

Conventions for the two files that document a Gamut component, plus the About pages that index a folder of them.

## Contents

- [Where files go](#where-files-go)
- [The two-file split](#the-two-file-split)
- [The `parameters` object](#the-parameters-object)
- [Section backbone for a component page](#section-backbone-for-a-component-page)
- [Writing each section](#writing-each-section)
- [Blocks available from `~styleguide/blocks`](#blocks-available-from-styleguideblocks)
- [Linking](#linking)
- [Story files (`.stories.tsx`)](#story-files-storiestsx)
- [About pages](#about-pages)
- [Editor snippets](#editor-snippets)

## Where files go

Component docs live in `packages/styleguide/src/lib/`, and the folder structure is the Storybook hierarchy — what nests on disk nests in the sidebar. The top level follows Gamut's flavor of atomic design:

```
packages/styleguide/src/lib/
├── Atoms/        Badge, Card, Buttons/, FormInputs/, …
├── Molecules/    Alert, Menu, Popover, Modals/, Tips/, …
├── Organisms/    BarChart, DatePicker, ConnectedForm, …
├── Foundations/  ColorMode, theme stories, tokens
├── Layouts/
├── Typography/   Text, Anchor
├── Meta/         guides and process docs
└── UX Writing/
```

Find the folder that fits the component's complexity, then create a folder named after the component holding both files:

```
Atoms/Badge/
├── Badge.mdx
└── Badge.stories.tsx
```

Extra example or utility files can live alongside them in that folder.

**Naming:** component-related files use the component's `PascalCase` name — `RadialProgress.mdx`. Files that are not about a component use sentence case with real spaces — `General principles.mdx`, `About pages.mdx`.

**Anatomy images** live in `packages/styleguide/src/static/<layer>/` and are referenced with a path relative to the static root: `src="./atoms/badge.png"`, `src="./molecules/alertAnatomy.png"`. Check the directory for the file before referencing it; if the export does not exist yet, leave a `TODO:` noting that a designer needs to provide it rather than pointing at a path that 404s.

## The two-file split

| File           | Holds                                                                      |
| -------------- | -------------------------------------------------------------------------- |
| `.stories.tsx` | The working examples — every rendered variation, in Component Story Format |
| `.mdx`         | The written documentation, metadata, and the prose around each example     |

The `.mdx` file renders stories from the `.stories.tsx` file via `<Canvas of={…} />`. Prose never lives in the story file, and examples are never inlined into the `.mdx` file.

## The `parameters` object

Every component page exports a `parameters` object that drives the page header, the sidebar entry, and the links out to source and design. Five fields matter:

| Field      | What it holds                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `title`    | The component name. Used for linking to this story from elsewhere.                                            |
| `subtitle` | What the component does and what it is typically used for, in one or two sentences.                           |
| `source`   | `{ repo, githubLink }` — the source package (`gamut`, `gamut-styles`, …) and a link to the component's source |
| `status`   | The health of the component's API. One of the four values below.                                              |
| `design`   | `{ type: 'figma', url }` — the Figma file for the component                                                   |

Status values carry a promise to the reader, so pick deliberately rather than defaulting:

- `current` — stable, recommended for use
- `updating` — in progress, the API may change
- `deprecated` — still supported but slated for deletion; do not use for new work
- `static` — reference material, no active development

The `githubLink` points at the component's source directory or file on `main`:

```
https://github.com/Codecademy/gamut/blob/main/packages/<package>/src/<ComponentName>
```

Build it from the real path on disk. In VS Code, right-clicking the file and choosing **Copy Remote File Url From…** → `main` produces this directly.

A complete header:

```tsx
import { Canvas, Controls, Meta } from '@storybook/addon-docs/blocks';

import { ComponentHeader } from '~styleguide/blocks';

import * as BadgeStories from './Badge.stories';

export const parameters = {
  title: 'Badge',
  subtitle:
    'Badges are generally used as a standard way to highlight a short piece of text, likely a single word.',
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ReGfRNillGABAj5SlITalN/…?node-id=29959-39721',
  },
  status: 'current',
  source: {
    repo: 'gamut',
    githubLink:
      'https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Badge',
  },
};

<Meta of={BadgeStories} />

<ComponentHeader {...parameters} />
```

`<Meta of={…} />` takes the imported stories namespace, and `<ComponentHeader {...parameters} />` renders the title, subtitle, status chip, and the source and design links. Both belong at the top, in that order, before any `##` heading.

## Section backbone for a component page

A good component page gives the reader four things: what it is for, an overview of it working, its discrete variations, and the rules for using it well.

`## Usage` and `## Playground` appear on nearly every page in the styleguide and are effectively required. The rest earn their place based on the component:

```
## Usage
### Best practices:
### When NOT to use:

## Anatomy              (when a labeled Figma export exists)

## Variants
### <Variant name>

## <Component-specific sections>   Sizes, Icons, States, Color modes, …

## Playground

## Accessibility considerations     (when there is real behavior to describe)

## UX writing                       (when the component contains copy)
```

`## Playground` sits near the end. `## Accessibility considerations` and `## UX writing` conventionally sit adjacent to it — either just before or just after — and existing pages do both, so match whatever the neighboring components in the folder do.

Do not add a heading to hold two sentences, and do not include a section because the skeleton lists it. An `## Anatomy` section with no image, or an `## Accessibility considerations` section restating that buttons are focusable, is worse than its absence.

## Writing each section

**`## Usage`** opens with what the component is for, in the form "Use `X` to …":

```markdown
Use `Badge`s to display read-only information like statuses, attributes, and other emphasized information.
```

**`### Best practices:`** is a short bulleted list of real guidance — the things a reviewer would otherwise have to say. Advice that would apply to any component ("use consistently", "consider accessibility") is filler; cut it or make it specific.

```markdown
### Best practices:

- Use badges sparingly, as too many can dilute their effectiveness.
- Custom colors should be used sparingly, consistently across similar contexts, and with sufficient contrast for accessibility.
```

**`### When NOT to use:`** is the highest-value section on the page and the one most often skipped. Each bullet names the case, then routes to the component that actually handles it, linked:

```markdown
### When NOT to use:

- **Interactivity**- when text is meant to be clickable, use the <LinkTo id="Atoms/Buttons">Button</LinkTo> or <LinkTo id="Typography/Anchor">Anchor</LinkTo> components instead.
- **Categorization**- for labeling or categorizing content, use the <LinkTo id="Atoms/Tag">Tag</LinkTo> component instead.
```

Writing this section requires knowing the neighboring components. Look at what else lives in the folder and in adjacent layers before claiming a boundary.

**`## Anatomy`** is a labeled image followed by a numbered list of its parts, each with a nested description of its options and any copy guidance:

```markdown
<ImageWrapper
  src="./atoms/badge.png"
  alt="The anatomy of the Badge component, detailed below."
/>

1. **Leading icon** _(optional)_

- Use to reinforce the badge's message and improve scannability

2. **Badge label**

- Limit 1-2 words
- Display read-only information like statuses, attributes, and other emphasized information
```

The `alt` text describes the image and points at the list that explains it, rather than repeating the labels.

**`## Variants`** gives each variant an `###` subsection: a sentence on when to reach for it, then its canvas. The sentence is the point of the section — a heading followed only by a canvas makes the reader guess.

```markdown
### Secondary

Use the secondary variant to display supporting information or less critical statuses.

<Canvas of={BadgeStories.Secondary} />
```

Reach for `<Callout />` when a variant carries a caveat worth interrupting for:

```tsx
<Callout
  text={
    <>
      The accent variant does not respond to{' '}
      <LinkTo id="Foundations/ColorMode">ColorMode</LinkTo>.
    </>
  }
/>
```

**`## Playground`** is the flagship story with its props table — a broad overview of the component's high-level behavior, with the code shown by default so readers can see the shape of a call site immediately:

```markdown
## Playground

<Canvas sourceState="shown" of={BadgeStories.Default} />

<Controls />
```

When the flagship story is named `Default`, the `of` prop can be omitted. `<Controls />` renders the props table from the component's TypeScript types and JSDoc — which is why prop JSDoc is part of documentation work, not separate from it. See `docs-in-code.md`.

## Blocks available from `~styleguide/blocks`

Import these from `~styleguide/blocks` rather than building equivalents:

| Block             | Use                                                                       |
| ----------------- | ------------------------------------------------------------------------- |
| `ComponentHeader` | Page header for a component page; takes `{...parameters}`                 |
| `AboutHeader`     | Page header for an About or guide page; takes `{...parameters}`           |
| `TableOfContents` | Linked index of child pages                                               |
| `addParentPath`   | Helper that prefixes child ids with the parent path for `TableOfContents` |
| `LinkTo`          | Internal link to another story by id                                      |
| `Callout`         | Inline subtle `Alert` for a caveat; takes a `text` prop (string or node)  |
| `ImageWrapper`    | Anatomy and example images; takes `src` and `alt`                         |
| `ImageGallery`    | Multiple images shown together                                            |
| `KeyboardKey`     | Rendering a key name in keyboard interaction docs                         |
| `ColorScale`      | Rendering a color scale in Foundations pages                              |
| `TokenTable`      | Rendering a design token table                                            |

From `@storybook/addon-docs/blocks`, component pages use `Meta`, `Canvas`, and `Controls`.

## Linking

**Internal** — use `LinkTo` with the target story's id. Ids are exact strings taken from the target's `parameters.id` or `<Meta title>`; open the target file and read it rather than inferring the path.

```tsx
import { LinkTo } from '~styleguide/blocks';

<LinkTo id="Meta/Stories">Stories</LinkTo>
<LinkTo id="Atoms/Animations/About">Animation</LinkTo>
```

**External** — plain Markdown links, which open in a new tab:

```markdown
[GitHub Repository](https://github.com/Codecademy/gamut)
```

For a link that opens in the current tab, or when more control is needed, use `Anchor`:

```tsx
<Anchor href="https://github.com/Codecademy/gamut">Gamut Repository</Anchor>
```

Forcing `target="_blank"` needs a reason — readers can open a new tab themselves. When it is warranted, pair it with `rel="noreferrer"`.

## Story files (`.stories.tsx`)

Stories follow Storybook's [Component Story Format](https://storybook.js.org/docs/8/api/csf) and its [TypeScript guidance](https://storybook.js.org/docs/writing-stories/typescript). One story per variation or behavior.

```tsx
import { Badge } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'New',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Beta',
    variant: 'secondary',
  },
};
```

**Use concrete values.** Never `foo`, `bar`, or `isBar`. Pick values from a setting the component would really appear in — a boolean is `isModalOpen`, a badge says `Beta`, a label says **Save changes**. Placeholder names make a reader translate before they can evaluate, and they make the copied snippet worse.

**Keep each story self-contained.** This is the rule that most often gets broken, and the reason is not obvious: when a reader clicks **Show code**, Storybook prints the story's source, and it does not follow abstractions. A story that renders a wrapper component shows the reader the wrapper, not the code they need. Repetition across stories is the correct trade — every story should be copy-pasteable into a project as-is.

```tsx
// ❌ Show code prints <InfoTipExample {...args} /> — useless to the reader
export const Default: Story = {
  render: (args) => <InfoTipExample {...args} />,
};
```

```tsx
// ✅ Show code prints the actual usage
export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text>
      <InfoTip {...args} />
    </FlexBox>
  ),
};
```

Prefer `args` alone for simple variations, and add `render` only when the example needs surrounding markup or layout to make sense.

Story export names become the `###` headings' subjects and the `of={…}` references in the `.mdx` file, so name them after the behavior they show: `Secondary`, `SmallSizeWithIcon`, `WithCloseButton`, `Dismissible`.

## About pages

An `About.mdx` file is the landing page for a folder holding several related components — an entry point, not detailed documentation. Create one whenever a folder contains multiple stories.

Write a short overview of what the folder contains and how the components relate, order the index by importance or usage frequency, and stop there.

Import each child page's `parameters` and pass them through `addParentPath`, which prefixes the child ids with the parent path so the links resolve:

```tsx
import { Meta } from '@storybook/addon-docs/blocks';

import {
  AboutHeader,
  addParentPath,
  TableOfContents,
} from '~styleguide/blocks';

import { parameters as miniParameters } from './Mini.mdx';
import { parameters as regularParameters } from './Regular.mdx';

export const parameters = {
  id: 'Atoms/Icons',
  title: 'Icons',
  subtitle: 'Overview of the icons available in Gamut.',
  status: 'current',
};

<Meta title="Atoms/Icons/About" />

<AboutHeader {...parameters} />

Provide a general overview of what this collection of components is for.

<TableOfContents
  links={addParentPath(parameters.id, [miniParameters, regularParameters])}
/>
```

`addParentPath` takes the parent path (`parameters.id`) and an array of child `parameters` objects. Importing the children's real `parameters` keeps the index in sync automatically — never hand-write the link list when the child pages export their own.

## Editor snippets

`.vscode/stories.code-snippets` provides three scaffolds. Mention them to a human who is writing docs by hand:

- `component-story` — the `.stories.tsx` skeleton
- `component-doc` — the component `.mdx` skeleton
- `toc-story` — an About page skeleton

The templates in this reference reflect the same structure, so there is no need to expand a snippet when writing files directly.

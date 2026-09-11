---
name: gamut-docs
description: Use this skill when documenting Gamut — writing or revising a component `.mdx` page, a `.stories.tsx` file, an `About.mdx` index page, prop JSDoc, or code comments. Teaches the Gamut writing guide's structure, voice, and formatting rules plus a prose pass that strips AI-slop patterns; also use it when asked to clean up docs that read as AI-written.
---

# Gamut Docs

How to write and revise Gamut documentation so it is accurate, consistent with the writing guide, and free of generated filler.

See also: [`gamut-accessibility`](../../../packages/gamut/agent-tools/skills/gamut-accessibility/SKILL.md) — the universal rules to check a component against before writing an `## Accessibility considerations` section, rather than asserting behavior. The component skills (e.g. [`gamut-buttons`](../../../packages/gamut/agent-tools/skills/gamut-buttons/SKILL.md), [`gamut-datatable`](../../../packages/gamut/agent-tools/skills/gamut-datatable/SKILL.md)) carry verified prop and variant detail worth reading before documenting those components. [`gamut-create-skill`](../gamut-create-skill/SKILL.md) — the blueprint this skill's structure follows; read it before authoring a new skill.

Storybook:

- [Meta / Gamut writing guide](https://gamut.codecademy.com/?path=/docs-meta-gamut-writing-guide-about--page) — the source of every convention in this skill
- [General principles](https://gamut.codecademy.com/?path=/docs-meta-gamut-writing-guide-general-principles--page) · [Stories](https://gamut.codecademy.com/?path=/docs-meta-gamut-writing-guide-stories-about--page) · [Documentation in code](https://gamut.codecademy.com/?path=/docs-meta-gamut-writing-guide-documentation-in-code--page)
- [Atoms / Badge](https://gamut.codecademy.com/?path=/docs-atoms-badge--docs) · [Molecules / Alert](https://gamut.codecademy.com/?path=/docs-molecules-alert--docs) — reference component pages to imitate

## Reference files

| Writing                                                             | Read                                                  |
| ------------------------------------------------------------------- | ----------------------------------------------------- |
| `ComponentName.mdx`, `ComponentName.stories.tsx`, or an `About.mdx` | [`storybook-docs.md`](./references/storybook-docs.md) |
| Prop JSDoc, code comments, or naming in a component file            | [`docs-in-code.md`](./references/docs-in-code.md)     |
| Any prose at all — always, as the final pass                        | [`prose-quality.md`](./references/prose-quality.md)   |

Read only what applies. `storybook-docs.md` carries the file layout, the `parameters` object, the section backbone, the `~styleguide/blocks` components, and the story-file conventions.

## Why this needs a skill

Gamut docs serve designers and developers at once, and they get read while someone is mid-task and impatient.

Two qualities make them useful, and they fail independently:

- **Accuracy** — every prop, variant, story reference, image, and link resolves to something that exists. A doc describing an imagined API is worse than no doc, because readers trust it and build against it.
- **Voice** — plain, concrete, present-tense prose. The failure mode is not bad grammar. It is fluent, confident text that could describe any component in any design system.

Work in this order: ground in source, draft to the structure, then edit the prose. Drafting first produces confident fiction.

## Step 1 — Ground every claim in something that exists

Documentation is derived, not invented. Read the real artifacts first:

| To write                              | Read                                                                                                      |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Prop names, types, defaults, variants | The component's props type and implementation in `packages/gamut/src/<ComponentName>/`                    |
| `parameters.source.githubLink`        | The actual source path; build the URL from it (see [`storybook-docs.md`](./references/storybook-docs.md)) |
| `parameters.status`                   | The component's real state — do not default to `current` without checking                                 |
| Story references (`of={XStories.Y}`)  | The `.stories.tsx` file's actual named exports                                                            |
| Anatomy image (`<ImageWrapper src>`)  | `packages/styleguide/src/static/<atoms\|molecules\|organisms\|typography>/`                               |
| Internal links (`<LinkTo id="…">`)    | The target story's `parameters.id` or `<Meta title>` — ids are exact strings, not guessable               |
| Accessibility considerations          | The implementation — verify focus handling, roles, and keyboard behavior rather than asserting them       |
| `parameters.design` (Figma URL)       | An existing doc for a sibling component, or ask the user                                                  |

Never invent a Figma URL, a prop, a variant name, a story export, or an accessibility guarantee. When a value is not determinable from the repo, write `TODO:` with what is needed and tell the user in your summary. A placeholder costs the team one minute; a plausible-looking fabricated Figma node id or a prop that does not exist costs a debugging session and quietly erodes trust in every other page.

If the component already has an `.mdx` file, read it before editing. Match its established terms rather than introducing synonyms.

## Step 2 — Apply the house rules

These come from the Gamut writing guide and hold across every kind of documentation, so they are worth keeping in mind while drafting rather than fixing afterward.

**Voice**

- Active voice, present tense: "The component renders a button", not "A button is rendered by the component" or "will render".
- Imperative mood for instructions: "Add the component", not "You should add the component".
- Active voice and imperative mood usually remove the need for a pronoun. When one is needed, prefer "we"; "you" is fine where it reads naturally ("Use your best judgement"). Never "I", "my", or "me".
- Friendly and conversational, encouraging without overpromising.
- Write for a global audience: no idioms, slang, or culturally specific references.
- Define a term on first use, and then use that same term everywhere — including across the heading, the body copy, and the code sample. One term per concept, and never the same term for two concepts.

**Code and component references**

- Backticks for anything that appears in code: `onClick`, `Box`, `variant`, `16px`, `true`, `null`, `Button.tsx`, `@codecademy/gamut`, `packages/gamut/src/Button/index.tsx`.
- `PascalCase` for components, `camelCase` for props and variables, `SCREAMING_SNAKE_CASE` for true constants.
- First mention is "the `Box` component"; after that, "the component".
- Pluralize the word, not the identifier: "These `Box` components are…", not "These `Boxes` are…".
- Capitalize proper nouns: Codecademy, Storybook, Figma, GitHub.

**Formatting**

- Sentence case for every heading, button, and piece of UI text.
- Start at `##` — the `<h1>` comes from `parameters.title`. Never skip a level.
- Numerals for all numbers, commas at thousands: 1,000.
- Space between number and unit in prose ("16 pixels"), none in code (`16px`, `2rem`).
- Bulleted lists take parallel structure. Periods when the items are complete sentences, none when they are fragments. Numbered lists for sequential or ranked items, each starting with a capital letter.
- Fenced code blocks always carry a language identifier (`tsx`, `sh`, `css`). Shell commands use `sh` and omit the `$` prompt.
- Blank lines between sections, never two in a row.
- Spell out an acronym on first use — "Web Content Accessibility Guidelines (WCAG)" — except for terms common to web work: HTML, CSS, API, UI, UX.

**Pointing at things**

- Bold for UI labels: the **Show code** button, **Next**, **Close**.
- Describe where a control is by what it looks like, not where it sits: "Click the **Theme Switcher** (paintbrush icon)".
- No directional language. Storybook reflows, so "the form on the right" and "the section above" go stale. Use "the following form", "the adjacent form", "the previous section".
- "Click" is the device-agnostic verb — prefer it over "tap", "press", or "hover over" unless the interaction genuinely differs by input device.
- Link text names the destination, not the action, and stands alone out of context. Link the noun and leave the verb outside it: "See the [Stories page](#)" rather than "[See the Stories page](#)", and never "[Click here](#)". Two to three words minimum, unique within a page.

## Step 3 — Edit the prose

Read [`prose-quality.md`](./references/prose-quality.md) and run its pass over everything you wrote. Do this as a separate step with the draft in front of you. Slop is hard to see while composing and easy to see while reading, which is why the order matters.

The single most useful test from that pass, if you remember nothing else: **if a sentence could move unchanged into the docs for a different component, it is filler.** Replace it with a fact about this component or delete it.

## Before you finish

Check your own output against this list:

1. Every prop, variant, and story export you named exists in the source. Re-grep the ones you are least sure about.
2. Every `<LinkTo id="…">` matches a real story id, and every image `src` matches a real file.
3. No fabricated Figma URL. Unresolved values are marked `TODO:` and surfaced in your summary.
4. Headings are sentence case, start at `##`, and skip no levels.
5. Code identifiers are in backticks; the component name is never pluralized.
6. No directional language, no "click here", no `$` in shell blocks.
7. Story examples are self-contained and copy-pasteable — see the **Show code** note in [`storybook-docs.md`](./references/storybook-docs.md).
8. The prose pass ran, and no sentence survives that would fit another component's page.

Then tell the user what you changed, and list anything you left as `TODO:` along with what it needs — a Figma link, a designer's anatomy export, a status confirmation.

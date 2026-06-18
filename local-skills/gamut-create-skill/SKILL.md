---
name: gamut-create-skill
description: 'Blueprint — use this skill when authoring a new Gamut agent skill from scratch, from component source research through Storybook integration. Not for general Gamut development (see individual component skills).'
alwaysApply: false
---

# Gamut Create Skill

Blueprint playbook for authoring a new Gamut agent skill.

Reference skills: [`gamut-buttons`](../../packages/gamut/agent-tools/skills/gamut-buttons/SKILL.md) — reference for a tight component skill. [`gamut-datatable`](../../packages/gamut/agent-tools/skills/gamut-datatable/SKILL.md) — reference for an organism skill with full API surface. [`gamut-review`](../../packages/gamut/agent-tools/skills/gamut-review/SKILL.md) — reference for an audit/workflow skill.

Storybook: [Meta / AI Tooling / Gamut plugin / Best practices](https://gamut.codecademy.com/?path=/docs-meta-ai-tooling-gamut-plugin-best-practices--page)

Claude Code skill authoring reference: [Claude Code skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills)

Skill quality review: use `/writing-great-skills` in Claude Code to audit a draft against information hierarchy, leading words, no-ops, and pruning before committing.

---

## Phase 1 — Research before writing

Do not write until you have read all of the following.

**Component source**

Read the component's TypeScript source and type definitions:

```
packages/gamut/src/{ComponentName}/
```

Extract: exported symbols, prop interfaces, default values, generic constraints, any hooks exported alongside the component.

**Storybook MDX**

Read the component's MDX documentation page:

```
packages/styleguide/src/lib/{Category}/{ComponentName}/{ComponentName}.mdx
```

Extract: design principles, "When to use" / "Do not use" guidance, usage notes. These belong in the skill verbatim or paraphrased — they encode the designer's intent.

**Related skills**

Identify 2–3 existing skills that overlap. Check for:

- Components this one wraps or is used alongside
- Skills that already cover adjacent concepts (e.g. `gamut-accessibility` for ARIA, `gamut-color-mode` for theming)

**Existing callout**

Check whether the component's Storybook MDX already has a `<Callout>` for the skill. If so, you only need to update the text, not add a new import.

---

## Skill directory structure

There are two locations, depending on the intended audience:

**Exported skills** — shipped to app repos via `gamut plugin install`:

```
packages/gamut/agent-tools/skills/
  {skill-name}/
    SKILL.md
```

**Contributor-only skills** — available in this repo only, never exported:

```
local-skills/
  {skill-name}/
    SKILL.md        ← canonical source
```

Contributor skills are synced automatically to `.claude/skills/` (Claude Code) and `.cursor/rules/` (Cursor) by the pre-commit hook. To sync manually: `yarn sync-skills`. To watch during development: `yarn sync-skills:watch`.

Rules (apply to both locations):

- Directory name is kebab-case and must exactly match the `name:` frontmatter field
- No other files in the directory
- Contributor skills must also include `alwaysApply: false` in frontmatter (required by Cursor)

---

## Frontmatter spec

```yaml
---
name: gamut-{kebab-case-name}
description: Use this skill when {trigger 1}, {trigger 2}[, {trigger 3}] — {scope and features}[; not for {anti-pattern} (see {gamut-other-skill})].
---
```

`description` rules:

- Must start with `"Use this skill when"`
- List **2–6 concrete trigger scenarios** (comma-separated)
- Follow with `—` then scope/features the skill teaches
- Add anti-patterns where the boundary with another skill is non-obvious
- Target: 1–2 sentences, ≤200 characters per sentence
- Use inline backticks for component/function names

---

## Section template

Use this ordered structure. Omit sections that don't apply; do not reorder.

```markdown
# {Title-Cased Skill Name}

{1–2 sentence purpose and scope. No "this skill covers…" framing.}

Source: `@codecademy/gamut` — [ComponentName.tsx]({github-url})

See also: [`gamut-x`](../gamut-x/SKILL.md) — {why}. [`gamut-y`](../gamut-y/SKILL.md) — {why}.

Storybook: [{Path / ComponentName}]({gamut.codecademy.com url})

## Components

\`\`\`tsx
import { ComponentName } from '@codecademy/gamut';
\`\`\`

| Symbol          | Role           |
| --------------- | -------------- |
| `ComponentName` | {what it does} |

## When to use {ComponentName}

- {Positive case 1}
- {Positive case 2}

**Do not use {ComponentName} when:**

- {Anti-pattern 1} → use [{alternative}]({link})
- {Anti-pattern 2}

## Design principles

{Lifted from Storybook MDX. 3–5 bullets. Imperative, design-voice.}

## Props

| Prop       | Type   | Default   | Notes  |
| ---------- | ------ | --------- | ------ |
| `propName` | `type` | `default` | {note} |

> **{Non-obvious gotcha title}**: {explanation of surprising behavior, constraint, or invariant}.
> Only add this block when the behavior would genuinely surprise a reader.

## Basic usage

\`\`\`tsx
// {describe what this shows}
<ComponentName prop="value" />
\`\`\`

## {Pattern name} (repeat per pattern)

\`\`\`tsx
// correct
<ComponentName ... />

// wrong — {reason}
<ComponentName ... />
\`\`\`

## Accessibility

{Only if the component has ARIA or focus concerns beyond the universal rules.}

Do not repeat content from [`accessibility.mdc`](../../rules/accessibility.mdc) — link to it instead.
```

---

## Token and context guidance

The `description` field is loaded on every skill invocation — token waste here is paid on every use.

| Principle               | Rule                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Reference, don't repeat | Point to `accessibility.mdc`, related skills, or Storybook rather than copying content                                     |
| Tables > prose          | Use tables for prop references, option lists, and decision trees                                                           |
| Front-load              | Lead each section with the most common case; edge cases last                                                               |
| Flat structure          | Max one level of H3 subsections under each H2                                                                              |
| Line target             | 100–180 lines for a component skill; 200–400 for a workflow skill                                                          |
| Gotcha blocks           | Only for things that would genuinely surprise a reader (layout behavior, type constraints, focus side-effects)             |
| Code examples           | Language marker required (`tsx`, `ts`, `jsx`); show both correct and incorrect when the wrong pattern is common            |
| Semantic tokens         | All code examples use semantic color tokens (`color="text"`, `bg="background"`) — never hardcoded hex or raw palette names |
| No AI-speak             | Write imperatively. No "this skill will help you…", "certainly", or meta-commentary                                        |

---

## Consistency checklist

Run this against your draft before committing:

- [ ] `name` field matches directory name exactly (kebab-case)
- [ ] `description` starts with "Use this skill when" and lists ≥2 concrete trigger scenarios
- [ ] H1 title is present and matches skill purpose
- [ ] `See also:` block with ≥1 related skill and a one-line reason
- [ ] ≥1 Storybook link using a full `gamut.codecademy.com` URL
- [ ] All code blocks have a language marker
- [ ] "When to use" has both positive cases and a "Do not use when" sub-list
- [ ] No hardcoded hex (`#...`) or raw palette names in code examples
- [ ] No duplication of `accessibility.mdc` — link to it instead
- [ ] Props table includes: name, type, default, notes
- [ ] Non-obvious gotchas have a callout block
- [ ] No trailing "See also" list that duplicates the top `See also:` block
- [ ] Source code GitHub link present
- [ ] Draft reviewed with `/writing-great-skills` before committing

---

## Storybook integration

Both steps are required after writing the skill.

### Step 1 — Add to Best practices list

File: `packages/styleguide/src/lib/Meta/AI Tooling/Gamut plugin/Best practices.mdx`

```md
- `gamut-{name}` — {one-line description, matching the skill's overview sentence}
```

Group the entry near related skills (e.g. new list/table skills go after `gamut-datalist`; new form skills go after `gamut-forms`).

### Step 2 — Add Callout to component Storybook page

File: the component's MDX (e.g. `packages/styleguide/src/lib/Organisms/.../ComponentName.mdx`)

If `Callout` is not yet imported, add it to the `~styleguide/blocks` import:

```diff
- import { ComponentHeader } from '~styleguide/blocks';
+ import { Callout, ComponentHeader } from '~styleguide/blocks';
```

Place the callout immediately after `<ComponentHeader {...parameters} />` or `<AboutHeader {...parameters} />`:

```mdx
<Callout text="Use the /gamut-{name} skill in Cursor or Claude Code for AI-assisted usage guidance, prop reference, and code patterns." />
```

For skills covering a concept rather than a single component (e.g. `gamut-color-mode`, `gamut-layout`), add the callout to the primary concept page (`ColorMode.mdx`, `Layout.mdx`, etc.) — not every page that tangentially touches the concept.

---

## Reference skills by type

| Type                   | Skill                                                                                   | Read it for                                       |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Tight component        | [`gamut-buttons`](../../packages/gamut/agent-tools/skills/gamut-buttons/SKILL.md)       | Scope discipline, clean "When to use / not use"   |
| Organism with full API | [`gamut-datatable`](../../packages/gamut/agent-tools/skills/gamut-datatable/SKILL.md)   | Props table + ColumnConfig + gotcha note pattern  |
| Audit / workflow       | [`gamut-review`](../../packages/gamut/agent-tools/skills/gamut-review/SKILL.md)         | Multi-phase check structure, remediation pointers |
| System / concept       | [`gamut-color-mode`](../../packages/gamut/agent-tools/skills/gamut-color-mode/SKILL.md) | Semantic-first framing, cross-skill boundaries    |

# ADR 0001: Information architecture for the new Gamut documentation site

- **Status:** Proposed
- **Date:** 2026-08-18
- **Ticket:** GMT-1727
- **Deciders:** Gamut maintainers

## Context

Gamut's documentation lives in a Storybook (`packages/styleguide`) whose structure has grown organically. An audit against the [Diátaxis framework](https://diataxis.fr) identified structural problems:

1. **Navigation is organized by Gamut's internal taxonomy, not user need.** The sidebar (Atoms / Molecules / Organisms / Foundations / Layouts / Typography) follows Atomic Design. Readers must know how Gamut classifies a component before they can find it, and cross-cutting tasks (theming an app, building a form, supporting dark mode) have no home.
2. **Documentation modes are interleaved.** Component pages mix design guidance, task recipes, and API reference in inconsistent orders (e.g., `Alert` documents `closeButtonProps` as prose bullets between example sections; `Menu` buries accessibility-critical role guidance mid-page). Section vocabularies diverge per page ("Specifications", "HTML element", "Roles").
3. **There are no tutorials.** Nothing walks a newcomer from zero to a working page. `Installation` — the most task-critical page — is buried mid-list in a grab-bag "Meta" section.
4. **"Meta" is a junk drawer** spanning how-to (Installation, Contributing), reference (ESLint rules), and explanation (Brand, Best practices, FAQs), organized by authors' filing convenience rather than reader need.

We are building a new documentation website (Astro + Starlight). This is the moment to fix the information architecture rather than port the current structure.

Diátaxis distinguishes four documentation modes by user need — **tutorials** (learning), **how-to guides** (working toward a goal), **reference** (looking up facts), and **explanation** (understanding) — and holds that each unit of content should serve one mode, with navigation letting readers stay in their mode. It applies fractally: at site scale and again within a topic area such as a single component.

## Decision

### 1. Top-level navigation follows the Diátaxis modes

The sidebar's top level maps to the reader's lifecycle — learn it, do a task, look something up, understand it deeper:

```text
Getting started        TUTORIALS   — Installation, Build your first page, Using this site
Guides                 HOW-TO      — Theming your app, Building forms, Supporting dark
                                     mode, Writing UX copy, Migrating to logical
                                     properties, Contributing to Gamut
Components             REFERENCE   — all components, grouped by function (see §2)
Reference              REFERENCE   — design tokens, themes, system props, icon/asset
                                     catalogs, ESLint rules, tooling
Concepts               EXPLANATION — architecture of the system, theming model, color
                                     modes, brand, best practices, voice & tone, FAQs
```

The "Meta" section is dissolved: its pages distribute into Getting started (Installation, Usage guide), Guides (Contributing), Reference (ESLint rules, Deep Controls), and Concepts (Brand, Best practices, FAQs). "Foundations" splits along the same line: token values and theme palettes are Reference; the rationale behind them is Concepts.

### 2. Components are grouped by function, not by Atomic Design tier

Readers arrive with a need ("I have to tell the user something went wrong"), not knowledge of Gamut's composition hierarchy. The Atoms/Molecules/Organisms tiers are retired from navigation (the tier may survive as a metadata badge on component pages). Components are grouped by what they do:

- **Actions** — Button, CTAButton, FillButton, StrokeButton, TextButton, IconButton, Menu, Tag
- **Containers** — Box, FlexBox, GridBox, Card, ContentContainer, LayoutGrid, Disclosure, Drawer
- **Inputs & forms** — Input, TextArea, Checkbox, Radio, Toggle, Select, SelectDropdown, DatePicker; Form scaffolding (Form, FormGroup, FormGroupLabel, FormGroupDescription, FormRequiredText); ConnectedForm (ConnectedForm, ConnectedFormGroup, ConnectedFormInputs, SubmitButton); GridForm
- **Navigation** — Anchor, Breadcrumbs, Pagination, Tabs, SkipToContent
- **Feedback** — Alert, Toast, Toaster, Coachmark, Tips (ToolTip, InfoTip, PreviewTip)
- **Status** — Badge, ProgressBar, RadialProgress, Loaders (Spinner, Shimmer), FeatureShimmer
- **Overlays** — Modal, Dialog, Overlay, Popover, PopoverContainer, Flyout
- **Data display** — DataTable, DataList, List, BarChart, Markdown
- **Typography** — Text
- **Media & assets** — Icons (Regular, Mini), Illustrations, Patterns, Animations (ExpandInCollapseOut, FadeInSlideOut, Rotation), Video
- **Utilities** — FocusTrap, DelayedRenderWrapper

Placement rulings for components that could live in two categories (the losing category's landing page cross-links them):

| Component | Ruling     | Rationale                                                                                                     |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| Menu      | Actions    | The action-list role is the richer half of its API; nav role is cross-linked                                  |
| Tag       | Actions    | Docs emphasize interactive selection/removal; read-only overlap with Badge is arbitrated by "When NOT to use" |
| Tips      | Feedback   | Readers think "the system explaining something"; Overlays is reserved for things you open and dismiss         |
| Drawer    | Containers | Collapses within page flow, unlike Flyout which floats above it (Overlays)                                    |
| Anchor    | Navigation | Functionally navigation despite its typography implementation                                                 |

Existing multi-component group index pages (Buttons, Tips, Modals, Loaders, etc.) survive as collapsible group nodes within their category.

### 3. Component pages re-apply Diátaxis at page scale, split across two systems by mode

Every component page follows one template with a fixed section order grouped by mode — explanation, then how-to, then reference — so a reader in any mode can jump to their zone and stay there. Explanation and how-to are authored natively in Starlight; reference stays authored in Storybook, which already has purpose-built tooling for it (addon-docs Controls, exhaustive story canvases) that Starlight doesn't. The Starlight page pulls reference material in by embedding the live Storybook canvas, rather than duplicating it:

```text
Header            title, subtitle, status, Figma link, source link
── EXPLANATION (authored in Starlight) ──
Usage             when to reach for it
  Best practices  design/UX guidance (not API guidance)
  When NOT to use every bullet names and links the alternative component
  Anatomy         labeled diagram of the component's parts
── HOW-TO (authored in Starlight) ──
Patterns          goal-first recipes — one intent sentence, then either the
                  matching Storybook story or (only if no story can show it)
                  a code snippet; shared verbatim across a component group,
                  written once on the group's index page (see rule 7)
── REFERENCE (authored in Storybook, embedded in Starlight) ──
Reference         accessibility notes, the props table, and a live
                  playground — all still written and maintained as Storybook
                  stories/MDX, surfaced here as `StoryEmbed`s: iframes onto
                  the deployed Storybook canvas, each paired with a link to
                  open its story directly in Storybook. Full per-value story
                  coverage of a variant-like prop gets embedded and grouped
                  under a subheading (`### Variants`, `### Spacing`) instead
                  of a generic default embed; partial coverage gets linked,
                  not embedded (see rules 4–5).
```

Template rules:

1. **Required always:** Header, Usage (with When NOT to use), Reference. **Optional but fixed-position:** Anatomy (skip for non-visual utilities), Patterns (skip for stateless components).
2. **The heading vocabulary is closed.** No page invents new top-level sections ("Specifications", "HTML element"); new headings require updating the template first. `Variants`, `Accessibility`, `Props`, and `Playground` are retired as Starlight headings — that material now lives under the single `Reference` heading, in Storybook.
3. **Patterns prefer a matching Storybook story over a code snippet.** If a story already demonstrates the pattern — a dedicated story (`IconButton`'s `CloseOnClick`), or the same behavior reachable by changing a prop in the default story's Controls — embed or point to that story instead of showing static code. Write an inline snippet only when the pattern is a composition the Controls panel can't express (for example, wrapping the component in a `ToolTip` to explain a disabled state): nothing goes in a snippet that already renders live somewhere in Storybook.
4. **Reference shows the component live from Storybook — as either a full set of per-value embeds, or one default embed, never neither and never both.** If a variant-like prop (`variant`, `type`, `spacing`, ...) has a dedicated story for _every_ one of its values, embed all of them under Reference, grouped by prop under a subheading (`### Variants`, `### Spacing`) — `Menu` (`variant`, `spacing`) and `Tag` (`variant`) are the model case. Skip the generic default/playground embed and the "check out the full story" line in that case: a complete set of per-value embeds already _is_ the story-browsing experience, so a redundant default embed adds nothing. If no variant-like prop has full story coverage, fall back to the single default/playground `StoryEmbed`, paired with "Check out the full story in Storybook:".
5. **Partial story coverage gets linked, not embedded.** If a variant-like prop has a dedicated story for only _some_ of its values — the button family's `variant`, covered for `Primary`/`Secondary` (on the shared `Button` overview story) but not `danger`/`interface` — list and link those values under Reference instead of embedding them; embedding a partial set risks implying it's the whole picture. A value only reachable by changing a Control on a default story doesn't get an entry at all. Never write a variant list, or embed a variant grid, that Storybook itself can't back with a matching story per item.
6. **Tutorials never appear on component pages** — learning-oriented material lives only in Getting started.
7. **Shared Patterns and shared Reference material across a component group are written once, on the group's index page.** When sibling components in a multi-component group (Buttons: FillButton, StrokeButton, TextButton, IconButton, CTAButton; similarly Tips, Loaders, Modals) share the same how-to almost verbatim — rendering as a link, adding an icon, explaining a disabled state — that Pattern lives on the group's `index` page (e.g. `Buttons/index.md`), not repeated on every sibling. The same goes for Reference material that exists at the family level rather than per component: Storybook's `Button` overview story demonstrates `variant` values and light/dark mode across the whole family (not any one button), so its `Primary`/`Secondary` stories are listed under the group page's own Reference section (rule 5) and its light/dark-mode story is a group-page Pattern, rather than either being duplicated on every sibling or forced onto whichever button happens to be `component:` in that story's meta. A sibling's own page keeps Usage/Anatomy/Reference plus any Pattern genuinely specific to it — `IconButton`'s tooltip-persistence pattern stays on `IconButton`'s page, since no sibling has it — and links to the group page for the shared ones.

If a component outgrows a single page (heavy guidelines plus a large API, e.g. GridForm), its explanation/how-to content splits into per-mode child pages along the template's section boundaries; its Storybook-side reference content is unaffected.

## Consequences

### Positive

- Readers navigate by need: newcomers land in Getting started, task-driven developers in Guides, fact-lookups in Components/Reference — without knowing Gamut's internal taxonomy.
- Predictable component pages: a fixed section order and closed heading vocabulary make every page scannable the same way, and give doc authors an unambiguous checklist.
- The migration is mostly mechanical: nearly every existing page has a destination in the new structure. Only two pages are net-new ("Build your first page" tutorial; "Architecture of the system" concept, largely extractable from existing Foundations prose).
- Cross-cutting guides (theming, forms, dark mode) finally have a home instead of being fragmented under component folders.
- **Splitting reference out to Storybook shrinks the per-component migration to Usage/Anatomy/Patterns only** — the largest, most tedious part of each page (an exhaustive Variants grid, a Props table, a working Playground) is never re-authored; it's already correct in Storybook and stays there.
- **One source of truth for reference material.** Variants, accessibility notes, and props are authored once, in the system built for that job (Storybook's addon-docs Controls and Canvas). Starlight and Storybook can't drift out of sync on prop tables because only one of them owns that content.
- **Patterns default to showing something real.** Preferring a matching Storybook story over a code snippet means most Patterns are a live, currently-rendering example rather than prose describing what code would theoretically do — and it can't silently go stale the way an unexecuted snippet can.
- **Grouped components stop repeating themselves.** Buttons, Tips, Loaders, and similar groups share most of their how-to content near-verbatim; writing it once on the group's index page instead of five times cuts both authoring effort and the chance one sibling's copy quietly drifts from the others.

### Negative / risks

- **Categorization is a judgment call.** Functional categories have ambiguous edges (see placement rulings). Mitigation: cross-links from the losing category, plus site search for readers who already know a component's name.
- **Deep links break.** Every existing Storybook URL path changes. Mitigation: redirect map from old story IDs to new site URLs.
- **Mixed-mode pages persist by design.** A component page containing explanation, how-to, and reference on one page bends strict Diátaxis (one mode per page). We accept this: the practical harm Diátaxis targets is _interleaving_, which the fixed section order eliminates, and one-page-per-component matches how design-system consumers work.
- **Template enforcement needs tooling.** Without a check, heading vocabularies will drift again. Mitigation: lint page headings against the allowed list in CI.
- **The site now has a hard runtime dependency on Storybook staying deployed** — this is a durable architectural split, not a transitional bridge until migration finishes. If the Storybook deployment goes down or a story ID changes without a redirect, every component page's Reference section breaks. Mitigation: keep Storybook's build/deploy in CI as a first-class pipeline (not a legacy artifact slated for removal), and treat published story IDs as a stable contract.
- **Two authoring surfaces for one component page.** A contributor documenting a new prop now touches Storybook (to add/update the story) and, only if it changes usage guidance, Starlight. Mitigation: this is the same trade a "single source of truth" always makes; the Storybook-side workflow doesn't change from today's.
- **Embedding via iframe, rather than copying code into Starlight, is deliberate: Storybook stays the single source of truth for component code snippets.** A `.stories.tsx` file is the one place a variant's example code is written; Starlight never forks a second copy that can silently drift out of sync with the real component API. The cost is that Starlight's site search (Pagefind) can't index that code, prop names, or accessibility notes, since it lives inside an iframe pointed at a separate deployment — a reader searching Starlight for a prop name won't find it there. Mitigation: every `StoryEmbed` ships with a visible link to open the full story, so a reader can still get to that content manually; if the search gap proves painful in practice, the fallback is indexing Storybook's stories into Pagefind separately, not duplicating the code itself.
- **A Pattern living on the group's index page is one hop further from a sibling's own page than an inline section would be.** A reader on `FillButton`'s page has to notice and follow a link to `Buttons/index` to find "Rendering as a link," rather than finding it inline. Mitigation: every sibling's Patterns section opens with an explicit pointer to the group page rather than silently omitting the section; a Pattern only moves to the group page once it's confirmed identical across siblings, not merely similar.
- **Not every "shared" Pattern stays shared forever.** If one button's disabled-state or icon behavior diverges later, it has to be split back out of the group page into that component's own page without breaking the others' links to it. Mitigation: this is the same fixed-section-boundary mechanism §3 already uses for a component outgrowing one page — moving content back down is a known, designed-for operation, not a special case.

## Alternatives considered

1. **Port the current Atomic Design structure to the new site.** Rejected: reproduces every audited problem; the migration is the cheapest moment to fix IA.
2. **Flat alphabetical component list** (early proposal). Rejected in favor of functional grouping: alphabetical requires knowing the component's name, functional matches need-driven arrival; search covers name-based lookup. Industry precedent (Adobe Spectrum's Actions/Containers/Feedback/... grouping) favors functional.
3. **Strict Diátaxis: one page per mode per component** (à la Carbon/Material per-component tabs). Rejected for now: quadruples page count and maintenance for many small components. The template's section boundaries are the designated split points if a component outgrows one page.
4. **Organize top-level by audience (designers vs. engineers).** Rejected: most Gamut readers wear both hats within a single task; mode-based navigation serves the actual switching behavior.
5. **Repeat identical Patterns on every sibling page in a component group** (the original approach for Buttons: the same "rendering as a link," icon, and disabled-tooltip patterns copy-pasted across all five). Rejected: five near-identical copies of the same prose is exactly the drift risk this ADR is otherwise trying to eliminate for reference content — a wording fix or a newly-discovered edge case would need to land in five places to stay consistent. Writing it once on the group's index page and linking to it costs one extra click per sibling page in exchange for a single place to keep it correct.

## References

- Diátaxis framework: <https://diataxis.fr>
- Adobe Spectrum component grouping (functional-category precedent): <https://spectrum.adobe.com/page/components/>
- Current styleguide source: `packages/styleguide/src/lib`

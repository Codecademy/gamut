# Prose quality pass

Run this over everything before returning it. Do it as a separate reading pass with the draft in front of you — these patterns are almost invisible while composing and obvious while reading.

The goal is documentation that reads like a colleague who knows the component. Generated docs fail in a specific direction: they are grammatical, confident, well-organized, and say nothing a reader could act on. That is the target here, not typos.

Two modes:

- **Writing new docs.** There is no author voice to preserve. The voice to match is the surrounding Gamut pages — plain, direct, present tense, friendly without selling.
- **Revising an existing page.** Someone's voice is already there. Make the minimum effective edit: fix the patterns below, and leave sentences that already carry a real point alone. Do not tidy a page into uniformity, and do not rewrite a blunt-but-clear line into a smoother one. Say what you changed and why.

## The portability test

The most useful single check, and the one to run first.

**If a sentence could move unchanged into the docs for a different component, it is filler.** Delete it, or replace it with a fact, mechanism, constraint, or consequence specific to this component.

```markdown
❌ The Badge component is a versatile and flexible component that empowers
developers to seamlessly display information in a robust way.

✅ Use `Badge`s to display read-only information like statuses, attributes,
and other emphasized information.
```

The first sentence fits Badge, Tag, Alert, Card, and every component in every design system ever built. The second one says what goes inside a badge and that it is not interactive.

Apply the test hardest to the sections most prone to it:

- **`### Best practices:`** — "Use consistently", "consider accessibility", and "follow design guidelines" are portable. "Use badges sparingly, as too many can dilute their effectiveness" is not.
- **`### When NOT to use:`** — a bullet has to name the alternative component. "Do not overuse" names nothing.
- **`## Accessibility considerations`** — "ensure sufficient color contrast" is portable and belongs in Foundations, not here. What belongs here is what this component actually does: where focus goes on close, which keys the listbox handles, which element owns the accessible name.

## Words to cut

Design-system docs attract these especially hard. Cut them outright:

> delve, foster, leverage, utilize, facilitate, empower, streamline, robust, seamless, seamlessly, versatile, cutting-edge, paradigm shift, game changer, tapestry, realm, beacon, multifaceted, meticulous, intricate, paramount, transformative, elevate, embark, supercharge, harness, ever-evolving

Most have a plain replacement: `utilize` → use, `leverage` → use, `facilitate` → let, `streamline` → simplify, `empower … to` → let. Some have no replacement because they carry no meaning — `robust`, `seamless`, and `versatile` describe a feeling about the component rather than anything about it. Delete them and state the capability.

**Often-empty adverbs:** just, simply, actually, truly, fundamentally, importantly, crucially, inherently, inevitably, literally, honestly. Cut when they add nothing — and note that `simply` and `just` also carry a cost beyond filler: "simply pass the `variant` prop" tells a reader who is stuck that their difficulty is a personal failing.

**Often-empty phrases:** it's worth noting, it's important to note, at the end of the day, when it comes to, at its core, in today's world, the reality is, the truth is, in terms of, with regard to, in order to, going forward, in this article, let's dive in. Cut them when they delay the point. `in order to` is almost always just `to`.

## Patterns to cut

Each is paired with the fix. The rewrite is the point — recognizing the pattern without changing the shape of the sentence does nothing.

**Binary contrasts.** "This is not X. It's Y." / "The question isn't X, it's Y." / "It's not just X but Y." State Y directly.

```markdown
❌ Badge isn't about decoration, it's about communicating status.
✅ Use `Badge`s to communicate status.
```

**Throat-clearing openers.** "Here's the thing", "Let me be clear", "I'll be honest", "The uncomfortable truth is". Cut and state the point.

**Faux-insight setups.** "This is the part most people skip", "What most people get wrong", "Here's what nobody tells you". These flatter the writer and tell the reader nothing. Cut the setup and let the claim stand.

```markdown
❌ Here's what most developers miss: the accent variant ignores ColorMode.
✅ The accent variant does not respond to ColorMode.
```

**Colon reveals.** A noun phrase, a colon, then a lowercase dramatic reveal. "The detail that makes it work: a separate agent grades it." Rewrite as a plain sentence. Colons are for lists, labels, and quotes.

```markdown
❌ The one caveat: this variant doesn't respond to ColorMode.
✅ This variant does not respond to ColorMode.
```

**Superficial analysis.** Trailing `-ing` clauses that pretend to explain significance: "highlighting", "underscoring", "reflecting", "showcasing", "ensuring". Replace with the actual consequence.

```markdown
❌ The variant includes a background color, ensuring better visual hierarchy.
✅ The variant includes a background color, so the badge stays legible when it
overlaps other content.
```

**Importance puffery.** "Plays a vital role", "marks a pivotal moment", "is a cornerstone of", "underscores its significance". State the fact and let the reader judge.

```markdown
❌ The Anatomy section plays a vital role in the design system.
✅ The Anatomy section names each part of the component and its copy limits.
```

**Interpretive metadiscourse.** Lines that step outside the subject to tell the reader what to notice or how much weight to give it: "That last part matters more than it sounds", "The key point is", "As you can see", "This distinction matters", "It's important to remember", and redundant "In other words". If the point is already clear, delete the aside. If it is not, add the missing fact instead.

**Weasel attribution.** "Experts agree", "it's generally recommended", "best practices suggest", "studies show". In Gamut docs, the authority is the design system, the implementation, or a spec — so name it (`Per WCAG 2.2…`, "The `Alert` component handles this by…") or drop the claim. Never invent a source or a spec section number.

**Fake-strong verbs.** "Serves as", "acts as", "functions as", "provides the ability to". Prefer plain `is`, `has`, and `can`, or a real verb.

```markdown
❌ The component serves as a centralized container for form field state.
✅ The component holds form field state, validation, and error messages.
```

**Synonym cycling.** If the right word is right, repeat it. Gamut's writing guide is stricter than general prose advice here: one term per concept, and the same term across the heading, the body, and the code sample. Rotating between "badge", "label", "chip", and "indicator" for style makes a reader wonder whether four things exist.

**Negative listing.** "Not a button. Not a link. A badge." Just say what it is.

**Dramatic fragmentation.** "X. And Y. And Z." / "That's it. That's the whole component." Use complete sentences.

**Robotic rhythm.** Repeated sentence shapes and identical paragraph structures. This shows up in `## Variants` sections most: six subsections that each open "Use the X variant to …" read as generated. Vary the opening where the variant's actual reason to exist is different, and keep the parallel form where the variants really are parallel.

**Rhetorical setups.** "What if I told you…", "Think about it:", "Plot twist:", and self-answered "Question? Answer." pairs. Drop them.

**Fake-profound kickers.** A final "deep" line that turns the point into a metaphor or mic-drop. Delete it rather than rewriting it into a better metaphor, and end on the clearest concrete sentence already there.

**Summary-recap endings.** "In conclusion", "Ultimately", "Overall", or a closing paragraph that restates the page. Component pages end on `## Playground` and `<Controls />` — there is no conclusion to write, and adding one is pure padding.

**Em dashes.** Do not use them as a default rhythm crutch. One or two in a long page are fine when they clearly beat a comma, a period, or parentheses. Remove clusters and decorative dashes.

## Formatting slop

- No emoji in headings.
- No bold sprinkled mid-sentence for emphasis. Bold in Gamut docs has a job: UI labels (**Show code**) and the names of parts in an `## Anatomy` list. Using it for emphasis dilutes that signal.
- No heading over a two-sentence section. Fold it into its parent.
- **Bullets are not automatically slop here.** `### Best practices:`, `### When NOT to use:`, and `## Anatomy` part lists are genuinely list-shaped, and the writing guide specifies them. The pattern to catch is a paragraph shredded into fragments — three bullets that only make sense read in order are a paragraph wearing a costume. Format follows content in both directions.
- Sentence case after a colon, unless grammar, a proper noun, a title, or code requires otherwise.

## Component-doc failure modes

Beyond general slop, these are specific to documenting components and are worth a targeted look:

**Restating the props table in prose.** `<Controls />` already renders every prop, its type, and its JSDoc. A prose section that walks the same list adds a second thing to keep in sync and goes stale first. Write prose where it adds what the table cannot: when to reach for a prop, how two props interact, what happens at a breakpoint.

**Describing the code sample.** The canvas is right there. "The example below shows a badge with the `variant` prop set to `secondary`" is a caption for something the reader can already see. Use the sentence to say when to use the variant instead.

**Asserting behavior rather than checking it.** "The modal traps focus and returns it to the trigger on close" is either a documented guarantee or a fabrication, and only the implementation says which. Read it. If you cannot confirm, leave a `TODO:` rather than a confident claim — this is the one category of slop that causes accessibility regressions rather than just bad reading.

**Hedged non-guidance.** "Consider whether a badge is appropriate for your use case." This is the shape of advice with the advice removed. Either give the criterion or cut the line.

## Checklist

Answer each with pass or fail. On any fail, fix the draft and read it again.

1. Does every sentence fail the portability test — is each one specific to this component?
2. Are the banned words, empty adverbs, and filler phrases gone?
3. Are binary contrasts, negative listings, rhetorical setups, and throat-clearing openers gone?
4. Are faux-insight setups, colon reveals, `-ing` superficial analysis, fake-strong verbs, and dramatic fragments rewritten as plain sentences?
5. Is importance puffery replaced with the plain fact, and weasel attribution either sourced or cut?
6. Is interpretive metadiscourse gone — no lines telling the reader what to notice?
7. Are there no fake-profound kickers and no summary-recap ending?
8. Is one term used per concept, consistently across heading, body, and code?
9. Do `### Best practices:` and `### When NOT to use:` bullets each carry real, specific guidance, with alternatives named and linked?
10. Does the prose avoid restating the props table or narrating the canvas?
11. Is every behavioral and accessibility claim grounded in the implementation, with anything unconfirmed marked `TODO:`?
12. Are em dashes sparse, bold reserved for UI labels and anatomy parts, and headings free of emoji?
13. Does it avoid robotic symmetry — do the variant subsections read as written rather than filled in?
14. Would this read naturally if said aloud to a colleague who is about to use the component?

---

The words, patterns, and checklist above are adapted from the [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) skill by Peter Yang, MIT licensed, Copyright (c) 2026 Peter Yang. Examples and the component-doc sections have been rewritten for Gamut documentation.

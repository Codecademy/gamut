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

#### Props documentation

Add a sentence-cased description to every prop, except widespread, self-documenting ones like `onClick`. React props get picked up by Storybook and shown in the component's documentation story — write full sentences:

```ts
/**
 * Number of lines to limit the message to.
 */
limit: number;
```

- If a comment only restates the prop's name and type, elaborate on it or remove it.
- Start boolean prop comments with "Whether".

### Unit tests

Add unit tests in a `__tests__/MyComponent-test.tsx` file within the component's directory, using `setupRtl` from `gamut-tests`. Unit test all component logic, with the exception of class names on components that already contain other tested logic.

### Stories

Every component needs Storybook stories demonstrating its use — see the styleguide's own story-writing conventions for the expected shape.

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

---
sidebar_position: 2
---

# Build your first page

This tutorial walks through assembling a small page — a form that submits
feedback — using only Gamut components. It assumes you've already completed
[Installation](./installation.md).

:::note Work in progress
This tutorial is one of the two net-new pages called for by ADR 0001
(Information architecture for the new Gamut documentation site): it has no
equivalent in the old Storybook docs and needs to be written from scratch.
The outline below is the target shape.
:::

## What you'll build

A page with:

1. A page heading using `Text`
2. A `FormGroup` with a labeled `Input`
3. A `FillButton` that submits the form
4. An `Alert` that confirms success

## 1. Lay out the page

Start with a `ContentContainer` to constrain width and a `Text` heading.

## 2. Add the form

Use `FormGroup` + `Input` for the field, and wire submit state with
`useState`.

## 3. Handle submission feedback

Render an `Alert` with `type="success"` when the request resolves. This is
also a natural point to link to [Building forms](../guides/building-forms.md)
for the fuller how-to on validation and `ConnectedForm`.

## Next steps

- [Guides](../guides/theming-your-app.md) for task-specific recipes once
  you're past the basics.
- [Components](../components/index.md) to look up any component you used
  above in more depth.

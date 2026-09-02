---
title: Loaders
description: Indeterminate loading indicators.
sidebar:
  label: Overview
---

Two indeterminate loading indicators — reach for one only when there's no known amount of progress to show. Once you know how much of a task is done, [ProgressBar](/components/status/progress-bar/) or [RadialProgress](/components/status/radial-progress/) communicates more.

- [Spinner](/components/status/loaders/spinner/) — a spinning circle, sized via `size` and colored via `currentColor`.
- [Shimmer](/components/status/loaders/shimmer/) — a `Box` with an animated gradient sweep, sized and styled like any other `Box`.

Neither has a family of shape, size, or color variants: `Spinner` takes exactly one custom prop (`size`); `Shimmer` takes only standard `Box`/system props.

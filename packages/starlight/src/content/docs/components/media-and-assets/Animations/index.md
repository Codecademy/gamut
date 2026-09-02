---
title: Animations
description: Small motion primitives used to animate other components.
sidebar:
  label: Overview
---

Three small motion primitives, all built on [Framer Motion](https://motion.dev). Each is a container for the content being animated, not the click target of whatever triggers it.

- [ExpandInCollapseOut](/components/media-and-assets/animations/expand-in-collapse-out/) — animates a region's height open and closed; triggered by mounting/unmounting.
- [FadeInSlideOut](/components/media-and-assets/animations/fade-in-slide-out/) — fades in, and fades and slides out; also triggered by mounting/unmounting.
- [Rotation](/components/media-and-assets/animations/rotation/) — rotates its children by a set number of degrees; driven by a `rotated` boolean prop, not by mounting or unmounting.

All three use Gamut's standard timing scale (`fast`: 150ms, `medium`: 200ms) rather than one-off durations.

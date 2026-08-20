// Plain metadata (no React/Gamut imports) so Vue templates can render select
// options during SSR without pulling React's CJS dependency chain into the
// server bundle. The actual components load lazily from ./buttons.tsx.
export const buttonComponentNames = [
  'FillButton',
  'StrokeButton',
  'TextButton',
] as const;
export type ButtonComponentName = (typeof buttonComponentNames)[number];

export const buttonVariantNames = [
  'primary',
  'secondary',
  'danger',
  'interface',
] as const;
export type ButtonVariantName = (typeof buttonVariantNames)[number];

export const displayValues = [
  'block',
  'inline-block',
  'inline',
  'grid',
  'flex',
  'inline-flex',
  'none',
] as const;

export type DisplayTypes = typeof displayValues[number];

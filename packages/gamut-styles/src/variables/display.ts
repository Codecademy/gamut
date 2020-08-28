export const displayValues = [
  'block',
  'inline-block',
  'inline',
  'grid',
  'flex',
  'inline-flex',
] as const;

export type DisplayTypes = typeof displayValues[number];

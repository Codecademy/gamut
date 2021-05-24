export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1440px',
} as const;

export type MediaSize = keyof typeof breakpoints;

const createMediaQuery = (size: MediaSize, direction: 'min' | 'max') =>
  `@media only screen and (${direction}-width: ${breakpoints[size]})`;

export const mediaQueries = {
  xs: createMediaQuery('xs', 'min'),
  sm: createMediaQuery('sm', 'min'),
  md: createMediaQuery('md', 'min'),
  lg: createMediaQuery('lg', 'min'),
  xl: createMediaQuery('xl', 'min'),
};

export const contentWidths = {
  md: breakpoints.lg,
  max: breakpoints.xl,
};

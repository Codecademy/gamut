export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1440px',
} as const;

export type MediaSize = keyof typeof breakpoints;
export type ContainerSize = keyof typeof containerQueries;

const createMediaQuery = (size: MediaSize, direction: 'min' | 'max') =>
  `@media only screen and (${direction}-width: ${breakpoints[size]})`;

const createContainerQuery = (size: MediaSize, direction: 'min' | 'max') =>
  `@container (${direction}-width: ${breakpoints[size]})`;

export const mediaQueries = {
  xs: createMediaQuery('xs', 'min'),
  sm: createMediaQuery('sm', 'min'),
  md: createMediaQuery('md', 'min'),
  lg: createMediaQuery('lg', 'min'),
  xl: createMediaQuery('xl', 'min'),
};

export const containerQueries = {
  c_base: '@container (min-width: 1px)',
  c_xs: createContainerQuery('xs', 'min'),
  c_sm: createContainerQuery('sm', 'min'),
  c_md: createContainerQuery('md', 'min'),
  c_lg: createContainerQuery('lg', 'min'),
  c_xl: createContainerQuery('xl', 'min'),
};

export const contentWidths = {
  md: breakpoints.lg,
  max: breakpoints.xl,
};

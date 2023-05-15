export const typographyStyleVariants = {
  'title-xxl': {
    fontSize: 64,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-xl': {
    fontSize: 44,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-lg': {
    fontSize: 34,
    fontWeight: 'title',
    lineHeight: 'spacedTitle',
  },
  'title-md': {
    fontSize: 26,
    fontWeight: 'title',
    lineHeight: 'spacedTitle',
  },
  'title-sm': {
    fontSize: 22,
    fontWeight: 'title',
    lineHeight: 'spacedTitle',
  },
  'title-xs': {
    fontSize: 20,
    fontWeight: 'title',
    lineHeight: 'spacedTitle',
  },
  'p-large': {
    fontSize: 18,
    fontWeight: 'base',
    lineHeight: 'base',
  },
  'p-base': {
    fontSize: 16,
    fontWeight: 'base',
    lineHeight: 'base',
  },
  'p-small': {
    fontSize: 14,
    fontWeight: 'base',
    lineHeight: 'base',
  },
} as const;

export const typographyElementVariants = {
  h1: typographyStyleVariants['title-xxl'],
  h2: typographyStyleVariants['title-xl'],
  h3: typographyStyleVariants['title-lg'],
  h4: typographyStyleVariants['title-md'],
  h5: typographyStyleVariants['title-sm'],
  h6: typographyStyleVariants['title-xs'],
  p: {
    ...typographyStyleVariants['p-base'],
    fontSize: 16,
  },
  small: {
    ...typographyStyleVariants['p-small'],
    display: 'inline-block',
  },
  strong: {
    fontSize: 'inherit',
    fontWeight: 'title',
    display: 'inline-block',
  },
  code: {
    fontFamily: 'monospace',
    display: 'inline-block',
  },
  span: {
    fontSize: 'inherit',
    display: 'inline-block',
  },
  div: {},
  figcaption: {},
  label: {},
} as const;

export const typographyUtilities = {
  truncateLines: [1, 2, 3, 4, 5],
  truncation: ['ellipsis', 'fade'],
  smoothing: [true, false],
  screenreader: [true, false],
} as const;

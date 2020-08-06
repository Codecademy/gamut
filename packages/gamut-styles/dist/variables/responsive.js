export const breakpoints = {
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1440px',
};
const createMediaQuery = (size, direction) => `
  @media only screen and (${direction}-width: ${breakpoints[size]})
`;
export const mediaQueries = {
    xs: createMediaQuery('xs', 'min'),
    sm: createMediaQuery('sm', 'min'),
    md: createMediaQuery('md', 'min'),
    lg: createMediaQuery('lg', 'min'),
    xl: createMediaQuery('xl', 'min'),
};
export const maxContentWidth = breakpoints.xl;
//# sourceMappingURL=responsive.js.map
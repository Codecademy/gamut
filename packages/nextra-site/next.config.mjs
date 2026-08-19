import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  eslint: {
    // The repo-root ESLint config targets Gamut's component source
    // (`gamut/no-inline-style`, `gamut/no-css-standalone`, ...), not a
    // consuming docs site. This package will get its own lint setup
    // separately rather than fighting those rules during `next build`.
    ignoreDuringBuilds: true,
  },
});

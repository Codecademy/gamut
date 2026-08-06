import { css, styled, ThemeProvider, useTheme } from '@gamut-engine';

/* The RUNTIME half of Gamut, used by host AND remote across the MF boundary.
 *
 * Imported via the `@gamut-engine` alias (see build.mjs) rather than a relative
 * path, so it can be declared a Module Federation `shared` singleton — which is a
 * hard requirement, not an optimisation: React context does not cross a
 * federation boundary, so an unshared copy in a remote cannot see the host's
 * ThemeProvider. Proven in src/federation/verify.cjs. */

export const EngineCard = styled('div')(
  css({
    p: 16,
    borderRadius: 'md',
    border: 2,
    borderColor: 'primary',
    color: 'text',
  })
);

/** Renders the active theme's marker, so it's visible whether context crossed. */
export const ThemeMarker = () => {
  const theme = useTheme() as { marker?: string };
  return <strong>{theme?.marker ?? 'DEFAULT-THEME'}</strong>;
};

export { ThemeProvider };

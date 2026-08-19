import {
  type ColorModes,
  ColorMode,
  GamutProvider,
  theme,
} from '@codecademy/gamut-styles';
import { Global } from '@emotion/react';
import { type ReactNode, useEffect, useState } from 'react';

/**
 * Gamut theme values are CSS custom property references (`var(--color-*)`)
 * whose definitions GamutProvider normally injects alongside global reboot
 * and typography styles. Injecting only the variables keeps Starlight's own
 * page styling intact — custom properties on :root are inert until a Gamut
 * component references them.
 */
const ThemeVariables = () => (
  <>
    {Object.entries(theme._variables).map(([key, vars]) => (
      <Global key={key} styles={{ ':root': vars }} />
    ))}
  </>
);

/** Tracks Starlight's light/dark toggle (`data-theme` on <html>). */
const useStarlightMode = (): ColorModes => {
  const [mode, setMode] = useState<ColorModes>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setMode(root.dataset.theme === 'dark' ? 'dark' : 'light');
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return mode;
};

/**
 * Renders children inside a Gamut theme context, in the color mode matching
 * Starlight's current theme. The equivalent of a Storybook canvas frame.
 * Must be mounted with `client:only="react"` — Emotion SSR inside Astro is
 * not supported here, and `useStarlightMode` reads the DOM.
 */
export const GamutCanvas = ({ children }: { children: ReactNode }) => {
  const mode = useStarlightMode();

  return (
    <GamutProvider theme={theme} useGlobals={false}>
      <ThemeVariables />
      <ColorMode alwaysSetVariables mode={mode}>
        {children}
      </ColorMode>
    </GamutProvider>
  );
};

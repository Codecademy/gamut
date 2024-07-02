import { colors } from '@codecademy/gamut-styles/src';

export const selectableColors = Object.keys(colors).reduce<
  Record<string, string>
>((acc, colorKey) => {
  const colorAtKey = colors[colorKey as keyof typeof colors];

  return {
    ...acc,
    [colorKey]: colorAtKey,
  };
}, {});

export const selectableColorNames = Object.keys(colors).reduce<
  Record<string, string>
>((acc, colorKey) => {
  return {
    ...acc,
    [colorKey]: colorKey,
  };
}, {});

/**
 * Removes the h1 one dag from any external markdown so that we do not have 2 h1s on a story page.
 *
 * @param md Markdown to be formatted
 */
export const formatExternalMarkdown = (md: string) => {
  return md.replace(/(^|\n)(#\s.*)/g, '$1');
};

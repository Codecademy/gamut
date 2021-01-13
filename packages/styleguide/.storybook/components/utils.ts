import { colors } from '@codecademy/gamut-styles';

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

export const storyTitle = (absolute) => {
  const path = absolute.split('/');

  const start = path.indexOf('stories') + 1;
  const titlePath = path.slice(start, path.length);
  return titlePath
    .filter((slug) => slug.indexOf('index') === -1 && slug.length > 0)
    .map((slug) =>
      slug.replace('.stories.mdx', '').replace('Deprecated', ` (Deprecated)`)
    )
    .join('/');
};

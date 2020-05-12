export type Section =
  | 'Atoms'
  | 'Brand'
  | 'Foundations'
  | 'Molecules'
  | 'Organisms';

const stringify = (component: string | Function) =>
  component instanceof Function ? component.name : component;

export const decoratedStories = (
  title: Section,
  ...nesting: (string | Function)[]
) => {
  const component =
    nesting.find((component) => component instanceof Function) || nesting[0];

  return {
    component,
    title: [title, ...nesting].map(stringify).join('/'),
  };
};

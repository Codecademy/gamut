import { withKnobs } from '@storybook/addon-knobs';

export type Section =
  | 'Atoms'
  | 'Brand'
  | 'Foundations'
  | 'Molecules'
  | 'Organisms';

const stringify = (component: string | Function) =>
  component instanceof Function ? component.name : component;

export const decoratedStory = (
  title: Section,
  component: string | Function,
  ...nesting: (string | Function)[]
) => {
  return {
    component,
    decorators: [withKnobs],
    title: [title, component, ...nesting].map(stringify).join('/'),
  };
};

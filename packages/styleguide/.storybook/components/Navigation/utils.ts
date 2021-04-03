import { DocsContextProps } from '@storybook/addon-docs/blocks';
import { set, head, kebabCase, keyBy, isEmpty, get } from 'lodash';
import { ContentItem, Heirarchy } from './types';

export const INDEX_KIND = 'About';

const STATUS_ORDER: Record<string, number> = {
  stable: 1,
  volatile: 2,
  unknown: 3,
  deprecated: 4,
};

export function getChildLinks(children: Heirarchy): ContentItem[] {
  return Object.entries(children ?? {})
    .map(([_, child]) => ({
      title: _,
      subtitle: child?.subtitle,
      status: child?.status,
      story: child?.index.split('--')[1],
      kind: child?.index.split('--')[0],
      links: getChildLinks(child?.children),
    }))
    .sort(sortByStatus);
}

export const sanitizeKind = (kind: string) =>
  kind.replace(`/${INDEX_KIND}`, '');

export const sortByStatus = (a: ContentItem, b: ContentItem) => {
  switch (
    Math.sign((STATUS_ORDER[a?.status] || 0) - STATUS_ORDER[b?.status] || 0)
  ) {
    case 1:
      return 1;
    case -1:
      return -1;
    case 0:
    default:
      return 0;
  }
};

export const createHeirarchy = (storyStore: DocsContextProps['storyStore']) => {
  const kinds = storyStore._kinds;
  const stories = storyStore._stories;
  const allKinds = Object.keys(kinds);
  const heirarchy = {} as Heirarchy;
  allKinds.forEach((id) => {
    const {
      status = 'unknown',
      subtitle,
      component,
      subcomponents = {},
    } = kinds[id]?.parameters;

    const basePath = id.split('/').map(kebabCase).join('-');

    if (id.includes(INDEX_KIND)) {
      const parsedId = sanitizeKind(id);
      set(heirarchy, parsedId.replace(/\//g, '.children.'), {
        title: head(parsedId.split('/').reverse()),
        index: basePath.concat('--page'),
        subtitle,
      });
    } else {
      const heirarchyPath = id.replace(/\//g, '.children.');
      const subStories = storyStore.getStoriesForKind(id);
      const firstIndex = subStories[0] || {
        id: basePath.concat('--page'),
      };

      set(heirarchy, id.replace(/\//g, '.children.'), {
        index: firstIndex.id,
        title: head(id.split('/').reverse()),
        subtitle,
        status,
      });

      if (component || !isEmpty(subcomponents)) {
        const components = keyBy(
          [component?.name, ...Object.keys(subcomponents)]
            .filter(Boolean)
            .map((component) => ({
              title: component,
              index:
                stories[`${basePath}--${component.toLowerCase()}`]?.id ||
                firstIndex.id,
            })),
          ({ title }) => title
        );

        set(heirarchy, `${heirarchyPath}.children`, components);
      }
    }
  });
  return heirarchy;
};

import { DocsContextProps } from '@storybook/addon-docs/blocks';
import { set, head, keyBy, isEmpty, tail } from 'lodash';
import { ContentItem, Heirarchy, Taxonomy, TaxonomyStatus } from './types';

export const INDEX_KIND = 'About';

const STATUS_ORDER: Record<TaxonomyStatus, number> = {
  static: 0,
  stable: 1,
  volatile: 2,
  unknown: 3,
  deprecated: 4,
};

export function getChildLinks(children: Heirarchy): ContentItem[] {
  return Object.entries(children ?? {})
    .map(([_, child]) => ({
      title: child.title,
      subtitle: child?.subtitle,
      status: child?.status,
      story: child?.index.split('--')[1],
      kind: child?.index.split('--')[0],
      links: getChildLinks(child?.children),
    }))
    .sort(sortByStatus);
}

export const getKind = (
  kind: string,
  { root, indexPage }: { root: string; indexPage: string }
) => {
  const lowerCaseKind = kind.toLocaleLowerCase();
  const path = lowerCaseKind.replace(/\//g, '-');
  if (lowerCaseKind.includes(root)) {
    const indexPath = path.concat('--page');

    return {
      type: 'root',
      title: kind,
      path: indexPath,
    };
  }
  if (lowerCaseKind.includes(indexPage)) {
    const indexPath = path.concat('--page');
    const heirarchyPath = path.replace(`-${indexPage}`, '');
    return {
      type: 'index',
      title: tail(kind.split('/').reverse())[0],
      heirarchyOrder: heirarchyPath.replaceAll('-', '.children.'),
      path: indexPath,
    };
  }

  return {
    type: 'element',
    title: head(kind.split('/').reverse()),
    heirarchyOrder: path.replaceAll('-', '.children.'),
    path: path.replace(/\s/g, '-'),
  };
};

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

export const createTaxonomy = (context: DocsContextProps): Taxonomy => {
  const {
    storyStore,
    parameters: {
      taxonomy: { root, indexPage },
    },
  } = context;

  const kinds = storyStore._kinds;
  const stories = storyStore._stories;
  const allKinds = Object.keys(kinds);
  const taxonomy = {} as Taxonomy;
  const heirarchy = {} as Heirarchy;

  const config = {
    root: root.toLowerCase() as string,
    indexPage: indexPage.toLowerCase() as string,
  };

  allKinds.forEach((id) => {
    const {
      status = 'unknown',
      subtitle,
      component,
      subcomponents = {},
    } = kinds[id]?.parameters;
    const { type, title, heirarchyOrder = '', path } = getKind(id, config);

    switch (type) {
      case 'root':
        set(taxonomy, 'root', {
          status: 'static',
          subtitle,
          title: id,
          index: path,
        });
        break;
      case 'index':
        set(heirarchy, heirarchyOrder, {
          title,
          index: path,
          subtitle,
        });
        break;
      default:
        const subStories = storyStore.getStoriesForKind(id);
        const firstIndex = subStories[0] || {
          id: path.concat('--page'),
        };
        set(heirarchy, heirarchyOrder, {
          index: firstIndex.id,
          title,
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
                  stories[`${path}--${component.toLowerCase()}`]?.id ||
                  firstIndex.id,
              })),
            ({ title }) => title
          );

          set(heirarchy, `${heirarchyOrder}.children`, components);
        }
    }
  });

  set(taxonomy, 'heirarchy', heirarchy);

  return taxonomy;
};

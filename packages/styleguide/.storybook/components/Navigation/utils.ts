import { DocsContextProps } from '@storybook/addon-docs/blocks';
import { set, head, keyBy, isEmpty, tail, update } from 'lodash';
import { merge } from 'lodash/fp';
import { ContentItem, Hierarchy, Taxonomy, TaxonomyStatus } from './types';

export const INDEX_KIND = 'About';

const STATUS_ORDER: Record<TaxonomyStatus, number> = {
  static: 0,
  current: 1,
  updating: 2,
  unknown: 3,
  deprecated: 4,
};

export function getChildLinks(children: Hierarchy): ContentItem[] {
  return Object.entries(children ?? {})
    .map(([_, { children, ...rest }]) => ({
      ...rest,
      links: getChildLinks(children),
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
      id: indexPath,
      title: kind,
    };
  }
  if (lowerCaseKind.includes(indexPage)) {
    const indexPath = path.concat('--page');
    const heirarchyPath = path.replace(`-${indexPage}`, '');
    return {
      type: 'index',
      id: indexPath,
      title: tail(kind.split('/').reverse())[0],
      hierarchyOrder: heirarchyPath.replaceAll('-', '.children.'),
    };
  }

  return {
    type: 'element',
    id: path.replace(/\s/g, '-'),
    title: head(kind.split('/').reverse()),
    hierarchyOrder: path.replaceAll('-', '.children.'),
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
  const hierarchy = {} as Hierarchy;

  const config = {
    root: root.toLowerCase() as string,
    indexPage: indexPage.toLowerCase() as string,
  };

  allKinds.forEach((kind) => {
    const {
      status = 'unknown',
      subtitle,
      component,
      subcomponents = {},
    } = kinds[kind]?.parameters;
    const { type, hierarchyOrder = '', ...rest } = getKind(kind, config);

    switch (type) {
      case 'root':
        set(taxonomy, 'root', {
          ...rest,
          subtitle,
          status: 'static',
        });
        break;
      case 'index':
        update(
          hierarchy,
          hierarchyOrder,
          merge({
            ...rest,
            subtitle,
            status: 'static',
          })
        );
        break;
      default:
        let components = {};
        const subStories = storyStore.getStoriesForKind(kind);
        const firstIndex = subStories[0] || {
          id: rest.id.concat('--page'),
        };
        if (component || !isEmpty(subcomponents)) {
          components = keyBy(
            [component?.name, ...Object.keys(subcomponents)]
              .filter(Boolean)
              .map((component) => ({
                title: component,
                id:
                  stories[`${rest.id}--${component.toLowerCase()}`]?.id ||
                  firstIndex.id,
              })),
            ({ title }) => title
          );
        }

        update(
          hierarchy,
          hierarchyOrder,
          merge({
            ...rest,
            id: firstIndex.id,
            subtitle,
            status,
            children: components,
          })
        );
    }
  });

  set(taxonomy, 'hierarchy', hierarchy);

  return taxonomy;
};

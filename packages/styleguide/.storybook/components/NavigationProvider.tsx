import { DocsContext } from '@storybook/addon-docs/blocks';
import { set, head, kebabCase, keyBy, isEmpty, get } from 'lodash';
import React, { useContext, createContext } from 'react';

export const INDEX_KIND = 'About';

interface Heirarchy {
  title: string;
  index: string;
  subtitle: string;
  status: string;
  children: Heirarchy;
}

export interface ContentLink {
  title: string;
  subtitle: string;
  story: string;
  kind: string;
  status: 'stable' | 'deprecated' | 'volatile' | 'unknown';
}

export interface ContentItem extends ContentLink {
  links: ContentLink[];
}

export interface TableOfContents extends Omit<Heirarchy, 'children'> {
  children: ContentLink[];
}

export const NavigationContext = createContext<{
  heirarchy?: Heirarchy;
  getTableOfContents?: (kind: string) => TableOfContents;
  getBreadCrumbs?: (kind: string) => ContentLink[];
  getChildLinks?: (kind: Heirarchy) => ContentItem[];
}>({});

export const NavigationProvider: React.FC = ({ children }) => {
  const { storyStore } = useContext(DocsContext);
  const kinds = storyStore?._kinds ?? {};
  const stories = storyStore?._stories ?? {};

  const kindIds = Object.keys(kinds);
  const heirarchy = {} as Heirarchy;

  kindIds.forEach((id) => {
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

  const getTableOfContents = (kind: string): TableOfContents => {
    if (!kind.includes('/')) {
      return {
        ...heirarchy,
        children: getChildLinks(heirarchy.children!),
      };
    }
    const parsedKind = sanitizeKind(kind);
    const toc = get(
      heirarchy,
      parsedKind.replace('/', '.children.'),
      heirarchy
    );
    return {
      ...toc,
      children: getChildLinks(toc.children),
    };
  };

  const getBreadCrumbs = (kind: string): ContentLink[] => {
    const parsedKind = sanitizeKind(kind);
    const path = parsedKind.split('/');
    const currentPath: string[] = [];
    const links: any = {};
    path.forEach((path, i) => {
      currentPath.push(path);
      const section = get(heirarchy, currentPath.join('.children.'));
      links[section.title] = section;
    });

    return getChildLinks(links);
  };

  const context = {
    heirarchy,
    getTableOfContents,
    getBreadCrumbs,
    getChildLinks,
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};
export interface StoreItem {
  [x: string]: any;
}

const STATUS_ORDER: Record<string, number> = {
  stable: 1,
  volatile: 2,
  unknown: 3,
  deprecated: 4,
};

function getChildLinks(children: Heirarchy): ContentItem[] {
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

const sanitizeKind = (kind: string) => kind.replace(`/${INDEX_KIND}`, '');

export const sortByStatus = (a: StoreItem, b: StoreItem) => {
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

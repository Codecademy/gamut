import { DocsContext } from '@storybook/addon-docs/blocks';
import { get } from 'lodash';
import React, { useContext, createContext, useMemo } from 'react';
import { ContentItem, ContentLink, Heirarchy, TableOfContents } from './types';
import { getChildLinks, createTaxonomy, getKind } from './utils';

export type NavigationContextShape = {
  heirarchy: Heirarchy;
  getTableOfContents: (kind: string) => TableOfContents;
  getBreadCrumbs: (kind: string) => ContentLink[];
  getChildLinks: (kind: Heirarchy) => ContentItem[];
};

export const NavigationContext = createContext<NavigationContextShape>(
  {} as NavigationContextShape
);

export const NavigationProvider: React.FC = ({ children }) => {
  const context = useContext(DocsContext);
  const {
    parameters: {
      taxonomy: { root, indexPage },
    },
  } = context;
  const { root: rootToC, heirarchy } = createTaxonomy(context);

  const getTableOfContents = (kind: string): TableOfContents => {
    const { type, heirarchyOrder = '' } = getKind(kind, {
      root: root.toLowerCase(),
      indexPage: indexPage.toLowerCase(),
    });

    switch (type) {
      case 'root':
        return {
          ...rootToC,
          children: getChildLinks(heirarchy!),
        };
      default:
        const toc = get(heirarchy, heirarchyOrder, heirarchy);
        return {
          ...toc,
          children: getChildLinks(toc.children),
        };
    }
  };

  const getBreadCrumbs = (kind: string): ContentLink[] => {
    const { type, heirarchyOrder = '' } = getKind(kind, {
      root: root.toLowerCase(),
      indexPage: indexPage.toLowerCase(),
    });
    const path = heirarchyOrder.split('.children.');
    if (type !== 'root' && path.length > 1) {
      const currentPath: string[] = [];
      const links: any = {};

      if (path.length === 1) {
        return [];
      }

      path.forEach((path) => {
        currentPath.push(path);

        const section = get(heirarchy, currentPath.join('.children.'), {});
        links[section.title] = section;
      });
      return getChildLinks(links);
    }

    return [];
  };

  return (
    <NavigationContext.Provider
      value={{
        heirarchy,
        getTableOfContents,
        getBreadCrumbs,
        getChildLinks,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation() {
  const { kind } = useContext(DocsContext);
  const { getTableOfContents, getBreadCrumbs } = useContext(NavigationContext);
  return useMemo(
    () => ({
      toc: getTableOfContents(kind!),
      breadcrumbs: getBreadCrumbs(kind!),
    }),
    [kind]
  );
}

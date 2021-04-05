import { DocsContext } from '@storybook/addon-docs/blocks';
import { get } from 'lodash';
import React, { useContext, createContext, useMemo } from 'react';
import {
  ContentItem,
  ContentLink,
  Hierarchy,
  TableOfContentsShape,
} from './types';
import { getChildLinks, createTaxonomy, getKind } from './utils';

export type NavigationContextShape = {
  hierarchy: Hierarchy;
  getTableOfContents: (kind: string) => TableOfContentsShape;
  getBreadCrumbs: (kind: string) => ContentLink[];
  getChildLinks: (kind: Hierarchy) => ContentItem[];
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
  const { root: rootToC, hierarchy } = createTaxonomy(context);

  const getTableOfContents = (kind: string): TableOfContentsShape => {
    const { type, hierarchyOrder = '' } = getKind(kind, {
      root: root.toLowerCase(),
      indexPage: indexPage.toLowerCase(),
    });

    switch (type) {
      case 'root':
        return {
          ...rootToC,
          children: getChildLinks(hierarchy!),
        };
      default:
        const toc = get(hierarchy, hierarchyOrder, hierarchy);
        return {
          ...toc,
          children: getChildLinks(toc.children),
        };
    }
  };

  const getBreadCrumbs = (kind: string): ContentLink[] => {
    const { type, hierarchyOrder = '' } = getKind(kind, {
      root: root.toLowerCase(),
      indexPage: indexPage.toLowerCase(),
    });

    const path = hierarchyOrder.split('.children.');
    if (type !== 'root' && path.length > 1) {
      const currentPath: string[] = [];
      const links: any = {};

      path.forEach((path) => {
        currentPath.push(path);

        const section = get(hierarchy, currentPath.join('.children.'), {});
        links[section.title] = section;
      });

      return [rootToC, ...getChildLinks(links)];
    }
    return [];
  };

  return (
    <NavigationContext.Provider
      value={{
        hierarchy,
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

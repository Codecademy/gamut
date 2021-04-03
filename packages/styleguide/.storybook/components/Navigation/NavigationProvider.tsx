import { DocsContext } from '@storybook/addon-docs/blocks';
import { get } from 'lodash';
import React, { useContext, createContext } from 'react';
import { ContentItem, ContentLink, Heirarchy, TableOfContents } from './types';
import { getChildLinks, sanitizeKind, createHeirarchy } from './utils';

export const NavigationContext = createContext<{
  heirarchy?: Heirarchy;
  getTableOfContents?: (kind: string) => TableOfContents;
  getBreadCrumbs?: (kind: string) => ContentLink[];
  getChildLinks?: (kind: Heirarchy) => ContentItem[];
}>({});

export const NavigationProvider: React.FC = ({ children }) => {
  const { storyStore } = useContext(DocsContext);
  const heirarchy = createHeirarchy(storyStore);

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

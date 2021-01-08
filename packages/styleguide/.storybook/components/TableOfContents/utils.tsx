import { DocsContext } from '@storybook/addon-docs/blocks';
import { uniq } from 'lodash';
import { useMemo, useContext } from 'react';

export interface Kind {
  [x: string]: any;
}

export const INDEX_KIND = 'About';
const STATUS_ORDER = ['stable', 'volatile', 'deprecated'];

const getStatus = (kind: Kind) =>
  STATUS_ORDER.indexOf(kind?.parameters?.status);

export const sortByStatus = (a: Kind, b: Kind) => getStatus(a) - getStatus(b);

export const parsePath = (path: string) =>
  path.split('/').filter((slug) => slug !== INDEX_KIND);

export const getTitle = (path: string) => {
  const parsed = parsePath(path);
  return parsed[parsed.length - 1];
};

export const getAdjacentKinds = (indexKind: string, offset = 1) => {
  const sectionHeirarchy = indexKind.split('/');
  const adjacentDepth = sectionHeirarchy.length - offset;

  if (adjacentDepth === 0) {
    return ({ kind }: Kind) => kind.split('/')[1] === INDEX_KIND;
  }

  const adjacentPath = sectionHeirarchy.slice(0, adjacentDepth).join('/');

  return ({ kind }: Kind) => {
    const depth = parsePath(kind).length - 1;
    return (
      kind.indexOf(adjacentPath) === 0 &&
      indexKind !== kind &&
      depth === adjacentDepth
    );
  };
};

export function useKind(kind: string) {
  const { storyStore } = useContext(DocsContext);
  const kindMeta = storyStore?.['_kinds']?.[kind];
  const { status, component, subcomponents, subtitle } = kindMeta?.parameters;
  const path = parsePath(kind);
  const hasComponentStatus = Boolean(status || component || subcomponents);

  const allKinds = useMemo(
    () =>
      Object.entries(storyStore?.['_kinds']).map(
        ([key, kind]: [string, Kind]) => ({
          ...kind,
          kind: key,
        })
      ),
    []
  );

  const componentNames = useMemo(() => {
    if (!subcomponents) {
      return [];
    }
    return uniq([component?.name, ...Object.keys(subcomponents)]).filter(
      Boolean
    );
  }, [component, subcomponents]);

  const siblingKinds = allKinds
    .filter(getAdjacentKinds(kind))
    .sort(sortByStatus);

  const childrenKinds = allKinds
    .filter(getAdjacentKinds(path.join('/'), 0))
    .sort(sortByStatus);

  return {
    title: getTitle(kind),
    subtitle: subtitle,
    path: parsePath(kind),
    status: hasComponentStatus ? status || 'stable' : undefined,
    siblingKinds,
    childrenKinds,
    components: componentNames,
    parameters: kindMeta?.parameters,
  };
}

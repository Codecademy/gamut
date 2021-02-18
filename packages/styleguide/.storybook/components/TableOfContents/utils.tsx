import { DocsContext } from '@storybook/addon-docs/blocks';
import { kebabCase, uniq } from 'lodash';
import { useMemo, useContext } from 'react';

export interface Kind {
  [x: string]: any;
}

export const INDEX_KIND = 'About';

const STATUS_ORDER: Record<string, number> = {
  stable: 1,
  volatile: 2,
  deprecated: 3,
};

const getStatus = (kind: Kind) => STATUS_ORDER[kind?.status];

export const sortByStatus = (a: Kind, b: Kind) => {
  const aStatus = getStatus(a);
  const bStatus = getStatus(b);
  if (aStatus === bStatus) {
    return a.order > b.order ? 1 : -1;
  }
  return aStatus > bStatus ? 1 : -1;
};

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

export function useKind(kind: string = '') {
  const { storyStore } = useContext(DocsContext);
  const kindStore: Record<string, Kind> = storyStore?._kinds ?? {};
  const kindMeta = storyStore?._kinds?.[kind];
  const storiesStore = Object.keys(storyStore?._stories);
  console.log('Store', storiesStore);

  const { status, component, subcomponents, subtitle } = kindMeta?.parameters;
  const path = parsePath(kind);
  const hasComponentStatus = Boolean(status || component || subcomponents);

  const allKinds = useMemo(
    () =>
      Object.entries(kindStore).map(([key, kind]) => ({
        ...kind,
        kind: key,
        indexStory: storiesStore
          .find((k) => k.includes(kebabCase(key.replace('/', ''))))
          ?.split('--')[1],
        status: kind.parameters.status || 'stable',
      })),
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

  const siblingKinds = useMemo(
    () => allKinds.filter(getAdjacentKinds(kind)).sort(sortByStatus),
    [allKinds]
  );

  const childrenKinds = useMemo(
    () =>
      allKinds.filter(getAdjacentKinds(path.join('/'), 0)).sort(sortByStatus),
    [allKinds]
  );

  return {
    title: getTitle(kind),
    subtitle: subtitle,
    path: parsePath(kind),
    status: hasComponentStatus ? status || 'stable' : undefined,
    siblingKinds,
    childrenKinds,
    components: componentNames,
    parameters: kindMeta?.parameters,
    indexStory: storiesStore
      .find((k) => k.includes(kebabCase(kind.replace('/', ''))))
      ?.split('--')[1],
  };
}

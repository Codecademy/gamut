interface Kind {
  [x: string]: any;
}

const STATUS_ORDER = ['stable', 'volatile', 'deprecated'];

export const INDEX_KIND = 'About';

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
    return (kind: string) => kind.split('/')[1] === INDEX_KIND;
  }

  const adjacentPath = sectionHeirarchy.slice(0, adjacentDepth).join('/');

  return (kind: string) => {
    const depth = parsePath(kind).length - 1;
    return (
      kind.indexOf(adjacentPath) === 0 &&
      indexKind !== kind &&
      depth === adjacentDepth
    );
  };
};

const getStatus = (kind: Kind) =>
  STATUS_ORDER.indexOf(kind?.parameters?.status);

export const sortByStatus = (a: Kind, b: Kind) => getStatus(a) - getStatus(b);

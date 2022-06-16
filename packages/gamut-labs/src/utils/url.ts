export type QueryParams = {
  [key: string]: string | string[] | boolean | undefined;
};

export const getUrl = (path: string, params: QueryParams) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) search.append(key, value.toString());
  });

  const searchString = search.toString();

  const paramsString =
    params && searchString.length
      ? `${path.indexOf('?') === -1 ? '?' : '&'}${searchString}`
      : '';

  return `${path}${paramsString}`;
};

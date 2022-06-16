import { ParsedUrlQuery } from 'querystring';

import { getUrl } from './url';

/**
 * Maintains the query params on the current page, when navigating
 * to a different page.
 */
export const useRouteWithCurrentParams = (
  newPath: string,
  additionalParams: ParsedUrlQuery = {}
) => {
  if (typeof window === 'undefined') return newPath;

  const { search } = window.location;

  const query = Object.fromEntries(new URLSearchParams(search));

  return newPath && getUrl(newPath, { ...query, ...additionalParams });
};

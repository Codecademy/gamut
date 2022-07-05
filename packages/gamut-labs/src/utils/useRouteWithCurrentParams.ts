import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';

import { getUrl } from './url';

/**
 * Maintains the query params on the current page, when navigating
 * to a different page.
 */
export const useRouteWithCurrentParams = (
  newPath: string,
  additionalParams: ParsedUrlQuery = {}
) => {
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    if (window) {
      const url = getUrl(newPath, {
        ...Object.fromEntries(new URLSearchParams(window.location.search)),
        ...additionalParams,
      });

      setCurrentPageUrl(url);
    }
  }, [additionalParams, newPath]);

  return newPath && currentPageUrl;
};

/**
 * React 19 hoists <link> into document.head, so tests must query document
 * for preload links and clear them between tests.
 */
export const getPreloadLinks = (): NodeListOf<HTMLLinkElement> =>
  document.querySelectorAll('link[rel="preload"]');

export const clearPreloadLinks = (): void => {
  getPreloadLinks().forEach((el) => el.remove());
};

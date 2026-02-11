/**
 * Helper to get preload links from either container or document.head.
 * React 19 hoists <link> elements to document.head automatically.
 */
export const getPreloadLinks = (container: HTMLElement) => {
  const containerLinks = container.querySelectorAll('link[rel="preload"]');
  if (containerLinks.length > 0) return containerLinks;
  return document.head.querySelectorAll('link[rel="preload"][as="font"]');
};

/**
 * Cleans up hoisted preload links between tests.
 * Call this in beforeEach for tests that render <link> elements.
 */
export const cleanupPreloadLinks = () => {
  document.head
    .querySelectorAll('link[rel="preload"][as="font"]')
    .forEach((el) => el.remove());
};

/**
 * Mock reference for getFonts function.
 * Must be used after jest.mock('../utils/fontUtils') is called.
 */
export const mockGetFonts = require('../utils/fontUtils').getFonts;

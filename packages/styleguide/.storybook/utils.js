const headers = ['Core', 'Labs', 'Deprecated'];
const folders = ['Foundations', 'Atoms', 'Molecules', 'Organisms'];

/**
 * Modified from:
 * https://github.com/storybookjs/storybook/issues/6327#issuecomment-613122487
 */

export const storySort = (a, b) => {
  // a[1].kind is something like: Components|Accordion. Using "Components" for the headers array.
  // Using Components from ^^^
  const aKinds = a[1].kind.split('/');
  const bKinds = b[1].kind.split('/');

  if (aKinds[0] !== bKinds[0]) {
    // Comparing something like "components-accordion--main" to "getting-started-app--main".
    const aHeaderIndex = headers.findIndex((h) => h === aKinds[0]);
    const bHeaderIndex = headers.findIndex((h) => h === bKinds[0]);
    return aHeaderIndex - bHeaderIndex;
  }

  if (aKinds[1] !== bKinds[1]) {
    // Comparing something like "components-accordion--main" to "getting-started-app--main".
    const aFolderIndex = folders.findIndex((h) => h === aKinds[1]);
    const bFolderIndex = folders.findIndex((h) => h === bKinds[1]);

    return aFolderIndex - bFolderIndex;
  }

  return 0;
  /* Or instead of `return 0` compare something like "components-accordion--small" to "components-accordion--large"
   * and sort the stories inside each component...
   */
  // return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
};

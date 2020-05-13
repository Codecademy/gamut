const headers = ['Core', 'Labs', 'Deprecated'];
const folders = ['Foundations', 'Atoms', 'Molecules', 'Organisms'];

/**
 * Modified from:
 * https://github.com/storybookjs/storybook/issues/6327#issuecomment-613122487
 */

export const storySort = (a, b) => {
  // a[1].kind is something like: Components|Accordion. Using "Components" for the headers array.
  // Using Components from ^^^
  const [aHeader, aKind] = a[1].kind.split('|');
  const [bHeader, bKind] = b[1].kind.split('|');

  if (aHeader !== bHeader) {
    // Comparing something like "components-accordion--main" to "getting-started-app--main".
    const aHeaderIndex = headers.findIndex((h) => h === aHeader);
    const bHeaderIndex = headers.findIndex((h) => h === bHeader);
    return aHeaderIndex - bHeaderIndex;
  }

  const aFolder = aKind.split('/')[0];
  const bFolder = bKind.split('/')[0];

  if (aFolder !== bFolder) {
    // Comparing something like "components-accordion--main" to "getting-started-app--main".
    const aFolderIndex = folders.findIndex((h) => h === aFolder);
    const bFolderIndex = folders.findIndex((h) => h === bFolder);

    return aFolderIndex - bFolderIndex;
  }

  return 0;
  /* Or instead of `return 0` compare something like "components-accordion--small" to "components-accordion--large"
   * and sort the stories inside each component...
   */
  // return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
};

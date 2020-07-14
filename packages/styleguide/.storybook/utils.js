const folders = ['Foundations', 'Layouts', 'Atoms', 'Molecules', 'Organisms'];
const headers = ['Meta', ...folders, 'Labs', 'Deprecated'];
const heirarchy = [headers, folders];

/**
 * Modified from:
 * https://github.com/storybookjs/storybook/issues/6327#issuecomment-613122487
 */

const sortByKind = (kinds, kindA, kindB) => {
  const aIndex = kinds.findIndex((h) => h === kindA);
  const bIndex = kinds.findIndex((h) => h === kindB);
  return aIndex - bIndex;
};

export const storySort = (a, b) => {
  // a[1].kind is something like: Components|Accordion. Using "Components" for the headers array.
  // Using Components from ^^^
  const aKinds = a[1].kind.split('/');
  const bKinds = b[1].kind.split('/');

  for (let i = 0; i < aKinds.length; i += 1) {
    if (aKinds[i] !== bKinds[i] && heirarchy[i]) {
      return sortByKind(heirarchy[i], aKinds[i], bKinds[i]);
    }
  }

  return 0;
};

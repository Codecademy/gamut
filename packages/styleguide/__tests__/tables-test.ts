import path from 'path';
import readdir from 'recursive-readdir';

import { AboutCellProps } from '../.storybook/components/AboutCell';
import { ATOMS_TABLE } from '../stories/Core/Atoms/constants';
import { FOUNDATIONS_TABLE } from '../stories/Core/Foundations/constants';
import { LAYOUTS_TABLE } from '../stories/Core/Layouts/constants';
import { MOLECULES_TABLE } from '../stories/Core/Molecules/constants';
import { ORGANISMS_TABLE } from '../stories/Core/Organisms/constants';
import { TYPOGRAPHY_TABLE } from '../stories/Core/Typography/constants';

const cases: [string, AboutCellProps[]][] = [
  ['Core/Atoms', ATOMS_TABLE],
  ['Core/Molecules', MOLECULES_TABLE],
  ['Core/Foundations', FOUNDATIONS_TABLE],
  ['Core/Layouts', LAYOUTS_TABLE],
  ['Core/Organisms', ORGANISMS_TABLE],
  ['Core/Typography', TYPOGRAPHY_TABLE],
];

describe('Gamut Tables', () => {
  for (const [section, data] of cases) {
    test(`${section} has a story in its table for each .stories.mdx file`, async () => {
      const actualStories = await getStories(section);
      const expectedStories = data.map((datum) => datum.story);

      expect(actualStories).toEqual(expectedStories);
    });
  }
});

const getStories = async (section: string) => {
  const key = path.join(__dirname, '../stories', section);
  const children = await readdir(key);

  return children
    .map((child) => child.split(`${section}/`)[1])
    .filter((child) => child.endsWith('.stories.mdx'))
    .map((child) => child.replace('.stories.mdx', '').replace('/About', ''))
    .filter(
      (child) =>
        child !== 'About' && !child.includes('/') && !child.endsWith('Labs')
    )
    .sort();
};

import { adminTheme } from '../admin';
import { coreTheme } from '../core';
import { lxStudioTheme } from '../lxStudio';
import { platformTheme } from '../platform';

describe('themes', () => {
  it.each([
    ['core', coreTheme],
    ['platform', platformTheme],
    ['admin', adminTheme],
    ['lxStudio', lxStudioTheme],
  ])(`%s - theme shape`, (_, theme) => expect(theme).toMatchSnapshot());
});

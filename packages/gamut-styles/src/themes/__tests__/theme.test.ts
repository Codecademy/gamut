import { adminTheme } from '../admin';
import { coreTheme } from '../core';
import { lxStudioTheme } from '../lxStudio';
import { percipioTheme } from '../percipio';
import { platformTheme } from '../platform';

describe('themes', () => {
  it.each([
    ['core', coreTheme],
    ['platform', platformTheme],
    ['admin', adminTheme],
    ['lxStudio', lxStudioTheme],
    ['percipio', percipioTheme],
  ])(`%s - theme shape`, (_, theme) => expect(theme).toMatchSnapshot());
});

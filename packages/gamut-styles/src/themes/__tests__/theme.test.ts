import { adminTheme } from '../admin';
import { coreTheme } from '../core';
import { platformTheme } from '../platform';

describe('themes', () => {
  it.each([
    ['core', coreTheme],
    ['platform', platformTheme],
    ['admin', adminTheme],
  ])(`%s - theme shape`, (_, theme) => expect(theme).toMatchSnapshot());
});

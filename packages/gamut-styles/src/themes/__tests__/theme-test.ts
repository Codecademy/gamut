import { coreTheme } from '../core';
import { platformTheme } from '../platform';

describe('themes', () => {
  it.each([
    ['core', coreTheme],
    ['platform', platformTheme],
  ])(`%s - theme shape`, (_, theme) => expect(theme).toMatchSnapshot());
});

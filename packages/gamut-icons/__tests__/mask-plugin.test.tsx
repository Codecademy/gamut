import { transform } from '@babel/core';

import plugin from '../mask-plugin';

const menuIcon =
  '<svg viewBox="0 0 24 24"><title>navigation-menu</title><line class="a" x1="2.25" y1="18.003" x2="21.75" y2="18.003"/><line class="a" x1="2.25" y1="12.003" x2="21.75" y2="12.003"/><line class="a" x1="2.25" y1="6.003" x2="21.75" y2="6.003"/></svg>';

const testPlugin = (code: string) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', plugin],
    configFile: false,
  });

  return result?.code;
};

describe('title plugin', () => {
  it('should add title attribute if not present', () => {
    expect(testPlugin(menuIcon)).toMatchInlineSnapshot(
      `"<svg><mask id={'updogId'}><title>updog</title><div /></mask></svg>;"`
    );
  });
  it('also', () => {
    expect(testPlugin(menuIcon)).toMatchInlineSnapshot(
      `"<svg><mask id={'updogId'}><title>updog</title><div /></mask></svg>;"`
    );
  });
});

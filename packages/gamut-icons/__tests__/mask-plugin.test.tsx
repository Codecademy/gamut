import { transform } from '@babel/core';

import plugin from '../mask-plugin';

const testPlugin = (code: string) => {
  const result = transform(code, {
    plugins: [plugin, '@babel/plugin-syntax-jsx'],
    configFile: false,
  });

  return result?.code;
};

describe('title plugin', () => {
  it('should add title attribute if not present', () => {
    expect(testPlugin('<svg><title>updog</title></svg>')).toMatchInlineSnapshot(
      `"<svg><mask><title id={titleId}>{title}</title></mask></svg>"`
    );
  });
});

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
    expect(
      testPlugin('<svg><title>updog</title><div/></svg>')
    ).toMatchInlineSnapshot(
      `"<svg><mask id={'updogId'}><title>updog</title><div /></mask></svg>;"`
    );
  });
  it('also', () => {
    expect(
      testPlugin(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 12 12" width="12" height="12"><title>mini-add-icon</title><g transform="matrix(0.5,0,0,0.5,0,0)"><path d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z" fill="#000000" stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></path></g></svg>'
      )
    ).toMatchInlineSnapshot(
      `"<svg><mask id={'updogId'}><title>updog</title><div /></mask></svg>;"`
    );
  });
});

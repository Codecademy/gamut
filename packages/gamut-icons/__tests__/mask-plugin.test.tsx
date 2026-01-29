import { transform } from '@babel/core';

import plugin from '../mask-plugin';

const maskIdString = '`${maskId}`';
const urlIdString = '`url(#${maskId})`';
const size = '`100%`';
const currentColor = '`currentColor`';
const menuIcon =
  "<svg viewBox='0 0 16 16' height='16' width='16'><title>mini-bold-interface-arrow-up</title><g transform='matrix(1.6,0,0,1.6,0,0)'><path d='M8.03,2.72,5.53.22a.749.749,0,0,0-1.06,0l-2.5,2.5A.75.75,0,0,0,3.03,3.78L4.25,2.561V9.25a.75.75,0,0,0,1.5,0V2.561L6.97,3.78A.75.75,0,1,0,8.03,2.72Z' fill='#000000' stroke='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='0'></path></g></svg>";
const menuIconTitleEnd =
  "<svg viewBox='0 0 16 16' height='16' width='16'><g transform='matrix(1.6,0,0,1.6,0,0)'><path d='M8.03,2.72,5.53.22a.749.749,0,0,0-1.06,0l-2.5,2.5A.75.75,0,0,0,3.03,3.78L4.25,2.561V9.25a.75.75,0,0,0,1.5,0V2.561L6.97,3.78A.75.75,0,1,0,8.03,2.72Z' fill='#000000' stroke='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='0'></path></g><title>mini-bold-interface-arrow-up</title></svg>";
const postTransformIcon = `"<svg viewBox='0 0 16 16' height='16' width='16'><mask id={${maskIdString}}><g transform='matrix(1.6,0,0,1.6,0,0)'><path d='M8.03,2.72,5.53.22a.749.749,0,0,0-1.06,0l-2.5,2.5A.75.75,0,0,0,3.03,3.78L4.25,2.561V9.25a.75.75,0,0,0,1.5,0V2.561L6.97,3.78A.75.75,0,1,0,8.03,2.72Z' fill='#000000' stroke='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='0'></path></g></mask><g mask={${urlIdString}}><rect width={${size}} height={${size}} fill={${currentColor}} /></g></svg>;"`;
const testPlugin = (code: string) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', plugin],
    configFile: false,
  });
  return result?.code;
};

describe('title plugin', () => {
  it('should add a mask wrapper, add a mask id, and applies currentColor to the rect tag', () => {
    expect(testPlugin(menuIcon)).toMatchInlineSnapshot(postTransformIcon);
  });

  it('sets title outside of mask regardless of placement', () => {
    expect(testPlugin(menuIconTitleEnd)).toMatchInlineSnapshot(
      postTransformIcon
    );
  });
});

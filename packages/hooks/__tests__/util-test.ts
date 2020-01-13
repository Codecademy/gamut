/* eslint-disable no-underscore-dangle */
// @jest-environment node

import { isServer } from '../src/util';

describe('isServer', () => {
  beforeEach(() => {
    delete process.env.__SSR__;
    delete global['window'];
  });

  it('Returns false when window exists and the ENV variable is undefined', () => {
    global['window'] = {};
    expect(process.env.__SSR__).toBeUndefined();
    expect(isServer()).toBe(false);
  });

  it('Returns true when window exists and the ENV variable is true', () => {
    global['window'] = {};
    process.env.__SSR__ = 'true';
    expect(typeof window).toBe('object');
    expect(isServer()).toBe(true);
  });

  it('Returns true when window does not exist and the ENV variable is true', () => {
    process.env.__SSR__ = 'true';
    expect(isServer()).toBe(true);
  });

  it('Returns true when window does not exist and the ENV variable is undefined', () => {
    expect(process.env.__SSR__).toBeUndefined();
    expect(isServer()).toBe(true);
  });
});

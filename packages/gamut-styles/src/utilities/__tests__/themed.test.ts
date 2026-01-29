import { coreTheme } from '../../themes';
import { spacing } from '../../variables';
import { themed } from '../themed';

const theme = coreTheme;

describe('themed', () => {
  it('returns a function', () => {
    expect(typeof themed('colors.blue-300')).toBe('function');
  });

  it('returned function looks up the value at the supplied path', () => {
    const getLineHeight = themed('lineHeight.title');

    expect(getLineHeight({ theme })).toEqual(1.2);
  });

  it('returned function looks up the value at the supplied path with a number', () => {
    const getSpacing4 = themed('spacing.4');

    expect(getSpacing4({ theme })).toEqual('0.25rem');
  });

  it('can return a full object', () => {
    const getSpacing = themed('spacing');

    expect(getSpacing({ theme })).toEqual(spacing);
  });
});

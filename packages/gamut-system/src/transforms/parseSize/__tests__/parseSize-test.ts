import { percentageOrAbsolute } from '../../percentageOrAbsolute';
import { parseSize } from '..';

jest.mock('../../percentageOrAbsolute', () => ({
  percentageOrAbsolute: jest.fn(),
}));

describe(parseSize, () => {
  it('converts numbers to style values', () => {
    parseSize(0);
    expect(percentageOrAbsolute).toHaveBeenCalledWith(0);
  });

  it('normalizes decimals to have a starting 0 value', () => {
    expect(parseSize('.5rem')).toEqual('0.5rem');
  });

  it('does not mutate whole numbers with units', () => {
    expect(parseSize('5rem')).toEqual('5rem');
  });

  it('returns none numeric values as is', () => {
    expect(parseSize('auto')).toEqual('auto');
  });
});

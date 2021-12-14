import { percentageOrAbsolute } from '../../percentageOrAbsolute';
import { parseSize } from '..';
jest.mock('../../percentageOrAbsolute', function () {
  return {
    percentageOrAbsolute: jest.fn()
  };
});
describe(parseSize, function () {
  it('converts numbers to style values', function () {
    parseSize(0);
    expect(percentageOrAbsolute).toHaveBeenCalledWith(0);
  });
  it('normalizes decimals to have a starting 0 value', function () {
    expect(parseSize('.5rem')).toEqual('0.5rem');
  });
  it('does not mutate whole numbers with units', function () {
    expect(parseSize('5rem')).toEqual('5rem');
  });
  it('returns none numeric values as is', function () {
    expect(parseSize('auto')).toEqual('auto');
  });
});
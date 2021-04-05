import { percentageOrAbsolute, transformSize } from '../transformSize';

describe(percentageOrAbsolute, () => {
  it('returns 0 with no units', () => {
    expect(percentageOrAbsolute(0)).toBe(0);
  });

  const percentages: [number, string][] = [
    [0.5, '50%'],
    [1 / 5, '20%'],
    [0.5, '50%'],
    [1, '100%'],
    [-1, '-100%'],
    [-0.4, '-40%'],
    [-1 / 4, '-25%'],
  ];

  percentages.forEach(([percent, result]) => {
    it(`it parses the correct percentage of ${percent} as ${result}`, () => {
      expect(percentageOrAbsolute(percent)).toEqual(result);
    });
  });

  const absoluteValues: [number, string][] = [
    [5, '5px'],
    [-5, '-5px'],
  ];

  absoluteValues.forEach(([value, result]) => {
    it(`transforms absolute value of ${value} to the pixel value of ${result}`, () => {
      expect(percentageOrAbsolute(value)).toEqual(result);
    });
  });
});

describe(transformSize, () => {
  it('normalizes decimals to have a starting 0 value', () => {
    expect(transformSize('.5rem')).toEqual('0.5rem');
  });

  it('does not mutate whole numbers with units', () => {
    expect(transformSize('5rem')).toEqual('5rem');
  });

  it('returns none numeric values as is', () => {
    expect(transformSize('auto')).toEqual('auto');
  });

  it('returns calc values without attempting to transform them', () => {
    expect(transformSize('calc(100% - 50px)')).toEqual('calc(100% - 50px)');
  });
});

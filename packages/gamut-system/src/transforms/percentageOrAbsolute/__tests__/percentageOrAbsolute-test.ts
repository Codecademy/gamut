import { percentageOrAbsolute } from '..';

describe(percentageOrAbsolute, () => {
  it('returns 0 with no units', () => {
    expect(percentageOrAbsolute(0)).toBe(0);
  });

  it('returns any value between -1 and 1 as a percentage', () => {
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
      expect(percentageOrAbsolute(percent)).toEqual(result);
    });
    expect(percentageOrAbsolute);
  });

  it('returns any value between -1 and 1 as a percentage', () => {
    const absoluteValues: [number, string][] = [
      [5, '5px'],
      [-5, '-5px'],
    ];
    absoluteValues.forEach(([value, result]) => {
      expect(percentageOrAbsolute(value)).toEqual(result);
    });
    expect(percentageOrAbsolute);
  });
});

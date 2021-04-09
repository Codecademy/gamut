import { percentageOrAbsolute, transformSize } from '../transformSize';

describe(percentageOrAbsolute, () => {
  it.each([
    [0, 0],
    [0.5, '50%'],
    [1 / 5, '20%'],
    [0.5, '50%'],
    [1, '100%'],
    [-1, '-100%'],
    [-0.4, '-40%'],
    [-1 / 4, '-25%'],
    [5, '5px'],
    [-5, '-5px'],
  ])('percentageOrAbsolute(%i)', (a: number, expected: string) => {
    expect(percentageOrAbsolute(a)).toBe(expected);
  });
});

describe(transformSize, () => {
  it.each([
    ['.5rem', '0.5rem'],
    ['5rem', '5rem'],
    ['auto', 'auto'],
    [0.5, '50%'],
    [-1, '-100%'],
    ['calc(100% - 50px)', 'calc(100% - 50px)'],
  ])('transformSize(%i)', (a: string, expected: string) => {
    expect(transformSize(a)).toBe(expected);
  });
});

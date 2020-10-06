import { percentageOrAbsolute } from '..';
describe(percentageOrAbsolute, () => {
    it('returns 0 with no units', () => {
        expect(percentageOrAbsolute(0)).toBe(0);
    });
    const percentages = [
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
    const absoluteValues = [
        [5, '5px'],
        [-5, '-5px'],
    ];
    absoluteValues.forEach(([value, result]) => {
        it(`transforms absolute value of ${value} to the pixel value of ${result}`, () => {
            expect(percentageOrAbsolute(value)).toEqual(result);
        });
    });
});
//# sourceMappingURL=percentageOrAbsolute-test.js.map
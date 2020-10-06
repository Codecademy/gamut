import { standardProperty } from '..';
describe(standardProperty, () => {
    it('creates a property function', () => {
        const propFunction = standardProperty({
            propName: 'display',
            computeValue: (val) => val,
        });
        const templatedStyles = propFunction({ display: 'block' });
        expect(templatedStyles).toEqual({ display: 'block' });
    });
    it('accepts a custom transform function', () => {
        const doubleMargin = standardProperty({
            propName: 'margin',
            computeValue: (val) => `${val * 2}px`,
        });
        const templatedStyles = doubleMargin({ margin: 4 });
        expect(templatedStyles).toEqual({ margin: '8px' });
    });
    it('does not return a rule if not given a a value', () => {
        const propFunction = standardProperty({
            propName: 'display',
            computeValue: (val) => val,
        });
        const templatedStyles = propFunction({ display: undefined });
        expect(templatedStyles).toBe(undefined);
        const emptyPropsStyles = propFunction({});
        expect(emptyPropsStyles).toBe(undefined);
    });
    it('returns a rule if prop value is falsy', () => {
        const propFunction = standardProperty({
            propName: 'margin',
            computeValue: (val) => val,
        });
        const falsyValueStyles = propFunction({ margin: 0 });
        expect(falsyValueStyles).toEqual({ margin: 0 });
    });
});
//# sourceMappingURL=standardProperty-test.js.map
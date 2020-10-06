import { system } from '..';
import * as BaseProps from '../../../props';
describe(system, () => {
    describe('initializing system', () => {
        it('initializes a system with no arguments by default', () => {
            const { properties, propertyGroups, variant } = system();
            expect(properties).toBeDefined();
            expect(propertyGroups).toBeDefined();
            expect(variant).toBeDefined();
        });
    });
    describe('variant', () => {
        const { variant } = system();
        it('returns a style function with a propKey of variant by default', () => {
            const myVariant = variant({
                primary: { color: 'blue' },
                secondary: { color: 'green' },
            });
            expect(myVariant({ variant: 'primary' })).toEqual({ color: 'blue' });
        });
        it('can configure a different propKey', () => {
            const myVariant = variant({
                key: 'colorVariant',
                variants: { primary: { color: 'blue' }, secondary: { color: 'green' } },
            });
            expect(myVariant({ colorVariant: 'secondary' })).toEqual({
                color: 'green',
            });
        });
    });
    describe('base system', () => {
        const { properties, variant, ...systemProps } = system();
        Object.entries(BaseProps).forEach(([group, groupProps]) => {
            describe(group, () => {
                const groupPropConfigs = Object.entries(groupProps);
                it(`${group} composite renders without breaking`, () => {
                    const styleFunction = systemProps[group];
                    expect(styleFunction({ [groupPropConfigs[0][1].propName]: '' })).toBeDefined();
                });
                groupPropConfigs.forEach(([property, config]) => {
                    it(`${property} renders without breaking`, () => {
                        const styleFunction = properties[property];
                        expect(styleFunction({ [config.propName]: '' })).toBeDefined();
                    });
                });
            });
        });
    });
    xdescribe('customized system props', () => { });
});
//# sourceMappingURL=system-test.js.map
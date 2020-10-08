import { system } from '..';

describe(system, () => {
  describe('initializing system', () => {
    it('initializes a system with no arguments by default', () => {
      const { properties, variant, ...groups } = system();
      expect(properties).toBeDefined();
      expect(groups).toBeDefined();
      expect(variant).toBeDefined();
    });
  });

  describe('variant', () => {
    const { variant } = system({});

    it('returns a style function with a propKey of variant by default', () => {
      const myVariant = variant({
        primary: { color: 'blue' },
        secondary: { color: 'green' },
      });

      expect(myVariant({ variant: 'primary' })).toEqual({ color: 'blue' });
    });

    it('can configure a different propKey', () => {
      const myVariant = variant({
        prop: 'colorVariant',
        variants: {
          primary: { color: 'blue' },
          secondary: { color: 'green' },
        },
      });

      expect(myVariant({ colorVariant: 'secondary' })).toEqual({
        color: 'green',
      });
    });
  });

  describe('base system', () => {
    const { properties, variant, ...groups } = system();
    describe('groups', () => {
      Object.entries(groups).forEach(([group, styleFunction]) => {
        it(`${group} composite renders without breaking`, () => {
          expect(styleFunction).toBeDefined();
        });
      });
    });

    describe('properties', () => {
      Object.entries(properties).forEach(([property, styleFunction]) => {
        it(`${property} composite renders without breaking`, () => {
          expect(styleFunction).toBeDefined();
        });
      });
    });
  });

  xdescribe('customized system props', () => {});
});

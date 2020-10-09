import { system, ThemedSystem } from '..';

describe(system, () => {
  const { properties, variant, ...groups } = system({});

  describe('initializing system', () => {
    it('initializes a system with any empty config', () => {
      expect(properties).toBeDefined();
      expect(groups).toBeDefined();
      expect(variant).toBeDefined();
    });
  });

  describe('variant', () => {
    it('returns a style function with a propKey of variant by default', () => {
      const myVariant = variant({
        primary: { color: 'blue' },
        secondary: {
          color: 'green',
          backgroundColor: 'green',
          fontFamily: 'serif',
        },
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

  describe('Custom Scales', () => {
    const { typography, variant } = system({
      typography: {
        fontSize: { propName: 'fontSize', scale: { sm: '14px', md: '16px' } },
      },
    });

    it('theme scale values are found off of the specified theme', () => {
      expect(typography({ fontSize: 'md' })).toEqual({ fontSize: '16px' });
    });

    it('variants calculate theme values', () => {
      const textVariants = variant({
        caption: {
          fontSize: 'sm',
        },
        paragraph: {
          fontSize: 'md',
        },
      });

      expect(textVariants({ variant: 'caption' })).toEqual({
        fontSize: '14px',
      });
    });
  });

  describe('Theme Scales', () => {
    const themedSystem = system as ThemedSystem<{
      fontSize: { sm: string; md: string };
    }>;

    const { typography, variant } = themedSystem({
      typography: {
        fontSize: { propName: 'fontSize', scale: 'fontSize' },
      },
    });
    const theme = { fontSize: { sm: '14px', md: '16px' } };

    it('theme scale values are found off of the specified theme', () => {
      expect(typography({ fontSize: 'md', theme })).toEqual({
        fontSize: '16px',
      });
    });

    it('variants calculate theme values', () => {
      const textVariants = variant({
        caption: {
          fontSize: 'sm',
        },
        paragraph: {
          fontSize: 'md',
        },
      });

      expect(textVariants({ variant: 'caption', theme })).toEqual({
        fontSize: '14px',
      });
    });
  });

  describe('base system', () => {
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
});

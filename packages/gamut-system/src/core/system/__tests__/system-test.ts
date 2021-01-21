import { system } from '..';

describe('system', () => {
  const { css, properties, variant } = system.create({});

  describe('initializing system', () => {
    it('initializes a system with any empty config', () => {
      expect(properties).toBeDefined();
      expect(variant).toBeDefined();
      expect(css).toBeDefined();
    });
  });

  describe('variant', () => {
    it('returns a style function with a propKey of variant by default', () => {
      const myVariant = variant({
        primary: { textColor: 'blue' },
        secondary: {
          textColor: 'green',
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
          primary: { textColor: 'blue' },
          secondary: { textColor: 'green' },
        },
      });

      expect(myVariant({ colorVariant: 'secondary' })).toEqual({
        color: 'green',
      });
    });
  });

  describe('css', () => {
    it('returns a higher order function that returns a css object', () => {
      const myCustomCss = css({ textColor: 'blue' });

      expect(myCustomCss()).toEqual({ color: 'blue' });
    });
  });

  describe('Custom Scales', () => {
    const {
      properties: { fontSize },
      variant,
    } = system.create({
      fontSize: { propName: 'fontSize', scale: { sm: '14px', md: '16px' } },
    });

    it('theme scale values are found off of the specified theme', () => {
      expect(fontSize({ fontSize: 'md' })).toEqual({ fontSize: '16px' });
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
    const {
      properties: { fontSize },
      variant,
    } = system
      .withTheme<{
        fontSize: { sm: string; md: string };
      }>()
      .create({
        fontSize: { propName: 'fontSize', scale: 'fontSize' },
      });
    const theme = { fontSize: { sm: '14px', md: '16px' } };

    it('theme scale values are found off of the specified theme', () => {
      expect(fontSize({ fontSize: 'md', theme })).toEqual({
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
    describe('properties', () => {
      Object.entries(properties).forEach(([property, styleFunction]) => {
        it(`${property} composite renders without breaking`, () => {
          expect(styleFunction).toBeDefined();
        });
      });
    });
  });
});

import { variance } from '../../src';

const theme = {
  breakpoints: {
    xs: '@media only screen and (min-width: 480px)',
    sm: '@media only screen and (min-width: 768px)',
    md: '@media only screen and (min-width: 1024px)',
    lg: '@media only screen and (min-width: 1200px)',
    xl: '@media only screen and (min-width: 1440px)',
    c_base: '@container (min-width: 1px)',
    c_xs: '@container (min-width: 480px)',
    c_sm: '@container (min-width: 768px)',
    c_md: '@container (min-width: 1024px)',
    c_lg: '@container (min-width: 1200px)',
    c_xl: '@container (min-width: 1440px)',
  },
} as any;

describe('Queries', () => {
  describe('Container Queries', () => {
    it('should generate container query styles', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', c_md: 'blue' },
        fontSize: { _: '16px', c_lg: '20px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '16px',
        '@container (min-width: 1024px)': {
          color: 'blue',
        },
        '@container (min-width: 1200px)': {
          fontSize: '20px',
        },
      });
    });

    it('should generate styles with object syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
      });

      const styles = css({
        color: {
          _: 'red',
          c_xs: 'blue',
          c_sm: 'green',
          c_md: 'purple',
          c_lg: 'orange',
        },
        fontSize: { _: '14px', c_md: '16px', c_xl: '18px' },
        padding: { _: '8px', c_xs: '12px', c_md: '16px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '14px',
        padding: '8px',
        '@container (min-width: 480px)': {
          color: 'blue',
          padding: '12px',
        },
        '@container (min-width: 768px)': {
          color: 'green',
        },
        '@container (min-width: 1024px)': {
          color: 'purple',
          fontSize: '16px',
          padding: '16px',
        },
        '@container (min-width: 1200px)': {
          color: 'orange',
        },
        '@container (min-width: 1440px)': {
          fontSize: '18px',
        },
      });
    });

    it('should handle partial object values', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', c_sm: 'green', c_lg: 'blue' },
        fontSize: { _: '14px', c_md: undefined, c_xl: '18px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '14px',
        '@container (min-width: 768px)': {
          color: 'green',
        },
        '@container (min-width: 1200px)': {
          color: 'blue',
        },
        '@container (min-width: 1440px)': {
          fontSize: '18px',
        },
      });
    });

    it('should handle undefined values in responsive objects', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', c_sm: undefined, c_lg: 'green' },
        fontSize: { _: '14px', c_md: undefined, c_xl: '18px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '14px',
        '@container (min-width: 1200px)': {
          color: 'green',
        },
        '@container (min-width: 1440px)': {
          fontSize: '18px',
        },
      });
    });

    it('should handle function values in responsive objects', () => {
      const css = variance.createCss({
        color: { property: 'color' },
      });

      const styles = css({
        color: {
          _: 'red',
          c_md: (theme: any) => theme.colors?.primary || 'blue',
          c_lg: 'green',
        },
      })({ theme: { ...theme, colors: { primary: 'purple' } } });

      expect(styles).toEqual({
        color: 'red',
        '@container (min-width: 1024px)': {
          color: 'purple',
        },
        '@container (min-width: 1200px)': {
          color: 'green',
        },
      });
    });

    it('should handle nested selectors with responsive values', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', c_md: 'blue' },
        '&:hover': {
          color: { _: 'darkred', c_md: 'darkblue' },
          fontSize: { _: '16px', c_lg: '18px' },
        },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        '@container (min-width: 1024px)': {
          color: 'blue',
        },
        '&:hover': {
          color: 'darkred',
          fontSize: '16px',
          '@container (min-width: 1024px)': {
            color: 'darkblue',
          },
          '@container (min-width: 1200px)': {
            fontSize: '18px',
          },
        },
      });
    });

    it('should generate c_base container query styles', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        padding: { property: 'padding' },
      });

      const styles = css({
        color: { _: 'red', c_base: 'blue' },
        padding: { _: '8px', c_base: '12px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        padding: '8px',
        '@container (min-width: 1px)': {
          color: 'blue',
          padding: '12px',
        },
      });
    });

    it('should generate container query styles with array syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      // Array indices: 0: base, 1: xs, 2: sm, 3: md, 4: lg, 5: xl, 6: c_base, 7: c_xs, 8: c_sm, 9: c_md, 10: c_lg, 11: c_xl
      const styles = css({
        color: [
          'red', // base
          undefined, // xs
          undefined, // sm
          undefined, // md
          undefined, // lg
          undefined, // xl
          'yellow', // c_base
          'blue', // c_xs
          'green', // c_sm
          'purple', // c_md
          'orange', // c_lg
          'pink', // c_xl
        ],
        fontSize: [
          '12px', // base
          undefined, // xs
          undefined, // sm
          undefined, // md
          undefined, // lg
          undefined, // xl
          '13px', // c_base
          '14px', // c_xs
          '16px', // c_sm
          '18px', // c_md
          '20px', // c_lg
          '22px', // c_xl
        ],
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '12px',
        '@container (min-width: 1px)': {
          color: 'yellow',
          fontSize: '13px',
        },
        '@container (min-width: 480px)': {
          color: 'blue',
          fontSize: '14px',
        },
        '@container (min-width: 768px)': {
          color: 'green',
          fontSize: '16px',
        },
        '@container (min-width: 1024px)': {
          color: 'purple',
          fontSize: '18px',
        },
        '@container (min-width: 1200px)': {
          color: 'orange',
          fontSize: '20px',
        },
        '@container (min-width: 1440px)': {
          color: 'pink',
          fontSize: '22px',
        },
      });
    });
  });

  describe('Media Queries', () => {
    it('should generate styles with object syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
      });

      const styles = css({
        color: { _: 'red', sm: 'blue', lg: 'green' },
        fontSize: { _: '14px', md: '16px', xl: '18px' },
        padding: { _: '8px', xs: '12px', md: '16px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '14px',
        padding: '8px',
        '@media only screen and (min-width: 480px)': {
          padding: '12px',
        },
        '@media only screen and (min-width: 768px)': {
          color: 'blue',
        },
        '@media only screen and (min-width: 1024px)': {
          fontSize: '16px',
          padding: '16px',
        },
        '@media only screen and (min-width: 1200px)': {
          color: 'green',
        },
        '@media only screen and (min-width: 1440px)': {
          fontSize: '18px',
        },
      });
    });

    it('should generate styles with array syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: ['red', 'blue', 'green', 'purple', 'orange'],
        fontSize: ['12px', '14px', '16px', '18px', '20px'],
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '12px',
        '@media only screen and (min-width: 480px)': {
          color: 'blue',
          fontSize: '14px',
        },
        '@media only screen and (min-width: 768px)': {
          color: 'green',
          fontSize: '16px',
        },
        '@media only screen and (min-width: 1024px)': {
          color: 'purple',
          fontSize: '18px',
        },
        '@media only screen and (min-width: 1200px)': {
          color: 'orange',
          fontSize: '20px',
        },
      });
    });

    it('should handle partial array values', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: ['red', 'blue', 'green'],
        fontSize: ['12px', '14px'],
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '12px',
        '@media only screen and (min-width: 480px)': {
          color: 'blue',
          fontSize: '14px',
        },
        '@media only screen and (min-width: 768px)': {
          color: 'green',
        },
      });
    });

    it('should handle mixed object and array syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
      });

      const styles = css({
        color: { _: 'red', md: 'blue', xl: 'green' },
        fontSize: ['12px', '14px', '16px', '18px', '20px'],
        padding: { _: '8px', sm: '12px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '12px',
        padding: '8px',
        '@media only screen and (min-width: 480px)': {
          fontSize: '14px',
        },
        '@media only screen and (min-width: 768px)': {
          fontSize: '16px',
          padding: '12px',
        },
        '@media only screen and (min-width: 1024px)': {
          color: 'blue',
          fontSize: '18px',
        },
        '@media only screen and (min-width: 1200px)': {
          fontSize: '20px',
        },
        '@media only screen and (min-width: 1440px)': {
          color: 'green',
        },
      });
    });

    it('should handle undefined values in responsive objects', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', sm: undefined, lg: 'green' },
        fontSize: { _: '14px', md: undefined, xl: '18px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '14px',
        '@media only screen and (min-width: 1200px)': {
          color: 'green',
        },
        '@media only screen and (min-width: 1440px)': {
          fontSize: '18px',
        },
      });
    });

    it('should handle function values in responsive objects', () => {
      const css = variance.createCss({
        color: { property: 'color' },
      });

      const styles = css({
        color: {
          _: 'red',
          md: (theme: any) => theme.colors?.primary || 'blue',
          lg: 'green',
        },
      })({ theme: { ...theme, colors: { primary: 'purple' } } });

      expect(styles).toEqual({
        color: 'red',
        '@media only screen and (min-width: 1024px)': {
          color: 'purple',
        },
        '@media only screen and (min-width: 1200px)': {
          color: 'green',
        },
      });
    });

    it('should handle nested selectors with responsive values', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
      });

      const styles = css({
        color: { _: 'red', md: 'blue' },
        '&:hover': {
          color: { _: 'darkred', md: 'darkblue' },
          fontSize: { _: '16px', lg: '18px' },
        },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        '@media only screen and (min-width: 1024px)': {
          color: 'blue',
        },
        '&:hover': {
          color: 'darkred',
          fontSize: '16px',
          '@media only screen and (min-width: 1024px)': {
            color: 'darkblue',
          },
          '@media only screen and (min-width: 1200px)': {
            fontSize: '18px',
          },
        },
      });
    });

    it('should handle complex responsive patterns', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        backgroundColor: { property: 'backgroundColor' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
        margin: { property: 'margin' },
      });

      const styles = css({
        color: ['red', 'blue', 'green', 'purple', 'orange'],
        backgroundColor: { _: 'white', sm: 'lightgray', lg: 'darkgray' },
        fontSize: { _: '12px', md: '16px', xl: '20px' },
        padding: ['8px', '12px', '16px', '20px', '24px'],
        margin: { _: '4px', xs: '8px', c_md: '16px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        backgroundColor: 'white',
        fontSize: '12px',
        padding: '8px',
        margin: '4px',
        '@media only screen and (min-width: 480px)': {
          color: 'blue',
          padding: '12px',
          margin: '8px',
        },
        '@media only screen and (min-width: 768px)': {
          color: 'green',
          backgroundColor: 'lightgray',
          padding: '16px',
        },
        '@media only screen and (min-width: 1024px)': {
          color: 'purple',
          fontSize: '16px',
          padding: '20px',
        },
        '@media only screen and (min-width: 1200px)': {
          color: 'orange',
          backgroundColor: 'darkgray',
          padding: '24px',
        },
        '@media only screen and (min-width: 1440px)': {
          fontSize: '20px',
        },
        '@container (min-width: 1024px)': {
          margin: '16px',
        },
      });
    });
  });

  describe('Combined Queries', () => {
    it('should handle mixed media and container queries', () => {
      const css = variance.createCss({
        color: { property: 'color' },
      });

      const styles = css({
        color: { _: 'red', md: 'green', c_md: 'blue' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        '@media only screen and (min-width: 1024px)': {
          color: 'green',
        },
        '@container (min-width: 1024px)': {
          color: 'blue',
        },
      });
    });

    it('should handle mixed object and array syntax', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
      });

      const styles = css({
        color: { _: 'red', c_md: 'blue', c_xl: 'green' },
        fontSize: ['12px', '14px', '16px', '18px', '20px'],
        padding: { _: '8px', c_sm: '12px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        fontSize: '12px',
        padding: '8px',
        '@media only screen and (min-width: 480px)': {
          fontSize: '14px',
        },
        '@media only screen and (min-width: 768px)': {
          fontSize: '16px',
        },
        '@media only screen and (min-width: 1024px)': {
          fontSize: '18px',
        },
        '@media only screen and (min-width: 1200px)': {
          fontSize: '20px',
        },
        '@container (min-width: 768px)': {
          padding: '12px',
        },
        '@container (min-width: 1024px)': {
          color: 'blue',
        },
        '@container (min-width: 1440px)': {
          color: 'green',
        },
      });
    });

    it('should handle complex responsive patterns', () => {
      const css = variance.createCss({
        color: { property: 'color' },
        backgroundColor: { property: 'backgroundColor' },
        fontSize: { property: 'fontSize' },
        padding: { property: 'padding' },
        margin: { property: 'margin' },
      });

      const styles = css({
        color: ['red', 'blue', 'green', 'purple', 'orange'],
        backgroundColor: {
          _: 'white',
          c_sm: 'lightgray',
          c_lg: 'darkgray',
        },
        fontSize: { _: '12px', c_md: '16px', c_xl: '20px' },
        padding: ['8px', '12px', '16px', '20px', '24px'],
        margin: { _: '4px', c_xs: '8px', c_md: '16px' },
      })({ theme });

      expect(styles).toEqual({
        color: 'red',
        backgroundColor: 'white',
        fontSize: '12px',
        padding: '8px',
        margin: '4px',
        '@media only screen and (min-width: 480px)': {
          color: 'blue',
          padding: '12px',
        },
        '@media only screen and (min-width: 768px)': {
          color: 'green',
          padding: '16px',
        },
        '@media only screen and (min-width: 1024px)': {
          color: 'purple',
          padding: '20px',
        },
        '@media only screen and (min-width: 1200px)': {
          color: 'orange',
          padding: '24px',
        },
        '@container (min-width: 480px)': {
          margin: '8px',
        },
        '@container (min-width: 768px)': {
          backgroundColor: 'lightgray',
        },
        '@container (min-width: 1024px)': {
          fontSize: '16px',
          margin: '16px',
        },
        '@container (min-width: 1200px)': {
          backgroundColor: 'darkgray',
        },
        '@container (min-width: 1440px)': {
          fontSize: '20px',
        },
      });
    });
  });
});

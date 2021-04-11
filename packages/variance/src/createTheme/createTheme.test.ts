import { mapValues } from 'lodash';

import { createTheme } from './createTheme';

describe('createTheme', () => {
  const base = {
    breakpoints: { xs: '1', sm: '2', md: '3', lg: '4', xl: '5' },
  };
  it('works', () => {
    expect(createTheme(base).build().theme).toEqual(base);
  });

  it('adds a scale', () => {
    const { theme } = createTheme(base)
      .addScale('test', () => ({
        test: 1,
        test2: 2,
      }))
      .build();

    expect(theme.test).toEqual({ test: 1, test2: 2 });
  });

  it('updates a scale', () => {
    const builder = createTheme(base).addScale('test', () => ({
      test: 1,
      test2: 2,
    }));

    expect(builder.build().theme.test).toEqual({ test: 1, test2: 2 });

    builder.updateScale('test', () => ({ test3: 3 }));

    expect(builder.build().theme.test).toEqual({ test: 1, test2: 2, test3: 3 });
  });

  it('serializes variables', () => {
    const { theme, variables } = createTheme(base)
      .addScale('test', () => ({
        test: 1,
        test2: 2,
      }))
      .createVariables('test')
      .build();
    expect(theme.test).toEqual({
      test: 'var(--test-test)',
      test2: 'var(--test-test2)',
    });
    expect(variables.root).toEqual({ '--test-test': 1, '--test-test2': 2 });
  });

  describe('colors', () => {
    const staticColors = {
      white: 'white',
      black: 'black',
      blue: 'blue',
      green: 'green',
      red: 'red',
    };
    const cssVariableReferences = mapValues(
      staticColors,
      (val) => `var(--color-${val})`
    );
    const builder = createTheme(base);
    it('creates color variables', () => {
      const { theme } = builder.addColors(staticColors).build();

      expect(theme.colors).toEqual(cssVariableReferences);
    });
    it('adds colorModes', () => {
      const { theme, variables } = builder
        .addColors(staticColors)
        .createColorModes('light', {
          light: {
            primary: 'red',
          },
          dark: {
            primary: 'blue',
          },
        })
        .build();

      expect(theme.colors).toEqual({
        ...mapValues(staticColors, (val) => `var(--color-${val})`),
        primary: 'var(--color-primary)',
      });

      expect(variables.colorMode).toEqual({
        '--color-primary': 'var(--color-red)',
      });
    });

    it('returns value checker for colors', () => {
      const { theme, getColorValue } = builder
        .addColors({ black: '#000000', white: '#FFFFFF' })
        .createColorModes('light', {
          light: {
            primary: 'black',
          },
          dark: {
            primary: 'white',
          },
        })
        .build();

      expect(getColorValue('white')).toEqual('#FFFFFF');
      expect(getColorValue(theme.colorModes.modes.light.primary)).toEqual(
        '#000000'
      );
    });
  });
});

import { mapValues } from 'lodash';

import { createTheme } from './createTheme';

describe('createTheme', () => {
  const base = {
    breakpoints: { xs: '1', sm: '2', md: '3', lg: '4', xl: '5' },
  };
  it('works', () => {
    expect(createTheme(base).build()).toEqual({
      ...base,
      _variables: {},
      _tokens: {},
    });
  });

  it('adds a scale', () => {
    const theme = createTheme(base)
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

    expect(builder.build().test).toEqual({ test: 1, test2: 2 });

    builder.updateScale('test', () => ({ test3: 3 }));

    expect(builder.build().test).toEqual({ test: 1, test2: 2, test3: 3 });
  });

  it('serializes variables', () => {
    const theme = createTheme(base)
      .addScale('test', () => ({
        test: 1,
        test2: 2,
      }))
      .createScaleVariables('test')
      .build();

    expect(theme.test).toEqual({
      test: 'var(--test-test)',
      test2: 'var(--test-test2)',
    });
    expect(theme._variables.root).toEqual({
      '--test-test': 1,
      '--test-test2': 2,
    });
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
      const theme = builder.addColors(staticColors).build();

      expect(theme.colors).toEqual(cssVariableReferences);
    });
    it('adds colorModes', () => {
      const theme = builder
        .addColors(staticColors)
        .addColorModes('light', {
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

      expect(theme._variables.mode).toEqual({
        '--color-primary': 'var(--color-red)',
      });
    });

    it('returns value checker for colors', () => {
      const theme = builder
        .addColors({
          black: '#000000',
          white: '#FFFFFF',
        })
        .addColorModes('light', {
          light: {
            primary: 'black',
          },
          dark: {
            primary: 'white',
          },
        })
        .build();

      expect(theme._getColorValue('white')).toEqual('#FFFFFF');
      expect(theme._getColorValue(theme.modes.light.primary)).toEqual(
        '#000000'
      );
    });
    it('returns value checker for colors with deep values', () => {
      const theme = builder
        .addColors({
          black: '#000000',
          white: '#FFFFFF',
          gray: { 200: '#eeeeee', 300: '#666666' },
        })
        .addColorModes('light', {
          light: {
            primary: {
              default: 'gray-200',
              cool: { _: 'gray-300', town: 'black' },
            },
          },
        })
        .build();

      expect(theme._getColorValue('gray-300')).toEqual('#666666');
      expect(
        theme._getColorValue(theme.modes.light['primary-default'])
      ).toEqual('#eeeeee');
    });

    it('merges color mode configurations when overriden', () => {
      const theme = builder
        .addColors({
          black: '#000000',
          white: '#FFFFFF',
        })
        .addColorModes('light', {
          light: {
            primary: {
              _: 'black',
              hover: 'white',
            },
          },
        })
        .build();

      const override = createTheme(theme)
        .addColorModes('light', {
          light: {
            primary: {
              _: 'white',
              hover: 'black',
            },
          },
        })
        .build();

      expect(override.modes.light.primary).toEqual('white');
    });

    it('returns the raw values of color mode colors on the tokens object', () => {
      const theme = createTheme(base)
        .addColors({
          black: '#000000',
          gray: { 300: '#666666' },
        })
        .addColorModes('light', {
          light: {
            primary: {
              cool: { _: 'gray-300', town: 'black' },
            },
          },
        })
        .build();

      expect(theme._tokens.modes).toEqual({
        light: { 'primary-cool': '#666666', 'primary-cool-town': '#000000' },
      });
    });
  });
});

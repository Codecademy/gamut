module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        targets: 'defaults',
      },
    ],
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'macros',
    [
      '@emotion',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
  ignore: [],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};

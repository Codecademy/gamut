module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    'react-anonymous-display-name',
    [
      'emotion',
      {
        sourceMap: true,
        autoLabel: process.env.NODE_ENV !== 'production',
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

// todo: check whether adding emotion here is good?
//

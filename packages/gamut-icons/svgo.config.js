module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },

          removeTitle: false,
          removeViewBox: false,
        },
      },
    },
    { name: 'removeDimensions' },
    { name: 'removeDesc' },
  ],
};

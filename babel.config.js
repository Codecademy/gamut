module.exports = {
  babelrcRoots: ['*'],
  presets: [
    [require.resolve('@babel/preset-typescript'), { allowDeclareFields: true }],
    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
  ],
};

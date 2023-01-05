import base from '../../jest.config.base';

export default base('macros', {
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { configFile: require.resolve('./babel.config.js') },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});

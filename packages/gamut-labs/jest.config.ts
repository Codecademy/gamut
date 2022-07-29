export default {
  displayName: 'gamut-labs',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/../../script/jest/base-setup.js',
    '<rootDir>/../../script/jest/enzyme-setup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/gamut-labs',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

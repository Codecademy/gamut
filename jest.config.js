module.exports = {
  projects: ['<rootDir>/packages/*'],
  collectCoverageFrom: ['packages/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/stories/',
    '/vendor/',
    '/dist/',
    '/gamut-icons/icons/',
    '/tmp/',
    '/example/',
    '/typings/',
  ],
  coverageDirectory: './coverage',
};

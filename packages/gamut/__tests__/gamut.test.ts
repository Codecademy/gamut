import * as gamut from '../src/index';

test('Gamut Exported Keys', () => {
  const exportedNames = Object.keys(gamut).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  expect(exportedNames).toMatchSnapshot();
});

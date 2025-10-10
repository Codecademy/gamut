import * as icons from '../src/index';

test('Icons Exported Keys 1', () => {
  const exportedNames = Object.keys(icons).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  expect(exportedNames).toMatchSnapshot();
});

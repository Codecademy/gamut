import * as patterns from '../src/index';

test('Patterns Exported Keys 1', () => {
  const exportedNames = Object.keys(patterns).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  expect(exportedNames).toMatchSnapshot();
});

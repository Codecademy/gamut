const path = require('path');
const docgen = require('react-docgen-typescript');

const options = {
  savePropValueAsString: true,
};
// Create a parser with the default typescript config and custom docgen options
const customParser = docgen.withDefaultConfig(options);

const docs = customParser.parse('./path/to/component');

// Create a parser with the custom typescript and custom docgen options
const customCompilerOptionsParser = docgen.withCompilerOptions(
  { esModuleInterop: true },
  options
);

// Create a parser with using your typescript config
const tsConfigParser = docgen.withCustomConfig(
  path.resolve(__dirname, './../tsconfig.json'),
  {
    savePropValueAsString: true,
  }
);

// Parse a file for docgen info
console.log(
  tsConfigParser.parse(
    path.resolve(__dirname, '../../gamut/src/Badge/index.tsx'),
    options
  )[0].props
);

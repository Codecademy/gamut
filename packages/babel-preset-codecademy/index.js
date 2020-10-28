const path = require("path");

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvTest = env === "test";
const isEnvProduction = env === "production";
const isEnvDevelopment = !isEnvTest && !isEnvProduction;

const PACKAGE_LIBRARY = "library";
const PACKAGE_APPLICATION = "application";
const packageTypes = [PACKAGE_LIBRARY, PACKAGE_APPLICATION];

module.exports = (api, { type = PACKAGE_LIBRARY } = {}) => {
  if (!packageTypes.includes(type)) {
    throw new Error(
      `babel-preset-codecademy: option 'type' should be one of: ${[
        PACKAGE_LIBRARY,
        PACKAGE_APPLICATION,
      ].join(", ")}, received ${type}`
    );
  }

  let absoluteRuntimePath;
  if (type === PACKAGE_APPLICATION) {
    absoluteRuntimePath = path.dirname(
      require.resolve("@babel/runtime/package.json")
    );
  }

  return {
    presets: [
      isEnvTest && [
        require("@babel/preset-env").default,
        {
          targets: {
            node: "current",
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        require("@babel/preset-env").default,
        {
          useBuiltIns: "entry",
          modules: false,
          corejs: 2,
        },
      ],
      require("@babel/preset-react").default,
    ].filter(Boolean),
    plugins: [
      require("@babel/plugin-transform-destructuring").default,
      [require("@babel/plugin-proposal-decorators"), { legacy: true }],
      [
        require("@babel/plugin-proposal-class-properties").default,
        {
          loose: true,
        },
      ],
      [
        require("@babel/plugin-proposal-object-rest-spread").default,
        {
          useBuiltIns: true,
        },
      ],
      require("@babel/plugin-proposal-do-expressions"),
      require("@babel/plugin-proposal-export-default-from"),
      require("@babel/plugin-proposal-export-namespace-from"),
      require("@babel/plugin-proposal-nullish-coalescing-operator"),
      require("@babel/plugin-proposal-optional-chaining"),
      require("@babel/plugin-syntax-import-meta"),
      [
        require("@babel/plugin-transform-runtime").default,
        {
          corejs: false,
          regenerator: true,
          helpers: type === PACKAGE_APPLICATION,
          regenerator: true,
          useESModules: isEnvDevelopment || isEnvProduction,
          // Undocumented: ensures that the correct runtime version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime: absoluteRuntimePath,
        },
      ],
      require("babel-plugin-react-anonymous-display-name").default,
      require("@babel/plugin-syntax-dynamic-import").default,
      isEnvTest &&
        // Transform dynamic import to require
        require("babel-plugin-transform-dynamic-import").default,
    ].filter(Boolean),
  };
};

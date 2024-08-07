const path = require('path');
const { configs } = require('@codecademy/webpack-config');

// https://github.com/storybookjs/storybook/issues/12262#issuecomment-681953346
// make a shallow copy of an object, rejecting keys that match /emotion/
function emotionless<T extends Record<string, unknown>>(object: T) {
  let result = {} as T;
  for (let key in object) {
    if (!/emotion/.test(key)) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    './addons/system/preset',
    'storybook-addon-designs',
  ],
  stories: ['../stories/**/*.stories.@(mdx|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop: any) => {
        // allow reach-ui types
        if (prop.parent && /@reach/.test(prop.parent.fileName)) {
          return true;
        }
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
  babel: async (options: { presets: any }) => {
    return {
      ...options,
      presets: [
        ...options.presets,
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
          'preset-react-jsx-transform', // Can name this anything, just an arbitrary alias to avoid duplicate presets'
        ],
      ],
    };
  },

  webpackFinal: (config: any) => {
    const transpileModules = ['@reach'];

    // Find existing rule that excludes node_modules
    const nodeModulesRule = config.module.rules?.find((rule: any) =>
      rule.exclude?.toString().includes('node_modules')
    );
    if (nodeModulesRule) {
      // Tell existing rule to not exclude modules that need transpiling
      const newExclude = new RegExp(
        `node_modules/(?!(${transpileModules.join('|')})/).*`
      );

      if (Array.isArray(nodeModulesRule.exclude)) {
        nodeModulesRule.exclude = [
          newExclude,
          ...nodeModulesRule.exclude?.filter(
            (exclude: any) => !exclude.toString().includes('node_modules')
          ),
        ];
      } else {
        nodeModulesRule.exclude = newExclude;
      }
    }
    config.module.rules = config.module.rules.concat(
      configs.css().module.rules
    );

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...emotionless(config.resolve.alias),
        // Prevent usage of ESM version of htmlparser2
        htmlparser2$: 'htmlparser2/lib/index.js',
        '~styleguide/blocks': path.resolve(__dirname, './components/'),
        '@codecademy/storybook-addon-variance': path.resolve(
          __dirname,
          './addons/system/components/'
        ),
        '@codecademy/gamut-styles$': path.resolve(
          __dirname,
          '../../gamut-styles/src'
        ),

        '@codecademy/gamut$': path.resolve(__dirname, '../../gamut/src'),
        '@codecademy/gamut-illustrations$': path.resolve(
          __dirname,
          '../../gamut-illustrations/src'
        ),
        '@codecademy/variance$': path.resolve(__dirname, '../../variance/src'),
      },
    };

    return config;
  },
};

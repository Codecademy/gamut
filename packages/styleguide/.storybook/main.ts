import type { StorybookConfig } from '@storybook/react-webpack5';
import { resolve, dirname, join } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/lib/**/*.@(mdx)',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: ['../src/static'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@nx/react/plugins/storybook', ''),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-designs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {
      builder: {},
    },
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  webpackFinal(config) {
    config?.module?.rules?.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static', // Customize the output path if needed
          },
        },
      ],
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        '~styleguide/blocks': resolve(__dirname, './components/'),
        '@codecademy/gamut-styles$': resolve(
          __dirname,
          '../../gamut-styles/src'
        ),
        '@codecademy/gamut$': resolve(__dirname, '../../gamut/src'),
        '@codecademy/gamut-illustrations$': resolve(
          __dirname,
          '../../gamut-illustrations/src'
        ),
        '@codecademy/variance$': resolve(__dirname, '../../variance/src'),
      },
    };
    return config;
  },
};

export default config;

function getAbsolutePath(value: string, root = 'package.json'): string {
  return dirname(require.resolve(join(value, root)));
}

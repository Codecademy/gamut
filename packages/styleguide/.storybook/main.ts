import type { StorybookConfig } from '@storybook/react-webpack5';

const workspaceRoot = process.env.NX_WORKSPACE_ROOT;

if (!workspaceRoot) {
  throw new Error('This script must be run from an NX task');
}

const config: StorybookConfig = {
  stories: ['../src/stories'],
  addons: [
    '@storybook/addon-essentials',
    '@nx/react/plugins/storybook',
    '@storybook/addon-links',
    '@storybook/addon-designs',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false,
      },
    },
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { rspack } from '@rspack/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const styledSystem = path.resolve(__dirname, 'styled-system');

/* Aliased so the runtime engine can be declared a federation `shared` singleton —
 * `shared` keys are request strings, and a relative path can't be one. In real
 * Gamut this is just `@codecademy/gamut-styles`. */
const gamutEngine = path.resolve(
  __dirname,
  '../panda-styling-poc/src/gamut/engine'
);

const swc = {
  test: /\.tsx?$/,
  loader: 'builtin:swc-loader',
  options: {
    jsc: {
      parser: { syntax: 'typescript', tsx: true },
      transform: { react: { runtime: 'automatic' } },
    },
  },
};

const common = {
  mode: 'development',
  devtool: false,
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js'],
    alias: { 'styled-system': styledSystem, '@gamut-engine': gamutEngine },
  },
  module: { rules: [swc, { test: /\.css$/, type: 'css' }] },
  experiments: { css: true },
};

const { ModuleFederationPlugin } = rspack.container;
const shared = {
  react: { singleton: true, requiredVersion: false },
  'react-dom': { singleton: true, requiredVersion: false },
  /* MANDATORY, not an optimisation. The runtime engine holds React context (the
   * theme) and the injected-rule registry in module scope; an unshared copy in a
   * remote gets its own of each, so the host's ThemeProvider becomes invisible to
   * it. See src/federation/verify.cjs for the failure reproduced. */
  '@gamut-engine': { singleton: true, requiredVersion: false },
};

const remoteConfig = {
  ...common,
  name: 'remote',
  entry: { remote: './src/remote/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist/remote'),
    publicPath: 'http://localhost:3001/',
    uniqueName: 'remote',
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: { './Widget': './src/remote/Widget.tsx' },
      shared,
    }),
    new rspack.HtmlRspackPlugin({ template: './remote.html' }),
  ],
};

const hostConfig = {
  ...common,
  name: 'host',
  entry: { host: './src/host/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist/host'),
    publicPath: 'http://localhost:3000/',
    uniqueName: 'host',
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' },
      shared,
    }),
    new rspack.HtmlRspackPlugin({ template: './host.html' }),
  ],
};

const run = (cfg) =>
  new Promise((res, rej) =>
    rspack(cfg, (err, stats) => {
      if (err) return rej(err);
      if (stats.hasErrors()) {
        console.error(
          stats.toString({ colors: false, chunks: false, modules: false })
        );
        return rej(new Error(`${cfg.name} build failed`));
      }
      console.log(`${cfg.name} built OK`);
      res();
    })
  );

await run(remoteConfig);
await run(hostConfig);
console.log('MF build complete.');

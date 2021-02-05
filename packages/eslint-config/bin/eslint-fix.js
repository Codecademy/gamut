#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv))
  .check((argv, options) => {
    const filePaths = argv._;
    if (filePaths.length > 1) {
      throw new Error('Only 0 or 1 files may be passed.');
    } else {
      return true; // tell Yargs that the arguments passed the check
    }
  })
  .options('config', {
    alias: 'c',
    description: 'path you your ESLint config',
    default: path.resolve(__dirname, '../index.js'),
  })
  .options('_', {
    description: 'A pattern to files you want to fix with ESLint',
  })
  .command(
    '$0 [files..]',
    'Runs ESLint --fix on your files without throwing any errors'
  )
  .help();

const { ESLint } = require('eslint');

const runESLint = async () => {
  process.env.ESLINT_TYPE_AWARE = 'false';
  const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    overrideConfigFile: argv.config,
  });
  const results = await eslint.lintFiles(argv.files);
  await ESLint.outputFixes(results);
};

runESLint();

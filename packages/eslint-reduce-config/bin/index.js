#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const mkdirp = require('mkdirp');
const { isEmpty } = require('lodash');

const eslintReduceConfig = require('../index.js');

function list(val) {
  return val.split(',');
}

program
  .version('1.0.0')
  .option('-f, --file <file>', 'eslint file to reduce')
  .option('-o, --output <file>', 'output file')
  .option('-v, --verbose', 'print information on process')
  .option('-x, --exclude <items>', 'list of plugins to exclude', list)
  .parse(process.argv);

if (!program.file) process.exit();

const config = require(path.resolve(program.file));

const newConfig = eslintReduceConfig(config, {
  verbose: program.verbose,
  exclude: program.exclude,
});

if (!isEmpty(newConfig)) {
  const string = JSON.stringify(newConfig, null, ' ');
  if (!program.output) {
    console.log(string);
  } else {
    const directory = path.dirname(program.output);
    try {
      fs.statSync(directory);
    } catch (e) {
      mkdirp.sync(directory);
    }
    fs.writeFileSync(program.output, JSON.stringify(newConfig, null, ' '));
  }
}

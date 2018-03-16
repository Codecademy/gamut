#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const promptly = require('promptly');

program
  .version('1.0.0')
  .option('-f, --force', `skip confirmations`)
  .option('-o, --output <directory>', `output directory`, './')
  .option('-d, --dry-run', `dry run`)
  .parse(process.argv);

console.log(program);

const outputDirectory = path.resolve(program.output);
const inOutputDir = f => path.join(outputDirectory, f);

const files = {
  './.eslintrc.js': path.join(__dirname, '../index.js'),
  './prettier.config.js': path.join(__dirname, '../prettier.js'),
};

const copyFile = (source, target, cb) => {
  let cbCalled = false;

  const done = err => {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };

  if (program.dryRun) {
    done();
    return;
  }

  const rd = fs.createReadStream(source);
  rd.on('error', err => {
    done(err);
  });
  const wr = fs.createWriteStream(target);
  wr.on('error', err => {
    done(err);
  });
  wr.on('close', () => {
    done();
  });
  rd.pipe(wr);
};

const copyToOutput = (file, outputFile) => {
  copyFile(files[file], outputFile, err => {
    if (err) console.error(err);
    console.log(
      `Completed copy of ${path.relative(
        outputDirectory,
        files[file]
      )} to ${path.relative(outputDirectory, file)}`
    );
  });
};

Object.keys(files).forEach(file => {
  const outputFile = inOutputDir(file);
  if (fs.existsSync(outputFile) && !program.force) {
    promptly
      .confirm(
        `Are you sure you want to override ${path.relative(
          outputDirectory,
          file
        )}? `
      )
      .then(confirmed => {
        if (confirmed) {
          copyToOutput(file, outputFile);
        }
      })
      .catch(() => {});
  } else {
    copyToOutput(file, outputFile);
  }
});

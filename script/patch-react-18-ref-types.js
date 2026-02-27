#!/usr/bin/env node
/**
 * Patches @types/react (18.x only) so Ref<T> includes RefObject<T | null>,
 * fixing TS2322 when passing useRef<HTMLElement | null>(null) to DOM ref props.
 * Run after yarn install when using React 18 (e.g. in CI test-react-18 job).
 */

const fs = require('fs');
const path = require('path');

const typesReactPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@types',
  'react'
);
const pkgPath = path.join(typesReactPath, 'package.json');

if (!fs.existsSync(pkgPath)) {
  console.warn('patch-react-18-ref-types: @types/react not found, skipping');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const major = parseInt(pkg.version.split('.')[0], 10);
if (major !== 18) {
  console.log('patch-react-18-ref-types: @types/react is not 18.x, skipping');
  process.exit(0);
}

// Match the Ref type line with optional leading whitespace (indentation)
const refTypeRegex =
  /^(\s*)type Ref<T> = RefCallback<T> \| RefObject<T> \| null;$/m;
const refTypeReplacement =
  '$1type Ref<T> = RefCallback<T> | RefObject<T> | RefObject<T | null> | null;';

const oldRefExact = 'type Ref<T> = RefCallback<T> | RefObject<T> | null;';
const newRefExact =
  'type Ref<T> = RefCallback<T> | RefObject<T> | RefObject<T | null> | null;';

const files = ['index.d.ts', 'ts5.0/index.d.ts'];
let patched = 0;

for (const file of files) {
  const filePath = path.join(typesReactPath, file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(refTypeRegex, refTypeReplacement);
  if (newContent === content && content.includes(oldRefExact)) {
    newContent = content.replace(oldRefExact, newRefExact);
  }
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    patched++;
  }
}

if (patched > 0) {
  console.log(
    `patch-react-18-ref-types: patched Ref type in ${patched} file(s)`
  );
}

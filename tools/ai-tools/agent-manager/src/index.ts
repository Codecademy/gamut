#! /usr/bin/env tsx

import { Command } from '@cliffy/command';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import installCmd from './commands/install.js';

const pkg = JSON.parse(
  await readFile(
    join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'),
    'utf8'
  )
) as { version: string; description: string };

await new Command()
  .name('agent-manager')
  .version(pkg.version)
  .description(pkg.description)
  .command('install', installCmd)
  .parse(process.argv.slice(2));

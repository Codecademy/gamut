#!/usr/bin/env node

const DOCS =
  'https://github.com/Codecademy/gamut/tree/main/packages/gamut-agent-tools#readme';

const args = process.argv.slice(2);
const [noun, verb, ...rest] = args;

if (!noun || noun === '--help' || noun === '-h') {
  printHelp();
  process.exit(noun ? 0 : 1);
}

if (noun !== 'plugin') {
  console.error(`Unknown command: "${noun}"`);
  printHelp();
  process.exit(1);
}

if (!verb || verb === '--help' || verb === '-h') {
  printPluginHelp();
  process.exit(verb ? 0 : 1);
}

let cmd;
try {
  cmd = await import(`./commands/plugin/${verb}.mjs`);
} catch {
  console.error(`Unknown plugin subcommand: "${verb}"`);
  printPluginHelp();
  process.exit(1);
}

if (rest.includes('--help') || rest.includes('-h')) {
  cmd.help();
  process.exit(0);
}

try {
  await cmd.default(rest);
} catch (/** @type {any} */ err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

function printHelp() {
  console.log(`
gamut-agent-tools — install Gamut agent assets into Cursor, Claude Code, or Figma workflows

Usage:
  gamut-agent-tools plugin <subcommand> [options]

Documentation (commands, targets, scopes, migration from \`gamut plugin\`):
  ${DOCS}
`);
}

function printPluginHelp() {
  console.log(`
gamut-agent-tools plugin

Subcommands:
  install [target]   remove [target]   update [target]   list

Documentation:
  ${DOCS}
`);
}

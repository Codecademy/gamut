#!/usr/bin/env node

import { error, log } from './lib/io.mjs';

/**
 * Gamut CLI
 *
 * Usage:
 *   gamut plugin install [cursor|claude] [--scope all|skills|rules|commands|agents]
 *   gamut plugin remove  [cursor|claude]
 *   gamut plugin update  [cursor|claude] [--scope all|skills|rules|commands|agents]
 *   gamut plugin list
 */

const args = process.argv.slice(2);
const [noun, verb, ...rest] = args;

if (!noun || noun === '--help' || noun === '-h') {
  printHelp();
  process.exit(noun ? 0 : 1);
}

if (noun !== 'plugin') {
  error(`Unknown command: "${noun}"`);
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
  error(`Unknown plugin subcommand: "${verb}"`);
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
  error(`Error: ${err.message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Help
// ---------------------------------------------------------------------------

function printHelp() {
  log(`
gamut — Gamut design system CLI

Usage:
  gamut <command> [subcommand] [options]

Commands:
  plugin    Manage the Gamut plugin in your AI/design tools

Run "gamut plugin --help" for plugin subcommands.
`);
}

function printPluginHelp() {
  log(`
gamut plugin — Manage the Gamut plugin

Subcommands:
  install [target] [--scope <scope>]    Install the plugin into a tool
  remove  [target]                      Remove an installed plugin
  update  [target] [--scope <scope>]    Update an already-installed plugin
  list                                  Show installation status for all targets

Targets:   cursor (default)  |  claude
Scopes:    all (default)     |  skills  |  rules  |  commands  |  agents

Examples:
  gamut plugin install
  gamut plugin install claude
  gamut plugin install cursor --scope skills
  gamut plugin remove claude
  gamut plugin update
  gamut plugin list
`);
}

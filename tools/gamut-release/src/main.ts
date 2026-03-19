#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Alpha Release Script
 *
 * This script uses the NX Release programmatic API to publish alpha versions
 * of packages. It is designed to run in CI for pull requests.
 *
 * Usage: node --experimental-strip-types script/release-alpha.ts --preid=alpha.abc123
 */

import { releasePublish, releaseVersion } from 'nx/release/index.js';

/** Parsed CLI args: long option names to string value or true for flags */
type ParsedArgs = Record<string, string | true>;

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {};
  argv.forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      parsed[key] = value ?? true;
    } else if (arg.startsWith('-')) {
      parsed[arg.substring(1)] = true;
    }
  });
  return parsed;
}

const parsedArgs = parseArgs(process.argv.slice(2));
const { preid } = parsedArgs;
const dryRun = parsedArgs.dryRun === true || parsedArgs.d === true;
const verbose = parsedArgs.verbose === true;

if (typeof preid !== 'string' || !preid) {
  console.error('❌ Error: --preid argument is required');
  console.error(
    'Usage: node --experimental-strip-types script/release-alpha.ts --preid=alpha.abc123'
  );
  process.exit(1);
}

/** Validated preid for release (string guaranteed after guard above). */
const preidArg: string = preid;

async function releaseAlpha(): Promise<never> {
  console.log(`📦 Starting alpha release with preid: ${preidArg}`);
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made');
  }

  try {
    // Step 1: Version all packages as prerelease
    console.log('\n🔢 Running versioning step...');
    const { workspaceVersion, projectsVersionData } = await releaseVersion({
      specifier: 'prerelease',
      preid: preidArg,
      stageChanges: false,
      gitCommit: false,
      gitTag: false,
      dryRun,
      verbose,
    });

    console.log('\n📝 Versioning complete:');
    if (workspaceVersion) {
      console.log(`  Workspace version: ${workspaceVersion}`);
    }

    // Log versioned projects
    const versionedProjects = Object.entries(projectsVersionData);
    if (versionedProjects.length > 0) {
      console.log(`  ${versionedProjects.length} projects versioned:`);
      versionedProjects.forEach(([projectName, data]) => {
        console.log(`    - ${projectName}: ${data.newVersion}`);
      });
    }

    // Step 2: Publish packages with alpha tag
    console.log(`\n📤 Publishing packages with tag: ${preidArg}...`);
    const publishStatus = await releasePublish({
      tag: preidArg,
      dryRun,
      verbose,
    });

    // Check publish results
    console.log('\n✅ Publishing complete:');
    const results = Object.entries(publishStatus);
    const successful = results.filter(([, status]) => status.code === 0);
    const failed = results.filter(([, status]) => status.code !== 0);

    console.log(`  Successful: ${successful.length}`);
    if (failed.length > 0) {
      console.log(`  Failed: ${failed.length}`);
      failed.forEach(([project, status]) => {
        console.error(`    - ${project}: exit code ${status.code}`);
      });
    }

    const exitCode = failed.length > 0 ? 1 : 0;
    process.exit(exitCode);
  } catch (error) {
    console.error('\n❌ Alpha release failed:');
    console.error(error);
    process.exit(1);
  }
}

void releaseAlpha();

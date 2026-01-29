#!/usr/bin/env node

/**
 * Alpha Release Script
 * 
 * This script uses the NX Release programmatic API to publish alpha versions
 * of packages. It is designed to run in CI for pull requests.
 * 
 * Usage: node script/release-alpha.mjs --preid=alpha.abc123
 */

import { releasePublish, releaseVersion } from 'nx/release/index.js';

// Parse command line arguments
const args = process.argv.slice(2);
const parsedArgs = {};

args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    parsedArgs[key] = value || true;
  } else if (arg.startsWith('-')) {
    parsedArgs[arg.substring(1)] = true;
  }
});

const preid = parsedArgs.preid;
const dryRun = parsedArgs.dryRun === true || parsedArgs.d === true;
const verbose = parsedArgs.verbose === true;

if (!preid) {
  console.error('❌ Error: --preid argument is required');
  console.error('Usage: node script/release-alpha.mjs --preid=alpha.abc123');
  process.exit(1);
}

(async () => {
  console.log(`📦 Starting alpha release with preid: ${preid}`);
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made');
  }

  try {
    // Step 1: Version all packages as prerelease
    console.log('\n🔢 Running versioning step...');
    const { workspaceVersion, projectsVersionData } = await releaseVersion({
      specifier: 'prerelease',
      preid: preid,
      stageChanges: false,
      gitCommit: false,
      gitTag: false,
      dryRun: dryRun,
      verbose: verbose,
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
    console.log(`\n📤 Publishing packages with tag: ${preid}...`);
    const publishStatus = await releasePublish({
      tag: preid,
      dryRun: dryRun,
      verbose: verbose,
    });

    // Check publish results
    console.log('\n✅ Publishing complete:');
    const results = Object.entries(publishStatus);
    const successful = results.filter(([_, status]) => status.code === 0);
    const failed = results.filter(([_, status]) => status.code !== 0);

    console.log(`  Successful: ${successful.length}`);
    if (failed.length > 0) {
      console.log(`  Failed: ${failed.length}`);
      failed.forEach(([project, status]) => {
        console.error(`    - ${project}: exit code ${status.code}`);
      });
    }

    // Exit with appropriate code
    const exitCode = failed.length > 0 ? 1 : 0;
    process.exit(exitCode);
  } catch (error) {
    console.error('\n❌ Alpha release failed:');
    console.error(error);
    process.exit(1);
  }
})();

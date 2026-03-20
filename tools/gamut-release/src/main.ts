#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Alpha Release Script
 *
 * This script uses the Nx Release programmatic API to publish alpha versions
 * of packages. It is designed to run in CI for pull requests via the Nx target
 * `gamut-release:alpha`, which injects the required Node experimental flags.
 *
 * Usage:
 *   npx nx run gamut-release:alpha --preid=alpha.abc123 [--manifest[=path]]
 */

import {
  createProjectGraphAsync,
  readJsonFile,
  workspaceRoot,
} from '@nx/devkit';
import { Command } from 'commander';
import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { releasePublish, releaseVersion } from 'nx/release/index.js';

type AlphaReleaseOptions = {
  preid: string;
  dryRun?: boolean;
  verbose?: boolean;
  manifest?: string | boolean;
};

type VersionDataEntry = {
  currentVersion: string;
  newVersion: string | null;
};

type ProjectsVersionData = Record<string, VersionDataEntry>;

type PublishManifestEntry = {
  name: string;
  version: string;
  previousVersion: string;
};

function resolveManifestPath(
  manifestArg: AlphaReleaseOptions['manifest']
): string | null {
  if (manifestArg === true) {
    return 'alpha-publish-manifest.json';
  }

  if (typeof manifestArg === 'string' && manifestArg.trim()) {
    return manifestArg;
  }

  return null;
}

/**
 * Build a manifest of published packages using the project graph to resolve
 * package.json names for each Nx project.
 */
async function buildPublishManifest(
  projectNames: string[],
  projectsVersionData: ProjectsVersionData
): Promise<PublishManifestEntry[]> {
  if (projectNames.length === 0) {
    return [];
  }

  const projectGraph = await createProjectGraphAsync({ exitOnError: true });
  const entries: PublishManifestEntry[] = [];

  for (const projectName of projectNames) {
    const project = projectGraph.nodes[projectName];
    if (!project) {
      throw new Error(
        `Manifest requested but project "${projectName}" not found in project graph.`
      );
    }

    const packageJsonPath = join(
      workspaceRoot,
      project.data.root,
      'package.json'
    );
    const packageJson = readJsonFile<{ name?: string }>(packageJsonPath);
    if (!packageJson?.name) {
      throw new Error(
        `Manifest requested but package name missing in "${packageJsonPath}".`
      );
    }

    const versionData = projectsVersionData[projectName];
    const version = versionData?.newVersion ?? versionData?.currentVersion;
    const previousVersion = versionData?.currentVersion;
    if (!version || !previousVersion) {
      throw new Error(
        `Manifest requested but version data missing for "${projectName}".`
      );
    }

    entries.push({ name: packageJson.name, version, previousVersion });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

const program = new Command();

program
  .name('gamut-release-alpha')
  .description('Publish alpha versions of packages using Nx Release.')
  .requiredOption('--preid <preid>', 'Prerelease identifier, e.g. alpha.abc123')
  .option('-d, --dry-run', 'Run without publishing')
  .option('--verbose', 'Enable verbose logging')
  .option(
    '--manifest [path]',
    'Write JSON manifest of published packages (default: alpha-publish-manifest.json)'
  );

program.parse(process.argv);

const options = program.opts() as AlphaReleaseOptions;
const preidArg = options.preid;
const dryRun = options.dryRun ?? false;
const verbose = options.verbose ?? false;
const manifestPath = resolveManifestPath(options.manifest);
const manifestOutputPath = manifestPath
  ? resolve(process.cwd(), manifestPath)
  : null;

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
    const successfulProjects = successful.map(([project]) => project);

    console.log(`  Successful: ${successful.length}`);
    if (failed.length > 0) {
      console.log(`  Failed: ${failed.length}`);
      failed.forEach(([project, status]) => {
        console.error(`    - ${project}: exit code ${status.code}`);
      });
    }

    let exitCode = failed.length > 0 ? 1 : 0;

    if (manifestOutputPath) {
      try {
        const manifestEntries = await buildPublishManifest(
          successfulProjects,
          projectsVersionData
        );
        await writeFile(
          manifestOutputPath,
          `${JSON.stringify(manifestEntries, null, 2)}\n`
        );
        console.log(
          `\n📄 Wrote alpha publish manifest to: ${manifestOutputPath}`
        );
      } catch (error) {
        console.error('\n❌ Failed to write publish manifest:');
        console.error(error);
        exitCode = 1;
      }
    }

    process.exit(exitCode);
  } catch (error) {
    console.error('\n❌ Alpha release failed:');
    console.error(error);
    process.exit(1);
  }
}

void releaseAlpha();

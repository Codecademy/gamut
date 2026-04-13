import { Command, EnumType } from '@cliffy/command';
import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, rm, stat, symlink } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, join, resolve as resolvePath } from 'node:path';
import process from 'node:process';

const CURSOR_INSTALL_METHOD = process.env.CURSOR_INSTALL_METHOD ?? 'copy';

export type Agent = 'cursor' | 'claude';

type MarketplaceJson = {
  name?: string;
  plugins?: { name?: string; source?: string }[];
};

function expandUserPath(raw: string): string {
  if (raw === '~') {
    return homedir();
  }
  if (raw.startsWith('~/')) {
    return join(homedir(), raw.slice(2));
  }
  return raw;
}

async function resolvePluginSource(raw: string): Promise<string> {
  const expanded = expandUserPath(raw);
  const root = resolvePath(expanded);
  const st = await stat(root).catch(() => undefined);
  if (!st?.isDirectory()) {
    throw new Error(`Source is not a directory: ${raw} → ${root}`);
  }
  return root;
}

async function cursorDestFolderName(sourceRoot: string): Promise<string> {
  const cursorManifest = join(sourceRoot, '.cursor-plugin', 'plugin.json');
  try {
    const text = await readFile(cursorManifest, 'utf8');
    const j = JSON.parse(text) as { name?: string };
    if (j.name && typeof j.name === 'string') {
      return j.name.replace(/^@/, '').replace(/\//g, '-');
    }
  } catch {
    /* no manifest */
  }
  return basename(sourceRoot);
}

async function claudePluginSpecFromMarketplace(
  sourceRoot: string
): Promise<string> {
  const mp = join(sourceRoot, '.claude-plugin', 'marketplace.json');
  let text: string;
  try {
    text = await readFile(mp, 'utf8');
  } catch {
    throw new Error(
      `Missing ${mp}. For Claude Code, add a local marketplace file (see https://code.claude.com/docs/en/plugin-marketplaces ) or use: claude --plugin-dir ${sourceRoot}`
    );
  }
  const j = JSON.parse(text) as MarketplaceJson;
  const marketplaceName = j.name;
  const plugins = j.plugins;
  if (!marketplaceName || !Array.isArray(plugins) || plugins.length === 0) {
    throw new Error(
      `Invalid marketplace.json (need name and plugins[]): ${mp}`
    );
  }
  const entry =
    plugins.find(
      (p) => p.source === './' || p.source === '.' || p.source === undefined
    ) ?? plugins[0];
  const pluginName = entry?.name;
  if (!pluginName) {
    throw new Error(`No plugin name in marketplace.json plugins[]: ${mp}`);
  }
  return `${pluginName}@${marketplaceName}`;
}

function runCommand(command: string, args: string[]): Promise<number> {
  return new Promise((resolveCode, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') {
        reject(new Error(`${command} not found on PATH.`));
      } else {
        reject(err);
      }
    });
    child.on('close', (code) => resolveCode(code ?? 1));
  });
}

/**
 * Registers the plugin folder as a local marketplace and installs into Claude’s plugin cache
 * (see https://code.claude.com/docs/en/plugin-marketplaces ).
 */
async function installClaudeCode(
  sourceRoot: string,
  pluginSpec: string
): Promise<void> {
  const root = resolvePath(sourceRoot);
  const marketplaceName = pluginSpec.split('@')[1];
  if (!marketplaceName) {
    throw new Error(`Invalid plugin spec: ${pluginSpec}`);
  }

  let code = await runCommand('claude', [
    'plugin',
    'marketplace',
    'add',
    root,
    '--scope',
    'user',
  ]);
  if (code !== 0) {
    console.warn(
      `warning: claude plugin marketplace add exited ${code} (if the marketplace is already registered, you can ignore this).`
    );
    code = await runCommand('claude', [
      'plugin',
      'marketplace',
      'update',
      marketplaceName,
    ]);
    if (code !== 0) {
      throw new Error(
        `claude plugin marketplace add/update failed (${code}). Try: claude plugin marketplace add ${root}`
      );
    }
  }

  code = await runCommand('claude', [
    'plugin',
    'install',
    pluginSpec,
    '--scope',
    'user',
  ]);
  if (code !== 0) {
    throw new Error(
      `claude plugin install failed (${code}). Try: claude plugin install ${pluginSpec} --scope user`
    );
  }

  console.log(
    `Claude Code: installed ${pluginSpec} (user scope). Run /reload-plugins in Claude if needed.`
  );
  console.log(
    `One-off without install: claude --plugin-dir ${root} (https://code.claude.com/docs/en/plugins )`
  );
}

async function installCursor(
  sourceRoot: string,
  destFolder: string
): Promise<void> {
  const home = homedir();
  const destRoot =
    process.env.CURSOR_PLUGINS_LOCAL ??
    join(home, '.cursor', 'plugins', 'local');
  const dest = join(destRoot, destFolder);
  await mkdir(destRoot, { recursive: true });
  await rm(dest, { recursive: true, force: true });
  if (CURSOR_INSTALL_METHOD === 'copy') {
    await cp(sourceRoot, dest, { recursive: true });
  } else {
    await symlink(sourceRoot, dest, 'dir');
  }
  console.log(`Cursor plugin installed to ${dest}`);
}

const installCmd = new Command()
  .description('Install local agent tools.')
  .arguments('<source:string>')
  .type('agent', new EnumType(['cursor', 'claude']))
  .option('-a, --agent <name:agent>', 'Target agent.', { default: 'cursor' })
  .action(async ({ agent }, source: string) => {
    const src = await resolvePluginSource(source);
    if (agent === 'claude') {
      const spec = await claudePluginSpecFromMarketplace(src);
      return installClaudeCode(src, spec);
    }
    if (agent === 'cursor') {
      const destFolder = await cursorDestFolderName(src);
      return installCursor(src, destFolder);
    }
    throw new Error(`Unknown agent: ${agent}`);
  });

export default installCmd;

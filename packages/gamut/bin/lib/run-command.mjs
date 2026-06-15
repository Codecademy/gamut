import { spawn } from 'node:child_process';

/**
 * Spawns an external command and returns its exit code.
 *
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<number>}
 */
export function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('error', (/** @type {NodeJS.ErrnoException} */ err) => {
      if (err.code === 'ENOENT') {
        reject(new Error(`"${command}" not found on PATH. Is it installed?`));
      } else {
        reject(err);
      }
    });
    child.on('close', (code) => resolve(code ?? 1));
  });
}

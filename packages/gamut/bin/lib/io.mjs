/** @param {string} message */
export function log(message) {
  process.stdout.write(message.endsWith('\n') ? message : `${message}\n`);
}

/** @param {string} message */
export function warn(message) {
  process.stderr.write(message.endsWith('\n') ? message : `${message}\n`);
}

/** @param {string} message */
export function error(message) {
  process.stderr.write(message.endsWith('\n') ? message : `${message}\n`);
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const manifests = [
  path.join(
    root,
    'examples/templates/cursor-plugin/.cursor-plugin/plugin.json'
  ),
  path.join(
    root,
    'examples/templates/claude-plugin/.claude-plugin/plugin.json'
  ),
];

for (const file of manifests) {
  const text = fs.readFileSync(file, 'utf8');
  JSON.parse(text);
  console.log('OK', path.relative(process.cwd(), file));
}

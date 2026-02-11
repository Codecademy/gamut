const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'dist', 'index.d.ts');
let content = fs.readFileSync(file, 'utf8');
// Fix compat typings path so published package resolves it (./typings/...)
content = content.replace(
  /"\.\.\/src\/typings\/react-19-compat\.d\.ts"/,
  '"./typings/react-19-compat.d.ts"'
);
fs.writeFileSync(file, content);

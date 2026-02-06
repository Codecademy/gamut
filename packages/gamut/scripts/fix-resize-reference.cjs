const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'dist', 'index.d.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  /"\.\.\/src\/typings\/react-optional-resize\.d\.ts"/,
  '"./typings/react-optional-resize.d.ts"'
);
fs.writeFileSync(file, content);

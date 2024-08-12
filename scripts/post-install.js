const fs = require('node:fs');
const path = require('node:path');

const cwd = process.cwd();
const dir = __dirname;

// When install dependencies on this project, we dont want to clone the template files into src dir
if (dir.startsWith(cwd)) {
  return;
}

const srcPath = path.join(dir, '..', 'template');
const destPath = path.join(cwd, 'src', 'config');

if (!fs.existsSync(destPath)) {
  console.log('creating config directory');
  fs.mkdirSync(destPath, {
    recursive: true
  });
}

console.log(`copy "components.config.ts" into "${destPath}"`);
fs.copyFileSync(
  path.join(srcPath, 'components.config.ts'),
  path.join(destPath, 'components.config.ts'),
);

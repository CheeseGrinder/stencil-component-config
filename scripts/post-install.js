const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const dir = __dirname;
const fil = __filename;

process.stdout.write(
  JSON.stringify({
    cwd, dir, fil
  }, null, 2),
)
console.log({
  cwd, dir, fil
})

const srcPath = path.join(dir, '..', 'template');
const destPath = path.join(cwd, 'config');

if (!fs.existsSync(destPath)) {
  console.log(`creating "${destPath}"`);
  fs.mkdirSync(destPath, {
    recursive: true
  });
}


console.log(`copy "components.config.ts" to "${path.join(destPath, 'components.config.ts')}"`);
fs.copyFileSync(
  path.join(srcPath, 'components.config.ts'),
  path.join(destPath, 'components.config.ts'),
);
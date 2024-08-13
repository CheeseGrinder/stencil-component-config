import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const pkg = require('./package.json');

/** @type {import('rollup').Config} */
export default {
  input: 'build/index.js',

  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'esm',
      file: pkg.module,
    },
  ],
  external: ['@stencil/core/cli', '@stencil/core/compiler', 'node:fs', 'node:fs/promises', 'node:path', 'typescript'],
};

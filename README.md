<div align="center">
  <a href="#">
    <img alt="stencil-logo" src="./assets/stencil-logo.png" width="60">
  </a>
</div>

<h1 align="center">
  Stencil Component Config
</h1>

<div align="center">

A plugin for [StencilJS][stencil-site] to add generate Component Config Object and Documentation
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@cheese-grinder/stencil-component-config" target="_blank" rel="noopener noreferrer">
    <img alt="NPM package" src="https://img.shields.io/npm/v/%40cheese-grinder%2Fstencil-component-config">
  </a>
  <a href="https://github.com/CheeseGrinder/stencil-component-config/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img alt="GitHub License" src="https://img.shields.io/github/license/CheeseGrinder/stencil-component-config">
  </a>
</div>

---------

### Install

```bash
npm install @cheese-grinder/stencil-component-config --save-dev
```

### Usage

```ts
// stencil.config.ts

import { componentConfigTarget } from '@cheese-grinder/stencil-component-config';
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    componentConfigTarget()
  ]
};
```

### Contributing

Thanks for your interest in contributing!
Please take a moment to read up on our guidelines for [contributing][contributing].
Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.


<!-- Links -->

[stencil-site]: https://stenciljs.com/
[contributing]: https://github.com/CheeseGrinder/stencil-component-config/blob/main/CONTRIBUTING.md
[code-of-conduct]: https://github.com/CheeseGrinder/stencil-component-config/blob/main/CODE_OF_CONDUCT.md
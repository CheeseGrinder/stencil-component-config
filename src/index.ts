import { parseFlags } from '@stencil/core/cli';
import { loadConfig } from '@stencil/core/compiler';
import { BuildCtx, CompilerCtx, Config, JsonDocs, OutputTargetCustom } from '@stencil/core/internal';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { hasConfigProp, typeImportData } from './component-util';

export * from './component-config'

// @ts-ignore
declare module "@stencil/core" {
  export namespace Configuration {
    interface ComponentOptions {
    }
  }
}

interface ComponentConfigOptions {
  /**
   * If `false`, remove the prefix to the component tag.
   * @example 'pop-input' -> 'input'
   * @default true
   */
  prefix?: boolean;
}

export function componentConfigTarget(options?: ComponentConfigOptions): OutputTargetCustom {
  return {
    type: 'custom',
    name: 'component-option',
    async generator(config: Config, _compilerCtx: CompilerCtx, buildCtx: BuildCtx, _docs: JsonDocs) {
      const parsedOptions = options || {} as ComponentConfigOptions;
      const content = await generateDts(parsedOptions, config, buildCtx);

      writeFileSync(join(config.srcDir!, 'component-config.d.ts'), content);
    },
  };
}

async function generateDts(options: ComponentConfigOptions, config: Config, buildCtx: BuildCtx) {
  const content: string[] = [
    '/* eslint-disable */',
    '/* tslint:disable */',
    '/**',
    ' * This is an autogenerated file created by the Cheese-grinder stencil Plugin.',
    ' * It contains typing information for all configurable components that exist in this project.',
    ' */',
  ];

  const validated = await loadConfig({
    config: {
      flags: parseFlags(process.argv),
    },
    configPath: config.configPath,
    logger: config.logger,
    sys: config.sys,
  });
  const types = typeImportData(validated.config, buildCtx);
  types.forEach(type => content.push(`import ${type}`));
  content.push('');

  content.push('declare module "@stencil/core" {');
  content.push('  export namespace Configuration {');
  content.push('    interface ComponentOptions {');
  buildCtx.components.forEach(component => {
    const props = component.properties.filter(hasConfigProp);
    if (props.length === 0) {
      return;
    }

    const tagName = options.prefix === false ? component.tagName.split('-').splice(1).join('-') : component.tagName;
    content.push(`      "${tagName}"?: {`);

    props.forEach(prop => {
      if (prop.docs.text) {
        content.push('        /**');
        prop.docs.text.split(/[\r\n]+/).forEach(line => content.push(`         * ${line}`));
        content.push('         */');
      }
      content.push(`        ${prop.name}?: ${prop.complexType.original};`);
    });
    content.push('      }');
  });
  content.push('    }');
  content.push('  }');
  content.push('}');

  return content.join('\n');
}

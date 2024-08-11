import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Biome } from '../types/biome';
import { ConfigType, type StyleConfig } from '../types/config';

const FILE_PATTERN = /\*(?:\.d)?\.ts$/;

export async function parseBiomeConfig(type: ConfigType): Promise<StyleConfig> {
  const configs = await retriveExtendsConfig(type);

  return {
    isSingleQuote: isSingleQuote(configs),
    useSemi: useSemi(configs),
    tabIndent: useTabs(configs),
    tabSize: indentSize(configs),
  };
}

async function retriveExtendsConfig(...paths: string[]): Promise<Biome[]> {
  const files = await Promise.all(paths.map(path => readFile(join(process.cwd(), path), { encoding: 'utf-8' })));
  const configs: Biome[] = files.map(file => JSON.parse(file));
  for (const config of configs) {
    if ('extends' in config && config.extends.length > 0) {
      config.extends = await retriveExtendsConfig(...(config.extends as string[]));
    }
  }

  return configs;
}

function isSingleQuote(configs: Biome[]): boolean {
  return configs.some(
    config =>
      config.override
        .filter(override => override.include.some(file => FILE_PATTERN.test(file)))
        .some(override => override.javascript?.formatter.quoteStyle === 'single') ||
      config.javascript?.formatter.quoteStyle === 'single' ||
      isSingleQuote(config.extends as Biome[]),
  );
}

function useSemi(configs: Biome[]): boolean {
  return configs.some(
    config =>
      config.override
        .filter(override => override.include.some(file => FILE_PATTERN.test(file)))
        .some(override => override.javascript?.formatter.semicolons === 'always') ||
      config.javascript?.formatter.semicolons === 'always' ||
      useSemi(config.extends as Biome[]),
  );
}

function useTabs(configs: Biome[]): boolean {
  return configs.some(
    config =>
      config.override
        .filter(override => override.include.some(file => FILE_PATTERN.test(file)))
        .some(
          override => override.javascript?.formatter.indentStyle === 'tab' || override.formatter?.indentStyle === 'tab',
        ) ||
      config.javascript?.formatter.indentStyle === 'tab' ||
      config.formatter?.indentStyle === 'tab' ||
      useTabs(config.extends as Biome[]),
  );
}

function indentSize(configs: Biome[]): number {
  return (
    configs
      .map(config => {
        const overrideSize = config.override
          .filter(override => override.include.some(file => FILE_PATTERN.test(file)))
          .filter(
            override => ('javascript' in override && 'formatter' in override.javascript!) || 'formatter' in override,
          )
          .map(override => override.javascript?.formatter.indentWidth || override.formatter?.indentWidth)
          .at(-1); // We assum the last one is the right to use

        const jsFormatterSize = config.javascript?.formatter.indentWidth;
        const formatterSize = config.formatter?.indentWidth;

        return overrideSize || jsFormatterSize || formatterSize || indentSize(config.extends as Biome[]);
      })
      .at(-1) || 2
  ); // Same we assum the last found is the one to use
}

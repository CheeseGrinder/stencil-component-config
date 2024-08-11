import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ConfigType, type StyleConfig } from '../types/config';
import type { Prettier } from '../types/prettier';

export async function parsePrettierConfig(type: ConfigType): Promise<StyleConfig> {
  const file = await readFile(join(process.cwd(), type), { encoding: 'utf-8' });
  const config: Prettier = JSON.parse(file);

  const isSingleQuote: boolean =
    config.overrides?.find(override => override.files === '*.d.ts' || override.files === '*.ts')?.options.singleQuote ??
    config.singleQuote ??
    false;

  const useSemi: boolean =
    config.overrides?.find(override => override.files === '*.d.ts' || override.files === '*.ts')?.options.semi ??
    config.semi ??
    false;

  const useTabs: boolean =
    config.overrides?.find(override => override.files === '*.d.ts' || override.files === '*.ts')?.options.useTabs ??
    config.useTabs ??
    false;

  const indentSize: number =
    config.overrides?.find(override => override.files === '*.d.ts' || override.files === '*.ts')?.options.tabWidth ??
    config.tabWidth ??
    2;

  return {
    isSingleQuote,
    useSemi,
    tabIndent: useTabs,
    tabSize: indentSize,
  };
}

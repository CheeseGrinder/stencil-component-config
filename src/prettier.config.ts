
import { readFile } from 'fs/promises';
import { join } from 'path';


interface PrettierConfig {
  singleQuote?: boolean;

  overrides?: PrettierOverride[];
}

interface PrettierOverride {
  files: string;
  options: Omit<PrettierConfig, 'overrides'>;
}

/**
 * Read the .prettierrc file config to match your style config
 */
export async function isSingleQuoteUsed(): Promise<boolean> {
  const file = await readFile(
    join(process.cwd(), '.prettierrc'),
    { encoding: 'utf-8' },
  );
  const config: PrettierConfig = JSON.parse(file);
  const singleQuote: boolean = config.overrides
    ?.find(override => override.files === '*.d.ts' || override.files === '*.ts')
    ?.options.singleQuote ?? config.singleQuote ?? true;

  return singleQuote
}
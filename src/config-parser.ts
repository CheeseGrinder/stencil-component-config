import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseBiomeConfig } from './parser/biome';
import { parsePrettierConfig } from './parser/prettier';
import { ConfigType, type StyleConfig } from './types/config';

export async function parseConfig(): Promise<StyleConfig> {
  const configType = getConfigType();
  return getConfig(configType);
}

function getConfigType(): ConfigType {
  const prettierrc = existsSync(join(process.cwd(), ConfigType.PRETTIER));
  if (prettierrc) {
    return ConfigType.PRETTIER;
  }

  const prettierrcjson = existsSync(join(process.cwd(), ConfigType.PRETTIER_JSON));
  if (prettierrcjson) {
    return ConfigType.PRETTIER_JSON;
  }

  const biomeJson = existsSync(join(process.cwd(), ConfigType.BIOME_JSON));
  if (biomeJson) {
    return ConfigType.BIOME_JSON;
  }

  const biomeJsonc = existsSync(join(process.cwd(), ConfigType.BIOME_JSONC));
  if (biomeJsonc) {
    return ConfigType.BIOME_JSONC;
  }

  return ConfigType.UNKNOWN;
}

async function getConfig(type: ConfigType): Promise<StyleConfig> {
  switch (type) {
    case ConfigType.PRETTIER:
    case ConfigType.PRETTIER_JSON:
      return parsePrettierConfig(type);
    case ConfigType.BIOME_JSON:
    case ConfigType.BIOME_JSONC:
      return parseBiomeConfig(type);
    default:
      return {
        isSingleQuote: true,
        tabIndent: false,
        tabSize: 2,
        useSemi: true,
      };
  }
}

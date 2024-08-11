export enum ConfigType {
  PRETTIER = '.prettierrc',
  PRETTIER_JSON = '.prettierrc.json',
  BIOME_JSON = 'biome.json',
  BIOME_JSONC = 'biome.jsonc',
  UNKNOWN = 'unknown',
}

export interface StyleConfig {
  isSingleQuote: boolean;
  useSemi: boolean;
  tabIndent: boolean;

  /**
   * used when `tabIndent` is `false`
   */
  tabSize: number;
}

export interface Biome {
  extends: string[] | Biome[];
  formatter?: BiomeFormatter;
  javascript?: BiomeJavascript;
  override: BiomeOverride[];
}

interface BiomeFormatter {
  indentWidth?: number;
  indentStyle?: 'tab' | 'space';
}

interface BiomeJavascript {
  formatter: BiomeJsFormatter;
}
type BiomeJsFormatter = BiomeFormatter & {
  semicolons?: 'always' | 'asNeeded';
  quoteStyle: 'single' | 'double';
};

type BiomeOverride = Omit<Biome, 'override' | 'extends'> & {
  include: string[];
};

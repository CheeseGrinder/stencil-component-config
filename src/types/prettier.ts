export interface Prettier {
  singleQuote?: boolean;
  semi?: boolean;
  tabWidth?: number;
  useTabs?: boolean;

  overrides?: PrettierOverride[];
}

interface PrettierOverride {
  files: string;
  options: Omit<Prettier, 'overrides'>;
}

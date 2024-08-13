import { isAbsolute } from 'node:path';
import { BuildCtx, ComponentCompilerProperty, TypesImportData, ValidatedConfig } from '@stencil/core/internal';
import { normalizePath, relative, sortImportNames, updateReferenceTypeImports } from './util.stencil';

export function hasConfigProp(prop: ComponentCompilerProperty): boolean {
  return prop.docs.tags.some(tag => tag.name === 'config');
}

export function typeImportData(config: ValidatedConfig, { components }: BuildCtx) {
  const allTypes = new Map<string, number>();

  const importTypeData = components
    .filter(c => !c.isCollectionDependency)
    .reduce(
      (importType, comp) => updateReferenceTypeImports(importType, allTypes, comp, comp.sourceFilePath, config),
      {} as TypesImportData,
    );

  return Object.keys(importTypeData).map(filePath => {
    const typeData = importTypeData[filePath];

    let importFilePath = filePath;
    if (isAbsolute(filePath)) {
      importFilePath = normalizePath('./' + relative(config.srcDir!, filePath)).replace(/\.(tsx|ts)$/, '');
    }

    return `{ ${typeData
      .sort(sortImportNames)
      .map(td => {
        if (td.localName === td.importName) {
          return `${td.importName}`;
        } else {
          return `${td.localName} as ${td.importName}`;
        }
      })
      .join(`, `)} } from "${importFilePath}";`;
  });
}

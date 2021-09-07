import { camelCasify, kebabCasify } from "../../utils/string-manipulation";

export const getAdapterSnippet: (name: string) => string = (name) => `
import { Injectable } from "@nestjs/common";
import { ${name} } from "../../core/domain/${kebabCasify(name)}/${kebabCasify(name)}.entity";
import { ${name}Repository } from "./${kebabCasify(name)}.repository";

interface ${name}AdapterInterface {}

@Injectable()
export class ${name}Adapter implements ${name}AdapterInterface {
  constructor(private readonly ${camelCasify(name)}Repository: ${name}Repository) {}
}
`.substring(1);

import { kebabCasify } from "../../utils/string-manipulation";

export const getRepositorySnippet: (name: string) => string = (name) => `
import { EntityRepository, Repository } from "typeorm";
import { ${name} } from "../../core/domain/${kebabCasify(name)}/${kebabCasify(name)}.entity";

@EntityRepository(${name})
export class ${name}Repository extends Repository<${name}> {}
`.substring(1);
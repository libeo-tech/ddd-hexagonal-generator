import { camelCasify, kebabCasify } from "../../../../utils/string-manipulation";

export const getQueryHandlerSnippet: (name: string) => string = (name) => `
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ${name}Port } from "./${kebabCasify(name)}.port";
import { ${name}Query, ${name}QueryResult } from "./${kebabCasify(name)}.query";

@QueryHandler(${name}Query)
export class ${name}QueryHandler implements IQueryHandler<${name}Query> {
  constructor(private readonly ${camelCasify(name)}Port: ${name}Port) {}

  public async execute({ payload }: ${name}Query): Promise<void> {
  }
}
`.substring(1);
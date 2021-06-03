export const getQuerySnippet: (name: string) => string = (name) => `import { IQuery, IQueryResult } from "@nestjs/cqrs";

export class ${name}Query implements IQuery {}

export class ${name}QueryResult implements IQueryResult {
  constructor() {}
}
`;
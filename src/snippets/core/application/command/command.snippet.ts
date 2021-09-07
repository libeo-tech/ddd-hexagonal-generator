export const getCommandSnippet: (name: string) => string = (name) => `
import { ICommand } from "@nestjs/cqrs";

export class ${name}Command implements ICommand {
  constructor(public readonly payload: {}) {}
}
`.substring(1);
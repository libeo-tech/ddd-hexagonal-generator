import { kebabCasify } from "../../../../utils/string-manipulation";

export const getCommandHandlerSnippet: (name: string) => string = (name) => `
import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ${name}Command } from "./${kebabCasify(name)}.command";
import { ${name}Port } from "./${kebabCasify(name)}.port";

@CommandHandler(${name}Command)
export class ${name}CommandHandler implements ICommandHandler<${name}Command> {
  constructor(private readonly ${name}Port: ${name}Port) {}

  private readonly logger = new Logger(${name}CommandHandler.name);

  public async execute({ payload }: ${name}Command): Promise<void> {
    this.logger.log(\`> ${name}Command: called\`);
  }
}
`;
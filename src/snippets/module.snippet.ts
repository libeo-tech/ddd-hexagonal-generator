import { kebabCasify } from "../utils/string-manipulation";

export const getModuleSnippet: (name: string) => string = (name) => `
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ${name}Applications } from "./core/application/${kebabCasify(name)}.application";
import { ${name}Infrastructures } from "./infrastructure/${kebabCasify(name)}.infrastructure";
import { ${name}Interfaces } from "./interface/${kebabCasify(name)}.interface";

@Module({
  imports: [TypeOrmModule.forFeature([...${name}Infrastructures.repositories]), CqrsModule],
  providers: [...${name}Interfaces.resolvers, ...${name}Infrastructures.providers, ...${name}Applications],
  controllers: [...${name}Interfaces.controllers],
  exports: [],
})
export class ${name}Module {}

`;




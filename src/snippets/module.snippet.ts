import { kebabCasify } from "../utils/string-manipulation";

export const getModuleSnippet: (name: string) => string = (name) => `
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ${name}Applications } from "./core/application/${kebabCasify(name)}.application";
import { ${name}Infrastructure } from "./infrastructure/${kebabCasify(name)}.infrastructure";
import { ${name}Interface } from "./interface/${kebabCasify(name)}.interface";

@Module({
  imports: [TypeOrmModule.forFeature([...${name}Infrastructure.repositories]), CqrsModule],
  providers: [...${name}Interface.resolvers, ...${name}Infrastructure.providers, ...${name}Applications],
  controllers: [...${name}Interface.controllers],
  exports: [],
})
export class ${name}Module {}

`.substring(1);




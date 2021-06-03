import { camelCasify } from "../../../utils/string-manipulation";

export const getEntitySnippet: (name: string) => string = (name) => `
import { Column, Entity } from "typeorm";
import { Base } from "../../../../common/entities/base.entity";

@Entity()
export class ${name} extends Base {
  id!: string & { __brand: "${camelCasify(name)}Id" };
}
`;

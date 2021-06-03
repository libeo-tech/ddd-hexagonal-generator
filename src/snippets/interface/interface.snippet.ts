export const getInterfaceSnippet: (name: string) => string = (name) => `
export const ${name}Interfaces = {
  resolvers: [],
  controllers: [],
};
`;




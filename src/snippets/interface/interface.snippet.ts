export const getInterfaceSnippet: (name: string) => string = (name) => `
export const ${name}Interface = {
  resolvers: [],
  controllers: [],
};
`;




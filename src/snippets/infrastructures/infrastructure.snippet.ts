export const getInfrastructureSnippet: (name: string) => string = (name) => `
export const ${name}Infrastructures = {
  providers: [],
  repositories: [],
};
`;

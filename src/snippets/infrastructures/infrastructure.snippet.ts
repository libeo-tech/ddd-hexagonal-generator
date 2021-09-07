export const getInfrastructureSnippet: (name: string) => string = (name) => `
export const ${name}Infrastructure = {
  providers: [],
  repositories: [],
};
`.substring(1);

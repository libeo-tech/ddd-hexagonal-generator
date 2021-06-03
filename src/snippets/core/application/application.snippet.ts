export const getApplicationSnippet: (name: string) => string = (name) => `
const ${name}QueryHandler = [];
const ${name}CommandHandler = [];

export const ${name}Applications = [...${name}QueryHandler, ...${name}CommandHandler];
`;
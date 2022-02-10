export const getApplicationSnippet: (name: string) => string = (name) => `
const ${name}QueryHandlers: any[] = [];
const ${name}CommandHandlers: any[] = [];

export const ${name}Applications = [...${name}QueryHandlers, ...${name}CommandHandlers];
`.substring(1);
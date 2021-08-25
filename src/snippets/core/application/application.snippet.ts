export const getApplicationSnippet: (name: string) => string = (name) => `
const ${name}QueryHandler: any[] = [];
const ${name}CommandHandler: any[] = [];

export const ${name}Applications = [...${name}QueryHandler, ...${name}CommandHandler];
`.substring(1);
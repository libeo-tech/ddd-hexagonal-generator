export const getApplicationSnippet: (name: string) => string = (name) => `
const ${name}QueryHandlers = [] as const;
const ${name}CommandHandlers = [] as const;

export const ${name}Applications = [...${name}QueryHandlers, ...${name}CommandHandlers];
`.substring(1);

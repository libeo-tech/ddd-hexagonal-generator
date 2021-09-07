export const getQueryPortSnippet: (name: string) => string = (name) => `
export abstract class ${name}Port {
}
`.substring(1);

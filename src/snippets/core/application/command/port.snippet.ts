export const getCommandPortSnippet: (name: string) => string = (name) => `
export abstract class ${name}Port {
}
`;

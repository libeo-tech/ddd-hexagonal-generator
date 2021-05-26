export const getPortSnippet: (name: string) => string = (name) => `
export abstract class ${name}Port {
}
`;

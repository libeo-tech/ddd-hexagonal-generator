import * as vscode from 'vscode';


export const createFileWithContent = async (rootFolder: vscode.Uri, fileName: string, content: Uint8Array): Promise<vscode.Uri> => {
  const fileUri = vscode.Uri.joinPath(rootFolder, `${fileName}.command.ts`);
  await vscode.workspace.fs.writeFile(fileUri, content);
  return fileUri;
};

export const openFile = (uris: vscode.Uri[]) => {
  uris.forEach((uri) => {
    vscode.window.showTextDocument(uri, { preview: false });
  });
};
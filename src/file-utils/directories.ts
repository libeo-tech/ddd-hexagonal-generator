import * as vscode from 'vscode';



export const createDirectory = async (rootFolder: vscode.Uri, newDirectoryName: string): Promise<vscode.Uri> => {
  const folderUri = vscode.Uri.joinPath(rootFolder, newDirectoryName);
  await vscode.workspace.fs.createDirectory(folderUri);
  return folderUri;
};
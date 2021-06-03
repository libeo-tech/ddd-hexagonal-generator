import * as vscode from 'vscode';
import * as nodePath from 'path';
import { CharCode } from './charCode';


export const createFileWithContent = async (rootFolder: vscode.Uri, fileName: string, content: Uint8Array): Promise<vscode.Uri> => {
  const fileUri = vscode.Uri.joinPath(rootFolder, fileName);
  await vscode.workspace.fs.writeFile(fileUri, content);
  return fileUri;
};

export const openFile = (uris: vscode.Uri[]) => {
  uris.forEach((uri) => {
    vscode.window.showTextDocument(uri, { preview: false });
  });
};

export const getFileUri = (path: string) => {
  return vscode.Uri.parse(path);
};

const posixPath = nodePath.posix || nodePath;


/**
 * Joins one or more input paths to the path of vscode.Uri. 
 * '/' is used as the directory separation character. 
 * 
 * The resolved path will be normalized. That means:
 *  - all '..' and '.' segments are resolved.
 *  - multiple, sequential occurences of '/' are replaced by a single instance of '/'.
 *  - trailing separators are preserved.
 * 
 * @param uri The input vscode.Uri.
 * @param paths The paths to be joined with the path of vscode.Uri.
 * @returns A vscode.Uri with the joined path. All other properties of the vscode.Uri (scheme, authority, query, fragments, ...) will be taken from the input vscode.Uri.
 */
export function joinPath(uri: vscode.Uri, ...paths: string[]): vscode.Uri {
  return uri.with({ path: posixPath.join(uri.path, ...paths) });
}


/**
 * Resolves one or more paths against the path of a vscode.Uri. 
 * '/' is used as the directory separation character. 
 * 
 * The resolved path will be normalized. That means:
 *  - all '..' and '.' segments are resolved. 
 *  - multiple, sequential occurences of '/' are replaced by a single instance of '/'.
 *  - trailing separators are removed.
 * 
 * @param uri The input vscode.Uri.
 * @param paths The paths to resolve against the path of vscode.Uri.
 * @returns A vscode.Uri with the resolved path. All other properties of the vscode.Uri (scheme, authority, query, fragments, ...) will be taken from the input vscode.Uri.
 */
export function resolvePath(uri: vscode.Uri, ...paths: string[]): vscode.Uri {
  const path = uri.path || '/'; // normalize the path which is necessary as for posixPath.resolve the first segments has to be absolute or cwd is used.
  return uri.with({ path: posixPath.resolve(path, ...paths) });
}

/**
 * Returns a vscode.Uri where the path is the directory name of the input uri, similar to the Unix dirname command. 
 * In the path, '/' is recognized as the directory separation character. Trailing directory separators are ignored.
 * The orignal vscode.Uri is returned if the URIs path is empty or does not contain any path segments.
 * 
 * @param uri The input vscode.Uri.
 * @return The last segment of the URIs path.
 */
export function dirname(uri: vscode.Uri): vscode.Uri {
  let path = posixPath.dirname(uri.path);
  if (path.length === 1 && path.charCodeAt(0) === CharCode.Period) {
    return uri;
  }
  return uri.with({ path });
}

/**
 * Returns the last segment of the path of a vscode.Uri, similar to the Unix basename command. 
 * In the path, '/' is recognized as the directory separation character. Trailing directory separators are ignored.
 * The empty string is returned if the URIs path is empty or does not contain any path segments.
 * 
 * @param uri The input vscode.Uri.
 * @return The base name of the URIs path.
 */
export function basename(uri: vscode.Uri): string {
  return posixPath.basename(uri.path);
}

/**
 * Returns the extension name of the path of a vscode.Uri, similar to the Unix extname command. 
 * In the path, '/' is recognized as the directory separation character. Trailing directory separators are ignored.
 * The empty string is returned if the URIs path is empty or does not contain any path segments.
 * 
 * @param uri The input vscode.Uri.
 * @return The extension name of the URIs path.
 */
export function extname(uri: vscode.Uri): string {
  return posixPath.extname(uri.path);
}
import * as vscode from 'vscode';
import * as FileUtils from './file-utils';
import * as Snippets from "./snippets";
import { kebabCasify, stringToUintArray } from './utils/string-manipulation';

async function onClickCreateDirectories(selectedFolder: vscode.Uri) {
	const moduleName = await vscode.window.showInputBox({ title: "DDH Module Name", prompt: "This command will create our directories according to our DDH architecture", placeHolder: "UserArtProject" });
	if (moduleName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(moduleName));
		const coreFolder = await FileUtils.createDirectory(rootFolder, "core");
		const applicationFolder = await FileUtils.createDirectory(coreFolder, "application");
		await FileUtils.createDirectory(applicationFolder, "commands");
		await FileUtils.createDirectory(applicationFolder, "queries");
		await FileUtils.createDirectory(coreFolder, "domain");
		await FileUtils.createDirectory(rootFolder, "infrastructure");
		await FileUtils.createDirectory(rootFolder, "interface");
	}
}

async function onCreateCommand(selectedFolder: vscode.Uri) {
	const commandName = await vscode.window.showInputBox({ title: "DDH Command Name", prompt: "This command will create command files according to our DDH architecture", placeHolder: "CreateUserArtProject" });
	if (commandName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(commandName));
		const commandDefinitionFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.command.ts`, stringToUintArray(Snippets.getCommandSnippet(commandName)));
		const commandHandlerFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.command-handler.ts`, stringToUintArray(Snippets.getCommandHandlerSnippet(commandName)));
		const commandPortFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.port.ts`, stringToUintArray(Snippets.getPortSnippet(commandName)));
		FileUtils.openFile([commandDefinitionFile, commandHandlerFile, commandPortFile]);
	}
}

export function activate(context: vscode.ExtensionContext) {
	let createDDHFolders = vscode.commands.registerCommand('libeo-ddh-generator.createDDHFolders', onClickCreateDirectories);
	let createDDHCommand = vscode.commands.registerCommand('libeo-ddh-generator.createDDHCommand', onCreateCommand);
	context.subscriptions.push(createDDHFolders, createDDHCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }

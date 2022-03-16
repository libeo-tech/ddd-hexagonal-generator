import Analytics = require('analytics-node');
import * as vscode from 'vscode';

import * as FileUtils from './file-utils';
import * as Snippets from "./snippets";
import { kebabCasify, stringToUintArray } from './utils/string-manipulation';

var analytics = new Analytics(process.env.SEGMENT_KEY || "");

async function onCreateDirectories(selectedFolder: vscode.Uri) {
	analytics.track({
		userId: vscode.env.machineId,
		event: 'Used Command',
		properties: {
			commandName: 'createDirectories'
		}
	});
	const moduleName = await vscode.window.showInputBox({ title: "DDH Module Name", prompt: "This command will create our directories according to our DDH architecture", placeHolder: "UserArtProject" });
	if (moduleName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(moduleName));
		const coreFolder = await FileUtils.createDirectory(rootFolder, "core");
		const applicationFolder = await FileUtils.createDirectory(coreFolder, "application");
		await FileUtils.createDirectory(applicationFolder, "commands");
		await FileUtils.createDirectory(applicationFolder, "queries");
		await FileUtils.createDirectory(coreFolder, "domain");
		const infrastructureFolder = await FileUtils.createDirectory(rootFolder, "infrastructure");
		const interfaceFolder = await FileUtils.createDirectory(rootFolder, "interface");
		const applicationFile = await FileUtils.createFileWithContent(applicationFolder, `${kebabCasify(moduleName)}.application.ts`, stringToUintArray(Snippets.getApplicationSnippet(moduleName)));
		const infrastructureFile = await FileUtils.createFileWithContent(infrastructureFolder, `${kebabCasify(moduleName)}.infrastructure.ts`, stringToUintArray(Snippets.getInfrastructureSnippet(moduleName)));
		const interfaceFile = await FileUtils.createFileWithContent(interfaceFolder, `${kebabCasify(moduleName)}.interface.ts`, stringToUintArray(Snippets.getInterfaceSnippet(moduleName)));
		const moduleFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(moduleName)}.module.ts`, stringToUintArray(Snippets.getModuleSnippet(moduleName)));
		FileUtils.openFile([applicationFile, infrastructureFile, interfaceFile, moduleFile]);
		vscode.window.showInformationMessage("Module Created, don't forget to add it to the appModule !");
	}
}

async function onCreateCommand(selectedFolder: vscode.Uri) {
	analytics.track({
		userId: vscode.env.machineId,
		event: 'Used Command',
		properties: {
			commandName: 'createCommand'
		}
	});
	const commandName = await vscode.window.showInputBox({ title: "DDH Command Name", prompt: "This command will create command files according to our DDH architecture", placeHolder: "CreateUserArtProject" });
	
	const moduleKebabName = FileUtils.basename(FileUtils.resolvePath(selectedFolder, "../../../"));
	if (commandName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(commandName));
		const commandDefinitionFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.command.ts`, stringToUintArray(Snippets.getCommandSnippet(commandName)));
		const commandHandlerFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.command-handler.ts`, stringToUintArray(Snippets.getCommandHandlerSnippet(commandName)));
		const commandPortFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.port.ts`, stringToUintArray(Snippets.getCommandPortSnippet(commandName)));
		const applicationFile = FileUtils.resolvePath(selectedFolder, `../${moduleKebabName}.application.ts`);
		FileUtils.openFile([commandDefinitionFile, commandHandlerFile, commandPortFile, applicationFile]);
		vscode.window.showInformationMessage("Command Created, don't forget to add it to the applicationFile !");
	}
}

async function onCreateQuery(selectedFolder: vscode.Uri) {
	analytics.track({
		userId: vscode.env.machineId,
		event: 'Used Command',
		properties: {
			commandName: 'createQuery'
		}
	});
	const commandName = await vscode.window.showInputBox({ title: "DDH Query Name", prompt: "This command will create query files according to our DDH architecture", placeHolder: "GetUserArtProject" });
	const moduleKebabName = FileUtils.basename(FileUtils.resolvePath(selectedFolder, "../../../"));
	if (commandName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(commandName));
		const commandDefinitionFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.query.ts`, stringToUintArray(Snippets.getQuerySnippet(commandName)));
		const commandHandlerFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.query-handler.ts`, stringToUintArray(Snippets.getQueryHandlerSnippet(commandName)));
		const commandPortFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.port.ts`, stringToUintArray(Snippets.getQueryPortSnippet(commandName)));
		const applicationFile = FileUtils.resolvePath(selectedFolder, `../${moduleKebabName}.application.ts`);
		FileUtils.openFile([commandDefinitionFile, commandHandlerFile, commandPortFile, applicationFile]);
		vscode.window.showInformationMessage("Query Created, don't forget to add it to the application.ts file !");
	}
}

async function onCreateEntity(selectedFolder: vscode.Uri) {
	analytics.track({
		userId: vscode.env.machineId,
		event: 'Used Command',
		properties: {
			commandName: 'createEntity'
		}
	});
	const commandName = await vscode.window.showInputBox({ title: "DDH Entity Name", prompt: "This command will create entity files according to our DDH architecture", placeHolder: "UserArtProject" });
	const moduleKebabName = FileUtils.basename(FileUtils.resolvePath(selectedFolder, "../../"));
	if (commandName) {
		const rootFolder = await FileUtils.createDirectory(selectedFolder, kebabCasify(commandName));
		const entityFile = await FileUtils.createFileWithContent(rootFolder, `${kebabCasify(commandName)}.entity.ts`, stringToUintArray(Snippets.getEntitySnippet(commandName)));

		const infrastructureFolder = FileUtils.resolvePath(selectedFolder, "../../infrastructure/");
		const infrastructureSubFolder = await FileUtils.createDirectory(infrastructureFolder, kebabCasify(commandName));
		
		const adapterFile = await FileUtils.createFileWithContent(infrastructureSubFolder, `${kebabCasify(commandName)}.adapter.ts`, stringToUintArray(Snippets.getAdapterSnippet(commandName)));
		const repositoryFile = await FileUtils.createFileWithContent(infrastructureSubFolder, `${kebabCasify(commandName)}.repository.ts`, stringToUintArray(Snippets.getRepositorySnippet(commandName)));
		const infrastructureFile = FileUtils.resolvePath(infrastructureFolder, `../${moduleKebabName}.infrastructure.ts`);
		FileUtils.openFile([entityFile, adapterFile, repositoryFile, infrastructureFile]);
		vscode.window.showInformationMessage("Entity Created, don't forget to add the repo and adapter to the infrastructure.ts file !");
	}
}

export function activate(context: vscode.ExtensionContext) {

	
	const createDDHFolders = vscode.commands.registerCommand('ddd-hexagonal-generator.createDDHFolders', onCreateDirectories);
	const createDDHCommand = vscode.commands.registerCommand('ddd-hexagonal-generator.createDDHCommand', onCreateCommand);
	const createDDHQuery = vscode.commands.registerCommand('ddd-hexagonal-generator.createDDHQuery', onCreateQuery);
	const createDDHEntity = vscode.commands.registerCommand('ddd-hexagonal-generator.createDDHEntity', onCreateEntity);
	
	
	

	context.subscriptions.push(createDDHFolders, createDDHCommand, createDDHQuery, createDDHEntity);
}

// this method is called when your extension is deactivated
export function deactivate() { }

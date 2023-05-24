import * as vscode from "vscode";
import logEmmter from "./logEmmeter";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "fast-log-ts" is now active!');

  const disposable = vscode.commands.registerCommand(
    "fast-log-ts.emmit-fast-log",
    () => logEmmter()
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

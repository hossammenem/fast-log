import * as vscode from "vscode";
import logEmmter from "./logEmmeter";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "fast-log.emmit-fast-log",
    () => logEmmter()
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

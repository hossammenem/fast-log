import * as vscode from "vscode";

export default function extractArgs(
  document: vscode.TextDocument,
  range: vscode.Range
): string[] {
  const functionArguments: string[] = [];

  const functionSignature = document.getText(range);

  const argumentPattern = /\(([^)]+)\)/;
  const matches = functionSignature.match(argumentPattern);

  if (matches && matches.length > 1) {
    const argList = matches[1];
    const args = argList.split(",").map((arg) => {
      const argParts = arg.trim().split(":");
      return argParts[0].trim();
    });
    functionArguments.push(...args);
  }

  return functionArguments;
}

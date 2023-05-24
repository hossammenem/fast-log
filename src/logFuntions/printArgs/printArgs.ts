import * as vscode from "vscode";
import { emmetVars } from "../emmetVars";
import extractArgs from "./extractArgs";
import findMostInnerSymbol from "./findMostInnerSymbol";

export function printArgs(
  activeEditor: vscode.TextEditor | undefined,
  document: vscode.TextDocument,
  cursorPosition: vscode.Position,
  lineRange: vscode.Range
) {
  vscode.commands
    .executeCommand<vscode.DocumentSymbol[]>(
      "vscode.executeDocumentSymbolProvider",
      document.uri
    )
    .then((symbols) => {
      if (!symbols) {
        vscode.window.showInformationMessage(
          "No symbols found in the current document."
        );
        return;
      }

      const matchingSymbol = findMostInnerSymbol(symbols, cursorPosition);

      if (!matchingSymbol) {
        vscode.window.showInformationMessage(
          "No symbol found at the current cursor position."
        );
        return;
      }

      const functionName = matchingSymbol.name;
      const functionRange = matchingSymbol.range;

      const functionArgs = extractArgs(document, functionRange);

      if (functionName && activeEditor) {
        emmetVars(activeEditor, functionArgs, lineRange);
      } else {
        vscode.window.showErrorMessage(
          "An error occurred while analyzing the cursor position."
        );
      }
    });
}

import * as vscode from "vscode";
import { emmetVars } from "../emmetVars";

export function varDef(
  activeEditor: vscode.TextEditor | undefined,
  document: vscode.TextDocument,
  position: vscode.Position
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
      const [varRange, name] = getVarRange(symbols, position);
      emmetVars(activeEditor, name, varRange);
    });
}

function getVarRange(
  symbols: vscode.DocumentSymbol[],
  position: vscode.Position
): any {
  let varRange: vscode.Range | undefined;
  let name: string | undefined;
  for (const symbol of symbols) {
    if (symbol.range.start.line == position.line) {
      return [symbol.range, symbol.name];
    } else if (symbol.children) {
      [varRange, name] = getVarRange(symbol.children, position);
      if (varRange) {
        break;
      }
    }
  }
  return [varRange, name] as const;
}

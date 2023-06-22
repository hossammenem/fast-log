import * as vscode from "vscode";

export default function isVariable(
  document: vscode.TextDocument,
  position: vscode.Position
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    vscode.commands
      .executeCommand<vscode.DocumentSymbol[]>(
        "vscode.executeDocumentSymbolProvider",
        document.uri
      )
      .then((symbols) => {
        let bool = false;
        if (!symbols) {
          vscode.window.showInformationMessage(
            "No symbols found in the current document."
          );
        } else {
          const found = getVar(symbols, position);
          bool = found !== undefined;
        }
        resolve(bool);
      });
  });
}

function getVar(
  symbols: vscode.DocumentSymbol[],
  position: vscode.Position
): vscode.Range | undefined {
  let varRange: vscode.Range | undefined;
  for (const symbol of symbols) {
    if (
      symbol.range.start.line == position.line &&
      symbol.kind == 12 // kind 12 == variable
    ) {
      return symbol.range;
    } else if (symbol.children) {
      varRange = getVar(symbol.children, position);
      if (varRange) {
        break;
      }
    }
  }

  return varRange;
}
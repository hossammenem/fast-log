import * as vscode from "vscode";
import { emmetVars } from "../emmetVars";

export function varDef(
  activeEditor: vscode.TextEditor | undefined,
  document: vscode.TextDocument,
  varDef: string,
  position: vscode.Position
) {
  const VarPattern: RegExp =
    /^(?:export\s+)?(?:const\s+|let\s+|var\s+)?\s*([a-zA-Z0-9_]+)/g;
  const matches = VarPattern.exec(varDef);

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
      if (matches) {
        const varRange = getVarRange(symbols, matches[1], position);
        emmetVars(activeEditor, matches[1], varRange);
      }
    });
}

function getVarRange(
  symbols: vscode.DocumentSymbol[],
  matches: string,
  position: vscode.Position
): vscode.Range | undefined {
  let varRange: vscode.Range | undefined;
  for (const symbol of symbols) {
    if (symbol.name == matches && symbol.range.start.line == position.line) {
      return symbol.range;
    } else if (symbol.children) {
      varRange = getVarRange(symbol.children, matches, position);
      if (varRange) {
        break;
      }
    }
  }

  return varRange;
}


export const test = "this is a test var";
const test2 = "another test var";
//test
//test:wItHtype
//test:OnLyTYpe
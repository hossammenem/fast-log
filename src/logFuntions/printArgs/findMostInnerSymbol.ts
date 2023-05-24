import * as vscode from "vscode";

export default function findMostInnerSymbol(
  symbols: vscode.DocumentSymbol[],
  position: vscode.Position
): vscode.DocumentSymbol | undefined {
  let matchingSymbol: vscode.DocumentSymbol | undefined;

  for (const symbol of symbols) {
    if (symbol.range.contains(position)) {
      if (symbol.children && symbol.children.length > 0) {
        const innerSymbol = findMostInnerSymbol(symbol.children, position);
        if (innerSymbol) {
          matchingSymbol = innerSymbol;
        } else {
          matchingSymbol = symbol;
        }
      } else {
        matchingSymbol = symbol;
      }
    }
  }

  return matchingSymbol;
}

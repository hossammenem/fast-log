import * as vscode from "vscode";
import { emmetVars } from "../emmetVars";

export function varDef(
  activeEditor: vscode.TextEditor | undefined,
  varDef: string,
  lineRange: vscode.Range
) {
  const VarPattern: RegExp = /^(?:const\s+|let\s+|var\s+)?\s*([a-zA-Z0-9_]+)/g;

  const matches = VarPattern.exec(varDef);
  matches?.toLocaleString();

  matches;

  if (matches && matches.length > 0) {
    emmetVars(activeEditor, matches[1], lineRange);
  }
}

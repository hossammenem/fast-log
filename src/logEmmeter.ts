import * as vscode from "vscode";
import * as emmet from "./logFuntions/index";
import isVariable from "./logFuntions/variables/isVariable";

export default function logEmmter() {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const currentPosition = activeEditor.selection.active;
    const currentLine = activeEditor.document.lineAt(currentPosition.line);

    const lineStart = new vscode.Position(currentLine.lineNumber, 0);
    const lineEnd = new vscode.Position(
      currentLine.lineNumber,
      currentLine.text.length
    );
    const lineRange = new vscode.Range(lineStart, lineEnd);

    const textContent = currentLine.text.replace("//", "").trim();

    if (isVariable(textContent)) {
      emmet.varDef(activeEditor, textContent, lineRange);
    } else if (textContent.includes("printArgs")) {
      emmet.printArgs(
        activeEditor,
        activeEditor.document,
        currentPosition,
        lineRange
      );
    } else if (textContent.match(/[a-zA-Z_0-9,]+/g)) {
      emmet.emmetVars(activeEditor, textContent.split(","), lineRange);
    }
  }
}

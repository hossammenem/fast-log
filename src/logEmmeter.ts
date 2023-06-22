import * as vscode from "vscode";
import * as emmet from "./logFuntions/index";
import isVariable from "./logFuntions/varFunctions/isVariable";

export default async function logEmmter() {
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
    const colonIdx = textContent.indexOf(":");
    const n = textContent.length;
    const option = textContent.slice(colonIdx + 1, n).trim();
    const vars = textContent.slice(0, colonIdx > 0 ? colonIdx : n).split(",");

    if (textContent.match(/^".*"$/g)) {
      const currentIndentation = currentLine.text.match(/^\s*/)?.[0] || "";
      activeEditor.edit((editBuilder) => {
        editBuilder.replace(
          lineRange,
          currentIndentation + `console.log(${textContent});`
        );
      });
    } else if (await isVariable(activeEditor.document, currentPosition)) {
      emmet.varDef(activeEditor, activeEditor.document, currentPosition);
    } else if (textContent.match(/^[A-Za-z0-9,: ]+$/s)) {
      emmet.emmetVars(activeEditor, vars, lineRange, option.toLowerCase());
    }
  }
}

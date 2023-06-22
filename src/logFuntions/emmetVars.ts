import * as vscode from "vscode";
import createMsg from "./createMsg";

export function emmetVars(
  activeEditor: vscode.TextEditor | undefined,
  text: string | string[],
  lineRange: vscode.Range | undefined,
  option?: string
) {
  if (activeEditor) {
    const selection = activeEditor.selection;
    const currentPosition = selection.active;
    const currentLine = activeEditor.document.lineAt(currentPosition.line);
    const currentIndentation = currentLine.text.match(/^\s*/)?.[0] || "";

    if (!Array.isArray(text) && lineRange) {
      const message = createMsg(text, option);
      activeEditor.edit((editBuilder) => {
        editBuilder.insert(
          lineRange.end.translate(0, 1),
          "\n" + currentIndentation + message
        );
      });
    }

    if (Array.isArray(text) && lineRange) {
      const edits: vscode.TextEdit[] = [];
      let lineOffset = 0;

      for (const varName of text) {
        const start = lineRange.start.translate(lineOffset);
        const end = lineRange.end.translate(lineOffset);
        const range = new vscode.Range(start, end);

        const message = createMsg(varName, option);

        edits.push(new vscode.TextEdit(range, currentIndentation + message));
        lineOffset++;
      }

      activeEditor
        .edit((editBuilder) => {
          for (let i = 0; i < edits.length-1; i++) {
            editBuilder.insert(lineRange.end, "\n");
          }
        })
        .then(() => {
          const workspaceEdit = new vscode.WorkspaceEdit();
          workspaceEdit.set(activeEditor.document.uri, edits);

          vscode.workspace.applyEdit(workspaceEdit);
        });
    }
  }
}

import * as vscode from "vscode";

export function emmetVars(
  activeEditor: vscode.TextEditor | undefined,
  text: string | string[],
  lineRange: vscode.Range
) {
  if (activeEditor && !Array.isArray(text)) {
    const message = `\nconsole.log("${text}: ", ${text}, "\\n");`;

    activeEditor.edit((editBuilder) => {
      editBuilder.insert(lineRange.end, message);
    });
  }

  if (activeEditor && Array.isArray(text)) {
    const edits: vscode.TextEdit[] = [];
    let lineOffset = 0;

    for (const varName of text) {
      const start = lineRange.start.translate(lineOffset);
      const end = lineRange.end.translate(lineOffset);
      const range = new vscode.Range(start, end);

      const message = `console.log("${varName}: ", ${varName}, "\\n");`;

      edits.push(new vscode.TextEdit(range, message));
      lineOffset++;
    }

    activeEditor
      .edit((editBuilder) => {
        for (let i = 0; i < edits.length; i++) {
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
